import { PlannerIcon, PerformerIcon, CrewIcon, CalendarIcon, MapPinIcon, VenueIcon } from './Icons';

const EVENT_TYPES = [
  'Corporate Gala & Conference',
  'Wedding & Reception',
  'Music Concert & Festival',
  'Private Celebration & Party',
  'Exhibition & Product Launch',
  'Charity Fundraiser'
];

export default function Step1Basics({ formData, onChange, errors }) {
  const setCategory = (cat) => {
    onChange('category', cat);
  };

  const setDateMode = (mode) => {
    onChange('dateMode', mode);
    if (mode === 'single') {
      onChange('endDate', '');
    }
  };

  return (
    <div className="card-panel" id="step-1-basics-panel">
      <div className="panel-header">
        <div className="panel-title">
          <h3>Event Basics</h3>
          <p>Provide core event parameters and select the talent category needed</p>
        </div>
        {formData.category && (
          <span className={`badge-tag badge-${formData.category}`}>
            {formData.category.toUpperCase()} REQUIREMENT
          </span>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group form-col-full">
          <label className="form-label" htmlFor="input-event-name">
            Event Name *
          </label>
          <input
            id="input-event-name"
            type="text"
            className={`form-input ${errors.eventName ? 'error' : ''}`}
            placeholder="e.g.Horizon Music Festival"
            value={formData.eventName}
            onChange={(e) => onChange('eventName', e.target.value)}
          />
          {errors.eventName && <span className="field-error">{errors.eventName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="select-event-type">
            Event Type *
          </label>
          <select
            id="select-event-type"
            className={`form-select ${errors.eventType ? 'error' : ''}`}
            value={formData.eventType}
            onChange={(e) => onChange('eventType', e.target.value)}
          >
            <option value="">Select event genre...</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && <span className="field-error">{errors.eventType}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Event Dates *
          </label>
          <div className="date-mode-toggle" id="date-mode-toggle-group">
            <button
              type="button"
              id="date-mode-single-btn"
              className={`date-mode-btn ${formData.dateMode === 'single' ? 'active' : ''}`}
              onClick={() => setDateMode('single')}
            >
              Single Date
            </button>
            <button
              type="button"
              id="date-mode-range-btn"
              className={`date-mode-btn ${formData.dateMode === 'range' ? 'active' : ''}`}
              onClick={() => setDateMode('range')}
            >
              Date Range
            </button>
          </div>

          <div className={`date-inputs-wrapper ${formData.dateMode === 'single' ? 'single' : ''}`}>
            <div>
              <input
                id="input-start-date"
                type="date"
                className={`form-input ${errors.startDate ? 'error' : ''}`}
                value={formData.startDate}
                onChange={(e) => onChange('startDate', e.target.value)}
              />
              {errors.startDate && <span className="field-error">{errors.startDate}</span>}
            </div>
            {formData.dateMode === 'range' && (
              <div>
                <input
                  id="input-end-date"
                  type="date"
                  className={`form-input ${errors.endDate ? 'error' : ''}`}
                  value={formData.endDate}
                  min={formData.startDate || undefined}
                  onChange={(e) => onChange('endDate', e.target.value)}
                />
                {errors.endDate && <span className="field-error">{errors.endDate}</span>}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="input-location">
            <span>Location (City, State / Region) *</span>
          </label>
          <input
            id="input-location"
            type="text"
            className={`form-input ${errors.location ? 'error' : ''}`}
            placeholder="e.g. Chandigarh, Delhi, Pune, Bangalore"
            value={formData.location}
            onChange={(e) => onChange('location', e.target.value)}
          />
          {errors.location && <span className="field-error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="input-venue">
            <span>Venue Name</span>
            <span className="optional-tag">Optional</span>
          </label>
          <input
            id="input-venue"
            type="text"
            className="form-input"
            placeholder="e.g. Waterfront, The Habitat "
            value={formData.venue}
            onChange={(e) => onChange('venue', e.target.value)}
          />
        </div>

        <div className="form-group form-col-full" style={{ marginTop: '0.5rem' }}>
          <label className="form-label">
            Requirement Category *
          </label>
          <div className="category-selection-grid" id="category-selector-group">
            <div
              id="category-card-planner"
              className={`category-card planner ${formData.category === 'planner' ? 'selected' : ''}`}
              onClick={() => setCategory('planner')}
            >
              <div className="card-top">
                <div className="card-icon-bubble">
                  <PlannerIcon size={24} />
                </div>
                <div className="radio-check">
                  {formData.category === 'planner' && <div className="radio-inner-dot" />}
                </div>
              </div>
              <div className="card-info">
                <h4>Event Planner</h4>
                <p>Hire full or partial event planning, styling, vendor curation, and day-of coordination.</p>
              </div>
              <div className="card-features">
                <span className="feature-pill">Timeline Design</span>
                <span className="feature-pill">Vendor Management</span>
                <span className="feature-pill">Run-of-Show</span>
              </div>
            </div>

            <div
              id="category-card-performer"
              className={`category-card performer ${formData.category === 'performer' ? 'selected' : ''}`}
              onClick={() => setCategory('performer')}
            >
              <div className="card-top">
                <div className="card-icon-bubble">
                  <PerformerIcon size={24} />
                </div>
                <div className="radio-check">
                  {formData.category === 'performer' && <div className="radio-inner-dot" />}
                </div>
              </div>
              <div className="card-info">
                <h4>Performer</h4>
                <p>Book live bands, DJs, soloists, comedians, keynote MCs, or specialty entertainment.</p>
              </div>
              <div className="card-features">
                <span className="feature-pill">Live Music</span>
                <span className="feature-pill">DJ Sets</span>
                <span className="feature-pill">Stage Rider</span>
              </div>
            </div>

            <div
              id="category-card-crew"
              className={`category-card crew ${formData.category === 'crew' ? 'selected' : ''}`}
              onClick={() => setCategory('crew')}
            >
              <div className="card-top">
                <div className="card-icon-bubble">
                  <CrewIcon size={24} />
                </div>
                <div className="radio-check">
                  {formData.category === 'crew' && <div className="radio-inner-dot" />}
                </div>
              </div>
              <div className="card-info">
                <h4>Crew & Staff</h4>
                <p>Staff sound engineers, lighting techs, stagehands, camera ops, and event production hands.</p>
              </div>
              <div className="card-features">
                <span className="feature-pill">AV Technicians</span>
                <span className="feature-pill">Rigging / Stage</span>
                <span className="feature-pill">Shift Crew</span>
              </div>
            </div>
          </div>
          {errors.category && <span className="field-error" style={{ marginTop: '0.4rem' }}>{errors.category}</span>}
        </div>
      </div>
    </div>
  );
}
