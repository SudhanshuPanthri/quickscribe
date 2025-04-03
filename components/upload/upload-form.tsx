"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import {
  generatePDFSummary,
  storePDFSummaryAction,
} from "@/actions/upload-action";
import { redirect, useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload Complete");
    },
    onUploadError: (err: any) => {
      toast.error("Error : ", err.message);
    },
    onUploadBegin: ({ file }) => {
      console.log("Uplading Initialized...", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File"
        );
        setIsLoading(false);
        return;
      }

      toast.info("Uploading PDF! We are uploading your PDF to our server!");

      const resp = await startUpload([file]);
      console.log("Upload response: ", resp);
      if (!resp) {
        toast.error("Something went wrong, please use an different file.");
        setIsLoading(false);
        return;
      }

      toast.info(
        "Processing PDF, Hang tight! Our AI is reading through your document."
      );

      //method to summarize the uploaded PDF
      const result = await generatePDFSummary(resp);
      const { data = null, message = null } = result || {};
      if (data) {
        let storeResult: any;
        toast.info("Saving PDF, Hang tight! We are saving your summary");
        if (data.summary) {
          await storePDFSummaryAction({
            fileUrl: resp[0].serverData.file.ufsUrl,
            summary: data.summary,
            title: data.title,
            fileName: file.name,
          });

          toast.success("PDF Summary generated successfully!");
        }
        formRef.current?.reset();
        // router.push(`/summaries/${storeResult.data.id}`);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log("ERROR OCCURED");
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
