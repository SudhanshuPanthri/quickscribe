import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import DownloadSummaryButton from "./download-summary-button";

type SourceInfoProps = {
  fileName: string;
  originalFileUrl?: string;
  title: string;
  summaryText: string;
  createdAt: string;
};

const SourceInfo = ({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: SourceInfoProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          asChild
        >
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" /> View Original
          </a>
        </Button>
        <DownloadSummaryButton
          fileName={fileName}
          originalFileUrl={originalFileUrl}
          title={title}
          summaryText={summaryText}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default SourceInfo;
