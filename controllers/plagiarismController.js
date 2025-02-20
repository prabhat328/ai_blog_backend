import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Get API details from environment variables
const plagiarismApiUrl = "https://api.gowinston.ai";
const gowinstonApiKey = process.env.WINSTON_KEY;

export const checkPlagiarism = async (req, res) => {
  if (!plagiarismApiUrl || !gowinstonApiKey) {
    console.log("Key or URL not found");
    return res.status(500).json({ status: "error", message: "Server Error" });
  }
  const { textToCheck } = req.body;

  if (!textToCheck) {
    return res
      .status(400)
      .json({ status: "error", message: "Text to check is required" });
  }

  try {
    // Prepare request payload
    const requestBody = {
      text: textToCheck,
    };

    // Make the request to GoWinston AI Plagiarism API
    const apiResponse = await axios.post(
      `${plagiarismApiUrl}/v2/plagiarism`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${gowinstonApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the API response
    return res.status(200).json({ status: "success", data: apiResponse.data });
    // return res.status(200).json({ score: 100 - apiResponse.data.result.score });
  } catch (error) {
    console.error(
      "Error checking plagiarism:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      status: "error",
      message: "Error performing plagiarism check",
      error: error.response?.data || error.message,
    });
  }
};
