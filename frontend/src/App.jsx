import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import HODLogin from './pages/HODLogin';
import AdminLogin from './pages/AdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import { StudentLayout, StudentDashboardHome } from './components/StudentLayout';
import StudentProfile from './pages/StudentProfile';
import MySubmissions from './pages/MySubmissions';
import ChangePassword from './pages/ChangePassword';
import HelpContact from './pages/HelpContact';
import SemesterFeedback from './pages/SemesterFeedback';
import FeedbackPreview from './pages/FeedbackPreview';
import FeedbackReceipt from './pages/FeedbackReceipt';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login Routes */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/hod" element={<HODLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Student Routes with Sidebar Layout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboardHome />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="submissions" element={<MySubmissions />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="help" element={<HelpContact />} />
          <Route path="semester/:semesterId" element={<SemesterFeedback />} />
          <Route path="semester/:semesterId/preview" element={<FeedbackPreview />} />
          <Route path="semester/:semesterId/receipt" element={<FeedbackReceipt />} />
        </Route>
        
        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white"><div className="text-center"><h1 className="text-2xl font-bold">Faculty Dashboard</h1><p className="text-sm text-gray-600 mt-2">Coming Soon...</p></div></div>} />
        
        {/* HOD Routes */}
        <Route path="/hod/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white"><div className="text-center"><h1 className="text-2xl font-bold">HOD Dashboard</h1><p className="text-sm text-gray-600 mt-2">Coming Soon...</p></div></div>} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white"><div className="text-center"><h1 className="text-2xl font-bold">Admin Dashboard</h1><p className="text-sm text-gray-600 mt-2">Coming Soon...</p></div></div>} />
      </Routes>
    </Router>
  );
}

export default App;
