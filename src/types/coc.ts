// Core Clash of Clans TypeScript interfaces

export interface PlayerProfile {
  tag: string;
  name: string;
  townHallLevel: number;
  builderHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  donations: number;
  donationsReceived: number;
  league: League;
  builderBaseLeague: League;
  clan?: Clan;
  troops: TroopProgress[];
  heroes: HeroProgress[];
  spells: SpellProgress[];
  buildings: BuildingProgress[];
  labels: Label[];
}

export interface League {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface Clan {
  tag: string;
  name: string;
  badgeUrls: {
    small: string;
    medium: string;
    large: string;
  };
  clanLevel: number;
}

export interface Label {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}

export interface Building {
  id: string;
  name: string;
  category: BuildingCategory;
  maxLevel: number;
  townHallRequired: number;
  maxCopies: number;
  levels: BuildingLevel[];
  village: 'home' | 'builder';
}

export type BuildingCategory =
  | 'resources'
  | 'army'
  | 'defense'
  | 'traps'
  | 'walls'
  | 'heroes'
  | 'crafted';

export interface BuildingLevel {
  level: number;
  cost: number;
  buildTime: number; // seconds
  hitpoints: number;
  damagePerSecond?: number;
}

export interface BuildingProgress {
  id: string;
  name: string;
  category: BuildingCategory;
  currentLevel: number;
  maxLevel: number;
  townHallRequired: number;
  village: 'home' | 'builder';
  copies?: number[]; // per-copy levels for multi-copy buildings
  isMaxed: boolean;
}

export interface Troop {
  id: string;
  name: string;
  category: 'troop' | 'hero' | 'spell' | 'pet' | 'equipment' | 'siege';
  maxLevel: number;
  townHallRequired: number;
  housingSpace: number;
  levels: TroopLevel[];
  village: 'home' | 'builder';
}

export interface TroopLevel {
  level: number;
  cost: number;
  upgradeTime: number; // seconds
  hitpoints: number;
  damagePerSecond?: number;
  dps?: number;
  speed?: string;
  range?: number;
}

export interface TroopProgress {
  id: string;
  name: string;
  category: 'troop' | 'spell' | 'pet' | 'equipment' | 'siege';
  currentLevel: number;
  maxLevel: number;
  isMaxed: boolean;
}

export interface HeroProgress {
  id: string;
  name: string;
  currentLevel: number;
  maxLevel: number;
  isMaxed: boolean;
  equipment?: EquipmentProgress[];
}

export interface SpellProgress {
  id: string;
  name: string;
  currentLevel: number;
  maxLevel: number;
  isMaxed: boolean;
}

export interface EquipmentProgress {
  id: string;
  name: string;
  currentLevel: number;
  maxLevel: number;
  isMaxed: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'challenge' | 'event' | 'season';
  imageUrl?: string;
}

export interface WarLog {
  id: string;
  result: 'win' | 'loss' | 'tie';
  endTime: string;
  attackCount: number;
  teamSize: number;
  stars: number;
  destructionPercentage: number;
  opponent: {
    name: string;
    tag: string;
    stars: number;
    destructionPercentage: number;
    badgeUrls: {
      small: string;
      medium: string;
    };
  };
}

export interface BaseLayout {
  id: string;
  name: string;
  description: string;
  townHallLevel: number;
  builderHallLevel?: number;
  imageUrl: string;
  link: string;
  source: 'clashly' | 'clash-bases';
  tags: string[];
  popularity?: number;
  rating?: number;
}

export interface ArmyComposition {
  id: string;
  name: string;
  townHallLevel: number;
  troops: { name: string; level: number; count: number }[];
  spells: { name: string; level: number; count: number }[];
  heroes: { name: string; level: number }[];
  imageUrl: string;
  source: string;
  favorites: number;
}

export interface Account {
  id: string;
  tag: string;
  name: string;
  townHallLevel: number;
  builderHallLevel: number;
  lastSynced: string;
  buildings: BuildingProgress[];
  troops: TroopProgress[];
  heroes: HeroProgress[];
  spells: SpellProgress[];
  homeBuilders: number;
  bbBuilders: number;
}

export interface Settings {
  apiToken: string;
  darkMode: boolean;
  showGlobalLevels: boolean;
  buildingDiscount: number;
  armyDiscount: number;
  baseSources: 'clashly' | 'clash-bases' | 'both';
}

export interface ZapquakeCombo {
  lightningLevel: number;
  earthquakeLevel: number;
  lightningCount: number;
  earthquakeCount: number;
  buildingHp: number;
  buildingName: string;
  totalDamage: number;
  overkillPercent: number;
  spellSlots: number;
}
