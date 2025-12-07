import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, User, UserCheck, Building2, ArrowRight, Star,
  TrendingUp, Award, CheckCircle, BarChart3, MessageSquare
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const userRoles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Provide valuable feedback to improve your learning experience',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-blue-600',
      features: ['Submit Feedback', 'View Submissions', 'Track Progress']
    },
    // {
    //   id: 'faculty',
    //   title: 'Faculty',
    //   description: 'View and analyze student feedback to enhance teaching quality',
    //   icon: User,
    //   gradient: 'from-purple-500 to-purple-600',
    //   features: ['View Feedback', 'Analytics', 'Reports']
    // },
    {
      id: 'hod',
      title: 'HOD',
      description: 'Monitor department performance and manage faculty evaluations',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-emerald-600',
      features: ['Department Analytics', 'Faculty Reports', 'Approvals']
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage the entire feedback system and generate institutional reports',
      icon: Building2,
      gradient: 'from-orange-500 to-orange-600',
      features: ['System Management', 'All Reports', 'User Control']
    }
  ];

  const stats = [
    { icon: Star, value: '5000+', label: 'Feedback Collected' },
    { icon: TrendingUp, value: '95%', label: 'Satisfaction Rate' },
    { icon: Award, value: '200+', label: 'Faculty Members' },
    { icon: CheckCircle, value: '98%', label: 'Response Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/90 shadow-sm sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 h-10">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-fdm-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div> */}
            <img src="./jntu.png" className='h-14 w-14'/> 
            <div>
              <h1 className="text-lg font-bold">FDM Portal</h1>
              <p className="text-xs text-gray-500">Feedback Management System</p>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Feedback<span className="block text-gradient mt-2 pb-10">Management Portal</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering educational excellence through comprehensive feedback
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-5 shadow-sm">
                <stat.icon className="h-7 w-7 text-fdm-600 mx-auto mb-2" />
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Select Your Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRoles.map((role, i) => (
              <motion.div key={role.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} onClick={() => navigate(`/login/${role.id}`)} className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{role.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="space-y-1.5 mb-4">
                  {role.features.map((f, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-2" />
                      {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full bg-gradient-to-r ${role.gradient} text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center group-hover:gap-2`}>
                  Login as {role.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 Faculty Feedback Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
