import { useState } from 'react';
import { Zap, Target, Wrench, Calculator, ArrowUpRight, Check, X, AlertTriangle } from 'lucide-react';
import { SPELL_ICONS } from '../data/assetMap';

type ToolTab = 'zapquaker' | 'giantarrow' | 'bob';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolTab>('zapquaker');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Tools</h1>
      </div>

      {/* Tool Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTool('zapquaker')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTool === 'zapquaker' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Zap size={14} />
          Zapquaker
        </button>
        <button
          onClick={() => setActiveTool('giantarrow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTool === 'giantarrow' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Target size={14} />
          Giant Arrow
        </button>
        <button
          onClick={() => setActiveTool('bob')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTool === 'bob' ? 'bg-text-primary text-bg-primary' : 'bg-bg-card border border-border text-text-secondary'}`}
        >
          <Wrench size={14} />
          6th Builder
        </button>
      </div>

      {activeTool === 'zapquaker' ? <ZapquakerTool /> : activeTool === 'giantarrow' ? <GiantArrowTool /> : <BobTool />}
    </div>
  );
}

// Zapquaker Calculator
function ZapquakerTool() {
  const [lightningLevel, setLightningLevel] = useState(12);
  const [earthquakeLevel, setEarthquakeLevel] = useState(9);
  const [lightningCount, setLightningCount] = useState(4);
  const [earthquakeCount, setEarthquakeCount] = useState(2);
  const [buildingHp, setBuildingHp] = useState(9500);
  const [buildingName, setBuildingName] = useState('Inferno Tower');

  // Damage calculations
  const lightningDamage = lightningLevel * 280; // approximate per strike
  const eqPercentPerHit = 0.14 + (earthquakeLevel - 1) * 0.02; // ~14-28%
  
  // Calculate total earthquake damage (diminishing)
  let remainingHp = buildingHp;
  let eqDamage = 0;
  for (let i = 0; i < earthquakeCount; i++) {
    const damage = remainingHp * eqPercentPerHit;
    eqDamage += damage;
    remainingHp -= damage;
  }

  const totalLightningDamage = lightningDamage * lightningCount;
  const totalDamage = totalLightningDamage + eqDamage;
  const overkill = Math.max(0, ((totalDamage - buildingHp) / buildingHp) * 100);
  const canKill = totalDamage >= buildingHp;
  const spellSlots = lightningCount + earthquakeCount;

  const buildings = [
    { name: 'Inferno Tower', hp: 9500 },
    { name: 'Eagle Artillery', hp: 8500 },
    { name: 'X-Bow', hp: 4200 },
    { name: 'Air Defense', hp: 5000 },
    { name: 'Wizard Tower', hp: 4500 },
    { name: 'Mortar', hp: 4000 },
    { name: 'Town Hall', hp: 10500 },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Building Target</h3>
        <div className="flex gap-2 flex-wrap">
          {buildings.map((b) => (
            <button
              key={b.name}
              onClick={() => { setBuildingName(b.name); setBuildingHp(b.hp); }}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors
                ${buildingName === b.name ? 'bg-text-primary text-bg-primary' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover'}`}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-text-muted">HP:</span>
          <input
            type="number"
            value={buildingHp}
            onChange={(e) => setBuildingHp(Number(e.target.value))}
            className="bg-bg-tertiary border border-border rounded px-2 py-1 text-sm text-text-primary w-24"
          />
        </div>
      </div>

      {/* Spell Configuration */}
      <div className="bg-bg-card border border-border rounded-md p-4 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Spell Configuration</h3>
        
        {/* Lightning */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              {SPELL_ICONS['Lightning Spell'] && (
                <img src={SPELL_ICONS['Lightning Spell']} alt="" className="w-4 h-4 object-contain" />
              )}
              Lightning Spell
            </span>
            <span className="text-xs text-text-muted">Level {lightningLevel}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={13}
              value={lightningLevel}
              onChange={(e) => setLightningLevel(Number(e.target.value))}
              className="flex-1 accent-text-primary"
            />
            <div className="flex items-center gap-1">
              <button onClick={() => setLightningCount(Math.max(0, lightningCount - 1))} className="w-6 h-6 bg-bg-tertiary rounded flex items-center justify-center text-text-secondary text-xs">-</button>
              <span className="w-6 text-center text-sm text-text-primary">{lightningCount}</span>
              <button onClick={() => setLightningCount(Math.min(6, lightningCount + 1))} className="w-6 h-6 bg-bg-tertiary rounded flex items-center justify-center text-text-secondary text-xs">+</button>
            </div>
          </div>
          <p className="text-xs text-text-muted">Damage per strike: ~{lightningDamage}</p>
        </div>

        {/* Earthquake */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              {SPELL_ICONS['Earthquake Spell'] && (
                <img src={SPELL_ICONS['Earthquake Spell']} alt="" className="w-4 h-4 object-contain" />
              )}
              Earthquake Spell
            </span>
            <span className="text-xs text-text-muted">Level {earthquakeLevel}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={9}
              value={earthquakeLevel}
              onChange={(e) => setEarthquakeLevel(Number(e.target.value))}
              className="flex-1 accent-text-primary"
            />
            <div className="flex items-center gap-1">
              <button onClick={() => setEarthquakeCount(Math.max(0, earthquakeCount - 1))} className="w-6 h-6 bg-bg-tertiary rounded flex items-center justify-center text-text-secondary text-xs">-</button>
              <span className="w-6 text-center text-sm text-text-primary">{earthquakeCount}</span>
              <button onClick={() => setEarthquakeCount(Math.min(4, earthquakeCount + 1))} className="w-6 h-6 bg-bg-tertiary rounded flex items-center justify-center text-text-secondary text-xs">+</button>
            </div>
          </div>
          <p className="text-xs text-text-muted">% per hit: ~{(eqPercentPerHit * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Result */}
      <div className={`border rounded-md p-4 ${canKill ? 'bg-success/5 border-success/30' : 'bg-error/5 border-error/30'}`}>
        <div className="flex items-center gap-2 mb-3">
          {canKill ? <Check size={16} className="text-success" /> : <X size={16} className="text-error" />}
          <span className={`text-sm font-semibold ${canKill ? 'text-success' : 'text-error'}`}>
            {canKill ? 'Can Kill!' : 'Not Enough Damage'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-text-muted">Total Damage</p>
            <p className="text-lg font-bold text-text-primary">{Math.round(totalDamage).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted">Building HP</p>
            <p className="text-lg font-bold text-text-primary">{buildingHp.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted">Spell Slots</p>
            <p className="text-sm font-medium text-text-primary">{spellSlots}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted">Overkill</p>
            <p className={`text-sm font-medium ${overkill > 50 ? 'text-warning' : 'text-text-primary'}`}>
              {overkill.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Cheapest combos suggestion */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Cheapest Kill Combos</h3>
        <div className="space-y-2">
          {[
            { l: 3, e: 2, desc: '3 Lightning + 2 EQ' },
            { l: 4, e: 1, desc: '4 Lightning + 1 EQ' },
            { l: 5, e: 1, desc: '5 Lightning + 1 EQ' },
          ].map((combo, i) => {
            const cLightningDmg = lightningLevel * 280 * combo.l;
            let cRemaining = buildingHp;
            let cEqDmg = 0;
            for (let j = 0; j < combo.e; j++) {
              const d = cRemaining * eqPercentPerHit;
              cEqDmg += d;
              cRemaining -= d;
            }
            const cTotal = cLightningDmg + cEqDmg;
            const cCanKill = cTotal >= buildingHp;
            return (
              <div key={i} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-text-secondary">{combo.desc}</span>
                <span className={`text-xs font-medium ${cCanKill ? 'text-success' : 'text-error'}`}>
                  {cCanKill ? `${Math.round(cTotal).toLocaleString()} dmg` : 'Not enough'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Giant Arrow Tool
function GiantArrowTool() {
  const [rocketMode, setRocketMode] = useState(false);
  const [startX, setStartX] = useState(50);
  const [startY, setStartY] = useState(80);
  const [endX, setEndX] = useState(50);
  const [endY, setEndY] = useState(20);

  return (
    <div className="space-y-4">
      <div className="bg-bg-card border border-border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Arrow Path Planner</h3>
          <button
            onClick={() => setRocketMode(!rocketMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors
              ${rocketMode ? 'bg-warning/10 text-warning' : 'bg-bg-tertiary text-text-secondary'}`}
          >
            <ArrowUpRight size={12} />
            Rocket Backpack
          </button>
        </div>
        <p className="text-xs text-text-muted mb-3">
          {rocketMode
            ? 'Rocket Backpack mode: Arrow path goes through base center'
            : 'Tap/drag to set start and end positions for the arrow path'}
        </p>

        {/* Canvas Area */}
        <div className="relative aspect-square bg-bg-tertiary rounded-md overflow-hidden border border-border">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h${i}`} className="absolute w-full border-t border-text-muted" style={{ top: `${i * 10}%` }} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v${i}`} className="absolute h-full border-l border-text-muted" style={{ left: `${i * 10}%` }} />
            ))}
          </div>

          {/* Base center marker for rocket mode */}
          {rocketMode && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-warning rounded-full" />
          )}

          {/* Path line */}
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke={rocketMode ? '#FBBF24' : '#FAFAFA'}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Start pin */}
          <div
            className="absolute w-4 h-4 bg-success rounded-full border-2 border-bg-primary -translate-x-1/2 -translate-y-1/2 cursor-move"
            style={{ left: `${startX}%`, top: `${startY}%` }}
          />

          {/* End pin */}
          <div
            className="absolute w-4 h-4 bg-error rounded-full border-2 border-bg-primary -translate-x-1/2 -translate-y-1/2 cursor-move"
            style={{ left: `${endX}%`, top: `${endY}%` }}
          />

          {/* Instructions */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-xs text-text-muted bg-bg-primary/80 px-2 py-1 rounded">
              Upload a base screenshot to plan your arrow path
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-3 flex gap-2">
          <button className="flex-1 px-3 py-2 bg-bg-tertiary hover:bg-bg-hover rounded-md text-xs text-text-secondary transition-colors">
            Upload Screenshot
          </button>
          <button className="flex-1 px-3 py-2 bg-bg-tertiary hover:bg-bg-hover rounded-md text-xs text-text-secondary transition-colors">
            Reset Pins
          </button>
          <button className="flex-1 px-3 py-2 bg-text-primary text-bg-primary rounded-md text-xs font-medium hover:opacity-90 transition-opacity">
            Export PNG
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Tips</h3>
        <ul className="space-y-1.5">
          <li className="text-xs text-text-secondary flex items-start gap-2">
            <AlertTriangle size={12} className="text-warning shrink-0 mt-0.5" />
            Arrow travels in a straight line — plan around obstacles
          </li>
          <li className="text-xs text-text-secondary flex items-start gap-2">
            <AlertTriangle size={12} className="text-warning shrink-0 mt-0.5" />
            Rocket Backpack mode centers the pivot on the base
          </li>
          <li className="text-xs text-text-secondary flex items-start gap-2">
            <AlertTriangle size={12} className="text-warning shrink-0 mt-0.5" />
            Export as 3x PNG for high-res sharing
          </li>
        </ul>
      </div>
    </div>
  );
}

// 6th Builder (B.O.B.) Tool
function BobTool() {
  const requirements = [
    { id: 'gear1', name: 'Gear-up Cannon → Double Cannon', done: true, type: 'gear' },
    { id: 'gear2', name: 'Gear-up Archer Tower → Multi Archer Tower', done: true, type: 'gear' },
    { id: 'gear3', name: 'Gear-up Mortar → Ricochet Mortar', done: false, type: 'gear' },
    { id: 'troop', name: 'Any troop to level 18', done: true, type: 'troop' },
    { id: 'defense', name: 'Any defense to level 9', done: true, type: 'defense' },
    { id: 'bm', name: 'Builder Machine + Copter to 45', done: false, type: 'machine' },
    { id: 'bob', name: 'B.O.B Control to level 5', done: false, type: 'bob' },
  ];

  const completedCount = requirements.filter((r) => r.done).length;
  const totalCount = requirements.length;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-text-primary">B.O.B. Unlock Progress</h3>
          <span className="text-sm font-bold text-text-primary">{completedCount}/{totalCount}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2">
          {totalCount - completedCount} requirements remaining
        </p>
      </div>

      {/* Requirements Checklist */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Requirements</h3>
        <div className="space-y-2">
          {requirements.map((req) => (
            <div key={req.id} className="flex items-center gap-3 py-2">
              <button className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${req.done ? 'bg-success border-success' : 'border-border hover:border-text-muted'}`}>
                {req.done && <Check size={12} className="text-bg-primary" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm ${req.done ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                  {req.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {req.type === 'gear' && 'Home Village → Builder Base gear-up'}
                  {req.type === 'troop' && 'Builder Base troop upgrade'}
                  {req.type === 'defense' && 'Builder Base defense upgrade'}
                  {req.type === 'machine' && 'Builder Hall 6+ required'}
                  {req.type === 'bob' && 'Builder Hall 9 required'}
                </p>
              </div>
              {!req.done && (
                <AlertTriangle size={14} className="text-warning" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* What's Blocking You */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">What's Blocking You</h3>
        <div className="space-y-2">
          {requirements.filter((r) => !r.done).map((req) => (
            <div key={req.id} className="flex items-start gap-2 py-1.5">
              <div className="w-1.5 h-1.5 bg-warning rounded-full mt-1.5 shrink-0" />
              <div>
                <p className="text-xs text-text-primary font-medium">{req.name}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {req.type === 'gear' && 'Upgrade the corresponding Home Village building first, then gear it up in Builder Base'}
                  {req.type === 'machine' && 'Upgrade Builder Machines to level 45 total. Focus on Builder Machine and Battle Copter'}
                  {req.type === 'bob' && 'Reach Builder Hall 9 and upgrade B.O.B Control. Requires ~2.5M dark elixir'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Estimate */}
      <div className="bg-bg-card border border-border rounded-md p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Estimated Resources Needed</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Gold</p>
            <p className="text-sm font-medium text-text-primary mt-1">~4.2M</p>
          </div>
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Elixir</p>
            <p className="text-sm font-medium text-text-primary mt-1">~3.8M</p>
          </div>
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Dark Elixir</p>
            <p className="text-sm font-medium text-text-primary mt-1">~125K</p>
          </div>
          <div className="bg-bg-tertiary rounded-md p-3">
            <p className="text-xs text-text-muted">Builder Time</p>
            <p className="text-sm font-medium text-text-primary mt-1">~18 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
