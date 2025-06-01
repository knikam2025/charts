import React from 'react';
import PowerChart from './PowerChart';
import AlertForm from './AlertForm';
import AlertTable from './AlertTable';
import { Calendar, Settings } from 'lucide-react';

const PeakShavingView: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Peak Shaving & Alert</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md p-2 bg-white">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">December 14th</span>
            <div className="ml-2 text-blue-600">▼</div>
          </div>
          <button className="p-2 rounded-md border bg-white hover:bg-gray-50">
            <Settings size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Power Consumption Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-medium mb-4 text-gray-800">Power Cost</h2>
        <PowerChart />
      </div>

      {/* Form and Table Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Alert Form */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Create Alert</h2>
            <AlertForm />
          </div>
        </div>

        {/* Alert Table */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <AlertTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeakShavingView;