import { CheckIcon } from './Icons';

const PLANNER_DELIVERABLES = [
  {
    id: 'vendor_sourcing',
    title: 'Vendor Sourcing & Contracts',
    desc: 'Catering, florists, rental partners, and quote negotiations.'
  },
  {
    id: 'spatial_layout',
    title: 'Floor Plan & 3D Spatial Layout',
    desc: 'Stage positioning, seating chart, traffic flow, and emergency exits.'
  },
  {
    id: 'run_of_show',
    title: 'Master Run-of-Show Timeline',
    desc: 'Minute-by-minute schedule for speakers, cues, and lighting transitions.'
  },
  {
    id: 'permits_compliance',
    title: 'City Permits & Insurance Compliance',
    desc: 'Local council noise permits, fire marshal checks, and liability waivers.'
  },
  {
    id: 'av_oversight',
    title: 'Audio-Visual Technical Oversight',
    desc: 'Supervising sound checks, projector sync, and stage changeovers.'
  },
  {
    id: 'guest_concierge',
    title: 'VIP Concierge & RSVP Management',
    desc: 'Check-in desk, badge printing, and special hospitality arrangements.'
  }
];

const CREW_CERTIFICATIONS = [
  'Rigging & Truss Certified',
  'Dante Audio Level 2/3',
  'OSHA-10 / 30 Safety',
  'Aerial Boom & Scissor Lift',
  'Certified Electrician (High Voltage)',
  'First Aid & CPR Certified'
];

const CREW_EQUIPMENT_EXPERIENCE = [
  'Digital Consoles (DiGiCo / Yamaha / Behringer)',
  'Intelligent Moving Heads & DMX / GrandMA',
  'LED Wall & Novastar Processors',
  'Broadcast PTZ & Sony FX Camera Rigs',
  'Heavy Truss Rigging & Motors'
];

export default function Step3CategoryFields({ formData, onChange, errors }) {
  const category = formData.category;

  const updatePlanner = (field, val) => {
    onChange('plannerDetails', {
      ...formData.plannerDetails,
      [field]: val
    });
  };

  const updatePerformer = (field, val) => {
    onChange('performerDetails', {
      ...formData.performerDetails,
      [field]: val
    });
  };

  const updateCrew = (field, val) => {
    onChange('crewDetails', {
      ...formData.crewDetails,
      [field]: val
    });
  };

  const togglePlannerDeliverable = (itemTitle) => {
    const current = formData.plannerDetails.deliverables || [];
    const updated = current.includes(itemTitle)
      ? current.filter((d) => d !== itemTitle)
      : [...current, itemTitle];
    updatePlanner('deliverables', updated);
  };

  const toggleCrewCert = (cert) => {
    const current = formData.crewDetails.requiredCertifications || [];
    const updated = current.includes(cert)
      ? current.filter((c) => c !== cert)
      : [...current, cert];
    updateCrew('requiredCertifications', updated);
  };

  const toggleCrewGear = (gear) => {
    const current = formData.crewDetails.equipmentHandling || [];
    const updated = current.includes(gear)
      ? current.filter((g) => g !== gear)
      : [...current, gear];
    updateCrew('equipmentHandling', updated);
  };

  if (category === 'planner') {
    const details = formData.plannerDetails || {};
    const selectedDeliverables = details.deliverables || [];

    return (
      <div className="card-panel" id="step-3-planner-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Key Deliverables & Action Items</h3>
            <p>Select specific responsibilities required from the event planning team</p>
          </div>
          <span className="badge-tag badge-planner">Planner Specific</span>
        </div>

        <div className="form-grid">
          <div className="form-group form-col-full">
            <label className="form-label">
              <span>Required Deliverables</span>
              <span className="optional-tag">Select all that apply</span>
            </label>
            <div className="checkbox-tile-group">
              {PLANNER_DELIVERABLES.map((item) => {
                const isChecked = selectedDeliverables.includes(item.title);
                return (
                  <div
                    key={item.id}
                    className={`checkbox-tile ${isChecked ? 'checked' : ''}`}
                    onClick={() => togglePlannerDeliverable(item.title)}
                  >
                    <div className="checkbox-square">
                      {isChecked && <CheckIcon size={14} />}
                    </div>
                    <div className="checkbox-tile-info">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group form-col-full">
            <label className="form-label" htmlFor="planner-additional-notes">
              <span>Additional Milestone Details & Specific Requirements</span>
              <span className="optional-tag">Optional</span>
            </label>
            <textarea
              id="planner-additional-notes"
              className="form-textarea"
              placeholder="Include venue constraints, key stakeholder milestones, catering guidelines, or specific vendor references..."
              value={details.additionalNotes || ''}
              onChange={(e) => updatePlanner('additionalNotes', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (category === 'performer') {
    const details = formData.performerDetails || {};

    return (
      <div className="card-panel" id="step-3-performer-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Stage Logistics & Tech Rider</h3>
            <p>Specify the performance environment, audio routing, and special act accommodations</p>
          </div>
          <span className="badge-tag badge-performer">Performer Specific</span>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="performer-stage-details">
              <span>Stage / Performance Space Details</span>
              <span className="optional-tag">Dimensions & Environment</span>
            </label>
            <input
              id="performer-stage-details"
              type="text"
              className="form-input"
              placeholder="e.g. 24x16 ft elevated stage, indoor banquet hall, ceiling height 18ft"
              value={details.stageDetails || ''}
              onChange={(e) => updatePerformer('stageDetails', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="performer-tech-rider">
              <span>Technical Rider & Audio Inputs</span>
              <span className="optional-tag">Channels & Gear</span>
            </label>
            <input
              id="performer-tech-rider"
              type="text"
              className="form-input"
              placeholder="e.g. 3 wireless handheld mics, 2 stereo DI boxes, drum riser, 2 IEM mixes"
              value={details.techRiderRequirements || ''}
              onChange={(e) => updatePerformer('techRiderRequirements', e.target.value)}
            />
          </div>

          <div className="form-group form-col-full">
            <label className="form-label" htmlFor="performer-special-requests">
              <span>Special Requests & Performance Repertoire</span>
              <span className="optional-tag">Optional</span>
            </label>
            <textarea
              id="performer-special-requests"
              className="form-textarea"
              placeholder="Specify requested walk-in tracks, requested covers, dress code expectations, sound check window, or green room hospitality..."
              value={details.specialRequests || ''}
              onChange={(e) => updatePerformer('specialRequests', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (category === 'crew') {
    const details = formData.crewDetails || {};

    return (
      <div className="card-panel" id="step-3-crew-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Qualifications, Gear & Compensation</h3>
            <p>Set licensing criteria, hardware proficiencies, and rate compensation</p>
          </div>
          <span className="badge-tag badge-crew">Crew Specific</span>
        </div>

        <div className="form-grid">
          <div className="form-group form-col-full">
            <label className="form-label">
              <span>Mandatory Certifications / Safety Licenses</span>
              <span className="optional-tag">Optional select</span>
            </label>
            <div className="chip-group">
              {CREW_CERTIFICATIONS.map((cert) => {
                const isSelected = (details.requiredCertifications || []).includes(cert);
                return (
                  <button
                    type="button"
                    key={cert}
                    className={`chip-btn crew ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleCrewCert(cert)}
                  >
                    {isSelected && '✓ '} {cert}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group form-col-full">
            <label className="form-label">
              <span>Equipment Handling & Systems</span>
              <span className="optional-tag">Experience required</span>
            </label>
            <div className="chip-group">
              {CREW_EQUIPMENT_EXPERIENCE.map((gear) => {
                const isSelected = (details.equipmentHandling || []).includes(gear);
                return (
                  <button
                    type="button"
                    key={gear}
                    className={`chip-btn crew ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleCrewGear(gear)}
                  >
                    {isSelected && '✓ '} {gear}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="crew-dress-code">
              Production Attire / Dress Code *
            </label>
            <select
              id="crew-dress-code"
              className="form-select"
              value={details.dressCode || 'all_black'}
              onChange={(e) => updateCrew('dressCode', e.target.value)}
            >
              <option value="all_black">Standard Show Blacks (Polo / Cargo / Shoes)</option>
              <option value="smart_casual">Smart Casual Production</option>
              <option value="formal">Formal / Black Tie Backstage</option>
              <option value="branded_tshirt">Branded Event T-Shirt (Provided)</option>
              <option value="custom">Safety Hi-Vis & Steel Toes</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Compensation Rate Structure *
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <select
                id="crew-pay-rate-type"
                className="form-select"
                style={{ width: '150px' }}
                value={details.payRateType || 'hourly'}
                onChange={(e) => updateCrew('payRateType', e.target.value)}
              >
                <option value="hourly">Hourly ($/hr)</option>
                <option value="flat_daily">Flat Daily ($/day)</option>
              </select>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  id="crew-budget-per-person"
                  type="number"
                  min="0"
                  className={`form-input ${errors['crewDetails.budgetPerCrew'] ? 'error' : ''}`}
                  placeholder={details.payRateType === 'hourly' ? 'e.g. 50' : 'e.g. 450'}
                  value={details.budgetPerCrew || ''}
                  onChange={(e) => updateCrew('budgetPerCrew', Number(e.target.value))}
                />
              </div>
            </div>
            {errors['crewDetails.budgetPerCrew'] && (
              <span className="field-error">{errors['crewDetails.budgetPerCrew']}</span>
            )}
          </div>

          <div className="form-group form-col-full">
            <label className="form-label" htmlFor="crew-additional-notes">
              <span>Site Logistics, Parking & Crew Welfare Notes</span>
              <span className="optional-tag">Optional</span>
            </label>
            <textarea
              id="crew-additional-notes"
              className="form-textarea"
              placeholder="Detail loading dock gate code, crew meal arrangements, green room access, or specific PPE requirements..."
              value={details.additionalNotes || ''}
              onChange={(e) => updateCrew('additionalNotes', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
