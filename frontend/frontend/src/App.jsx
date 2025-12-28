import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

// HOD Imports
import HODLayout from './components/HOD/HODLayout';
import HODDashboard from './pages/HOD/HODDashboard';
import FeedbackManagement from './pages/HOD/FeedbackManagement';
import SemesterSelection from './pages/HOD/SemesterSelection';
import TimetableView from './pages/HOD/TimetableView';
import FeedbackAnalytics from './pages/HOD/FeedbackAnalytics';
import AnalyticsSemesterSelection from './pages/HOD/AnalyticsSemesterSelection';
import AnalyticsReport from './pages/HOD/AnalyticsReport';
import HODChangePassword from './pages/HOD/HODChangePassword';
import HODHelp from './pages/HOD/HODHelp';

// Admin Imports
import AdminPage from './components/Admin/Admin';

function App() {
  return (
    <AuthProvider>
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
          
          {/* HOD Routes with Sidebar Layout */}
          <Route path="/hod" element={<HODLayout />}>
            <Route path="dashboard" element={<HODDashboard />} />
            <Route path="feedback-management" element={<FeedbackManagement />} />
            <Route path="feedback-management/semesters" element={<SemesterSelection />} />
            <Route path="feedback-management/timetable" element={<TimetableView />} />
            <Route path="feedback-analytics" element={<FeedbackAnalytics />} />
            <Route path="feedback-analytics/semesters" element={<AnalyticsSemesterSelection />} />
            <Route path="feedback-analytics/report" element={<AnalyticsReport />} />
            <Route path="change-password" element={<HODChangePassword />} />
            <Route path="help" element={<HODHelp />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          {/* Keep the old placeholder route just in case, or map /admin/dashboard to AdminPage as well if needed */}
          <Route path="/admin/dashboard" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
