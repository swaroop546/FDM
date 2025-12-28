import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  Download, 
  RefreshCw, 
  Award,
  Users,
  Star,
  FileText
} from 'lucide-react';

const AnalyticsReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { batch, regulation, semester, hodInfo } = location.state || {};
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!batch || !regulation || !semester) {
    navigate('/hod/feedback-analytics');
    return null;
  }

  // Mock data - 20 questions from student feedback form
  const questionAnalytics = [
    { id: 1, question: "Faculty demonstrates mastery of the subject", avgRating: 4.5, totalResponses: 48 },
    { id: 2, question: "Explains concepts clearly and effectively", avgRating: 4.3, totalResponses: 48 },
    { id: 3, question: "Uses real-world examples and applications", avgRating: 4.4, totalResponses: 48 },
    { id: 4, question: "Encourages student participation", avgRating: 4.2, totalResponses: 48 },
    { id: 5, question: "Responds to student queries effectively", avgRating: 4.6, totalResponses: 48 },
    { id: 6, question: "Maintains punctuality and regularity", avgRating: 4.7, totalResponses: 48 },
    { id: 7, question: "Completes syllabus on time", avgRating: 4.4, totalResponses: 48 },
    { id: 8, question: "Uses teaching aids effectively", avgRating: 4.1, totalResponses: 48 },
    { id: 9, question: "Provides adequate assignments/tests", avgRating: 4.3, totalResponses: 48 },
    { id: 10, question: "Fair and transparent in evaluation", avgRating: 4.5, totalResponses: 48 },
    { id: 11, question: "Creates positive learning environment", avgRating: 4.4, totalResponses: 48 },
    { id: 12, question: "Accessible outside class hours", avgRating: 4.2, totalResponses: 48 },
    { id: 13, question: "Provides timely feedback on assessments", avgRating: 4.3, totalResponses: 48 },
    { id: 14, question: "Uses innovative teaching methods", avgRating: 4.0, totalResponses: 48 },
    { id: 15, question: "Encourages critical thinking", avgRating: 4.4, totalResponses: 48 },
    { id: 16, question: "Relates theory to practical applications", avgRating: 4.3, totalResponses: 48 },
    { id: 17, question: "Maintains classroom discipline", avgRating: 4.5, totalResponses: 48 },
    { id: 18, question: "Motivated and enthusiastic about teaching", avgRating: 4.6, totalResponses: 48 },
    { id: 19, question: "Communication skills are effective", avgRating: 4.4, totalResponses: 48 },
    { id: 20, question: "Overall teaching effectiveness", avgRating: 4.4, totalResponses: 48 }
  ];

  // Mock subject-wise performance
  const subjectPerformance = [
    { id: 1, subjectCode: 'CS401', subjectName: 'Data Structures', faculty: 'Dr. A. Kumar', avgRating: 4.5, responses: 48, type: 'Theory' },
    { id: 2, subjectCode: 'CS402', subjectName: 'Database Management Systems', faculty: 'Dr. B. Sharma', avgRating: 4.3, responses: 48, type: 'Theory' },
    { id: 3, subjectCode: 'CS403', subjectName: 'Operating Systems', faculty: 'Dr. C. Reddy', avgRating: 4.4, responses: 48, type: 'Theory' },
    { id: 4, subjectCode: 'CS404', subjectName: 'Computer Networks', faculty: 'Dr. D. Patel', avgRating: 4.2, responses: 48, type: 'Theory' },
    { id: 5, subjectCode: 'CS405', subjectName: 'Software Engineering', faculty: 'Dr. E. Singh', avgRating: 4.6, responses: 48, type: 'Theory' },
    { id: 6, subjectCode: 'CS406', subjectName: 'DBMS Lab', faculty: 'Prof. F. Gupta', avgRating: 4.4, responses: 48, type: 'Lab' },
    { id: 7, subjectCode: 'CS407', subjectName: 'OS Lab', faculty: 'Prof. G. Rao', avgRating: 4.3, responses: 48, type: 'Lab' },
    { id: 8, subjectCode: 'CS408', subjectName: 'Machine Learning', faculty: 'Dr. H. Verma', avgRating: 4.5, responses: 48, type: 'Elective' },
    { id: 9, subjectCode: 'CS409', subjectName: 'Web Technologies', faculty: 'Prof. I. Khan', avgRating: 4.2, responses: 48, type: 'Minor' },
    { id: 10, subjectCode: 'CS410', subjectName: 'Cyber Security', faculty: 'Dr. J. Mehta', avgRating: 4.7, responses: 48, type: 'Honors' }
  ];

  // Calculate overall statistics
  const overallAvgRating = (questionAnalytics.reduce((sum, q) => sum + q.avgRating, 0) / questionAnalytics.length).toFixed(2);
  const totalResponses = questionAnalytics[0]?.totalResponses || 0;
  const excellentCount = questionAnalytics.filter(q => q.avgRating >= 4.5).length;
  const topPerformingSubjects = subjectPerformance.filter(s => s.avgRating >= 4.5).length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = () => {
    // Export functionality - would generate PDF/Excel report
    alert('Report export functionality will be implemented');
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 4.0) return 'text-blue-600 bg-blue-100';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getRatingBarColor = (rating) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-blue-500';
    if (rating >= 3.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getSubjectTypeColor = (type) => {
    const colors = {
      'Theory': 'bg-blue-100 text-blue-700',
      'Lab': 'bg-purple-100 text-purple-700',
      'Elective': 'bg-orange-100 text-orange-700',
      'Minor': 'bg-teal-100 text-teal-700',
      'Honors': 'bg-pink-100 text-pink-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feedback Analytics Report</h1>
            <p className="text-sm text-gray-600 mt-1">Detailed analysis of student feedback</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 overflow-x-auto">
        <button onClick={() => navigate('/hod/dashboard')} className="hover:text-blue-600 whitespace-nowrap">
          Dashboard
        </button>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <button onClick={() => navigate('/hod/feedback-analytics')} className="hover:text-blue-600 whitespace-nowrap">
          Feedback Analytics
        </button>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="whitespace-nowrap">{batch.name}</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="whitespace-nowrap">{regulation}</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="whitespace-nowrap">{semester.name}</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium text-blue-600 whitespace-nowrap">Report</span>
      </div>

      {/* Context Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-xs text-gray-600">Batch</p>
            <p className="text-sm font-bold text-gray-900">{batch.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Regulation</p>
            <p className="text-sm font-bold text-gray-900">{regulation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Semester</p>
            <p className="text-sm font-bold text-gray-900">{semester.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Total Responses</p>
            <p className="text-sm font-bold text-gray-900">{totalResponses}</p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{overallAvgRating}/5</p>
          <p className="text-sm text-gray-600">Overall Avg Rating</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{excellentCount}/20</p>
          <p className="text-sm text-gray-600">Excellent Parameters</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
          <p className="text-sm text-gray-600">Total Responses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{topPerformingSubjects}/10</p>
          <p className="text-sm text-gray-600">Top Subjects</p>
        </motion.div>
      </div>

      {/* Question-wise Analytics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Question-wise Analysis</h2>
            <p className="text-xs text-gray-600">Average ratings for each parameter</p>
          </div>
        </div>

        <div className="space-y-4">
          {questionAnalytics.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Q{q.id}. {q.question}</p>
                  <p className="text-xs text-gray-500">{q.totalResponses} responses</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${getRatingColor(q.avgRating)}`}>
                  {q.avgRating}/5
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getRatingBarColor(q.avgRating)}`}
                  style={{ width: `${(q.avgRating / 5) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subject-wise Performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Subject-wise Performance</h2>
            <p className="text-xs text-gray-600">Faculty performance across all subjects</p>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Subject Code</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Subject Name</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Faculty</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Responses</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {subjectPerformance.map((subject) => (
                <tr key={subject.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{subject.subjectCode}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{subject.subjectName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{subject.faculty}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectTypeColor(subject.type)}`}>
                      {subject.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{subject.responses}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRatingColor(subject.avgRating)}`}>
                      {subject.avgRating}/5
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {subjectPerformance.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">{subject.subjectCode}</p>
                  <p className="text-sm text-gray-700">{subject.subjectName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectTypeColor(subject.type)}`}>
                  {subject.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{subject.faculty}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Responses</p>
                  <p className="text-sm font-bold text-gray-900">{subject.responses}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(subject.avgRating)}`}>
                  {subject.avgRating}/5
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsReport;
