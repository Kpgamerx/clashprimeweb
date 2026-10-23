import { useState } from 'react';
import { mockPlayer } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { Building2, ChevronDown, ChevronRight, Home, Hammer, Filter } from 'lucide-react';
import { BuildingCategory } from '../types/coc';

type Village = 'home' | 'builder';

const categoryLabels: Record<BuildingCategory, string> = {
  resources: 'Resources',
  army: 'Army',
  defense: 'Defense',
  traps: 'Traps',
  walls: 'Walls',
  heroes: 'Heroes',
  crafted: 'Crafted Defenses',
};

const categoryOrder: BuildingCategory[] = ['defense', 'resources', 'army', 'traps', 'walls', 'heroes', 'crafted'];

export default function BuildingsPage() {
  const { darkMode, settings } = useAppStore();
  const [village, setVillage] = useState<Village>('home');
  const [expandedBuilding, setExpandedBuilding] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<BuildingCategory | 'all'>('all');

  const buildings = mockPlayer.buildings.filter((b) => b.village === village);
  const filteredBuildings = filterCategory === 'all'
    ? buildings
    : buildings.filter((b) => b.category === filterCategory);

  // Group by category
  const grouped = categoryOrder.reduce((acc, cat) => {
    const items = filteredBuildings.filter((b) => b.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<BuildingCategory, typeof buildings>);

  const totalMaxed = buildings.filter((b) => b.isMaxed).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Buildings</h1>
        <span className="text-sm text-text-secondary">
          {totalMaxed}/{buildings.length} maxed
        </span>
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

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
            ${filterCategory === 'all' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          All
        </button>
        {categoryOrder.map((cat) => {
          const count = buildings.filter((b) => b.category === cat).length;
          if (count === 0) return null;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
                ${filterCategory === cat ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
            >
              {categoryLabels[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* Buildings by Category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">
            {categoryLabels[category as BuildingCategory]} ({items.length})
          </h3>
          {items.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              isExpanded={expandedBuilding === building.id}
              onToggle={() => setExpandedBuilding(expandedBuilding === building.id ? null : building.id)}
              discount={settings.buildingDiscount}
            />
          ))}
        </div>
      ))}

      {filteredBuildings.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No buildings found.</p>
        </div>
      )}
    </div>
  );
}

function BuildingCard({
  building,
  isExpanded,
  onToggle,
  discount,
}: {
  building: typeof mockPlayer.buildings[0];
  isExpanded: boolean;
  onToggle: () => void;
  discount: number;
}) {
  const hasMultipleCopies = building.copies && building.copies.length > 1;
  const uniqueLevels = building.copies ? [...new Set(building.copies)].sort((a, b) => b - a) : [];

  return (
    <div className={`bg-bg-card border rounded-md overflow-hidden
      ${building.isMaxed ? 'border-gold-dim' : 'border-border'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-bg-hover transition-colors"
      >
        <div className={`w-10 h-10 rounded-md flex items-center justify-center
          ${building.isMaxed ? 'bg-gold/10' : 'bg-bg-tertiary'}`}>
          <Building2 size={18} className={building.isMaxed ? 'text-gold' : 'text-text-secondary'} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium truncate ${building.isMaxed ? 'text-gold' : 'text-text-primary'}`}>
              {building.name}
            </p>
            {building.isMaxed && (
              <span className="text-xs px-1.5 py-0.5 bg-gold/10 text-gold rounded">MAX</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {hasMultipleCopies ? (
              <span className="text-xs text-text-muted">
                {uniqueLevels.map((l, i) => (
                  <span key={i}>
                    {l > 0 && <span className={l === building.copies![0] ? 'text-text-secondary' : 'text-text-muted'}>×{building.copies!.filter(c => c === l).length}@Lv.{l}</span>}
                    {i < uniqueLevels.length - 1 && ' '}
                  </span>
                ))}
              </span>
            ) : (
              <span className="text-xs text-text-muted">
                Level {building.currentLevel}/{building.maxLevel}
              </span>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown size={16} className="text-text-muted shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-text-muted shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border p-3 space-y-3">
          {/* Per-copy levels for multi-copy buildings */}
          {hasMultipleCopies && building.copies && (
            <div>
              <p className="text-xs text-text-muted mb-2">Per-copy levels</p>
              <div className="flex flex-wrap gap-1.5">
                {building.copies.map((level, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      level >= building.maxLevel
                        ? 'bg-gold/10 text-gold'
                        : 'bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    #{i + 1}: Lv.{level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Level progression */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-text-muted border-b border-border">
                  <th className="text-left py-1.5 px-2 font-medium">Level</th>
                  <th className="text-right py-1.5 px-2 font-medium">Cost</th>
                  <th className="text-right py-1.5 px-2 font-medium">Build Time</th>
                  <th className="text-right py-1.5 px-2 font-medium">HP</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: building.maxLevel }, (_, i) => {
                  const level = i + 1;
                  const cost = level * 100000;
                  const discountedCost = Math.round(cost * (1 - discount / 100));
                  const time = level * 43200;
                  const hp = level * 800;
                  const isCurrentOrBelow = level <= building.currentLevel;

                  return (
                    <tr
                      key={level}
                      className={`border-b border-border/50 ${
                        level === building.currentLevel ? 'bg-bg-hover' : ''
                      } ${isCurrentOrBelow ? 'text-text-muted' : 'text-text-primary'}`}
                    >
                      <td className="py-1.5 px-2">
                        {level === building.currentLevel && (
                          <span className="inline-block w-1.5 h-1.5 bg-text-primary rounded-full mr-1.5" />
                        )}
                        {level}
                      </td>
                      <td className="text-right py-1.5 px-2">
                        {formatResource(discountedCost)}
                        {discount > 0 && level > building.currentLevel && (
                          <span className="text-text-muted line-through ml-1">
                            {formatResource(cost)}
                          </span>
                        )}
                      </td>
                      <td className="text-right py-1.5 px-2">{formatTime(time)}</td>
                      <td className="text-right py-1.5 px-2">{hp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
