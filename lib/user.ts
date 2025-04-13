import { pricingPlans } from "@/utils/constants";
import { getDb } from "./db";
import { getUserUploadCount } from "./summaries";
import { currentUser } from "@clerk/nextjs/server";

export async function getPriceId(email: string) {
  const sql = await getDb();
  const plan =
    await sql`SELECT price_Id FROM users WHERE email=${email} AND status='active'`;
  return plan?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const user = await currentUser();
  const priceId = await getPriceId(user?.emailAddresses[0].emailAddress || "");
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const isBasic =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "basic";
  const isFree =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "free";
  let noPlan = false;
  let uploadLimit: number = 0;
  if (isPro) {
    uploadLimit = 200;
  } else if (isBasic) {
    uploadLimit = 20;
  } else if (isFree) {
    uploadLimit = 3;
  } else {
    uploadLimit = 0;
    noPlan = true;
  }

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit, noPlan };
}
