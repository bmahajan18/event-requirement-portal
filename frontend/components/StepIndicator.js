import { CheckIcon } from './Icons';

export default function StepIndicator({ currentStep, category, onSelectStep, maxStepReached }) {
  const getStep2Title = () => {
    if (category === 'planner') return 'Scope & Guests';
    if (category === 'performer') return 'Acts & Duration';
    if (category === 'crew') return 'Roles & Shifts';
    return 'Category Details';
  };

  const getStep3Title = () => {
    if (category === 'planner') return 'Deliverables & Budget';
    if (category === 'performer') return 'Tech Rider & Budget';
    if (category === 'crew') return 'Skills & Compensation';
    return 'Logistics & Budget';
  };

  const steps = [
    { number: 1, label: 'Event Basics' },
    { number: 2, label: getStep2Title() },
    { number: 3, label: getStep3Title() },
    { number: 4, label: 'Review & Submit' }
  ];

  return (
    <div className="stepper-container" id="step-indicator-wrapper">
      <div className="stepper-nav">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isAccessible = step.number <= maxStepReached;

          return (
            <div key={step.number} style={{ display: 'contents' }}>
              <button
                type="button"
                id={`step-nav-btn-${step.number}`}
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isAccessible && onSelectStep(step.number)}
                disabled={!isAccessible}
              >
                <div className="step-circle">
                  {isCompleted ? <CheckIcon size={16} /> : step.number}
                </div>
                <div className="step-meta">
                  <span className="step-num">Step 0{step.number}</span>
                  <span className="step-title">{step.label}</span>
                </div>
              </button>

              {index < steps.length - 1 && (
                <div className={`step-connector ${currentStep > step.number ? 'filled' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
