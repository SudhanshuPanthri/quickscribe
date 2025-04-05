"use server";

import { getDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const sql = await getDb();
    const result =
      await sql`DELETE FROM pdf_summaries WHERE id=${summaryId} AND user_id=${userId} RETURNING id`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
      };
    }
    return { success: false };
  } catch (err: any) {
    console.error(err);
    return { success: false };
  }
}
