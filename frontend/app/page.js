'use client';

import { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import Step1Basics from '../components/Step1Basics';
import Step2CategoryFields from '../components/Step2CategoryFields';
import Step3CategoryFields from '../components/Step3CategoryFields';
import Step4ReviewSubmit from '../components/Step4ReviewSubmit';
import SuccessView from '../components/SuccessView';
import RequirementsDrawer from '../components/RequirementsDrawer';
import { ArrowLeftIcon, ArrowRightIcon, DatabaseIcon } from '../components/Icons';

const INITIAL_FORM_STATE = {
  eventName: '',
  eventType: '',
  dateMode: 'single',
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  category: 'planner',
  plannerDetails: {
    scope: 'full',
    estimatedGuests: 120,
    themeStyle: 'Modern Luxury',
    budgetRange: '$5,000 - $12,000',
    deliverables: ['Vendor Sourcing & Contracts', 'Master Run-of-Show Timeline'],
    additionalNotes: ''
  },
  performerDetails: {
    performerType: 'Live Band & Ensemble',
    performanceDurationHours: 2,
    genres: ['Jazz & Soul', 'Pop'],
    soundEquipment: 'venue_provided',
    stageDetails: '20x16 ft elevated stage',
    techRiderRequirements: '3 vocal mics, 2 DI boxes, stereo monitors',
    budgetRange: '$1,500 - $4,000',
    specialRequests: ''
  },
  crewDetails: {
    roles: [
      { roleName: 'Lead Sound Engineer', count: 1, callTime: '08:00 AM', shiftHours: 8 },
      { roleName: 'Lighting Programmer', count: 1, callTime: '09:00 AM', shiftHours: 8 }
    ],
    requiredCertifications: ['OSHA-10 / 30 Safety'],
    equipmentHandling: ['Digital Consoles (DiGiCo / Yamaha / Behringer)'],
    dressCode: 'all_black',
    payRateType: 'hourly',
    budgetPerCrew: 60,
    additionalNotes: ''
  }
};

export default function RequirementPostingPage() {
  const [step, setStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedRequirement, setSubmittedRequirement] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.eventName.trim()) {
        newErrors.eventName = 'Event name is required';
      }
      if (!formData.eventType) {
        newErrors.eventType = 'Please select an event type';
      }
      if (!formData.startDate) {
        newErrors.startDate = 'Event date is required';
      }
      if (formData.dateMode === 'range' && !formData.endDate) {
        newErrors.endDate = 'End date is required for date ranges';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Event city/location is required';
      }
      if (!formData.category) {
        newErrors.category = 'Please choose a talent category';
      }
    }

    if (currentStep === 2) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails.scope) {
          newErrors['plannerDetails.scope'] = 'Please select a planning scope';
        }
        if (!formData.plannerDetails.budgetRange) {
          newErrors['plannerDetails.budgetRange'] = 'Please select a budget range';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails.performerType) {
          newErrors['performerDetails.performerType'] = 'Please select a performer format';
        }
        if (!formData.performerDetails.budgetRange) {
          newErrors['performerDetails.budgetRange'] = 'Please select a budget range';
        }
      } else if (formData.category === 'crew') {
        if (!formData.crewDetails.roles || formData.crewDetails.roles.length === 0) {
          newErrors['crewDetails.roles'] = 'Please add at least one crew role position';
        }
      }
    }

    if (currentStep === 3) {
      if (formData.category === 'crew') {
        if (
          formData.crewDetails.budgetPerCrew === undefined ||
          formData.crewDetails.budgetPerCrew === null ||
          formData.crewDetails.budgetPerCrew === '' ||
          Number(formData.crewDetails.budgetPerCrew) <= 0
        ) {
          newErrors['crewDetails.budgetPerCrew'] = 'Please specify a valid compensation amount';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(step)) {
      const nextStep = step + 1;
      setStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToStep = (targetStep) => {
    if (targetStep < step || validateStep(step)) {
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setSubmitError('Please complete all required fields across the steps.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      dateMode: formData.dateMode,
      startDate: formData.startDate,
      endDate: formData.dateMode === 'range' ? formData.endDate : undefined,
      location: formData.location,
      venue: formData.venue,
      category: formData.category
    };

    if (formData.category === 'planner') {
      payload.plannerDetails = formData.plannerDetails;
    } else if (formData.category === 'performer') {
      payload.performerDetails = formData.performerDetails;
    } else if (formData.category === 'crew') {
      payload.crewDetails = formData.crewDetails;
    }

    try {
      const response = await fetch('/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit requirement');
      }

      setSubmittedRequirement(data.data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message || 'Network error occurred while connecting to backend');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setStep(1);
    setMaxStepReached(1);
    setErrors({});
    setSubmittedRequirement(null);
    setSubmitError(null);
  };

  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>EventFlow</h1>
            <span>Requirement Posting Engine</span>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            id="btn-nav-open-db"
            className="btn-secondary"
            onClick={() => setIsDrawerOpen(true)}
          >
            <DatabaseIcon size={16} /> Live Board
          </button>
        </div>
      </header>

      <main className="main-content">
        {!submittedRequirement && (
          <div className="flow-header">
            <span className="sub-badge">Multi-Step Requirement Engine</span>
            <h2>Post Event Requirement</h2>
            <p>
              Connect with top-tier Event Planners, Performers, and Technical Crew through our
              structured requirement posting pipeline.
            </p>
          </div>
        )}

        {!submittedRequirement && (
          <StepIndicator
            currentStep={step}
            category={formData.category}
            onSelectStep={jumpToStep}
            maxStepReached={maxStepReached}
          />
        )}

        {submittedRequirement ? (
          <SuccessView
            requirement={submittedRequirement}
            onReset={resetForm}
            onOpenLiveBoard={() => setIsDrawerOpen(true)}
          />
        ) : (
          <>
            {step === 1 && (
              <Step1Basics
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}

            {step === 2 && (
              <Step2CategoryFields
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}

            {step === 3 && (
              <Step3CategoryFields
                formData={formData}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}

            {step === 4 && (
              <Step4ReviewSubmit
                formData={formData}
                onEditStep={jumpToStep}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}

            <div className="flow-footer">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    id="btn-flow-previous"
                    className="btn-prev"
                    onClick={goToPrevStep}
                  >
                    <ArrowLeftIcon size={18} /> Back
                  </button>
                )}
              </div>

              <div>
                {step < 4 ? (
                  <button
                    type="button"
                    id="btn-flow-next"
                    className="btn-next"
                    onClick={goToNextStep}
                  >
                    Continue to Step 0{step + 1} <ArrowRightIcon size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-flow-submit"
                    className={`btn-submit ${isSubmitting ? 'loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" /> Saving to MongoDB...
                      </>
                    ) : (
                      <>
                        Confirm & Post Requirement <ArrowRightIcon size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <RequirementsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
