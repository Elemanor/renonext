'use client';

import { Check } from 'lucide-react';

interface Step {
  label: string;
  timestamp?: string;
}

interface JobTimelineStepperProps {
  steps: Step[];
  currentStep: number;
}

export function JobTimelineStepper({ steps, currentStep }: JobTimelineStepperProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center justify-between min-w-[600px]">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-600 text-white shadow-md shadow-green-200'
                    : index === currentStep
                    ? 'bg-reno-green-dark text-white ring-4 ring-reno-green-light shadow-md shadow-reno-green-light'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-center text-xs font-medium leading-tight max-w-[80px] ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
              {step.timestamp && index <= currentStep && (
                <span className="mt-0.5 text-[10px] text-gray-400">
                  {new Date(step.timestamp).toLocaleDateString('en-CA', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="mx-1 h-0.5 flex-1">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
