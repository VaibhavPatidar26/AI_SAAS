import React, { useState, useContext } from 'react';
import {
  Menu, X, Image, ArrowUpCircle, Scissors, Settings,
  Sparkles, User, LogOut
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ImageGenerator from '../pages/ImageGenerator';
import BgRemover from '../pages/BgRemover';
import UpgradeImage from '../pages/UpgradeImage';
import Setting from '../pages/Settings';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { credit,handleLogout} = useContext(AppContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Generate Images');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  function imagifyOnClick() {
    navigate("/");
  }

  const menuItems = [
    { icon: Image, label: 'Generate Images' },
    { icon: ArrowUpCircle, label: 'Upgrade Images' },
    { icon: Scissors, label: 'Remove Background' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 fixed top-0 lg:static left-0 z-50 
            ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
            w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300
          `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {isSidebarCollapsed ? (
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu size={20} className="text-gray-700" />
                </button>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <Link to={"/"}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </Link>
                    </div>
                  </div>
                  <button onClick={imagifyOnClick}>
                    <h2 className="text-xl font-bold text-gray-900">imagify</h2>
                  </button>
                </>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>

            {/* Desktop collapse button */}
            {!isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Menu Items */}
          <div className="p-3 lg:p-4 space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.label;

              return (
                <div
                  key={item.label}
                  onClick={() => {
                    setActiveItem(item.label);
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <IconComponent size={20} className="flex-shrink-0" />
                  {(!isSidebarCollapsed || window.innerWidth < 1024) && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </div>
              );
            })}

            {/* Upgrade Section */}
            <div className="pt-4">
              {(!isSidebarCollapsed || window.innerWidth < 1024) ? (
                <div className="bg-gray-900 rounded-2xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-1 text-sm lg:text-base">Go Premium</h3>
                  <p className="text-gray-300 text-xs lg:text-sm mb-3">
                    Unlock unlimited creativity
                  </p>
                  <Link to={"/buycredit"}>
                    <button className="w-full bg-white text-gray-900 rounded-xl py-2 px-3 lg:px-4 font-semibold text-xs lg:text-sm hover:bg-gray-100 transition-colors">
                      Upgrade Now ✨
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button onClick={()=>{
                    navigate("/buycredit")
                    console.log("clicked me")
                  }}>
                     <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors group">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  </button>
                 
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen relative">
          {/* Fixed Credits + Profile */}
          <div className="fixed top-4 right-2 md:right-4 z-50">
            <div
              className="relative"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <div className="flex items-center space-x-2 md:space-x-3 bg-white shadow-md border border-gray-200 rounded-full px-3 py-1.5 md:px-4 md:py-2 max-h-[48px]">
                {/* Credits Info */}
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-xs md:text-sm text-gray-500 font-medium">Credits Left</span>
                  <span className="text-sm md:text-base text-gray-900 font-semibold flex items-center">
                    {credit}
                    <span className="ml-1">💰</span>
                  </span>
                </div>

                {/* Profile Icon */}
                <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer">
                  <User size={16} />
                </div>
              </div>

              {/* Logout Dropdown */}
              {showProfileDropdown && (
                <button onClick={handleLogout}>
                  <div className="absolute top-12 right-0 bg-white border border-gray-100 shadow-md rounded-md h-10 px-4 flex items-center justify-center text-sm md:text-base font-medium text-gray-700 hover:text-red-600 transition-colors cursor-pointer z-50">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </div>
                </button>
                
              )}
            </div>
          </div>

          {/* Mobile Top Menu Button */}
          <div className="p-4 lg:hidden flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <Menu size={20} />
              <span className="text-sm font-medium">Menu</span>
            </button>
          </div>

          {/* Main Section */}
          <div className="p-4 lg:p-8 pt-2 lg:pt-4 mb-16 lg:mb-0">
            {activeItem === "Generate Images" ? <ImageGenerator /> :
              activeItem === "Remove Background" ? <BgRemover /> :
                activeItem === "Upgrade Images" ? <UpgradeImage /> :
                  activeItem === "Settings" ? <Setting /> : null}
          </div>

          {/* Bottom Navigation (Mobile Only) */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center py-2 lg:hidden z-50">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`flex flex-col items-center justify-center text-xs ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="mt-1">{item.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
