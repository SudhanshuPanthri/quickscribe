"use server";

import { getDb } from "@/lib/db";
import { generatePDFSummaryfromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPDF } from "@/lib/langchain";
import { generateSummaryfromOpenAI } from "@/lib/open-ai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type generatePDFSummaryProps = {
  serverData: {
    userId: string;
    file: {
      ufsUrl: string;
      name: string;
    };
  };
};

type savePDFSummaryProps = {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
};

export async function generatePDFSummary(
  uploadResponse: generatePDFSummaryProps
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl, name },
    },
  } = uploadResponse;
  if (!ufsUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPDF(ufsUrl);
    let summary;
    try {
      summary = await generateSummaryfromOpenAI(pdfText);
      console.log(summary);
    } catch (err: any) {
      console.log(err);
      if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generatePDFSummaryfromGemini(pdfText);
          console.log(summary);
        } catch (geminiError) {
          console.error(
            "GEMINI API Failed after OPENAI quota exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(name);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}

async function savePDFSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: savePDFSummaryProps) {
  try {
    const sql = await getDb();
    const [savedSummary] = await sql`INSERT INTO pdf_summaries (
                    user_id,
                    original_file_url,
                    summary_text,
                    title,
                    file_name
                    ) 
                    VALUES (
                    ${userId},${fileUrl},${summary},${title},${fileName}
                    ) RETURNING id,summary_text`;
    return savedSummary;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function storePDFSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: savePDFSummaryProps) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    savedSummary = await savePDFSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Something Happened, Please try again",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error saving PDF",
    };
  }

  revalidatePath("/summaries/${savedSummary.id}");

  return {
    success: true,
    message: "PDF Summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
