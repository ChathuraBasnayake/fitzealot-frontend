import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Users,
  Calculator,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard-hello', icon: LayoutDashboard, label: 'Dashboard Hello' },
    { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { to: '/diet', icon: UtensilsCrossed, label: 'Diet' },
    { to: '/community', icon: Users, label: 'Community' },
    { to: '/calculators', icon: Calculator, label: 'Health Calculators' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  return (
    <div
      className={`${isExpanded ? 'w-64' : 'w-16'} bg-white shadow-lg h-full flex flex-col transition-all duration-300 ease-in-out relative z-10 overflow-hidden`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className={`${isExpanded ? 'p-6' : 'p-4'} border-b border-gray-200 transition-all duration-300`}>
        <div className="flex items-center">
          <span className={`text-2xl ${isExpanded ? '' : 'mx-auto'} transition-all duration-300`}>💪</span>
          {isExpanded && (
            <h1 className="text-xl font-bold text-red-600 ml-2 whitespace-nowrap">
              FitZealot
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${isExpanded ? 'px-4' : 'px-3'} py-3 rounded-lg transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className={`w-5 h-5 ${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-300 flex-shrink-0`} />
                {isExpanded && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                {/* Tooltip for collapsed state */}
                {!isExpanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full ${isExpanded ? 'px-4' : 'px-3'} py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 relative group`}
        >
          <LogOut className={`w-5 h-5 ${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-300 flex-shrink-0`} />
          {isExpanded && (
            <span className="font-medium whitespace-nowrap">
              Logout
            </span>
          )}
          {/* Tooltip for collapsed state */}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Logout
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
