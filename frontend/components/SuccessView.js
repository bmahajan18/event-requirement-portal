import { CheckIcon, SparklesIcon, DatabaseIcon } from './Icons';

export default function SuccessView({
  requirement,
  onReset,
  onOpenLiveBoard
}) {
  const getCategoryClass = () => {
    if (requirement.category === 'planner') return 'badge-planner';
    if (requirement.category === 'performer') return 'badge-performer';
    return 'badge-crew';
  };

  return (
    <div className="card-panel success-container" id="submission-success-panel">
      <div className="success-sparkle-icon">
        <CheckIcon size={36} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <span className={`badge-tag ${getCategoryClass()}`}>
          {requirement.category.toUpperCase()} SAVED TO MONGODB
        </span>
      </div>

      <h3>Requirement Successfully Published!</h3>
      <p>
        Your requirement for <strong>{requirement.eventName}</strong> has been validated and
        categorized under <strong>{requirement.category}</strong>.
      </p>

      <div className="reference-ticket">
        <span className="ticket-label">Tracking Reference Code</span>
        <span className="ticket-code">{requirement.referenceId}</span>
      </div>

      <div className="success-actions">
        <button
          type="button"
          id="btn-post-another"
          className="btn-next"
          onClick={onReset}
        >
          <SparklesIcon size={18} /> Post Another Requirement
        </button>

        <button
          type="button"
          id="btn-view-database"
          className="btn-secondary"
          onClick={onOpenLiveBoard}
        >
          <DatabaseIcon size={18} /> View Live Requirements Board
        </button>
      </div>
    </div>
  );
}
