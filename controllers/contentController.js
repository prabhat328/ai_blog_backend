import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_KEY;

const AIprompt = (topic) => {
  return `
    Write a comprehensive and original blog post on the following topic: "${topic}". 
    The blog should be well-structured, informative, and provide unique insights. 
    Ensure the content is not detectable as plagiarized by any detection tools. 
    Use engaging language that resonates with the target audience, while maintaining 
    clarity and accuracy on the subject matter. 
    The blog should include:
    - A catchy title
    - An introduction
    - Main content with subheadings
    - A conclusion
  `;
};

if (!geminiApiKey) {
  console.log("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log("Error generating content:", error.message);
    console.log("Failed to generate AI content");
  }
};

// Controller function
export const getContent = async (req, res) => {
  try {
    const prompt = AIprompt(req.body.topic);
    console.log(prompt);
    
    const content = await generateContent(prompt);

    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
