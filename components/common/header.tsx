import React from "react";
import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "../header/plan-badge";
import { currentUser } from "@clerk/nextjs/server";
import { getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";

const Header = async () => {
  const user = await currentUser();

  let planName = "";
  let priceId = "";

  if (user?.emailAddresses[0]?.emailAddress) {
    const email = user.emailAddresses[0].emailAddress;
    priceId = await getPriceId(email);

    const plan = pricingPlans.find((plan) => plan.priceId === priceId);
    if (plan) {
      planName = plan.name;
    } else {
      planName = "Buy a Plan";
    }
  }

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
            <PlanBadge planName={planName} priceId={priceId} />
            <UserButton />
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
