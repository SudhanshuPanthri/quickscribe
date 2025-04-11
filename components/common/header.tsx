import React from "react";
import { Crown, FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Summarize
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center ">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;

const PlanBadge = async () => {
  const user = await currentUser();
  if (!user?.id) {
    return null;
  }

  const email = user?.emailAddresses[0]?.emailAddress;
  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceId(email);
  }

  let planName = "Buy a plan";
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
    console.log(planName);
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center cursor-pointer",
        !priceId && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "h-3 w-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
};
