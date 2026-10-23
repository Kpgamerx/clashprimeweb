import { useAppStore } from './store/useAppStore';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArmyPage from './pages/ArmyPage';
import BuildingsPage from './pages/BuildingsPage';
import EventsPage from './pages/EventsPage';
import WarPage from './pages/WarPage';
import LibrariesPage from './pages/LibrariesPage';
import ToolsPage from './pages/ToolsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { activeTab, darkMode } = useAppStore();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'army':
        return <ArmyPage />;
      case 'buildings':
        return <BuildingsPage />;
      case 'events':
        return <EventsPage />;
      case 'war':
        return <WarPage />;
      case 'libraries':
        return <LibrariesPage />;
      case 'tools':
        return <ToolsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={darkMode ? '' : 'light'}>
      <Layout>{renderPage()}</Layout>
    </div>
  );
}

export default App;
