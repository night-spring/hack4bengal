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
  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
}

// Upload image to Supabase
export async function uploadWasteImage(imageBase64) {
  try {
    const imageName = uuidv4();
    const filePath = `wasteMaterialImage/${imageName}`;
    const blob = base64ToBlob(imageBase64);
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
    throw error;
  }
}

// Upload form data + image to MongoDB
export async function uploadWasteData({ formData, imageBase64 }) {
  try {
    const imageUploadResult = await uploadWasteImage(imageBase64);

    const wasteDoc = {
      ...formData,
      imageUrl: imageUploadResult.imageUrl,
      imageName: imageUploadResult.imageName,
      createdAt: new Date(),
    };

    return withCollection("wasteMaterial", async (collection) => {
      const result = await collection.insertOne(wasteDoc);
      return { success: true, insertedId: result.insertedId.toString() };
    });
  } catch (error) {
    console.error("Error in uploadWasteData:", error);
    throw error;
  }
}

// Upload waste info (without image)
export async function uploadWasteInfo({ classificationResult, formData, imageBase64 = null }) {
  try {
    let imageUploadResult = null;
    
    if (imageBase64) {
      imageUploadResult = await uploadWasteImage(imageBase64);
    }

    const wasteDoc = {
      ...formData,
      ...(imageUploadResult ? {
        imageUrl: imageUploadResult.imageUrl,
        imageName: imageUploadResult.imageName
      } : {}),
      classificationResult,
      createdAt: new Date(),
    };

    return withCollection("wasteMaterial", async (collection) => {
      const result = await collection.insertOne(wasteDoc);
      return { success: true, insertedId: result.insertedId.toString() };
    });
  } catch (error) {
    console.error("Error in uploadWasteInfo:", error);
    throw error;
  }
}