import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const languages = {
  English: "en",
  Hindi: "hi",
  Bengali: "bn",
  Telugu: "te",
  Marathi: "mr",
  Tamil: "ta",
  Gujarati: "gu",
  Urdu: "ur",
  Kannada: "kn",
  Malayalam: "ml",
  Odia: "or",
  Punjabi: "pa",
  Assamese: "as",
  Sanskrit: "sa",
  Nepali: "ne",
};

export const translate = async (req, res) => {
  const { fromLanguage = "English", toLanguage, text } = req.body;

  const source_language = languages[fromLanguage];
  const target_language = languages[toLanguage];

  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", source_language);
  encodedParams.set("target_language", target_language);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "x-rapidapi-key": process.env.TRANSLATE_KEY,
      "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    // Send back the translated text
    res.json({ status: "success", data: response.data.data.translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      error: "Translation failed",
      details: error.message,
    });
  }
};
