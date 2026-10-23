import { useState } from 'react';
import { mockPlayer } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { TROOP_ICONS, HERO_ICONS, SPELL_ICONS } from '../data/assetMap';
import { Sword, Gem, Crown, FlaskConical, Sparkles, ChevronDown, ChevronRight, Home, Hammer } from 'lucide-react';

type ArmyCategory = 'troops' | 'heroes' | 'spells' | 'pets' | 'equipment';
type Village = 'home' | 'builder';

const categoryIcons: Record<ArmyCategory, React.ReactNode> = {
  troops: <Sword size={16} />,
  heroes: <Crown size={16} />,
  spells: <FlaskConical size={16} />,
  pets: <Sparkles size={16} />,
  equipment: <Gem size={16} />,
};

function getIconForCategory(cat: ArmyCategory, name: string): string | null {
  switch (cat) {
    case 'troops': return TROOP_ICONS[name] || null;
    case 'heroes': return HERO_ICONS[name] || null;
    case 'spells': return SPELL_ICONS[name] || null;
    default: return null;
  }
}

export default function ArmyPage() {
  const { darkMode } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<ArmyCategory>('troops');
  const [village, setVillage] = useState<Village>('home');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const categories: ArmyCategory[] = ['troops', 'heroes', 'spells', 'pets', 'equipment'];

  const getItems = () => {
    switch (activeCategory) {
      case 'troops':
        return mockPlayer.troops;
      case 'heroes':
        return mockPlayer.heroes;
      case 'spells':
        return mockPlayer.spells;
      default:
        return [];
    }
  };

  const items = getItems();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Army</h1>
      </div>

      {/* Village Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setVillage('home')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${village === 'home' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Home size={14} />
          Home Village
        </button>
        <button
          onClick={() => setVillage('builder')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${village === 'builder' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Hammer size={14} />
          Builder Base
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors
              ${activeCategory === cat
                ? 'bg-text-primary text-bg-primary'
                : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
              }`}
          >
            {categoryIcons[cat]}
            <span className="capitalize">{cat}</span>
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-bg-card border border-border rounded-md p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            {items.filter((i) => i.isMaxed).length}/{items.length} maxed
          </span>
          <span className="text-xs text-text-muted">
            {Math.round((items.filter((i) => i.isMaxed).length / Math.max(items.length, 1)) * 100)}% complete
          </span>
        </div>
        <div className="progress-bar mt-2">
          <div
            className="progress-bar-fill"
            style={{
              width: `${(items.filter((i) => i.isMaxed).length / Math.max(items.length, 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-bg-card border rounded-md overflow-hidden transition-colors
              ${item.isMaxed ? 'border-gold-dim' : 'border-border'}`}
          >
            <button
              onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-bg-hover transition-colors"
            >
              <div className={`w-10 h-10 rounded-md flex items-center justify-center overflow-hidden
                ${item.isMaxed ? 'bg-gold/10' : 'bg-bg-tertiary'}`}>
                {(() => {
                  const iconSrc = getIconForCategory(activeCategory, item.name);
                  if (iconSrc) {
                    return (
                      <img
                        src={iconSrc}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    );
                  }
                  return (
                    <span className={`text-sm font-bold ${item.isMaxed ? 'text-gold' : 'text-text-secondary'}`}>
                      {activeCategory === 'troops' ? '⚔' : activeCategory === 'heroes' ? '♛' : '✦'}
                    </span>
                  );
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${item.isMaxed ? 'text-gold' : 'text-text-primary'}`}>
                  {item.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Level {item.currentLevel} / {item.maxLevel}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {item.isMaxed && (
                  <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded">MAX</span>
                )}
                {expandedItem === item.id ? (
                  <ChevronDown size={16} className="text-text-muted" />
                ) : (
                  <ChevronRight size={16} className="text-text-muted" />
                )}
              </div>
            </button>

            {/* Expanded Level Table */}
            {expandedItem === item.id && (
              <div className="border-t border-border p-3">
                <LevelTable
                  currentLevel={item.currentLevel}
                  maxLevel={item.maxLevel}
                  village={village}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-sm">No items in this category yet.</p>
        </div>
      )}
    </div>
  );
}

function LevelTable({
  currentLevel,
  maxLevel,
  village,
}: {
  currentLevel: number;
  maxLevel: number;
  village: Village;
}) {
  const [showAll, setShowAll] = useState(false);
  const hiddenLevels = currentLevel - 1;

  // Generate mock level data
  const levels = Array.from({ length: maxLevel }, (_, i) => ({
    level: i + 1,
    cost: (i + 1) * 250000,
    time: (i + 1) * 43200,
    hp: (i + 1) * 100,
    dps: (i + 1) * 15,
  }));

  const visibleLevels = showAll ? levels : levels.filter((l) => l.level >= currentLevel);

  return (
    <div>
      {!showAll && hiddenLevels > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-text-muted hover:text-text-secondary mb-2"
        >
          {hiddenLevels} earlier levels hidden — tap to show
        </button>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-text-muted border-b border-border">
              <th className="text-left py-2 px-2 font-medium">Level</th>
              <th className="text-right py-2 px-2 font-medium">Cost</th>
              <th className="text-right py-2 px-2 font-medium">Time</th>
              <th className="text-right py-2 px-2 font-medium">HP</th>
              <th className="text-right py-2 px-2 font-medium">DPS</th>
            </tr>
          </thead>
          <tbody>
            {visibleLevels.map((level) => (
              <tr
                key={level.level}
                className={`border-b border-border/50
                  ${level.level === currentLevel ? 'bg-bg-hover' : ''}
                  ${level.level <= currentLevel ? 'text-text-muted' : 'text-text-primary'}`}
              >
                <td className="py-2 px-2">
                  {level.level === currentLevel && (
                    <span className="inline-block w-1.5 h-1.5 bg-text-primary rounded-full mr-1.5" />
                  )}
                  {level.level}
                </td>
                <td className="text-right py-2 px-2">{formatResource(level.cost)}</td>
                <td className="text-right py-2 px-2">{formatTime(level.time)}</td>
                <td className="text-right py-2 px-2">{level.hp}</td>
                <td className="text-right py-2 px-2">{level.dps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="text-xs text-text-muted hover:text-text-secondary mt-2"
        >
          Collapse to current level
        </button>
      )}
    </div>
  );
}

function formatResource(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

function formatTime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  if (d > 0) return `${d}d ${h}h`;
  return `${h}h`;
}
