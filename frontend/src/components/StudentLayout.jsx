
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, User, FileText, Lock, HelpCircle, LogOut, 
  ChevronLeft, ChevronRight, Calendar, BookOpen, Award, CheckCircle 
} from 'lucide-react';
import jntugvLogo from '../assets/jntugv_logo.jpg';

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/student/profile' },
    { id: 'submissions', label: 'My Submissions', icon: FileText, path: '/student/submissions' },
    { id: 'password', label: 'Change Password', icon: Lock, path: '/student/change-password' },
    { id: 'help', label: 'Help & Contact', icon: HelpCircle, path: '/student/help' }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white flex flex-col fixed h-screen z-50 transition-all duration-300 ${
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
                <p className="text-xs text-gray-400">Student Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white transition-colors"
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
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-800 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
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

const StudentDashboardHome = () => {
  const navigate = useNavigate();

  // Sample student data
  const studentInfo = {
    name: 'P. Sneha Swaroop',
    email: 'swarooppinakana@gmail.com',
    rollNumber: '23VV1A0546',
    branch: 'B.Tech',
    department: 'Computer Science & Engineering',
    semester: 'Sem 3-1',
    batch: '2023-2027'
  };

  const feedbackSessions = [
    { 
      id: 1, 
      semester: 'Semester 3-1', 
      status: 'active', 
      dateRange: 'Nov 1 - Dec 16, 2024',
      submittedDate: null 
    },
    { 
      id: 2, 
      semester: 'Semester 2-2', 
      status: 'submitted', 
      dateRange: 'Apr 1 - May 16, 2024',
      submittedDate: 'May 10, 2024 at 8:00 PM' 
    },
    { 
      id: 3, 
      semester: 'Semester 2-1', 
      status: 'submitted', 
      dateRange: 'Nov 1 - Dec 16, 2023',
      submittedDate: 'Dec 1, 2023 at 3:45 PM' 
    }
  ];

  const stats = [
    { icon: Calendar, label: 'Current Semester', value: 'Semester 3-1', color: 'blue' },
    { icon: CheckCircle, label: 'Submissions', value: '2/3', color: 'green' },
    { icon: Award, label: 'Completion Rate', value: '66%', color: 'purple' },
    { icon: BookOpen, label: 'Pending', value: '1 Session', color: 'orange' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      closed: { label: 'Closed', className: 'bg-gray-100 text-gray-700' },
      submitted: { label: 'Submitted', className: 'bg-green-100 text-green-700' },
      active: { label: 'Active', className: 'bg-blue-100 text-blue-700' }
    };
    return badges[status] || badges.closed;
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back! View your feedback sessions below.</p>
      </motion.div>

      {/* Student Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            RK
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{studentInfo.name}</h2>
            <p className="text-sm text-gray-600">{studentInfo.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {studentInfo.rollNumber}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {studentInfo.branch}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {studentInfo.semester}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{studentInfo.department}</p>
            <p className="text-xs text-gray-600">Batch: {studentInfo.batch}</p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Feedback Sessions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Feedback Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{session.semester}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(session.status).className}`}>
                    {getStatusBadge(session.status).label}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-600 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {session.dateRange}
                  </p>
                  {session.submittedDate && (
                    <p className="text-xs text-green-600 font-medium">
                      Submitted on {session.submittedDate}
                    </p>
                  )}
                </div>
                {session.status === 'active' && (
                  <button
                    onClick={() => navigate(`/student/semester/${session.id}`)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                  >
                    Start Feedback →
                  </button>
                )}
                {session.status === 'submitted' && (
                  <p className="w-full py-2 px-4 bg-green-50 text-green-700 text-sm font-medium rounded-lg text-center">
                    Feedback form already submitted
                  </p>
                )}
                {session.status === 'closed' && !session.submittedDate && (
                  <p className="w-full py-2 px-4 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg text-center">
                    Feedback form expired
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { StudentLayout, StudentDashboardHome };