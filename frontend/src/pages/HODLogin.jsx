import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const HODLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/hod/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-9 w-9 text-white" />
            </div>
            <h2 className="text-2xl font-bold">HOD Login</h2>
            <p className="text-sm text-gray-600 mt-2">Department management portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="hod@university.edu" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-11 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Enter your password" required />
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
              <a href="#" className="text-emerald-600 hover:text-emerald-700">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Need help? <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Contact Support</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HODLogin;