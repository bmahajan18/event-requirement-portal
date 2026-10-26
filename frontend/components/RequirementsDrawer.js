'use client';

import { useState, useEffect } from 'react';
import { CloseIcon, PlannerIcon, PerformerIcon, CrewIcon } from './Icons';

export default function RequirementsDrawer({ isOpen, onClose }) {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, planner: 0, performer: 0, crew: 0 });

  useEffect(() => {
    if (isOpen) {
      fetchRequirements();
      fetchStats();
    }
  }, [isOpen, filter]);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const url =
        filter === 'all'
          ? '/api/requirements'
          : `/api/requirements?category=${filter}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/requirements/stats');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} id="requirements-drawer-overlay">
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        id="requirements-drawer-panel"
      >
        <div className="drawer-header">
          <div>
            <h3>Live Requirements Board</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Total Records in MongoDB: {stats.total}
            </span>
          </div>
          <button
            type="button"
            className="btn-close-drawer"
            onClick={onClose}
            id="btn-close-drawer"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="drawer-filters">
          <button
            type="button"
            className={`drawer-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button
            type="button"
            className={`drawer-filter-btn ${filter === 'planner' ? 'active' : ''}`}
            onClick={() => setFilter('planner')}
          >
            Planners ({stats.planner})
          </button>
          <button
            type="button"
            className={`drawer-filter-btn ${filter === 'performer' ? 'active' : ''}`}
            onClick={() => setFilter('performer')}
          >
            Performers ({stats.performer})
          </button>
          <button
            type="button"
            className={`drawer-filter-btn ${filter === 'crew' ? 'active' : ''}`}
            onClick={() => setFilter('crew')}
          >
            Crew ({stats.crew})
          </button>
        </div>

        <div className="drawer-body">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
              <div className="spinner" />
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>No requirements found under this category yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="submission-item-card">
                <div className="item-top">
                  <span className="item-ref">{item.referenceId}</span>
                  <span className={`badge-tag badge-${item.category}`}>
                    {item.category.toUpperCase()}
                  </span>
                </div>

                <h4 className="item-title">{item.eventName}</h4>

                <div className="item-details">
                  <div>
                    <span style={{ color: 'var(--text-faint)' }}>Type: </span>
                    <span>{item.eventType}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-faint)' }}>Location: </span>
                    <span>{item.location}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-faint)' }}>Date: </span>
                    <span>{new Date(item.startDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-faint)' }}>Status: </span>
                    <span style={{ color: 'var(--success)', textTransform: 'capitalize' }}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {item.category === 'planner' && item.plannerDetails && (
                  <div
                    style={{
                      background: 'rgba(139, 92, 246, 0.08)',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <strong>Scope: </strong> {item.plannerDetails.scope} &bull;{' '}
                    <strong>Guests: </strong> ~{item.plannerDetails.estimatedGuests} &bull;{' '}
                    <strong>Budget: </strong> {item.plannerDetails.budgetRange}
                  </div>
                )}

                {item.category === 'performer' && item.performerDetails && (
                  <div
                    style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <strong>Format: </strong> {item.performerDetails.performerType} &bull;{' '}
                    <strong>Duration: </strong> {item.performerDetails.performanceDurationHours}h &bull;{' '}
                    <strong>Budget: </strong> {item.performerDetails.budgetRange}
                  </div>
                )}

                {item.category === 'crew' && item.crewDetails && (
                  <div
                    style={{
                      background: 'rgba(245, 158, 11, 0.08)',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <strong>Crew Roles: </strong>
                    {(item.crewDetails.roles || []).map((r) => `${r.count}x ${r.roleName}`).join(', ')}{' '}
                    &bull; <strong>Pay: </strong> ${item.crewDetails.budgetPerCrew} /{' '}
                    {item.crewDetails.payRateType}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
