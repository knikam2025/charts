import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, RefreshCw } from 'lucide-react';
import api from '../utils/api';
import AlertForm from './AlertForm';

interface Alert {
  _id: string;
  name: string;
  criteria: string;
  value: number;
  days: string[];
  email: string;
  phone: string;
  createdAt: string;
}

const AlertTable: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'alerts' | 'triggered'>('alerts');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [editAlert, setEditAlert] = useState<Alert | null>(null);
  const alertsPerPage = 5;

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/alerts');
      setAlerts(response.data);
      setError(null);
    } catch {
      setError('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Listen for refresh events
    const refreshHandler = () => fetchAlerts();
    window.addEventListener('refreshAlerts', refreshHandler);

    return () => {
      window.removeEventListener('refreshAlerts', refreshHandler);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAlerts();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await api.delete(`/alerts/${id}`);
        setAlerts(alerts.filter(alert => alert._id !== id));
      } catch {
        setError('Failed to delete alert');
      }
    }
  };

  // Add this function to handle update
  const handleUpdate = (updatedAlert: Alert) => {
    setAlerts(alerts.map(a => a._id === updatedAlert._id ? updatedAlert : a));
    setEditAlert(null);
  };

  // Get current alerts for pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(alerts.length / alertsPerPage);

  // Format days array to readable string
  const formatDays = (days: string[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 0) return 'None';
    return days.join(', ');
  };

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Edit Alert Modal */}
      {editAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Alert</h2>
            <AlertForm
              initialAlert={editAlert}
              onClose={() => setEditAlert(null)}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}

      {/* Tabs and Refresh Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'alerts'
                ? 'bg-[#141B33] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('alerts')}
          >
            Alerts
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'triggered'
                ? 'bg-[#141B33] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('triggered')}
          >
            Triggered Alerts
          </button>
        </div>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={handleRefresh}
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Signal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criteria
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Days
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAlerts.length > 0 ? (
              currentAlerts.map((alert) => (
                <tr key={alert._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {alert.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">DK1</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {alert.criteria} Than
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{alert.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{alert.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDays(alert.days)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => setEditAlert(alert)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(alert._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  No alerts found. Create an alert using the form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-1">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === page
                  ? 'bg-[#141B33] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertTable;