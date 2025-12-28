import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, BarChart3, Lock, HelpCircle, LogOut, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import jntugvLogo from '../../assets/jntugv_logo.jpg';

const HODLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get HOD info from localStorage or session
  const hodInfo = {
    name: 'Dr. Ramesh Kumar',
    email: 'hodcse@jntugvcev.edu.in',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    branch: 'CSE'
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/hod/dashboard' },
    { id: 'feedback', label: 'Feedback Management', icon: FileText, path: '/hod/feedback-management' },
    { id: 'analytics', label: 'Feedback Analytics', icon: BarChart3, path: '/hod/feedback-analytics' },
    { id: 'password', label: 'Change Password', icon: Lock, path: '/hod/change-password' },
    { id: 'help', label: 'Help & Contact', icon: HelpCircle, path: '/hod/help' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to logout? You will need to login again to access your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col fixed h-screen z-50 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-60'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <img src={jntugvLogo} alt="JNTUGV Logo" className="w-8 h-8 rounded-lg object-contain bg-white border border-gray-200" />
              <div>
                <h2 className="text-xs font-bold">JNTUGV Feedback Portal</h2>
                <p className="text-xs text-blue-300">HOD Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-blue-300 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-blue-800 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default HODLayout;
