import React from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  Home,
  Swords,
  Building2,
  Calendar,
  Shield,
  BookOpen,
  Wrench,
  Settings,
} from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'army', label: 'Army', icon: Swords },
  { id: 'buildings', label: 'Buildings', icon: Building2 },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'war', label: 'War', icon: Shield },
  { id: 'libraries', label: 'Libraries', icon: BookOpen },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab, darkMode } = useAppStore();

  return (
    <div className={`min-h-screen flex ${darkMode ? '' : 'light'}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-16 lg:w-56 bg-bg-secondary border-r border-border fixed h-full z-40">
        <div className="p-4 border-b border-border">
          <h1 className="hidden lg:block text-lg font-bold text-text-primary">ClashPrime</h1>
          <div className="lg:hidden w-8 h-8 bg-text-primary rounded-md flex items-center justify-center">
            <span className="text-bg-primary font-bold text-sm">CP</span>
          </div>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors
                  ${isActive
                    ? 'bg-bg-hover text-text-primary border-r-2 border-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
              >
                <Icon size={20} className={isActive ? 'text-text-primary' : ''} />
                <span className="hidden lg:block">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-16 lg:ml-56 pb-16 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border z-50">
        <div className="flex items-center justify-around px-2 py-1">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-md transition-colors
                  ${isActive ? 'text-text-primary' : 'text-text-muted'}`}
              >
                <Icon size={20} />
              </button>
            );
          })}
          <button
            onClick={() => setActiveTab('more')}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-md transition-colors
              ${['libraries', 'tools', 'settings'].includes(activeTab) ? 'text-text-primary' : 'text-text-muted'}`}
          >
            <span className="text-xs font-medium">•••</span>
          </button>
        </div>
      </nav>

      {/* More menu modal for mobile */}
      {activeTab === 'more' && (
        <div className="md:hidden fixed inset-0 bg-bg-primary z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold text-text-primary">More</h2>
            <button
              onClick={() => setActiveTab('home')}
              className="p-2 text-text-secondary"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {tabs.slice(5).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-4 px-4 py-4 text-left text-text-primary hover:bg-bg-hover rounded-md transition-colors"
                >
                  <Icon size={22} />
                  <span className="text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
