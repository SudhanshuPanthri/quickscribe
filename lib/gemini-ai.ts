import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generatePDFSummaryfromGemini=async (pdfText:string)=>{
    try{
        const prompt=`${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`;

        const response=genAI.models.generateContent({
            model:'gemini-2.0-flash',
            contents:prompt
        });

        return (await response).text;

    }
    catch(err:any){
        if(err?.status===429){
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        console.error('Gemini API Error: ',err);
        throw err;
    }
}