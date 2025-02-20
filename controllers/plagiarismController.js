const axios = require('axios');
const winston = require('winston');
require('dotenv').config();  // Load environment variables

// Setup Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'plagiarism-check.log' })
    ]
});

// Get the plagiarism API URL from environment variables
const plagiarismApiUrl = process.env.WINSTON_KEY;

if (!plagiarismApiUrl) {
    throw new Error('PLAGIARISM_API_URL is not defined in environment variables');
}

// Plagiarism check controller
const checkPlagiarism = async (req, res) => {
    const { textToCheck } = req.body;

    if (!textToCheck) {
        logger.error('No text provided for plagiarism check');
        return res.status(400).json({ message: 'Text to check is required' });
    }

    try {
        // Call the plagiarism API
        const apiResponse = await axios.post(plagiarismApiUrl, {
            text: textToCheck
        });

        // Log success with Winston
        logger.info('Plagiarism check performed successfully', {
            text: textToCheck,
            result: apiResponse.data
        });

        // Return the API response
        return res.status(200).json(apiResponse.data);
    } catch (error) {
        // Log error with Winston
        logger.error('Error occurred during plagiarism check', {
            message: error.message,
            stack: error.stack
        });

        // Return error to client
        return res.status(500).json({ message: 'Error performing plagiarism check' });
    }
};

module.exports = {
    checkPlagiarism
};
