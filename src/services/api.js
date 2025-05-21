import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors here
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const memeApi = {
  getAllMemes: () =>
    api.get("/memes").then((memes) => {
      // At this point, memes is already the data due to the response interceptor
      return memes.map((meme) => ({
        ...meme,
        tags: Array.isArray(meme.tags) ? meme.tags : [],
        // Map backend field names to frontend names
        imageUrl: meme.image_url,
        highestBid: meme.current_highest_bid,
        highestBidder: meme.highest_bidder_id,
        aiCaption: meme.ai_caption || "Generating AI caption...",
        aiVibe: meme.ai_vibe || "Analyzing meme vibes...",
      }));
    }),
  getMemeById: (id) => api.get(`/memes/${id}`),
  createMeme: (memeData) =>
    api
      .post("/memes", {
        title: memeData.title,
        image_url: memeData.imageUrl,
        tags: Array.isArray(memeData.tags)
          ? memeData.tags
          : typeof memeData.tags === "string"
          ? memeData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      })
      .then((meme) => ({
        ...meme,
        imageUrl: meme.image_url,
        highestBid: meme.current_highest_bid,
        highestBidder: meme.highest_bidder_id,
        aiCaption: meme.ai_caption || "Generating AI caption...",
        aiVibe: meme.ai_vibe || "Analyzing meme vibes...",
      })),
  updateMeme: (id, memeData) => api.put(`/memes/${id}`, memeData),
  deleteMeme: (id) => api.delete(`/memes/${id}`),
};

export default api;
