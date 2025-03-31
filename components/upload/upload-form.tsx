'use client';

import React,{useRef} from 'react'
import UploadFormInput from './upload-form-input'
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadThing';
import { toast } from "sonner"
import generatePDFSummary from '@/actions/upload-action';


const schema=z.object({
    file:z.instanceof(File,{message:"Invalid File"}).refine((file)=>file.size<=20*1024*1024,"File size must be less than 20MB").refine((file)=>file.type.startsWith('application/pdf'),"File must be a PDF")
})

const UploadForm = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const {startUpload,routeConfig}=useUploadThing('pdfUploader',{
        onClientUploadComplete:()=>{
            console.log("Upload Complete");
        },
        onUploadError:(err:any)=>{
            toast.error("Error : ",err.message);
        },
        onUploadBegin:({file})=>{
            console.log("Uplading Initialized...",file);
        }
    })

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;
        const validatedFields=schema.safeParse({file});

        if(!validatedFields.success){
            toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File');
            return;
        }

        toast.info("Uploading PDF! We are uploading your PDF to our server!");
        
        const resp=await startUpload([file]);
        console.log("Upload response: ", resp);
        if(!resp){
            toast.error("Something went wrong, please use an different file.")
            return;
        }
        
        toast.info("Processing PDF, Hang tight! Our AI is reading through your document.");

        //method to summarize the uploaded PDF
        const summary=await generatePDFSummary(resp);

        if (formRef.current) {
            formRef.current.reset();
        }
    }

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
        <UploadFormInput onSubmit={handleSubmit}/>
    </div>
  )
}

export default UploadForm