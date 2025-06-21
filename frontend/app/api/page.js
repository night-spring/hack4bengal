"use server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        contents: `You are an expert agricultural waste classification assistant. 

Below is a raw listing submitted by a farmer describing agricultural waste. Your task is to:

Identify the specific waste type (one of: stubble, straw/stalk, bagasse, bran).
Assess the quality based on moisture, age, and description (e.g., dry, fresh, wet, contaminated).
Suggest the most suitable uses or applications for this waste type and quality.
Correct or clarify any ambiguous information in the description.
Provide a concise, structured summary.

---

Raw Listing:
Crop Type: {crop_type}
Waste Description: {waste_description}
Quantity: {quantity}
Moisture Level: {moisture_level}
Age of Waste: {age}

---

Please output the refined listing in this JSON format:

{
  "waste_type": "...",
  "quality": "...",
  "notes": "..."
}

Example:

Raw Listing:
Crop Type: Rice
Waste Description: Dry leftover stalks after harvesting rice.
Quantity: 200 kg
Moisture Level: Low
Age of Waste: 2 weeks


Output:
{
  "waste_type": "straw/stalk",
  "quality": "dry, 2 weeks old",
  }

Raw Listing:
Crop Type: Sugarcane
Waste Description:Fibrous leftover after juice extraction, moist and fresh. Collected from local mill.
Quantity: 500 kg
Moisture Level: high
Age of Waste: 2 weeks


Output:
{
  "waste_type": "bagasse",
  "quality": "fresh, high moisture"
}`
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ result: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}
