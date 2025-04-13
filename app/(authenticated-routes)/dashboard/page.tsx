import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import EmptySummary from "@/components/summaries/empty-summary";
import { hasReachedUploadLimit } from "@/lib/user";

const Dashboard = async () => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  const { hasReachedLimit, uploadLimit, noPlan } = await hasReachedUploadLimit(
    userId
  );
  const summaries = await getSummaries(userId);

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2 lg:gap-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600 text-base lg:text-lg">
                Transorm your PDFs into concise, actionable insights
              </p>
            </div>
            {!hasReachedLimit && (
              <Button
                variant={"link"}
                className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 ease-in-out group hover:no-underline"
              >
                <Link href="/upload" className="flex text-white items-center">
                  <Plus className="w-5 h-5 mr-2" /> New Summary
                </Link>
              </Button>
            )}
          </div>
          {hasReachedLimit && !noPlan && (
            <div className="mb-6">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                <p className="text-sm lg:text-base flex gap-2">
                  {`You've reached the limit of ${uploadLimit} uploads on the Specific Plan`}
                  <Link
                    href="/#pricing"
                    className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                  >
                    Click here to upgrade to pro plan{" "}
                    <ArrowRight className="h-4 w-4 inline-block" />
                  </Link>
                  for unlimited uploads
                </p>
              </div>
            </div>
          )}
          {noPlan && (
            <div className="mb-6">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                <p className="text-sm lg:text-base flex gap-2">
                  {`You currently have no plan, switch to free for a trial upload`}
                  <Link
                    href="/#pricing"
                    className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center"
                  >
                    Click here to buy a plan{" "}
                    <ArrowRight className="h-4 w-4 inline-block" />
                  </Link>
                  to get started
                </p>
              </div>
            </div>
          )}
          {summaries.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:px-0">
              {summaries.map((summary, index) => (
                <SummaryCard summary={summary} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
