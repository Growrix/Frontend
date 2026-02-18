
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSolarAdvice = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are Helios, a friendly and expert solar energy consultant. Help homeowners understand solar benefits, costs, and installation processes. Keep responses concise and formatted with markdown. Focus on ROI and environmental impact.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my solar knowledge base. Please try again in a moment.";
  }
};

export const analyzeSavings = async (bill: number, location: string, context: 'solar' | 'battery' = 'solar') => {
  try {
    const prompt = context === 'battery'
      ? `Analyze the financial and resilience benefits of adding battery storage for a home in ${location} with a $${bill}/mo electric bill. Discuss peak rate shaving (Time-of-Use arbitrage), grid stability/backup value, and estimated ROI. Keep the tone professional, concise, and encouraging.`
      : `Calculate estimated solar savings for a house in ${location} with a monthly electric bill of $${bill}. Provide 25-year estimated savings, break-even point in years, and environmental impact (CO2 saved). Return the response in a conversational but professional tone.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Analysis Error:", error);
    return null;
  }
};
