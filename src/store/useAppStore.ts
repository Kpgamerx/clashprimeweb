import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account, Settings } from '../types/coc';
import { mockAccounts } from '../data/mockData';

interface AppStore {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Accounts
  accounts: Account[];
  activeAccountId: string;
  addAccount: (account: Account) => void;
  removeAccount: (id: string) => void;
  setActiveAccount: (id: string) => void;
  getActiveAccount: () => Account | undefined;

  // Settings
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;

  // UI State
  isSheetOpen: boolean;
  sheetContent: string | null;
  openSheet: (content: string) => void;
  closeSheet: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Theme
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Navigation
      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Accounts
      accounts: mockAccounts,
      activeAccountId: '1',
      addAccount: (account) =>
        set((state) => ({ accounts: [...state.accounts, account] })),
      removeAccount: (id) =>
        set((state) => ({
          accounts: state.accounts.filter((a) => a.id !== id),
          activeAccountId:
            state.activeAccountId === id
              ? state.accounts[0]?.id || ''
              : state.activeAccountId,
        })),
      setActiveAccount: (id) => set({ activeAccountId: id }),
      getActiveAccount: () => {
        const state = get();
        return state.accounts.find((a) => a.id === state.activeAccountId);
      },

      // Settings
      settings: {
        apiToken: '',
        darkMode: true,
        showGlobalLevels: false,
        buildingDiscount: 0,
        armyDiscount: 0,
        baseSources: 'both',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // UI State
      isSheetOpen: false,
      sheetContent: null,
      openSheet: (content) => set({ isSheetOpen: true, sheetContent: content }),
      closeSheet: () => set({ isSheetOpen: false, sheetContent: null }),
    }),
    {
      name: 'clashprime-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        activeTab: state.activeTab,
        accounts: state.accounts,
        activeAccountId: state.activeAccountId,
        settings: state.settings,
      }),
    }
  )
);
