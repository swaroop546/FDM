import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ rollNumber: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/student/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <PublicNavbar />
      <div className="flex items-center justify-center p-4 pt-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-9 w-9 text-white" />
            </div>
            <h2 className="text-2xl font-bold">STUDENT LOGIN</h2>
            <p className="text-sm text-gray-600 mt-2">ACCESS YOUR FEEDBACK PORTAL</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">ROLL NUMBER</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" value={formData.rollNumber} onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value.toUpperCase() })} className="w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase" placeholder="CSE2024001" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-11 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            NEED HELP? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">CONTACT SUPPORT</a>
          </p>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default StudentLogin;