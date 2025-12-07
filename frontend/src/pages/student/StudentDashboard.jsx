import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubjectCard from '../../components/student/SubjectCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  // Mock student data (will be replaced with actual API call)
  const [studentData] = useState({
    roll: '21B81A0501',
    name: 'John Doe',
    branch: 'CSE',
    program: 'B.Tech',
    batch: '2021-2025',
    regulation: 'R22',
    currentYear: 3,
    currentSemester: 5
  });

  // Mock active subjects (will be fetched from API)
  const [activeSubjects] = useState([
    {
      map_id: 'MAP001',
      subject_code: 'CS501',
      subject_name: 'Operating Systems',
      faculty_name: 'Dr. Smith',
      faculty_id: 'FAC101',
      submitted: false
    },
    {
      map_id: 'MAP002',
      subject_code: 'CS502',
      subject_name: 'Database Management Systems',
      faculty_name: 'Dr. Johnson',
      faculty_id: 'FAC102',
      submitted: true,
      submittedDate: '2025-12-05'
    },
    {
      map_id: 'MAP003',
      subject_code: 'CS503',
      subject_name: 'Computer Networks',
      faculty_name: 'Dr. Williams',
      faculty_id: 'FAC103',
      submitted: false
    },
    {
      map_id: 'MAP004',
      subject_code: 'CS504',
      subject_name: 'Software Engineering',
      faculty_name: 'Dr. Brown',
      faculty_id: 'FAC104',
      submitted: true,
      submittedDate: '2025-12-03'
    },
    {
      map_id: 'MAP005',
      subject_code: 'CS505',
      subject_name: 'OS Lab',
      faculty_name: 'Dr. Davis',
      faculty_id: 'FAC105',
      submitted: false
    },
    {
      map_id: 'MAP006',
      subject_code: 'CS506',
      subject_name: 'DBMS Lab',
      faculty_name: 'Dr. Miller',
      faculty_id: 'FAC106',
      submitted: false
    }
  ]);

  // Mock previous submissions
  const [previousSubmissions] = useState([
    {
      map_id: 'MAP101',
      subject_name: 'Data Structures',
      faculty_name: 'Dr. Anderson',
      submitted_at: '2025-11-20',
      semester: 4
    },
    {
      map_id: 'MAP102',
      subject_name: 'Java Programming',
      faculty_name: 'Dr. Taylor',
      submitted_at: '2025-11-18',
      semester: 4
    },
    {
      map_id: 'MAP103',
      subject_name: 'Web Technologies',
      faculty_name: 'Dr. Martinez',
      submitted_at: '2025-11-15',
      semester: 4
    }
  ]);

  const handleLogout = () => {
    // Clear session/token
    navigate('/');
  };

  const handleFeedbackSubmit = (mapId) => {
    navigate(`/student/feedback/${mapId}`);
  };

  const handleViewSubmission = (mapId) => {
    navigate(`/student/submission/${mapId}`);
  };

  const pendingCount = activeSubjects.filter(s => !s.submitted).length;
  const completedCount = activeSubjects.filter(s => s.submitted).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-blue-100 text-sm">Feedback Management System</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all font-medium border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-blue-100">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {studentData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{studentData.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <strong>Roll:</strong> {studentData.roll}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <strong>Branch:</strong> {studentData.branch}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <strong>Program:</strong> {studentData.program}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <strong>Batch:</strong> {studentData.batch}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <strong>Regulation:</strong> {studentData.regulation}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>Current Semester:</strong> {studentData.currentSemester}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-semibold uppercase tracking-wide">Pending Feedback</p>
                <p className="text-5xl font-bold mt-3">{pendingCount}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Completed</p>
                <p className="text-5xl font-bold mt-3">{completedCount}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Subjects</p>
                <p className="text-5xl font-bold mt-3">{activeSubjects.length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          <div className="flex border-b border-blue-100 bg-blue-50/50">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-4 px-6 font-bold transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-blue-700 border-b-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              Active Feedback ({pendingCount} Pending)
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`flex-1 py-4 px-6 font-bold transition-all ${
                activeTab === 'previous'
                  ? 'bg-white text-blue-700 border-b-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-white/60'
              }`}
            >
              Previous Submissions
            </button>
          </div>

          {/* Active Feedback Tab */}
          {activeTab === 'active' && (
            <div className="p-6">
              {activeSubjects.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-lg font-medium">No active feedback forms available</p>
                  <p className="text-sm mt-2">Check back later when your HOD publishes new feedback forms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.map_id}
                      subject={subject}
                      onSubmit={handleFeedbackSubmit}
                      onView={handleViewSubmission}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Previous Submissions Tab */}
          {activeTab === 'previous' && (
            <div className="p-6">
              {previousSubmissions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium">No previous submissions</p>
                  <p className="text-sm mt-2">Your feedback history will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {previousSubmissions.map((submission) => (
                    <div
                      key={submission.map_id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleViewSubmission(submission.map_id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{submission.subject_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Faculty: {submission.faculty_name}</p>
                          <p className="text-xs text-gray-500 mt-1">Semester: {submission.semester}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Submitted
                          </span>
                          <p className="text-xs text-gray-500 mt-2">{new Date(submission.submitted_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
