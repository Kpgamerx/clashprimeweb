import { useAppStore } from '../store/useAppStore';
import { mockPlayer, mockEvents } from '../data/mockData';
import {
  Trophy,
  Star,
  Sword,
  Shield,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Crown,
  Gem,
} from 'lucide-react';

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function formatTime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function HomePage() {
  const { darkMode, accounts, activeAccountId, setActiveAccount } = useAppStore();
  const player = mockPlayer;
  const activeAccount = accounts.find((a) => a.id === activeAccountId);

  const maxedTroops = player.troops.filter((t) => t.isMaxed).length;
  const maxedSpells = player.spells.filter((s) => s.isMaxed).length;
  const maxedBuildings = player.buildings.filter((b) => b.isMaxed).length;
  const totalTroops = player.troops.length;
  const totalSpells = player.spells.length;
  const totalBuildings = player.buildings.length;

  const maxedHeroes = player.heroes.filter((h) => h.isMaxed).length;
  const totalHeroes = player.heroes.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Home</h1>
          <p className="text-sm text-text-secondary mt-1">
            {player.name} • TH{player.townHallLevel}
          </p>
        </div>
        {/* Account Switcher */}
        <div className="relative">
          <select
            value={activeAccountId}
            onChange={(e) => setActiveAccount(e.target.value)}
            className="bg-bg-card border border-border rounded-md px-3 py-2 text-sm text-text-primary appearance-none cursor-pointer"
          >
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} (TH{acc.townHallLevel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* League Card */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-bg-tertiary rounded-md flex items-center justify-center">
            <Crown size={24} className="text-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary">League</p>
            <p className="text-base font-semibold text-text-primary">{player.league.name}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-text-primary">
              <Trophy size={16} className="text-gold" />
              <span className="font-semibold">{formatNumber(player.trophies)}</span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">Best: {formatNumber(player.bestTrophies)}</p>
          </div>
        </div>
        {/* League Bonus */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">War Bonus</p>
            <p className="text-sm font-semibold text-text-primary mt-1">
              <Gem size={12} className="inline mr-1 text-purple-400" />
              36%
            </p>
          </div>
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Loot Bonus</p>
            <p className="text-sm font-semibold text-text-primary mt-1">
              40% extra
            </p>
          </div>
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Ore Bonus</p>
            <p className="text-sm font-semibold text-text-primary mt-1">
              +15%
            </p>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 gap-3">
        <ProgressCard
          title="Troops"
          current={maxedTroops}
          total={totalTroops}
          icon={<Sword size={16} />}
        />
        <ProgressCard
          title="Spells"
          current={maxedSpells}
          total={totalSpells}
          icon={<Gem size={16} />}
        />
        <ProgressCard
          title="Heroes"
          current={maxedHeroes}
          total={totalHeroes}
          icon={<Crown size={16} />}
        />
        <ProgressCard
          title="Buildings"
          current={maxedBuildings}
          total={totalBuildings}
          icon={<Shield size={16} />}
        />
      </div>

      {/* Quick Stats */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatRow icon={<Star size={14} />} label="War Stars" value={formatNumber(player.warStars)} />
          <StatRow icon={<Sword size={14} />} label="Attack Wins" value={player.attackWins.toString()} />
          <StatRow icon={<Shield size={14} />} label="Defense Wins" value={player.defenseWins.toString()} />
          <StatRow icon={<Users size={14} />} label="Donations" value={formatNumber(player.donations)} />
          <StatRow icon={<TrendingUp size={14} />} label="Exp Level" value={player.expLevel.toString()} />
          <StatRow icon={<Clock size={14} />} label="Builders" value={`${activeAccount?.homeBuilders || 6}/6`} />
        </div>
      </div>

      {/* Clan Info */}
      {player.clan && (
        <div className="bg-bg-card border border-border rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bg-tertiary rounded-md flex items-center justify-center">
                <Users size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{player.clan.name}</p>
                <p className="text-xs text-text-muted">Level {player.clan.clanLevel}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Upcoming Events</h3>
          <button
            onClick={() => useAppStore.getState().setActiveTab('events')}
            className="text-xs text-text-secondary hover:text-text-primary"
          >
            See all
          </button>
        </div>
        <div className="space-y-3">
          {mockEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">{event.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{event.description.slice(0, 40)}...</p>
              </div>
              <div className="text-right">
                <span className="text-xs px-2 py-1 bg-bg-tertiary rounded text-text-secondary">
                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Progress */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Heroes</h3>
        <div className="space-y-3">
          {player.heroes.map((hero) => (
            <div key={hero.id} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-bg-tertiary rounded-md flex items-center justify-center">
                <Crown size={14} className={hero.isMaxed ? 'text-gold' : 'text-text-secondary'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-primary">{hero.name}</p>
                  <span className={`text-xs font-medium ${hero.isMaxed ? 'text-gold' : 'text-text-secondary'}`}>
                    Lv.{hero.currentLevel}/{hero.maxLevel}
                  </span>
                </div>
                <div className="progress-bar mt-1.5">
                  <div
                    className={`progress-bar-fill ${hero.isMaxed ? 'bg-gold' : ''}`}
                    style={{ width: `${(hero.currentLevel / hero.maxLevel) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Synced */}
      {activeAccount && (
        <p className="text-xs text-text-muted text-center">
          Last synced: {new Date(activeAccount.lastSynced).toLocaleString()}
        </p>
      )}
    </div>
  );
}

function ProgressCard({
  title,
  current,
  total,
  icon,
}: {
  title: string;
  current: number;
  total: number;
  icon: React.ReactNode;
}) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  const isMaxed = current === total;

  return (
    <div className={`bg-bg-card border rounded-md p-4 ${isMaxed ? 'border-gold-dim gold-glow' : 'border-border'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={isMaxed ? 'text-gold' : 'text-text-secondary'}>{icon}</span>
        <p className="text-xs text-text-secondary">{title}</p>
      </div>
      <p className={`text-lg font-bold ${isMaxed ? 'text-gold' : 'text-text-primary'}`}>
        {current}/{total}
      </p>
      <div className="progress-bar mt-2">
        <div
          className={`progress-bar-fill ${isMaxed ? 'bg-gold' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted">{icon}</span>
      <span className="text-xs text-text-secondary flex-1">{label}</span>
      <span className="text-xs font-medium text-text-primary">{value}</span>
    </div>
  );
}
