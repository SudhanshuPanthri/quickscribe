'use server';

import { generatePDFSummaryfromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPDF } from "@/lib/langchain";
import { generateSummaryfromOpenAI } from "@/lib/open-ai";

type generatePDFSummaryProps={
    serverData:{
        userId:string
        file:{
            ufsUrl:string,
            name:string
        }
    }
}

export default async function generatePDFSummary(uploadResponse:[generatePDFSummaryProps]){
    if(!uploadResponse){
        return{
            success:false,
            message:"File upload failed",
            data:null
        }
    }

    const {serverData:{userId,file:{ufsUrl,name}}}=uploadResponse[0];
    if(!ufsUrl){
        return{
            success:false,
            message:"File upload failed",
            data:null
        }
    }

    try{
        const pdfText=await fetchAndExtractPDF(ufsUrl);
        let summary;
        try{
            summary=await generateSummaryfromOpenAI(pdfText);
            console.log(summary);
        }
        catch(err:any){
            console.log(err);
            if(err instanceof Error && err.message==='RATE_LIMIT_EXCEEDED'){
                try{
                    summary=await generatePDFSummaryfromGemini(pdfText);
                    console.log(summary);
                }
                catch(geminiError){
                    console.error('GEMINI API Failed after OPENAI quota exceeded',geminiError);
                    throw new Error("Failed to generate summary with available AI providers");
                }
            }
        }

        if(!summary){
            return{
                success:false,
                message:"Failed to generate summary",
                data:null
            }
        }

        return{
            success:true,
            message:"Summary generated successfully",
            data:{
                summary,
            }
        }
    }
    catch(err){
        return{
            success:false,
            message:"File upload failed",
            data:null
        }
    }
}