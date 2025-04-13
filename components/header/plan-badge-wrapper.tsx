import { currentUser } from "@clerk/nextjs/server";
import { getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import PlanBadge from "./plan-badge";

const PlanBadgeWrapper = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return <PlanBadge planName="Free" />;
  }

  const email = user.emailAddresses[0]?.emailAddress || null;
  let planName = "Buy a Plan";

  if (email) {
    const priceId = await getPriceId(email);
    const plan = pricingPlans.find((plan) => plan.priceId === priceId);
    if (plan) {
      planName = plan.name;
    }
  }

  return <PlanBadge planName={planName} />;
};

export default PlanBadgeWrapper;
