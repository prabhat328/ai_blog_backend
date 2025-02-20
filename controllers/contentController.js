import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_KEY; // Using the correct key

if (!geminiApiKey) {
  throw new Error("GOOGLE_KEY is not defined in environment variables");
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Function to generate AI content based on a prompt
 * @param {string} prompt - The prompt to send to AI
 * @returns {Promise<Object>} - Parsed JSON response
 */
const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Attempt to parse the AI response into JSON format
    return text;
  } catch (error) {
    console.error("Error generating content:", error.message);
    throw new Error("Failed to generate AI content");
  }
};

/**
 * Function to generate a structured blog prompt
 * @param {string} topic - The blog topic
 * @returns {string} - Formatted prompt for Gemini AI
 */
const AIprompt = (topic) => {
  return `
    Write a **detailed, informative, and engaging** blog post on the topic: **"${topic}"**.  
    The blog should be **original**, well-structured, and **free from plagiarism**.  
  
    ### **Response Format:**  
    The response **must be in Markdown format** and should follow this structure:  
  
    \`\`\`markdown
    # Blog Title
  
    ## Introduction  
    Brief introduction about the topic.
  
    ## Subheading 1  
    Detailed explanation about this section.
  
    ## Subheading 2  
    More in-depth content on the topic.
  
    ## Conclusion  
    Wrap-up and key takeaways.
    \`\`\`
  
    **Rules:**  
    - The response should be **fully formatted in Markdown**.  
    - Use **proper headings**, subheadings, and paragraphs.  
    - Ensure content is **engaging and informative**.  
    - Return **only the Markdown content**, without extra text.  
    `;
};

/**
 * Controller to get AI-generated content
 */
export const getContent = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const prompt = AIprompt(topic);
    const content = await generateContent(prompt);

    return res.status(200).json(content); // Directly return parsed JSON
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Function to modify existing AI-generated content
 * (Currently a placeholder, update logic as needed)
 */
const Modifyprompt = (content) => {
  return `
  Improve and refine the following content while maintaining clarity:
  ${JSON.stringify(content, null, 2)}
  
  Ensure the output follows the original JSON format.
  `;
};

/**
 * Controller to modify AI-generated content
 */
export const modifyContent = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const prompt = Modifyprompt(content);
    const updatedContent = await generateContent(prompt);

    return res.status(200).json(updatedContent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
