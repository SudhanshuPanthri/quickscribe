import {
  BrainCircuitIcon,
  FileOutputIcon,
  FileText,
  MoveRight,
} from "lucide-react";
import React from "react";

type Steps = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

const steps: Steps[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuitIcon size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Our advanced AI processes and analyze the document instantly",
  },
  {
    icon: <FileOutputIcon size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Recieve a clear, concise summary of your document",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hiddden blur-3xl sm:-top-30"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any pdf into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <div className="relative flex items-stretch" key={index}>
              <StepItem {...step} />
              {index < steps.length - 1 && (
                <div className="hidden absolute md:block top-1/2 -right-4 transform -translate-y-1/2 z-10 ">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function StepItem({ icon, label, description }: Steps) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backddrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rouned-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
