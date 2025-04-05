import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptySummary = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600">
          No Summaries yet
        </h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get started with AI-Powered summaries.
        </p>
        <Link href="/upload">
          <Button
            variant={"link"}
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-roes-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Create your first summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptySummary;
