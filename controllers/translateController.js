import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


export const translate = async (req, res) => {
  const { source_language, target_language, text } = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', source_language);
  encodedParams.set('target_language', target_language);
  encodedParams.set('text', text);

  const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'x-rapidapi-key': process.env.TRANSLATE_KEY,
      'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    // Send back the translated text
    res.json({ translatedText: response.data.data.translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Translation failed', details: error.message });
  }
};


