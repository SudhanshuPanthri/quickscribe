import { pricingPlans } from "@/utils/constants";
import { getDb } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getPriceId(email: string) {
  const sql = await getDb();

  const plan =
    await sql`SELECT price_Id FROM users WHERE email=${email} AND status='active'`;
  console.log(plan);
  return plan?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceId(userId);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const isBasic =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "basic";
  let uploadLimit: number = 0;
  if (isPro) {
    uploadLimit = 200;
  } else if (isBasic) {
    uploadLimit = 20;
  } else {
    uploadLimit = 3;
  }

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}
