# ClashPrime Web

<div align="center">

![ClashPrime](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/images/icon.png)

**A premium monochrome companion app for Clash of Clans — now on the web**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF.svg)](https://vitejs.dev/)

[Live Demo](#) · [Original React Native App](https://github.com/FarhanZafarr-9/ClashPrime) · [Report Bug](https://github.com/FarhanZafarr-9/ClashPrime/issues) · [Request Feature](https://github.com/FarhanZafarr-9/ClashPrime/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Design System](#-design-system)
- [Data Architecture](#-data-architecture)
- [Asset Sources](#-asset-sources)
- [Configuration](#-configuration)
- [API Integration](#-api-integration)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Credits](#-credits)
- [License](#-license)

---

## 🎯 Overview

ClashPrime Web is a high-performance, responsive web replica of the original ClashPrime React Native companion app for Clash of Clans. Built with modern web technologies, it provides players with a comprehensive toolkit to track progress, manage armies and bases, explore building levels, view war logs, follow events, and browse community content — all wrapped in a sleek monochrome design system.

### Why Web?

- **Cross-platform access** — No app store required, works on any device with a browser
- **Instant updates** — Changes deploy immediately without app store review
- **Better performance** — Modern web APIs and optimized asset loading
- **SEO friendly** — Discoverable via search engines
- **Easy sharing** — Share links directly to specific features

---

## ✨ Features

### 🏠 Home Dashboard
- **Multi-account support** — Switch between multiple Clash accounts seamlessly
- **League details** — View current league, trophies, and bonus information
- **Progress tracking** — Visual progress cards for troops, spells, heroes, and buildings
- **Quick stats** — War stars, attack wins, defense wins, donations, and more
- **Clan information** — See clan details and member count
- **Upcoming events** — Preview of active and upcoming in-game events

### ⚔️ Army Management
- **Category filtering** — View troops, heroes, spells, pets, and equipment separately
- **Village toggle** — Switch between Home Village and Builder Base
- **Level progression** — Expandable cards showing all upgrade levels
- **Folded tables** — Hide earlier levels, show only current and future upgrades
- **Discount-aware costs** — Apply custom discounts to see reduced upgrade costs
- **Real-time images** — Troop icons from the official Clash of Clans asset library

### 🏗️ Buildings Tracker
- **Category organization** — Defense, resources, army, traps, walls, heroes, crafted
- **Per-copy tracking** — Track individual levels for multi-copy buildings (e.g., 5 Cannons)
- **Visual progress** — See which buildings are maxed with gold accents
- **Level tables** — Detailed cost, time, and stats for each upgrade level
- **Builder Base support** — Full tracking for Builder Hall buildings

### 📅 Events Calendar
- **Live countdowns** — Real-time timers for active events
- **Progress bars** — Visual progress for ongoing events
- **Event types** — Challenges, events, and seasons clearly labeled
- **Date ranges** — See start and end dates at a glance

### 🛡️ War & CWL
- **War history** — Complete log of past wars with results
- **CWL tracking** — Clan War League rounds with member performance
- **Member stats** — Attacks, stars, destruction percentage, and defense stars
- **Win/loss/tie breakdown** — Visual summary of war performance
- **Round-by-round details** — Expandable CWL rounds with full member data

### 📚 Libraries
- **Base Library** — Browse community base layouts from ClashLy and clash-bases
- **Army Library** — Discover popular army compositions from ClashArmies
- **Filtering** — Filter by Town Hall level, source, and search terms
- **Progress scoring** — See how your troops/heroes match community armies
- **Copy links** — One-click copy of base links to clipboard

### 🛠️ Tools
- **Zapquaker Calculator** — Calculate Lightning + Earthquake spell combinations
  - Building target selection with HP presets
  - Spell level and count configuration
  - Real-time damage calculation
  - Overkill percentage display
  - Cheapest kill combo suggestions
  
- **Giant Arrow Planner** — Plan Archer Queen arrow paths on base screenshots
  - Canvas-based path drawing
  - Rocket Backpack mode for centered pivots
  - Upload base screenshots
  - Export as high-res PNG
  
- **6th Builder (B.O.B.) Planner** — Track B.O.B. unlock requirements
  - Checklist of all requirements
  - Progress bar showing completion
  - "What's blocking you" callouts
  - Resource and time estimates

### ⚙️ Settings
- **Account management** — Add, remove, and switch between accounts
- **API token configuration** — Secure input for Clash of Clans API access
- **Theme toggle** — Dark/light mode with smooth transitions
- **Discount sliders** — Customize building and army upgrade discounts
- **Display preferences** — Toggle global levels, base sources
- **About section** — App info, credits, data sources, and links

---

## 📸 Screenshots

### Home Dashboard
![Home Dashboard](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/home.png)

### Army Management
![Army Page](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/army.png)

### Buildings Tracker
![Buildings Page](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/buildings.png)

### Tools - Zapquaker
![Zapquaker Tool](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/zapquaker.png)

### War & CWL
![War Page](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/war.png)

### Libraries
![Libraries Page](https://raw.githubusercontent.com/FarhanZafarr-9/ClashPrime/main/screenshots/libraries.png)

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2** — UI library with hooks and functional components
- **TypeScript 5.7** — Type-safe development
- **Vite 6.3** — Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** — Utility-first CSS framework
- **Zustand** — Lightweight state management with persistence

### UI/UX
- **Framer Motion** — Smooth animations and transitions
- **Lucide React** — Beautiful, consistent icon library
- **Responsive design** — Mobile-first with desktop sidebar navigation

### Data & State
- **Mock data layer** — Mirrors `clash-of-clans-data` npm package structure
- **Zustand persist** — LocalStorage persistence for settings and accounts
- **Type-safe interfaces** — Complete TypeScript definitions for all CoC data

### Assets
- **External image hosting** — All assets loaded from GitHub raw content
- **Lazy loading** — Images load on-demand for performance
- **Fallback system** — Graceful degradation when images fail to load

---

## 📁 Project Structure

```
clashprime-web/
├── index.html                    # HTML entry point with favicon
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.js                # Vite build configuration
│
├── src/
│   ├── main.tsx                  # React app entry point
│   ├── App.tsx                   # Main app component with routing
│   ├── index.css                 # Global styles and Tailwind imports
│   │
│   ├── types/
│   │   └── coc.ts                # TypeScript interfaces for CoC data
│   │
│   ├── store/
│   │   └── useAppStore.ts        # Zustand store (theme, accounts, settings)
│   │
│   ├── data/
│   │   ├── mockData.ts           # Mock player data, events, bases, armies
│   │   └── assetMap.ts           # Asset URL mapping for all images
│   │
│   ├── components/
│   │   ├── Layout.tsx            # Main layout with sidebar/bottom nav
│   │   └── EntityImage.tsx       # Reusable image component with fallback
│   │
│   └── pages/
│       ├── HomePage.tsx          # Dashboard with progress cards
│       ├── ArmyPage.tsx          # Troops, heroes, spells, pets, equipment
│       ├── BuildingsPage.tsx     # Building tracker with per-copy levels
│       ├── EventsPage.tsx        # Events calendar with countdowns
│       ├── WarPage.tsx           # War history and CWL tracking
│       ├── LibrariesPage.tsx     # Base and army libraries
│       ├── ToolsPage.tsx         # Zapquaker, Giant Arrow, B.O.B. planner
│       └── SettingsPage.tsx      # Account, API, theme, discounts
│
└── public/                       # Static assets (if any)
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/clashprime-web.git
cd clashprime-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables (Optional)

Create a `.env` file for API integration:

```env
VITE_COC_API_TOKEN=your_clash_of_clans_api_token
```

---

## 📖 Usage

### First Launch

1. Open the app in your browser
2. Navigate to **Settings** → **API Token**
3. Get your API token from [developer.clashofclans.com](https://developer.clashofclans.com/)
4. When creating your API key, whitelist the proxy IP: **`45.79.218.79`**
5. Enter your token and save

### Multi-Account Support

1. Go to **Settings** → **Account**
2. Click **+ Add Account**
3. Enter player tag and sync data
4. Switch between accounts from the Home page dropdown

### Applying Discounts

If you have clan perks or special discounts:

1. Go to **Settings** → **Discounts**
2. Adjust the **Building Discount** slider (e.g., 10%, 20%)
3. Adjust the **Army Discount** slider
4. All upgrade costs will automatically reflect the discount

---

## 🎨 Design System

### Monochrome Palette

The app uses a strict monochrome design system with gold accents for maxed items:

```css
/* Dark Mode (Default) */
--color-bg-primary: #0A0A0A;
--color-bg-secondary: #141414;
--color-bg-tertiary: #1E1E1E;
--color-bg-card: #1A1A1A;
--color-text-primary: #FAFAFA;
--color-text-secondary: #A0A0A0;
--color-gold: #D4A843;        /* Maxed items */
--color-success: #4ADE80;
--color-warning: #FBBF24;
--color-error: #F87171;

/* Light Mode */
--color-bg-primary: #FAFAFA;
--color-bg-secondary: #F0F0F0;
--color-bg-tertiary: #E5E5E5;
--color-text-primary: #0A0A0A;
```

### Spacing System

Strict **8pt grid** for all spacing:
- `p-2` = 8px
- `p-3` = 12px
- `p-4` = 16px
- `p-6` = 24px

### Border Radius

Decreased border radius for a sharper, modern look:
- `rounded-sm` = 4px
- `rounded-md` = 6px

### Typography

- **Font family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Font smoothing**: Antialiased for crisp text rendering
- **Scale**: Consistent sizing from `text-xs` (12px) to `text-2xl` (24px)

### Responsive Breakpoints

- **Mobile**: < 768px (bottom navigation)
- **Tablet**: 768px - 1024px (sidebar with icons only)
- **Desktop**: > 1024px (sidebar with labels)

---

## 🗄️ Data Architecture

### TypeScript Interfaces

All Clash of Clans data is fully typed:

```typescript
interface PlayerProfile {
  tag: string;
  name: string;
  townHallLevel: number;
  builderHallLevel: number;
  trophies: number;
  league: League;
  troops: TroopProgress[];
  heroes: HeroProgress[];
  spells: SpellProgress[];
  buildings: BuildingProgress[];
}

interface Building {
  id: string;
  name: string;
  category: BuildingCategory;
  maxLevel: number;
  townHallRequired: number;
  maxCopies: number;
  levels: BuildingLevel[];
  village: 'home' | 'builder';
}
```

### State Management

Zustand store with persistence:

```typescript
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
  setActiveAccount: (id: string) => void;

  // Settings
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}
```

### Mock Data

The app uses comprehensive mock data mirroring the `clash-of-clans-data` npm package structure:

- **Player profile** with full progression data
- **20+ troops** with levels and max status
- **4 heroes** with equipment tracking
- **11 spells** with upgrade paths
- **15+ buildings** with per-copy levels
- **Events** with dates and descriptions
- **Base layouts** from community sources
- **Army compositions** with troop/spell/hero data

---

## 🖼️ Asset Sources

All images are loaded from the original ClashPrime GitHub repository:

### Troops & Heroes
- **Source**: `assets/package-images/images/home/troops/`
- **Format**: WebP (128px max)
- **Coverage**: All troops including super variants

### Spells
- **Source**: `assets/package-images/images/home/spells/`
- **Format**: WebP
- **Coverage**: All spells with level variants

### Buildings
- **Source**: `assets/package-images/images/home/defenses/`, `resource-buildings/`, etc.
- **Format**: WebP
- **Coverage**: All buildings with level-specific images

### Pets & Equipment
- **Source**: `assets/package-images/images/home/pets/`, `hero-equipment/`
- **Format**: WebP
- **Coverage**: All pets and hero equipment

### UI Elements
- **App icon**: `images/icon.png`
- **Favicon**: `images/favicon.png`
- **Developer avatar**: `images/developer-avatar.png`
- **Stat glyphs**: `images/spells/` (DamageType, Duration, etc.)

### Loading Strategy

```typescript
// Graceful fallback when images fail
<img
  src={imageUrl}
  alt={name}
  onError={(e) => {
    (e.target as HTMLImageElement).style.display = 'none';
  }}
/>
```

---

## ⚙️ Configuration

### Tailwind Theme

Custom theme defined in `src/index.css`:

```css
@theme {
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #141414;
  --color-text-primary: #FAFAFA;
  --color-gold: #D4A843;
  /* ... more colors */
}
```

### Vite Configuration

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

---

## 🔌 API Integration

### Clash of Clans API

The app is prepared for CoC API integration via RoyaleAPI proxy:

```typescript
// Service layer (ready for implementation)
const COC_API_BASE = 'https://cocproxy.royaleapi.dev/v1';

async function fetchPlayer(tag: string, apiToken: string) {
  const response = await fetch(`${COC_API_BASE}/players/%23${tag}`, {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });
  return response.json();
}
```

### API Token Setup

1. Visit [developer.clashofclans.com](https://developer.clashofclans.com/)
2. Create a new API key
3. Whitelist IP: `45.79.218.79` (RoyaleAPI proxy)
4. Copy the token to Settings → API Token

### Rate Limits

- **Official API**: 10 requests/second
- **RoyaleAPI Proxy**: Higher limits, dynamic IP support
- **Recommended**: Cache responses for 5-10 minutes

---

## 🗺️ Roadmap

### Completed ✅
- [x] Home Dashboard with progress tracking
- [x] Army management with level tables
- [x] Buildings tracker with per-copy levels
- [x] Events calendar with countdowns
- [x] War history and CWL tracking
- [x] Base and Army libraries
- [x] Zapquaker spell calculator
- [x] Giant Arrow path planner
- [x] B.O.B. unlock planner
- [x] Multi-account support
- [x] Dark/light theme toggle
- [x] Discount-aware cost calculations
- [x] Real asset integration from GitHub

### In Progress 🚧
- [ ] Time to Max (parallel pipelines)
- [ ] Hero Journey rewards track
- [ ] Saved & Favorites system
- [ ] Achievements tracker
- [ ] Player profile page

### Planned 📋
- [ ] Offline-first with service workers
- [ ] Push notifications for events
- [ ] Clan roster management
- [ ] Builder chain planner (visual scheduler)
- [ ] Export/import player data
- [ ] PWA (Progressive Web App) support
- [ ] Real-time sync with CoC API
- [ ] Base layout analyzer
- [ ] Attack strategy simulator

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check existing [issues](https://github.com/YOUR_USERNAME/clashprime-web/issues)
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Feature Requests
1. Open a [discussion](https://github.com/YOUR_USERNAME/clashprime-web/discussions)
2. Describe the feature and its use case
3. Provide mockups if possible

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain the monochrome design system
- Write clear, concise code
- Add comments for complex logic
- Test on multiple screen sizes

---

## 🙏 Credits

### Data Sources

| Source | Description | Link |
|--------|-------------|------|
| **Clash of Clans API** | Official player data API | [developer.clashofclans.com](https://developer.clashofclans.com/) |
| **RoyaleAPI Proxy** | Dynamic IP proxy for CoC API | [docs.royaleapi.com](https://docs.royaleapi.com/proxy.html) |
| **ClashLy** | Base layout community | [clashly.com](https://clashly.com/) |
| **clash-bases** | Open-source base catalogue | [github.com/nschmeller/clash-bases](https://github.com/nschmeller/clash-bases) |
| **ClashArmies** | Army composition library | [clasharmies.com](https://clasharmies.com/) |
| **clash-of-clans-data** | NPM package with game data | [npmjs.com/package/clash-of-clans-data](https://www.npmjs.com/package/clash-of-clans-data) |
| **clash.ninja** | In-game events & TH max levels | [clash.ninja](https://clash.ninja/) |

### Inspiration

- **Zapquaker** — Zap + Quake combo calculator inspiration ([zapquaker.netlify.app](https://zapquaker.netlify.app/))
- **Otaku Planner** — Giant Arrow path planner inspiration ([otakuplanner.com](https://otakuplanner.com/tools/coc-arrow-path))

### Original App

This web version is a replica of the original **ClashPrime** React Native app by [Farhan Zafar](https://github.com/FarhanZafarr-9).

- **Original Repository**: [github.com/FarhanZafarr-9/ClashPrime](https://github.com/FarhanZafarr-9/ClashPrime)
- **Developer**: Farhan Zafar
- **Version**: 7.2.0

### Supercell Fan Content Notice

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell's Fan Content Policy: [supercell.com/fan-content-policy](https://supercell.com/en/fan-content-policy/).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 ClashPrime Web

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

- **Original App Developer**: Farhan Zafar - [@FarhanZafarr-9](https://github.com/FarhanZafarr-9)
- **Project Link**: [https://github.com/YOUR_USERNAME/clashprime-web](https://github.com/YOUR_USERNAME/clashprime-web)

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️ on GitHub!

---

<div align="center">

**Made with ❤️ for the Clash of Clans community**

[⬆ Back to Top](#clashprime-web)

</div>
