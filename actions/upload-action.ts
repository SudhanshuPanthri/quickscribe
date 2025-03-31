'use server';

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
        }

        if(!summary){
            return{
                success:false,
                message:"Failed to generate summary",
                data:null
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