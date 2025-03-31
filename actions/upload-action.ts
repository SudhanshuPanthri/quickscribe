'use server';

import { fetchAndExtractPDF } from "@/lib/langchain";

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
        return pdfText;
    }
    catch(err){
        return{
            success:false,
            message:"File upload failed",
            data:null
        }
    }
}