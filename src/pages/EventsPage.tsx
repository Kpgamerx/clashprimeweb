import { useState, useEffect } from 'react';
import { mockEvents } from '../data/mockData';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export default function EventsPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Events</h1>
        <span className="text-xs text-text-muted">{mockEvents.length} upcoming</span>
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          const isUpcoming = now < start;
          const isActive = now >= start && now < end;
          const isPast = now >= end;

          const totalDuration = end.getTime() - start.getTime();
          const elapsed = Math.max(0, now.getTime() - start.getTime());
          const progress = isActive ? (elapsed / totalDuration) * 100 : 0;

          return (
            <div
              key={event.id}
              className={`bg-bg-card border rounded-md p-4 transition-colors
                ${isActive ? 'border-border-light' : 'border-border'}
                ${isPast ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      isActive ? 'bg-success/10 text-success' :
                      isUpcoming ? 'bg-bg-tertiary text-text-secondary' :
                      'bg-bg-tertiary text-text-muted'
                    }`}>
                      {isActive ? 'Active' : isUpcoming ? 'Upcoming' : 'Ended'}
                    </span>
                    <span className="text-xs text-text-muted capitalize">{event.type}</span>
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{event.name}</h3>
                  <p className="text-sm text-text-secondary mt-1">{event.description}</p>

                  {/* Countdown */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-text-muted" />
                      <span className="text-xs text-text-secondary">
                        {isActive
                          ? `${formatCountdown(end.getTime() - now.getTime())} remaining`
                          : isUpcoming
                          ? `Starts ${formatCountdown(start.getTime() - now.getTime())}`
                          : `Ended ${formatCountdown(now.getTime() - end.getTime())} ago`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Progress bar for active events */}
                  {isActive && (
                    <div className="progress-bar mt-3">
                      <div className="progress-bar-fill bg-success" style={{ width: `${progress}%` }} />
                    </div>
                  )}

                  {/* Dates */}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-text-muted">
                      {start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-text-muted">→</span>
                    <span className="text-xs text-text-muted">
                      {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);

  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
