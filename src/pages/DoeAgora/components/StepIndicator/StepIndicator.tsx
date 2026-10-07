import { Fragment } from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, labels }: StepIndicatorProps) {
  const gridTemplateColumns = labels
    .flatMap((_, index) =>
      index === labels.length - 1 ? ["auto"] : ["auto", "1fr"],
    )
    .join(" ");

  const renderStep = (label: string, index: number) => {
    const stepNum = index + 1;
    const isActive = stepNum === currentStep;
    const isCompleted = stepNum < currentStep;

    return (
      <div key={label} className="flex min-w-19 flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
            isActive
              ? "bg-[#a9171a] text-white ring-4 ring-[#f1d5d5]"
              : isCompleted
                ? "bg-[#dfc288] text-white"
                : "border border-[#E2E5EA] bg-[#F6F6F6] text-[#9fa7b3]"
          }`}
        >
          {isCompleted ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            stepNum
          )}
        </div>
        <span
          className={`mt-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.14em] ${
            isActive
              ? "text-[#a9171a]"
              : isCompleted
                ? "text-[#c9a96e]"
                : "text-[#c8cbd1]"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div
      className="my-4 grid w-full items-start"
      style={{ gridTemplateColumns }}
    >
      {labels.map((label, index) => (
        <Fragment key={label}>
          {renderStep(label, index)}
          {index < labels.length - 1 && (
            <div
              className={`mx-auto mt-4 h-px w-12 rounded-full transition-all sm:w-17 ${
                currentStep > index + 1 ? "bg-[#c9a96e]" : "bg-[#DEE3EA]"
              }`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
