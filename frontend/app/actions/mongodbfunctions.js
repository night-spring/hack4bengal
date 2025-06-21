"use server"
import { MongoClient } from "mongodb";
import { mongoClientCS } from "../../lib/mongodbconnector";
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';


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
        if (!db) {
            throw new Error('Database connection failed');
        }
        const collection = db.collection(collectionName);
        if (!collection) {
            throw new Error(`Collection ${collectionName} not found`);
        }
        return await fn(collection);
    } catch (error) {
        console.error(`Database operation failed for ${collectionName}:`, error);
        throw error;
    }
};



export async function uploadWasteInfo(wasteInfo) {
    return withCollection("wasteMaterial", async (wasteMaterialCollection) => {
        await wasteMaterialCollection.insertOne({ ...wasteInfo })
    });
}




const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseClient = createClient(supabaseUrl, supabaseKey)


// lib/uploadWasteImage.ts

export async function uploadWasteImage({ imageFile }) {
    const imageName = uuidv4(); // Generate unique name
    const filePath = `wasteMaterialImage/${imageName}`;

    const { data, error } = await supabaseClient
        .storage
        .from('waste-bucket')
        .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: imageFile.type,
        });

    if (error) {
        throw new Error('Image upload failed: ' + error.message);
    }

    // Get public URL
    const { data: publicUrlData } = supabaseClient
        .storage
        .from('waste-bucket')
        .getPublicUrl(filePath);

    return JSON.parse(JSON.stringify({
        imageName,
        imageUrl: publicUrlData.publicUrl,
    }));
}
