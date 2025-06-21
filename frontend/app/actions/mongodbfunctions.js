"use server";

import { MongoClient } from "mongodb";
import { mongoClientCS } from "../../lib/mongodbconnector";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// MongoDB setup
let client;
let db;

async function initDB() {
  if (!client) {
    client = mongoClientCS;
    await client.connect();
  }
  if (!db) {
    db = client.db("agrilink");
  }
  return db;
}

export const withCollection = async (collectionName, fn) => {
  try {
    const db = await initDB();
    const collection = db.collection(collectionName);
    return await fn(collection);
  } catch (error) {
    console.error(`Database operation failed for ${collectionName}:`, error);
    throw error;
  }
};

// Helper function to convert base64 to blob
function base64ToBlob(base64Data) {
  // Return null if no data is provided
  if (!base64Data) return null;
  
  // Split the base64 string
  const parts = base64Data.split(';base64,');
  if (parts.length < 2) {
    throw new Error("Invalid base64 string format");
  }
  
  const mimeType = parts[0].split(':')[1];
  const byteString = atob(parts[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeType });
}

// Upload image to Supabase
export async function uploadWasteImage(imageBase64) {
  try {
    // Return null if no image is provided
    if (!imageBase64) return null;
    
    const imageName = uuidv4();
    const filePath = `wasteMaterialImage/${imageName}`;
    const blob = base64ToBlob(imageBase64);
    
    if (!blob) return null;
    
    const file = new File([blob], imageName, { type: blob.type });

    const { error } = await supabaseClient.storage
      .from("waste-bucket")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw new Error("Image upload failed: " + error.message);
    }

    const { data: publicUrlData } = supabaseClient.storage
      .from("waste-bucket")
      .getPublicUrl(filePath);

    return {
      imageName,
      imageUrl: publicUrlData.publicUrl,
    };
  } catch (error) {
    console.error("Error in uploadWasteImage:", error);
    return null;
  }
}

// Upload waste info (with optional image)
export async function uploadWasteInfo({ classificationResult, formData, imageBase64 = null }) {
  try {
    let imageUploadResult = null;

    // Only upload image if provided
    if (imageBase64) {
      imageUploadResult = await uploadWasteImage(imageBase64);
    }

    const wasteDoc = {
      ...formData,
      classificationResult,
      createdAt: new Date(),
      status: "pending",
      userId: "current_user_id", // Replace with actual user ID
    };

    // Add image details if available
    if (imageUploadResult) {
      wasteDoc.imageUrl = imageUploadResult.imageUrl;
      wasteDoc.imageName = imageUploadResult.imageName;
    }

    return withCollection("wasteMaterial", async (collection) => {
      const result = await collection.insertOne(wasteDoc);
      return { success: true, insertedId: result.insertedId.toString() };
    });
  } catch (error) {
    console.error("Error in uploadWasteInfo:", error);
    throw error;
  }
}

export async function getMockTenders() {
  return withCollection("marketplaceWasteData", async (mockTenderCollection) => {
    const result = await mockTenderCollection.find({}).toArray();
    return JSON.parse(JSON.stringify(result));
  });
}