import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
export const searchTopic = async (req, res) => {
  const serpApiKey = process.env.SERPAPI_KEY;
  const url = `https://serpapi.com/search?engine=google_trends_trending_now&geo=IN&api_key=${serpApiKey}`;

  try {
    const response = await axios.get(url);
    const trendingSearches = response.data.trending_searches;

    const formattedSearches = trendingSearches.slice(0, 20).map((search) => ({
      name: search.query,
      volume: search.search_volume,
    }));

    res.status(200).json({
      status: "success",
      data: formattedSearches,
    });
  } catch (error) {
    console.error("Error fetching trending topics in India:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch trending topics" });
  }
};
