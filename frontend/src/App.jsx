import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/student/StudentDashboard';
import FeedbackForm from './pages/student/FeedbackForm';
import ViewSubmission from './pages/student/ViewSubmission';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/feedback/:mapId" element={<FeedbackForm />} />
        <Route path="/student/submission/:mapId" element={<ViewSubmission />} />
        
        {/* HOD Routes (to be implemented) */}
        <Route path="/hod/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800">HOD Dashboard</h1><p className="text-gray-600 mt-2">Coming Soon...</p></div></div>} />
        
        {/* Admin Routes (to be implemented) */}
        <Route path="/admin/dashboard" element={<div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1><p className="text-gray-600 mt-2">Coming Soon...</p></div></div>} />
      </Routes>
    </Router>
  );
}

export default App;
