import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SideMenu from '../components/SideMenu';
import PeakShavingView from '../components/PeakShavingView';
import SimplePageView from '../components/SimplePageView';

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { pageId } = useParams<{ pageId?: string }>();

  // Render appropriate view based on pageId
  const renderView = () => {
    switch (pageId) {
      case 'ventilation':
      case 'cooling':
      case 'heat-pump':
      case 'out-of-hours':
      case 'ev-charging':
      case 'load-shifting':
      case 'demand-response':
      case 'insights':
      case 'version-history':
        return <SimplePageView pageId={pageId} />;
      default:
        return <PeakShavingView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Menu */}
      <SideMenu userName={user?.name || 'User'} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default DashboardPage;