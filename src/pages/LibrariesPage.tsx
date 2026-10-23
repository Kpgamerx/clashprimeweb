import { useState } from 'react';
import { mockBaseLayouts, mockArmyCompositions, mockPlayer } from '../data/mockData';
import { TROOP_ICONS, SPELL_ICONS, HERO_ICONS } from '../data/assetMap';
import { BookOpen, LayoutGrid, Users, Star, Heart, ExternalLink, Copy, Search, Filter } from 'lucide-react';

type LibraryTab = 'bases' | 'armies';

export default function LibrariesPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('bases');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Libraries</h1>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('bases')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === 'bases' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <LayoutGrid size={14} />
          Base Library
        </button>
        <button
          onClick={() => setActiveTab('armies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === 'armies' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Users size={14} />
          Army Library
        </button>
      </div>

      {activeTab === 'bases' ? <BaseLibrary /> : <ArmyLibrary />}
    </div>
  );
}

function BaseLibrary() {
  const [thFilter, setThFilter] = useState<number | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filtered = mockBaseLayouts
    .filter((b) => !thFilter || b.townHallLevel === thFilter)
    .filter((b) => sourceFilter === 'all' || b.source === sourceFilter)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

  const thLevels = [...new Set(mockBaseLayouts.map((b) => b.townHallLevel).filter(Boolean))].sort((a, b) => b - a);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setThFilter(null)}
          className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
            ${!thFilter ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          All TH
        </button>
        {thLevels.map((th) => (
          <button
            key={th}
            onClick={() => setThFilter(th)}
            className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
              ${thFilter === th ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
          >
            TH{th}
          </button>
        ))}
      </div>

      {/* Source filter */}
      <div className="flex gap-2">
        {['all', 'clashly', 'clash-bases'].map((source) => (
          <button
            key={source}
            onClick={() => setSourceFilter(source)}
            className={`px-3 py-1.5 rounded-md text-xs transition-colors
              ${sourceFilter === source ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
          >
            {source === 'all' ? 'Both' : source === 'clashly' ? 'ClashLy' : 'Clash Bases'}
          </button>
        ))}
      </div>

      {/* Base Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((base) => (
          <div key={base.id} className="bg-bg-card border border-border rounded-md overflow-hidden hover:border-border-light transition-colors">
            {/* Base Image Placeholder */}
            <div className="aspect-square bg-bg-tertiary flex items-center justify-center relative">
              <LayoutGrid size={32} className="text-text-muted" />
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="text-xs px-2 py-0.5 bg-bg-primary/80 text-text-secondary rounded">
                  {base.townHallLevel > 0 ? `TH${base.townHallLevel}` : `BH${base.builderHallLevel}`}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 flex gap-1">
                {base.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 bg-bg-primary/80 text-text-muted rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-text-primary truncate">{base.name}</h3>
              <p className="text-xs text-text-muted mt-1 line-clamp-2">{base.description}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {base.rating && (
                    <span className="flex items-center gap-0.5 text-xs text-text-secondary">
                      <Star size={10} className="text-gold" />
                      {base.rating.toFixed(1)}
                    </span>
                  )}
                  {base.popularity && (
                    <span className="text-xs text-text-muted">{base.popularity.toLocaleString()} uses</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-text-muted px-1.5 py-0.5 bg-bg-tertiary rounded">
                    {base.source === 'clashly' ? 'ClashLy' : 'Clash Bases'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-hover rounded text-xs text-text-secondary transition-colors">
                  <ExternalLink size={12} />
                  Open
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-hover rounded text-xs text-text-secondary transition-colors">
                  <Copy size={12} />
                  Copy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <LayoutGrid size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No bases match your filters.</p>
        </div>
      )}
    </div>
  );
}

function ArmyLibrary() {
  const [thFilter, setThFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockArmyCompositions
    .filter((a) => !thFilter || a.townHallLevel === thFilter)
    .filter((a) => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const thLevels = [...new Set(mockArmyCompositions.map((a) => a.townHallLevel))].sort((a, b) => b - a);

  // Calculate "your progress" score
  const getProgressScore = (army: typeof mockArmyCompositions[0]) => {
    const playerTH = mockPlayer.townHallLevel;
    if (army.townHallLevel > playerTH) return null;

    let troopScore = 0;
    let troopTotal = 0;
    let heroScore = 0;
    let heroTotal = 0;

    army.troops.forEach((t) => {
      const playerTroop = mockPlayer.troops.find((pt) => pt.name === t.name);
      troopTotal++;
      if (playerTroop) {
        troopScore += Math.min(playerTroop.currentLevel / t.level, 1);
      }
    });

    army.heroes.forEach((h) => {
      const playerHero = mockPlayer.heroes.find((ph) => ph.name === h.name);
      heroTotal++;
      if (playerHero) {
        heroScore += Math.min(playerHero.currentLevel / h.level, 1);
      }
    });

    const troopPercent = troopTotal > 0 ? Math.round((troopScore / troopTotal) * 100) : 0;
    const heroPercent = heroTotal > 0 ? Math.round((heroScore / heroTotal) * 100) : 0;

    return { troops: troopPercent, heroes: heroPercent };
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search armies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-md pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-light"
        />
      </div>

      {/* TH Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setThFilter(null)}
          className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
            ${!thFilter ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          All TH
        </button>
        {thLevels.map((th) => (
          <button
            key={th}
            onClick={() => setThFilter(th)}
            className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors
              ${thFilter === th ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
          >
            TH{th}
          </button>
        ))}
      </div>

      {/* Army Cards */}
      <div className="space-y-3">
        {filtered.map((army) => {
          const progress = getProgressScore(army);
          return (
            <div key={army.id} className="bg-bg-card border border-border rounded-md p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-primary">{army.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-bg-tertiary text-text-muted rounded">
                      TH{army.townHallLevel}
                    </span>
                  </div>

                  {/* Your Progress Score */}
                  {progress && (
                    <div className="flex gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-text-muted">Troops:</span>
                        <span className={`text-xs font-medium ${
                          progress.troops >= 80 ? 'text-success' :
                          progress.troops >= 50 ? 'text-warning' : 'text-error'
                        }`}>
                          {progress.troops}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-text-muted">Heroes:</span>
                        <span className={`text-xs font-medium ${
                          progress.heroes >= 80 ? 'text-success' :
                          progress.heroes >= 50 ? 'text-warning' : 'text-error'
                        }`}>
                          {progress.heroes}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Troops */}
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-text-muted font-medium">Troops</p>
                    <div className="flex flex-wrap gap-1.5">
                      {army.troops.map((t, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-bg-tertiary text-text-secondary rounded">
                          {TROOP_ICONS[t.name] && (
                            <img src={TROOP_ICONS[t.name]} alt={t.name} className="w-4 h-4 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          )}
                          {t.name} ×{t.count}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spells */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-text-muted font-medium">Spells</p>
                    <div className="flex flex-wrap gap-1.5">
                      {army.spells.map((s, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-bg-tertiary text-text-secondary rounded">
                          {SPELL_ICONS[s.name] && (
                            <img src={SPELL_ICONS[s.name]} alt={s.name} className="w-4 h-4 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          )}
                          {s.name} ×{s.count}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heroes */}
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-text-muted font-medium">Heroes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {army.heroes.map((h, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-bg-tertiary text-text-secondary rounded">
                          {HERO_ICONS[h.name] && (
                            <img src={HERO_ICONS[h.name]} alt={h.name} className="w-4 h-4 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          )}
                          {h.name} Lv.{h.level}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-hover rounded text-xs text-text-secondary transition-colors">
                  <Copy size={12} />
                  Copy
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-hover rounded text-xs text-text-secondary transition-colors">
                  <Heart size={12} />
                  {army.favorites}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Users size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No armies match your filters.</p>
        </div>
      )}
    </div>
  );
}
