import React from 'react';

interface SimplePageViewProps {
  pageId: string;
}

const SimplePageView: React.FC<SimplePageViewProps> = ({ pageId }) => {
  // Convert pageId to proper title
  const getPageTitle = () => {
    switch (pageId) {
      case 'ventilation':
        return 'Ventilation';
      case 'cooling':
        return 'Cooling';
      case 'heat-pump':
        return 'Heat Pump';
      case 'out-of-hours':
        return 'Out Of Hours';
      case 'ev-charging':
        return 'EV Charging';
      case 'load-shifting':
        return 'Load Shifting';
      case 'demand-response':
        return 'Demand Response';
      case 'insights':
        return 'Insights';
      case 'version-history':
        return 'Version History';
      default:
        return 'Unknown Page';
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{getPageTitle()} Page</h1>
        <p className="text-xl text-gray-600">This page is under construction.</p>
        <p className="text-gray-500 mt-2">
          As per requirements, only the Peak Shaving & Alert page is fully implemented.
        </p>
      </div>
    </div>
  );
};

export default SimplePageView;