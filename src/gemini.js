require("dotenv").config();

const { GoogleGenAI } =
  require("@google/genai");

const ai =
  new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY
  });

async function askGemini(prompt) {

  try {

    const response =
      await ai.models.generateContent({
        model:
          "gemini-3.1-flash-lite",
        contents: prompt
      });

    const text =
      response.text?.trim();

    if (!text) {
      throw new Error(
        "Gemini returned empty response"
      );
    }

    return text;

  } catch (error) {

    console.error(
      "Gemini Error:",
      error.message
    );

    throw error;

  }

}

module.exports = {
  askGemini
};