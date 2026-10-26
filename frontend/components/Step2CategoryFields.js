import { PlusIcon, TrashIcon } from './Icons';

const THEME_PRESETS = [
  'Modern Luxury',
  'Festival & Vibrant',
  'Garden',
  'Futuristic Tech',
  'Minimalist Chic'
];

const PERFORMER_TYPES = [
  'Live Band & Ensemble',
  'DJ & Electronic Artist',
  'Solo Vocalist / Instrumentalist',
  'Standup Comedian',
  'Magician / Specialty Act'
];

const GENRE_TAGS = [
  'Pop',
  'Jazz & Soul',
  'Acoustic / Indie',
  'House & EDM',
  'Classic Rock',
  'Hip-Hop / R&B',
  'Classical / Strings',
];

const PRESET_CREW_ROLES = [
  'Lead Sound Engineer',
  'Lighting Programmer',
  'Stagehand & Rigger',
  '4K Broadcast Camera Op',
  'Video Switcher Tech',
  'Production Assistant'
];

export default function Step2CategoryFields({ formData, onChange, errors }) {
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

  const toggleGenre = (genre) => {
    const current = formData.performerDetails.genres || [];
    const updated = current.includes(genre)
      ? current.filter((g) => g !== genre)
      : [...current, genre];
    updatePerformer('genres', updated);
  };

  const addCrewRole = (roleName = 'Audio Tech') => {
    const current = formData.crewDetails.roles || [];
    const newRole = {
      roleName,
      count: 1,
      callTime: '09:00 AM',
      shiftHours: 8
    };
    updateCrew('roles', [...current, newRole]);
  };

  const updateCrewRoleItem = (index, field, value) => {
    const roles = [...formData.crewDetails.roles];
    roles[index] = { ...roles[index], [field]: value };
    updateCrew('roles', roles);
  };

  const removeCrewRoleItem = (index) => {
    const roles = formData.crewDetails.roles.filter((_, i) => i !== index);
    updateCrew('roles', roles);
  };

  if (category === 'planner') {
    const details = formData.plannerDetails || {};
    return (
      <div className="card-panel" id="step-2-planner-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Event Planner Scope & Attendance</h3>
            <p>Define the depth of planning assistance and event size requirements</p>
          </div>
          <span className="badge-tag badge-planner">Planner Specific</span>
        </div>

        <div className="form-grid">
          <div className="form-group form-col-full">
            <label className="form-label">
              Planning Scope Level *
            </label>
            <div className="radio-cards-grid" id="planner-scope-selector">
              <div
                id="scope-card-full"
                className={`mini-card-radio ${details.scope === 'full' ? 'active' : ''}`}
                onClick={() => updatePlanner('scope', 'full')}
              >
                <h5>Full Planning & Styling</h5>
                <p>End-to-end design, vendor sourcing, contracts, timeline, and complete day-of execution.</p>
              </div>

              <div
                id="scope-card-partial"
                className={`mini-card-radio ${details.scope === 'partial' ? 'active' : ''}`}
                onClick={() => updatePlanner('scope', 'partial')}
              >
                <h5>Partial Coordination</h5>
                <p>Support for existing plans, budget tracking, vendor handoff, and schedule finalization.</p>
              </div>

              <div
                id="scope-card-day_of"
                className={`mini-card-radio ${details.scope === 'day_of' ? 'active' : ''}`}
                onClick={() => updatePlanner('scope', 'day_of')}
              >
                <h5>Day-of Coordination</h5>
                <p>Dedicated on-site coordination, run-of-show execution, and emergency troubleshooting.</p>
              </div>
            </div>
            {errors['plannerDetails.scope'] && (
              <span className="field-error">{errors['plannerDetails.scope']}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="planner-guest-count">
              Estimated Guest Count *
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                id="planner-guest-count"
                type="number"
                min="5"
                max="10000"
                className="form-input"
                style={{ width: '130px' }}
                value={details.estimatedGuests || 100}
                onChange={(e) => updatePlanner('estimatedGuests', Number(e.target.value))}
              />
              <input
                type="range"
                min="10"
                max="2500"
                step="25"
                style={{ flex: 1, accentColor: 'var(--planner-color)', cursor: 'pointer' }}
                value={details.estimatedGuests || 100}
                onChange={(e) => updatePlanner('estimatedGuests', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="planner-budget-range">
              Planning Budget Bracket *
            </label>
            <select
              id="planner-budget-range"
              className={`form-select ${errors['plannerDetails.budgetRange'] ? 'error' : ''}`}
              value={details.budgetRange || ''}
              onChange={(e) => updatePlanner('budgetRange', e.target.value)}
            >
              <option value="">Select budget range...</option>
              <option value="$2,000 - $5,000">$2,000 - $5,000 (Essential)</option>
              <option value="$5,000 - $12,000">$5,000 - $12,000 (Standard Production)</option>
              <option value="$12,000 - $25,000">$12,000 - $25,000 (Premium Experience)</option>
              <option value="$25,000+">$25,000+ (High-End Luxury / Mega Event)</option>
            </select>
            {errors['plannerDetails.budgetRange'] && (
              <span className="field-error">{errors['plannerDetails.budgetRange']}</span>
            )}
          </div>

          <div className="form-group form-col-full">
            <label className="form-label">
              <span>Event Theme & Visual Aesthetic</span>
              <span className="optional-tag">Optional preset or custom</span>
            </label>
            <div className="chip-group" style={{ marginBottom: '0.75rem' }}>
              {THEME_PRESETS.map((theme) => (
                <button
                  type="button"
                  key={theme}
                  className={`chip-btn planner ${details.themeStyle === theme ? 'active' : ''}`}
                  onClick={() => updatePlanner('themeStyle', theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
            <input
              id="planner-custom-theme"
              type="text"
              className="form-input"
              placeholder="Or write custom theme/style (e.g. Neon Cyberpunk or Mid-Century Modern)..."
              value={details.themeStyle || ''}
              onChange={(e) => updatePlanner('themeStyle', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (category === 'performer') {
    const details = formData.performerDetails || {};
    return (
      <div className="card-panel" id="step-2-performer-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Performer Specification & Format</h3>
            <p>Select the type of talent, sets duration, and sonic preferences</p>
          </div>
          <span className="badge-tag badge-performer">Performer Specific</span>
        </div>

        <div className="form-grid">
          <div className="form-group form-col-full">
            <label className="form-label">
              Performer Genre / Format *
            </label>
            <div className="chip-group" id="performer-type-selector">
              {PERFORMER_TYPES.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`chip-btn performer ${details.performerType === type ? 'active' : ''}`}
                  onClick={() => updatePerformer('performerType', type)}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors['performerDetails.performerType'] && (
              <span className="field-error" style={{ marginTop: '0.35rem' }}>
                {errors['performerDetails.performerType']}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="performer-duration">
              Performance Duration (Hours) *
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                id="performer-duration"
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                className="form-input"
                style={{ width: '120px' }}
                value={details.performanceDurationHours || 2}
                onChange={(e) => updatePerformer('performanceDurationHours', Number(e.target.value))}
              />
              <div className="chip-group">
                {[1, 2, 3, 4].map((hrs) => (
                  <button
                    type="button"
                    key={hrs}
                    className={`chip-btn performer ${details.performanceDurationHours === hrs ? 'active' : ''}`}
                    onClick={() => updatePerformer('performanceDurationHours', hrs)}
                  >
                    {hrs}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="performer-budget">
              Performer Budget Range *
            </label>
            <select
              id="performer-budget"
              className={`form-select ${errors['performerDetails.budgetRange'] ? 'error' : ''}`}
              value={details.budgetRange || ''}
              onChange={(e) => updatePerformer('budgetRange', e.target.value)}
            >
              <option value="">Select compensation range...</option>
              <option value="500 - 1,500">500 - 1,500 (Solo / Acoustic / Resident DJ)</option>
              <option value="1,500 - 4,000">1,500 - 4,000 (Trio / Established Club DJ)</option>
              <option value="4,000 - 10,000">4,000 - 10,000 (Full 5-8 Piece Live Band)</option>
              <option value="10,000+">10,000+ (Headliner / Celebrity Talent)</option>
            </select>
            {errors['performerDetails.budgetRange'] && (
              <span className="field-error">{errors['performerDetails.budgetRange']}</span>
            )}
          </div>

          <div className="form-group form-col-full">
            <label className="form-label">
              <span>Musical / Artistic Styles & Genres</span>
              <span className="optional-tag">Select multiple that apply</span>
            </label>
            <div className="chip-group">
              {GENRE_TAGS.map((genre) => {
                const isSelected = (details.genres || []).includes(genre);
                return (
                  <button
                    type="button"
                    key={genre}
                    className={`chip-btn performer ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {isSelected && '✓ '} {genre}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group form-col-full">
            <label className="form-label">
              Sound & PA Provision *
            </label>
            <div className="radio-cards-grid">
              <div
                className={`mini-card-radio ${details.soundEquipment === 'venue_provided' ? 'active' : ''}`}
                onClick={() => updatePerformer('soundEquipment', 'venue_provided')}
              >
                <h5>Venue Provides Audio</h5>
                <p>FOH sound system, monitors, microphones, and audio mixing engineer available on site.</p>
              </div>

              <div
                className={`mini-card-radio ${details.soundEquipment === 'performer_provided' ? 'active' : ''}`}
                onClick={() => updatePerformer('soundEquipment', 'performer_provided')}
              >
                <h5>Performer Brings Sound</h5>
                <p>Artist must bring their own standalone PA speakers, audio mixer, and microphones.</p>
              </div>

              <div
                className={`mini-card-radio ${details.soundEquipment === 'hybrid' ? 'active' : ''}`}
                onClick={() => updatePerformer('soundEquipment', 'hybrid')}
              >
                <h5>Hybrid / Tech Support</h5>
                <p>Venue provides core system; performer brings personal instruments and wireless IEMs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'crew') {
    const details = formData.crewDetails || {};
    const roles = details.roles || [];

    return (
      <div className="card-panel" id="step-2-crew-panel">
        <div className="panel-header">
          <div className="panel-title">
            <h3>Technical Crew Roles & Call Times</h3>
            <p>Allocate technical personnel, quantities required, and operational shifts</p>
          </div>
          <span className="badge-tag badge-crew">Crew Specific</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label" style={{ marginBottom: '0.6rem' }}>
              Quick Add Crew Specialization:
            </label>
            <div className="chip-group">
              {PRESET_CREW_ROLES.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  className="chip-btn crew"
                  onClick={() => addCrewRole(preset)}
                >
                  <PlusIcon size={14} /> {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="crew-roles-container" id="crew-roles-list">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
                gap: '0.85rem',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0 0.5rem'
              }}
            >
              <span>Role Title</span>
              <span>Headcount</span>
              <span>Call Time</span>
              <span>Shift Length</span>
              <span />
            </div>

            {roles.map((role, idx) => (
              <div key={idx} className="crew-role-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. FOH Audio Engineer"
                  value={role.roleName}
                  onChange={(e) => updateCrewRoleItem(idx, 'roleName', e.target.value)}
                />

                <div className="counter-input-wrap">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() =>
                      updateCrewRoleItem(idx, 'count', Math.max(1, (role.count || 1) - 1))
                    }
                  >
                    -
                  </button>
                  <span className="counter-val">{role.count || 1}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() =>
                      updateCrewRoleItem(idx, 'count', (role.count || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <input
                  type="text"
                  className="form-input"
                  placeholder="08:00 AM"
                  value={role.callTime}
                  onChange={(e) => updateCrewRoleItem(idx, 'callTime', e.target.value)}
                />

                <select
                  className="form-select"
                  value={role.shiftHours || 8}
                  onChange={(e) => updateCrewRoleItem(idx, 'shiftHours', Number(e.target.value))}
                >
                  <option value={4}>4 Hours (Half)</option>
                  <option value={6}>6 Hours</option>
                  <option value={8}>8 Hours (Standard)</option>
                  <option value={10}>10 Hours</option>
                  <option value={12}>12 Hours (Full Day)</option>
                </select>

                <button
                  type="button"
                  className="btn-remove-role"
                  title="Remove this role"
                  onClick={() => removeCrewRoleItem(idx)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              id="btn-add-custom-crew-role"
              className="btn-add-role"
              onClick={() => addCrewRole('General Production Tech')}
            >
              <PlusIcon size={16} /> Add Custom Crew Position
            </button>
          </div>

          {errors['crewDetails.roles'] && (
            <span className="field-error">{errors['crewDetails.roles']}</span>
          )}
        </div>
      </div>
    );
  }

  return null;
}
