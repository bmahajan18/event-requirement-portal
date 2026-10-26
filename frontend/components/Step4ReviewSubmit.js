import { PlannerIcon, PerformerIcon, CrewIcon } from './Icons';

export default function Step4ReviewSubmit({
  formData,
  onEditStep,
  onSubmit,
  isSubmitting,
  submitError
}) {
  const { category } = formData;

  const formatDateDisplay = () => {
    if (!formData.startDate) return 'Not set';
    if (formData.dateMode === 'single' || !formData.endDate) {
      return new Date(formData.startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const start = new Date(formData.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const end = new Date(formData.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${start} - ${end}`;
  };

  const getCategoryIcon = () => {
    if (category === 'planner') return <PlannerIcon size={20} />;
    if (category === 'performer') return <PerformerIcon size={20} />;
    return <CrewIcon size={20} />;
  };

  return (
    <div className="card-panel" id="step-4-review-panel">
      <div className="panel-header">
        <div className="panel-title">
          <h3>Review & Finalize Requirement</h3>
          <p>Carefully verify your event requirement before publishing to the talent pool</p>
        </div>
        <span className={`badge-tag badge-${category}`}>
          {getCategoryIcon()} {category.toUpperCase()}
        </span>
      </div>

      {submitError && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            color: '#fca5a5',
            fontSize: '0.9rem',
            marginBottom: '1.5rem'
          }}
        >
          {submitError}
        </div>
      )}

      <div className="review-summary-grid">
        <div className="review-card-section">
          <div className="review-card-header">
            <h4>Event Basics</h4>
            <button
              type="button"
              className="btn-edit-step"
              onClick={() => onEditStep(1)}
            >
              Edit Step 1
            </button>
          </div>

          <div className="review-item-row">
            <span className="label">Event Name</span>
            <span className="value">{formData.eventName}</span>
          </div>

          <div className="review-item-row">
            <span className="label">Event Genre</span>
            <span className="value">{formData.eventType}</span>
          </div>

          <div className="review-item-row">
            <span className="label">Schedule</span>
            <span className="value">{formatDateDisplay()}</span>
          </div>

          <div className="review-item-row">
            <span className="label">Location</span>
            <span className="value">{formData.location}</span>
          </div>

          <div className="review-item-row">
            <span className="label">Venue</span>
            <span className="value">{formData.venue || 'To Be Announced'}</span>
          </div>

          <div className="review-item-row">
            <span className="label">Category Type</span>
            <span className="value" style={{ textTransform: 'capitalize' }}>
              {formData.category} Requirement
            </span>
          </div>
        </div>

        {category === 'planner' && (
          <div className="review-card-section">
            <div className="review-card-header">
              <h4>Planner Specifications</h4>
              <button
                type="button"
                className="btn-edit-step"
                onClick={() => onEditStep(2)}
              >
                Edit Details
              </button>
            </div>

            <div className="review-item-row">
              <span className="label">Scope of Work</span>
              <span className="value">
                {formData.plannerDetails.scope === 'full' && 'Full Planning & Styling'}
                {formData.plannerDetails.scope === 'partial' && 'Partial Coordination'}
                {formData.plannerDetails.scope === 'day_of' && 'Day-of Coordination'}
              </span>
            </div>

            <div className="review-item-row">
              <span className="label">Guest Count</span>
              <span className="value">~{formData.plannerDetails.estimatedGuests} Attendees</span>
            </div>

            <div className="review-item-row">
              <span className="label">Theme & Vibe</span>
              <span className="value">{formData.plannerDetails.themeStyle || 'Not Specified'}</span>
            </div>

            <div className="review-item-row">
              <span className="label">Budget Bracket</span>
              <span className="value">{formData.plannerDetails.budgetRange}</span>
            </div>

            <div className="review-item-row">
              <span className="label">Deliverables</span>
              <div className="tags-list">
                {(formData.plannerDetails.deliverables || []).length > 0 ? (
                  formData.plannerDetails.deliverables.map((item) => (
                    <span key={item} className="review-tag">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="value">None selected</span>
                )}
              </div>
            </div>

            {formData.plannerDetails.additionalNotes && (
              <div className="review-item-row">
                <span className="label">Notes</span>
                <span className="value" style={{ fontSize: '0.8rem' }}>
                  {formData.plannerDetails.additionalNotes}
                </span>
              </div>
            )}
          </div>
        )}

        {category === 'performer' && (
          <div className="review-card-section">
            <div className="review-card-header">
              <h4>Performer & Sound Details</h4>
              <button
                type="button"
                className="btn-edit-step"
                onClick={() => onEditStep(2)}
              >
                Edit Details
              </button>
            </div>

            <div className="review-item-row">
              <span className="label">Performer Type</span>
              <span className="value">{formData.performerDetails.performerType}</span>
            </div>

            <div className="review-item-row">
              <span className="label">Duration</span>
              <span className="value">{formData.performerDetails.performanceDurationHours} Hours</span>
            </div>

            <div className="review-item-row">
              <span className="label">Sound Setup</span>
              <span className="value">
                {formData.performerDetails.soundEquipment === 'venue_provided' && 'Venue Provides PA'}
                {formData.performerDetails.soundEquipment === 'performer_provided' && 'Performer Brings PA'}
                {formData.performerDetails.soundEquipment === 'hybrid' && 'Hybrid / Tech Setup'}
              </span>
            </div>

            <div className="review-item-row">
              <span className="label">Compensation</span>
              <span className="value">{formData.performerDetails.budgetRange}</span>
            </div>

            <div className="review-item-row">
              <span className="label">Genres / Style</span>
              <div className="tags-list">
                {(formData.performerDetails.genres || []).length > 0 ? (
                  formData.performerDetails.genres.map((g) => (
                    <span key={g} className="review-tag">
                      {g}
                    </span>
                  ))
                ) : (
                  <span className="value">Open Format</span>
                )}
              </div>
            </div>

            {formData.performerDetails.stageDetails && (
              <div className="review-item-row">
                <span className="label">Stage Specs</span>
                <span className="value">{formData.performerDetails.stageDetails}</span>
              </div>
            )}

            {formData.performerDetails.techRiderRequirements && (
              <div className="review-item-row">
                <span className="label">Tech Rider</span>
                <span className="value">{formData.performerDetails.techRiderRequirements}</span>
              </div>
            )}
          </div>
        )}

        {category === 'crew' && (
          <div className="review-card-section">
            <div className="review-card-header">
              <h4>Crew Allocation & Pay</h4>
              <button
                type="button"
                className="btn-edit-step"
                onClick={() => onEditStep(2)}
              >
                Edit Details
              </button>
            </div>

            <div className="review-item-row">
              <span className="label">Crew Roster</span>
              <span className="value">
                {(formData.crewDetails.roles || []).reduce((acc, r) => acc + (r.count || 1), 0)} Total Technicians
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {(formData.crewDetails.roles || []).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px'
                  }}
                >
                  <span style={{ color: '#fff', fontWeight: 600 }}>
                    {r.count}x {r.roleName}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Call: {r.callTime} ({r.shiftHours}h shift)
                  </span>
                </div>
              ))}
            </div>

            <div className="review-item-row" style={{ marginTop: '0.5rem' }}>
              <span className="label">Rate Structure</span>
              <span className="value">
                ${formData.crewDetails.budgetPerCrew} /{' '}
                {formData.crewDetails.payRateType === 'hourly' ? 'Hour' : 'Day'}
              </span>
            </div>

            <div className="review-item-row">
              <span className="label">Attire</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>
                {formData.crewDetails.dressCode.replace('_', ' ')}
              </span>
            </div>

            {(formData.crewDetails.requiredCertifications || []).length > 0 && (
              <div className="review-item-row">
                <span className="label">Certifications</span>
                <div className="tags-list">
                  {formData.crewDetails.requiredCertifications.map((c) => (
                    <span key={c} className="review-tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
