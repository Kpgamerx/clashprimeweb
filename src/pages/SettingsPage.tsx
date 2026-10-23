import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { APP_ICON, DEVELOPER_AVATAR } from '../data/assetMap';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Key,
  Eye,
  EyeOff,
  Users,
  ChevronDown,
  ChevronRight,
  Info,
  Shield,
  Heart,
  Bug,
  Globe,
  Percent,
} from 'lucide-react';

export default function SettingsPage() {
  const {
    darkMode,
    toggleDarkMode,
    settings,
    updateSettings,
    accounts,
    activeAccountId,
    setActiveAccount,
    removeAccount,
  } = useAppStore();

  const [showToken, setShowToken] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('account');
  const [tokenInput, setTokenInput] = useState(settings.apiToken);

  const sections = [
    { id: 'account', label: 'Account', icon: <Users size={16} />, description: 'Manage player accounts' },
    { id: 'api', label: 'API Token', icon: <Key size={16} />, description: 'Clash of Clans API access' },
    { id: 'appearance', label: 'Appearance', icon: darkMode ? <Moon size={16} /> : <Sun size={16} />, description: 'Theme and display' },
    { id: 'discounts', label: 'Discounts', icon: <Percent size={16} />, description: 'Cost and time reductions' },
    { id: 'display', label: 'Display', icon: <Globe size={16} />, description: 'Level tables and data' },
    { id: 'about', label: 'About', icon: <Info size={16} />, description: 'App info and credits' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="bg-bg-card border border-border rounded-md overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-bg-hover transition-colors"
            >
              <span className="text-text-secondary">{section.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{section.label}</p>
                <p className="text-xs text-text-muted">{section.description}</p>
              </div>
              {expandedSection === section.id ? (
                <ChevronDown size={16} className="text-text-muted" />
              ) : (
                <ChevronRight size={16} className="text-text-muted" />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="border-t border-border p-4">
                {section.id === 'account' && (
                  <AccountSection
                    accounts={accounts}
                    activeAccountId={activeAccountId}
                    setActiveAccount={setActiveAccount}
                    removeAccount={removeAccount}
                  />
                )}
                {section.id === 'api' && (
                  <ApiSection
                    token={tokenInput}
                    setToken={setTokenInput}
                    showToken={showToken}
                    setShowToken={setShowToken}
                    onSave={() => updateSettings({ apiToken: tokenInput })}
                  />
                )}
                {section.id === 'appearance' && (
                  <AppearanceSection
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    baseSources={settings.baseSources}
                    setBaseSources={(v) => updateSettings({ baseSources: v })}
                  />
                )}
                {section.id === 'discounts' && (
                  <DiscountsSection
                    buildingDiscount={settings.buildingDiscount}
                    armyDiscount={settings.armyDiscount}
                    onUpdate={(b, a) => updateSettings({ buildingDiscount: b, armyDiscount: a })}
                  />
                )}
                {section.id === 'display' && (
                  <DisplaySection
                    showGlobalLevels={settings.showGlobalLevels}
                    toggle={() => updateSettings({ showGlobalLevels: !settings.showGlobalLevels })}
                  />
                )}
                {section.id === 'about' && <AboutSection />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSection({
  accounts,
  activeAccountId,
  setActiveAccount,
  removeAccount,
}: {
  accounts: ReturnType<typeof useAppStore.getState>['accounts'];
  activeAccountId: string;
  setActiveAccount: (id: string) => void;
  removeAccount: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className={`flex items-center gap-3 p-3 rounded-md border transition-colors
            ${acc.id === activeAccountId ? 'border-border-light bg-bg-hover' : 'border-transparent hover:bg-bg-hover'}`}
        >
          <div className="w-10 h-10 bg-bg-tertiary rounded-md flex items-center justify-center">
            <span className="text-sm font-bold text-text-secondary">{acc.name[0]}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">{acc.name}</p>
            <p className="text-xs text-text-muted">{acc.tag} • TH{acc.townHallLevel}</p>
            <p className="text-xs text-text-muted mt-0.5">
              Last synced: {new Date(acc.lastSynced).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {acc.id === activeAccountId ? (
              <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded">Active</span>
            ) : (
              <button
                onClick={() => setActiveAccount(acc.id)}
                className="text-xs px-2 py-1 bg-bg-tertiary text-text-secondary rounded hover:bg-bg-hover"
              >
                Switch
              </button>
            )}
            {accounts.length > 1 && (
              <button
                onClick={() => removeAccount(acc.id)}
                className="text-xs px-2 py-1 text-error hover:bg-error/10 rounded"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <button className="w-full py-2 border border-border rounded-md text-xs text-text-secondary hover:bg-bg-hover transition-colors">
        + Add Account
      </button>
    </div>
  );
}

function ApiSection({
  token,
  setToken,
  showToken,
  setShowToken,
  onSave,
}: {
  token: string;
  setToken: (v: string) => void;
  showToken: boolean;
  setShowToken: (v: boolean) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted">
        Get your API token from{' '}
        <a href="https://developer.clashofclans.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary underline">
          developer.clashofclans.com
        </a>
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter API token..."
            className="w-full bg-bg-tertiary border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-light"
          />
          <button
            onClick={() => setShowToken(!showToken)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
          >
            {showToken ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-text-primary text-bg-primary rounded-md text-sm font-medium hover:opacity-90"
        >
          Save
        </button>
      </div>
      <p className="text-xs text-text-muted">
        When creating your API key, whitelist proxy IP: <code className="text-text-secondary">45.79.218.79</code>
      </p>
    </div>
  );
}

function AppearanceSection({
  darkMode,
  toggleDarkMode,
  baseSources,
  setBaseSources,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
  baseSources: string;
  setBaseSources: (v: 'clashly' | 'clash-bases' | 'both') => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-primary">Dark Mode</p>
          <p className="text-xs text-text-muted">Toggle dark/light theme</p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-6 rounded-full transition-colors relative
            ${darkMode ? 'bg-text-primary' : 'bg-bg-tertiary border border-border'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-bg-primary absolute top-0.5 transition-transform
            ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
      </div>

      <div>
        <p className="text-sm text-text-primary mb-2">Base Sources</p>
        <div className="flex gap-2">
          {(['both', 'clashly', 'clash-bases'] as const).map((source) => (
            <button
              key={source}
              onClick={() => setBaseSources(source)}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors
                ${baseSources === source ? 'bg-text-primary text-bg-primary' : 'bg-bg-tertiary text-text-secondary'}`}
            >
              {source === 'both' ? 'Both' : source === 'clashly' ? 'ClashLy' : 'Clash Bases'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiscountsSection({
  buildingDiscount,
  armyDiscount,
  onUpdate,
}: {
  buildingDiscount: number;
  armyDiscount: number;
  onUpdate: (building: number, army: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-text-primary">Building Discount</p>
          <span className="text-sm font-medium text-text-primary">{buildingDiscount}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={buildingDiscount}
          onChange={(e) => onUpdate(Number(e.target.value), armyDiscount)}
          className="w-full accent-text-primary"
        />
        <div className="flex gap-2 mt-2">
          {[0, 10, 20, 50].map((preset) => (
            <button
              key={preset}
              onClick={() => onUpdate(preset, armyDiscount)}
              className={`px-2 py-1 rounded text-xs transition-colors
                ${buildingDiscount === preset ? 'bg-text-primary text-bg-primary' : 'bg-bg-tertiary text-text-secondary'}`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-text-primary">Army Discount</p>
          <span className="text-sm font-medium text-text-primary">{armyDiscount}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={armyDiscount}
          onChange={(e) => onUpdate(buildingDiscount, Number(e.target.value))}
          className="w-full accent-text-primary"
        />
        <div className="flex gap-2 mt-2">
          {[0, 10, 20, 50].map((preset) => (
            <button
              key={preset}
              onClick={() => onUpdate(buildingDiscount, preset)}
              className={`px-2 py-1 rounded text-xs transition-colors
                ${armyDiscount === preset ? 'bg-text-primary text-bg-primary' : 'bg-bg-tertiary text-text-secondary'}`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DisplaySection({
  showGlobalLevels,
  toggle,
}: {
  showGlobalLevels: boolean;
  toggle: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-primary">Show Global Levels</p>
          <p className="text-xs text-text-muted">Show levels beyond your Town Hall in tables</p>
        </div>
        <button
          onClick={toggle}
          className={`w-12 h-6 rounded-full transition-colors relative
            ${showGlobalLevels ? 'bg-text-primary' : 'bg-bg-tertiary border border-border'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-bg-primary absolute top-0.5 transition-transform
            ${showGlobalLevels ? 'translate-x-6' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <div className="w-16 h-16 rounded-lg overflow-hidden mx-auto mb-2">
          <img src={APP_ICON} alt="ClashPrime" className="w-full h-full object-contain" />
        </div>
        <p className="text-sm font-semibold text-text-primary">ClashPrime</p>
        <p className="text-xs text-text-muted">v7.2.0 (Web)</p>
      </div>

      {/* Developer */}
      <div className="flex items-center gap-3 py-3 border-t border-border">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-bg-tertiary">
          <img src={DEVELOPER_AVATAR} alt="Developer" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">Farhan Zafar</p>
          <p className="text-xs text-text-muted">Developer</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-text-muted">
          A premium monochrome companion app for Clash of Clans. Track your progress, manage armies & bases, explore building levels, view war logs, follow events, browse community bases & armies.
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <h4 className="text-xs font-semibold text-text-muted uppercase">Data Sources</h4>
        {[
          { name: 'Clash of Clans API', url: 'https://developer.clashofclans.com' },
          { name: 'RoyaleAPI Proxy', url: 'https://docs.royaleapi.com/proxy.html' },
          { name: 'ClashLy', url: 'https://clashly.com' },
          { name: 'clash-bases', url: 'https://github.com/nschmeller/clash-bases' },
          { name: 'ClashArmies', url: 'https://clasharmies.com' },
          { name: 'clash-of-clans-data', url: 'https://www.npmjs.com/package/clash-of-clans-data' },
          { name: 'clash.ninja', url: 'https://clash.ninja' },
        ].map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>{source.name}</span>
            <span className="text-text-muted">→</span>
          </a>
        ))}
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-text-muted text-center">
          This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell.
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <a href="mailto:farhanzafarr.9@gmail.com" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-bg-tertiary rounded-md text-xs text-text-secondary hover:bg-bg-hover transition-colors">
          <Bug size={12} />
          Feedback
        </a>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-bg-tertiary rounded-md text-xs text-text-secondary hover:bg-bg-hover transition-colors">
          <Heart size={12} />
          Credits
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-bg-tertiary rounded-md text-xs text-text-secondary hover:bg-bg-hover transition-colors">
          <Shield size={12} />
          Privacy
        </button>
      </div>
    </div>
  );
}
