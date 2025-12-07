import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, BarChart3, GraduationCap, Users, Calendar, TrendingUp } from 'lucide-react';

const HODDashboard = () => {
  const navigate = useNavigate();

  const hodInfo = {
    name: 'Dr. Ramesh Kumar',
    email: 'hodcse@jntugvcev.edu.in',
    department: 'Computer Science & Engineering',
    program: 'B.Tech',
    branch: 'CSE'
  };

  const stats = [
    { icon: GraduationCap, label: 'Active Batches', value: '4', color: 'emerald', bgColor: 'bg-emerald-100', textColor: 'text-emerald-600' },
    { icon: Users, label: 'Total Students', value: '320', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { icon: Calendar, label: 'Active Semesters', value: '8', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
    { icon: TrendingUp, label: 'Avg Rating', value: '4.2/5', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
  ];

  const quickActions = [
    {
      title: 'Feedback Management',
      description: 'Manage and publish semester feedback for students',
      icon: FileText,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      path: '/hod/feedback-management'
    },
    {
      title: 'Feedback Analytics',
      description: 'View detailed analytics and performance reports',
      icon: BarChart3,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      path: '/hod/feedback-analytics'
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">HOD Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back! Manage feedback and view analytics.</p>
      </motion.div>

      {/* HOD Info Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
            {hodInfo.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{hodInfo.name}</h2>
            <p className="text-sm text-gray-600">{hodInfo.email}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                {hodInfo.department}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {hodInfo.program}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                HOD - {hodInfo.branch}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
          >
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`${action.bgColor} rounded-xl border-2 ${action.borderColor} overflow-hidden text-left hover:shadow-lg transition-all p-6 group`}
            >
              <div className={`w-14 h-14 rounded-lg ${action.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`h-7 w-7 ${action.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HODDashboard;
