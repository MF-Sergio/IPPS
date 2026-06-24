interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 my-4 w-full max-w-xs mx-auto">
      {labels.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#a9171a] text-white ring-4 ring-[#a9171a]/20"
                    : isCompleted
                    ? "bg-[#c9a96e] text-white"
                    : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                }`}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[9px] mt-1 font-semibold uppercase tracking-wider whitespace-nowrap ${
                  isActive ? "text-[#a9171a]" : isCompleted ? "text-[#c9a96e]" : "text-gray-300"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {index < labels.length - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-12 mb-4 mx-1 rounded-full transition-all ${
                  stepNum < currentStep ? "bg-[#c9a96e]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}