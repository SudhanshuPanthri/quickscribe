"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const PlanBadge = ({ planName }: { planName: string }) => {
  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        planName === "Buy a Plan" && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "h-3 w-3 mr-1 text-amber-600",
          planName === "Buy a Plan" && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
};

export default PlanBadge;
