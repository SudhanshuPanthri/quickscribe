import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";

import {createUploadthing,type FileRouter} from "uploadthing/next";
const f=createUploadthing();

export const xfileRouter={
    pdfUploader:f({pdf:{maxFileSize:'32MB'}}).
    middleware(async ({req})=>{

        const user=await currentUser();
        if(!user){
            throw new UploadThingError("Unauthorized");
        }
        return {userId:user.id};

    }).onUploadComplete(async({metadata,file})=>{
        console.log("upload completed for user id",metadata.userId);
        console.log("FILE URL : ",file.ufsUrl);
        const sanitizedFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            key: file.key,
            ufsUrl: file.ufsUrl, // or other relevant properties
        };
        return {userId:metadata.userId,file:sanitizedFile};
    }),
} satisfies FileRouter

export type XfileRouter=typeof xfileRouter; 