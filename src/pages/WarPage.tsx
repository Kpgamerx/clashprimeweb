import { useState } from 'react';
import { Shield, Swords, Trophy, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';

interface WarMember {
  name: string;
  attacks: number;
  maxAttacks: number;
  starsEarned: number;
  destructionPercent: number;
  defenseStars: number;
}

const mockWarLog = [
  {
    id: '1',
    result: 'win' as const,
    stars: 42,
    opponentStars: 38,
    destruction: 87.5,
    opponentDestruction: 82.3,
    teamSize: 15,
    date: '2026-01-04',
    opponent: 'Raging Dragons',
  },
  {
    id: '2',
    result: 'win' as const,
    stars: 45,
    opponentStars: 40,
    destruction: 92.1,
    opponentDestruction: 85.7,
    teamSize: 15,
    date: '2026-01-02',
    opponent: 'Thunder Lords',
  },
  {
    id: '3',
    result: 'loss' as const,
    stars: 38,
    opponentStars: 43,
    destruction: 78.2,
    opponentDestruction: 89.4,
    teamSize: 15,
    date: '2025-12-30',
    opponent: 'Elite Warriors',
  },
  {
    id: '4',
    result: 'win' as const,
    stars: 44,
    opponentStars: 35,
    destruction: 91.0,
    opponentDestruction: 76.8,
    teamSize: 15,
    date: '2025-12-28',
    opponent: 'Shadow Clan',
  },
  {
    id: '5',
    result: 'tie' as const,
    stars: 40,
    opponentStars: 40,
    destruction: 85.3,
    opponentDestruction: 85.3,
    teamSize: 15,
    date: '2025-12-25',
    opponent: 'Iron Fist',
  },
];

const mockCWL = [
  {
    round: 1,
    opponent: 'Crystal Guardians',
    result: 'win' as const,
    stars: 43,
    opponentStars: 37,
    members: [
      { name: 'ClashMaster', attacks: 2, maxAttacks: 2, starsEarned: 6, destructionPercent: 100, defenseStars: 3 },
      { name: 'DragonSlayer', attacks: 2, maxAttacks: 2, starsEarned: 5, destructionPercent: 92, defenseStars: 2 },
      { name: 'ThunderBolt', attacks: 2, maxAttacks: 2, starsEarned: 6, destructionPercent: 100, defenseStars: 3 },
      { name: 'ShadowNinja', attacks: 2, maxAttacks: 2, starsEarned: 4, destructionPercent: 85, defenseStars: 1 },
      { name: 'IronFist', attacks: 1, maxAttacks: 2, starsEarned: 3, destructionPercent: 70, defenseStars: 2 },
    ],
  },
  {
    round: 2,
    opponent: 'Storm Raiders',
    result: 'loss' as const,
    stars: 38,
    opponentStars: 42,
    members: [
      { name: 'ClashMaster', attacks: 2, maxAttacks: 2, starsEarned: 5, destructionPercent: 95, defenseStars: 2 },
      { name: 'DragonSlayer', attacks: 2, maxAttacks: 2, starsEarned: 4, destructionPercent: 88, defenseStars: 1 },
      { name: 'ThunderBolt', attacks: 2, maxAttacks: 2, starsEarned: 5, destructionPercent: 90, defenseStars: 2 },
      { name: 'ShadowNinja', attacks: 2, maxAttacks: 2, starsEarned: 3, destructionPercent: 75, defenseStars: 1 },
      { name: 'IronFist', attacks: 2, maxAttacks: 2, starsEarned: 4, destructionPercent: 82, defenseStars: 2 },
    ],
  },
];

export default function WarPage() {
  const [activeSection, setActiveSection] = useState<'history' | 'cwl'>('history');
  const [expandedWar, setExpandedWar] = useState<string | null>(null);
  const [expandedCWL, setExpandedCWL] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">War</h1>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveSection('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeSection === 'history' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Swords size={14} />
          War History
        </button>
        <button
          onClick={() => setActiveSection('cwl')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeSection === 'cwl' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Trophy size={14} />
          CWL
        </button>
      </div>

      {/* War Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-card border border-border rounded-md p-3 text-center">
          <p className="text-lg font-bold text-success">
            {mockWarLog.filter((w) => w.result === 'win').length}
          </p>
          <p className="text-xs text-text-muted">Wins</p>
        </div>
        <div className="bg-bg-card border border-border rounded-md p-3 text-center">
          <p className="text-lg font-bold text-error">
            {mockWarLog.filter((w) => w.result === 'loss').length}
          </p>
          <p className="text-xs text-text-muted">Losses</p>
        </div>
        <div className="bg-bg-card border border-border rounded-md p-3 text-center">
          <p className="text-lg font-bold text-text-secondary">
            {mockWarLog.filter((w) => w.result === 'tie').length}
          </p>
          <p className="text-xs text-text-muted">Ties</p>
        </div>
      </div>

      {activeSection === 'history' ? (
        <div className="space-y-2">
          {mockWarLog.map((war) => (
            <div
              key={war.id}
              className="bg-bg-card border border-border rounded-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedWar(expandedWar === war.id ? null : war.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-bg-hover transition-colors"
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                  war.result === 'win' ? 'bg-success/10' :
                  war.result === 'loss' ? 'bg-error/10' : 'bg-bg-tertiary'
                }`}>
                  <span className={`text-xs font-bold ${
                    war.result === 'win' ? 'text-success' :
                    war.result === 'loss' ? 'text-error' : 'text-text-secondary'
                  }`}>
                    {war.result === 'win' ? 'W' : war.result === 'loss' ? 'L' : 'T'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">vs {war.opponent}</p>
                    <span className="text-xs text-text-muted">{war.date}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-text-secondary">
                      <span className="text-text-primary font-medium">{war.stars}</span>
                      <span className="text-text-muted"> vs </span>
                      <span className="font-medium">{war.opponentStars}</span>
                      <span className="text-text-muted"> ★</span>
                    </span>
                    <span className="text-xs text-text-muted">
                      {war.destruction.toFixed(0)}% vs {war.opponentDestruction.toFixed(0)}%
                    </span>
                  </div>
                </div>
                {expandedWar === war.id ? (
                  <ChevronDown size={16} className="text-text-muted" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {/* CWL Stats */}
          <div className="bg-bg-card border border-border rounded-md p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Season Progress</h3>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-bold text-text-primary">
                  {mockCWL.filter((r) => r.result === 'win').length}/{mockCWL.length}
                </p>
                <p className="text-xs text-text-muted">Wins</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-lg font-bold text-success">
                  {mockCWL.reduce((acc, r) => acc + r.stars, 0)}
                </p>
                <p className="text-xs text-text-muted">Total Stars</p>
              </div>
            </div>
          </div>

          {/* CWL Rounds */}
          {mockCWL.map((round) => (
            <div key={round.round} className="bg-bg-card border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setExpandedCWL(expandedCWL === round.round ? null : round.round)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-bg-hover transition-colors"
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                  round.result === 'win' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <span className="text-xs font-bold text-text-primary">R{round.round}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">vs {round.opponent}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      round.result === 'win' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {round.result.toUpperCase()}
                    </span>
                    <span className="text-xs text-text-muted">
                      {round.stars} ★ vs {round.opponentStars} ★
                    </span>
                  </div>
                </div>
                {expandedCWL === round.round ? (
                  <ChevronDown size={16} className="text-text-muted" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
              </button>

              {expandedCWL === round.round && (
                <div className="border-t border-border p-3">
                  <div className="space-y-2">
                    {round.members.map((member) => (
                      <div key={member.name} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-bg-tertiary rounded flex items-center justify-center">
                          <span className="text-xs text-text-muted">{member.name[0]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-text-primary">{member.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-text-muted">
                              {member.attacks}/{member.maxAttacks} attacks
                            </span>
                            <span className="text-xs text-text-muted">•</span>
                            <span className="text-xs text-text-secondary">{member.starsEarned}★</span>
                            <span className="text-xs text-text-muted">•</span>
                            <span className="text-xs text-text-secondary">{member.destructionPercent}%</span>
                          </div>
                        </div>
                        {/* Defense dots */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: member.maxAttacks }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < member.defenseStars ? 'bg-success' : 'bg-bg-tertiary'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
