import React, { useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, Activity, Wind, Thermometer, 
  Flame, Clock, BatteryCharging, MoveHorizontal, 
  BarChart2, History, LogOut, ChevronDown
} from 'lucide-react';

interface SideMenuProps {
  userName: string;
}

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  submenu?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ userName }) => {
  const { logout } = useContext(AuthContext);
  const { pageId } = useParams<{ pageId?: string }>();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard'
    },
    {
      id: 'e3-apps',
      title: 'E3 Apps',
      icon: <Activity size={20} />,
      path: '#',
      submenu: true
    },
    {
      id: 'peak-shaving',
      title: 'Peak Shaving & Alert',
      icon: <Activity size={20} />,
      path: '/dashboard'
    },
    {
      id: 'ventilation',
      title: 'Ventilation',
      icon: <Wind size={20} />,
      path: '/dashboard/ventilation'
    },
    {
      id: 'cooling',
      title: 'Cooling',
      icon: <Thermometer size={20} />,
      path: '/dashboard/cooling'
    },
    {
      id: 'heat-pump',
      title: 'Heat Pump',
      icon: <Flame size={20} />,
      path: '/dashboard/heat-pump'
    },
    {
      id: 'out-of-hours',
      title: 'Out Of Hours',
      icon: <Clock size={20} />,
      path: '/dashboard/out-of-hours'
    },
    {
      id: 'ev-charging',
      title: 'EV Charging',
      icon: <BatteryCharging size={20} />,
      path: '/dashboard/ev-charging'
    },
    {
      id: 'load-shifting',
      title: 'Load Shifting',
      icon: <MoveHorizontal size={20} />,
      path: '/dashboard/load-shifting'
    },
    {
      id: 'demand-response',
      title: 'Demand Response',
      icon: <Activity size={20} />,
      path: '/dashboard/demand-response',
      submenu: true
    },
    {
      id: 'insights',
      title: 'Insights',
      icon: <BarChart2 size={20} />,
      path: '/dashboard/insights',
      submenu: true
    },
    {
      id: 'version-history',
      title: 'Version History',
      icon: <History size={20} />,
      path: '/dashboard/version-history',
      submenu: true
    }
  ];

  // Determine active item
  const getActiveClass = (id: string) => {
    if (id === 'dashboard' && !pageId) return true;
    if (id === 'peak-shaving' && !pageId) return true;
    if (id === pageId) return true;
    return false;
  };

  return (
    <div className="w-64 bg-[#141B33] text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Grid Manager 2.0</h1>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700 flex items-center">
        <div className="h-12 w-12 rounded-full bg-gray-600 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100" 
            alt="User" 
            className="h-full w-full object-cover" 
          />
        </div>
        <div className="ml-3">
          <p className="font-medium">Hey, {userName.split(' ')[0]}</p>
          <p className="text-xs text-gray-400">User ID: ABC-24</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center py-2 px-4 hover:bg-blue-800 transition-colors ${
                  getActiveClass(item.id) ? 'bg-blue-900' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
                {item.submenu && <ChevronDown size={16} className="ml-auto" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;