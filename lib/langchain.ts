import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPDF(url:string){
    console.log("Mera console log",url);
    const response=await fetch(url);
    const blob=await response.blob();
    const arrayBuffer=await blob.arrayBuffer();

    const loader=new PDFLoader(new Blob([arrayBuffer]));
    const docs=await loader.load();
    //combine all pages
    return docs.map((doc)=>doc.pageContent).join('\n');
}