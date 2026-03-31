const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini SDK
// It automatically picks up GEMINI_API_KEY from environment variables by default,
// or you can pass it explicitly.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generate a smart food suggestion based on contextual data using Gemini
 */
async function generateFoodSuggestion(context) {
    if (!process.env.GEMINI_API_KEY) {
        return { 
            mealName: "Mock Marathon Pasta", 
            reasoning: "No API key provided. This is a mock response.",
            calories: 600,
            macronutrients: { carbs: "80g", protein: "20g", fat: "10g" }
        };
    }
    
    const prompt = `You are an expert nutritionist AI. Based on the following user context: ${JSON.stringify(context)}, suggest a single "Food of the Day" meal. Return ONLY a valid JSON object with the following keys: mealName (string), reasoning (string, explaining why it fits their context), calories (number), and macronutrients (object with carbs, protein, fat).`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini API Error (Food):", error);
        throw error;
    }
}

/**
 * Generate a fun, bite-sized exercise
 */
async function generateExerciseSuggestion(context) {
    if (!process.env.GEMINI_API_KEY) {
        return { 
            exerciseName: "Mock Desk Stretches", 
            description: "Stretch your arms and back for 5 minutes to release tension.",
            durationMinutes: 5
        };
    }

    const prompt = `You are a lively health assistant. The user has been sedentary for 8 hours. Suggest a fun, bite-sized exercise or stretch to do right now. Return ONLY a valid JSON object with: exerciseName (string), description (string), durationMinutes (number).`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Gemini API Error (Exercise):", error);
        throw error;
    }
}

/**
 * Generate a health analysis paragraph
 */
async function generateHealthAnalysis(data) {
    if (!process.env.GEMINI_API_KEY) {
        return "Mock analysis: You are maintaining a great streak. Keep preparing for your upcoming events!";
    }

    const prompt = `Analyze this user health data and their upcoming events. Provide a 2-3 sentence summarizing insight encouraging them. Data: ${JSON.stringify(data)}`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error (Analysis):", error);
        throw error;
    }
}

module.exports = {
    generateFoodSuggestion,
    generateExerciseSuggestion,
    generateHealthAnalysis
};
