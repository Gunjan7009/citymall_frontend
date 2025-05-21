// src/services/geminiService.js
import { GEMINI_API_URL_FLASH } from "../utils/constants";

export const callGeminiAPI = async (prompt) => {
  let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };

  try {
    const response = await fetch(GEMINI_API_URL_FLASH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", response.status, errorBody);
      throw new Error(
        `API request failed with status ${response.status}: ${errorBody}`
      );
    }
    const result = await response.json();
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.warn(
        "Gemini API response structure unexpected or content missing:",
        result
      );
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
