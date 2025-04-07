"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type DownloadSummaryButtonProps = {
  fileName: string;
  originalFileUrl?: string;
  title: string;
  summaryText: string;
  createdAt: string;
};

const DownloadSummaryButton = ({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: DownloadSummaryButtonProps) => {
  const handleDownload = () => {
    const summaryContent = `# ${title}
Generated Summary
Generated on: ${new Date(createdAt).toLocaleDateString()}

${summaryText}

Original File: ${fileName}
Generated By Summarize
    `;

    const blob = new Blob([summaryContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName.replace(/\.[^/.]+$/, "")}_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      size={"sm"}
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
};

export default DownloadSummaryButton;
