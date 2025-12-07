import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();

  // Student login state
  const [studentForm, setStudentForm] = useState({ rollNumber: '', password: '' });
  
  // HOD login state
  const [hodForm, setHodForm] = useState({ email: '', password: '' });
  
  // Admin login state
  const [adminForm, setAdminForm] = useState({ email: '', password: '' });

  const handleStudentLogin = (e) => {
    e.preventDefault();
    console.log('Student Login:', studentForm);
    // TODO: API call for authentication
    navigate('/student/dashboard');
  };

  const handleHODLogin = (e) => {
    e.preventDefault();
    console.log('HOD Login:', hodForm);
    // TODO: API call for authentication
    navigate('/hod/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log('Admin Login:', adminForm);
    // TODO: API call for authentication
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-3">
            Feedback Management System
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            College Academic Feedback Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Tabs */}
          <div className="flex border-b border-blue-100 bg-blue-50/50">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-blue-700 border-b-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Student Login</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('hod')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all ${
                activeTab === 'hod'
                  ? 'bg-white text-blue-700 border-b-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>HOD Login</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-blue-700 border-b-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Admin Login</span>
              </div>
            </button>
          </div>

          {/* Login Forms */}
          <div className="p-10">
            {/* Student Login Form */}
            {activeTab === 'student' && (
              <form onSubmit={handleStudentLogin} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Student Login</h2>
                  <p className="text-gray-500 mt-2">Enter your credentials to access your dashboard</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={studentForm.rollNumber}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                    placeholder="e.g., 21B81A0501"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Login as Student
                </button>
                
                <div className="text-center text-sm text-gray-500">
                  <a href="#" className="hover:text-blue-500">Forgot Password?</a>
                </div>
              </form>
            )}

            {/* HOD Login Form */}
            {activeTab === 'hod' && (
              <form onSubmit={handleHODLogin} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">HOD Login</h2>
                  <p className="text-gray-500 mt-2">Enter your email and password to manage feedback</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={hodForm.email}
                    onChange={(e) => setHodForm({ ...hodForm, email: e.target.value })}
                    placeholder="hod@college.edu"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={hodForm.password}
                    onChange={(e) => setHodForm({ ...hodForm, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Login as HOD
                </button>
                
                <div className="text-center text-sm text-gray-500">
                  <a href="#" className="hover:text-blue-600 font-medium">Need Help?</a>
                </div>
              </form>
            )}

            {/* Admin Login Form */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                  <p className="text-gray-500 mt-2">Enter your credentials to access admin panel</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    placeholder="admin@college.edu"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={adminForm.password}
                    onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Login as Admin
                </button>
                
                <div className="text-center text-sm text-gray-500">
                  <a href="#" className="hover:text-blue-600 font-medium">Contact Support</a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <p className="text-sm">© 2025 Feedback Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
