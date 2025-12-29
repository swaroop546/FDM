import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronDown,
  BarChart3, 
  Download, 
  RefreshCw, 
  FileText
} from 'lucide-react';

const AnalyticsReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { batch, regulation, semester, hodInfo } = location.state || {};
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState(null);

  if (!batch || !regulation || !semester) {
    navigate('/hod/feedback-analytics');
    return null;
  }

  // 20 questions template for each subject
  const questionTemplate = [
    { id: 1, question: "Faculty demonstrates mastery of the subject" },
    { id: 2, question: "Explains concepts clearly and effectively" },
    { id: 3, question: "Uses real-world examples and applications" },
    { id: 4, question: "Encourages student participation" },
    { id: 5, question: "Responds to student queries effectively" },
    { id: 6, question: "Maintains punctuality and regularity" },
    { id: 7, question: "Completes syllabus on time" },
    { id: 8, question: "Uses teaching aids effectively" },
    { id: 9, question: "Provides adequate assignments/tests" },
    { id: 10, question: "Fair and transparent in evaluation" },
    { id: 11, question: "Creates positive learning environment" },
    { id: 12, question: "Accessible outside class hours" },
    { id: 13, question: "Provides timely feedback on assessments" },
    { id: 14, question: "Uses innovative teaching methods" },
    { id: 15, question: "Encourages critical thinking" },
    { id: 16, question: "Relates theory to practical applications" },
    { id: 17, question: "Maintains classroom discipline" },
    { id: 18, question: "Motivated and enthusiastic about teaching" },
    { id: 19, question: "Communication skills are effective" },
    { id: 20, question: "Overall teaching effectiveness" }
  ];

  // Generate random ratings for each question (simulating different ratings per subject)
  const generateQuestionRatings = (baseRating, responses) => {
    return questionTemplate.map(q => ({
      ...q,
      avgRating: Math.min(5, Math.max(3, baseRating + (Math.random() * 0.6 - 0.3))).toFixed(1),
      totalResponses: responses
    }));
  };

  // Mock subject-wise performance with question-wise data
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
  ].map(subject => ({
    ...subject,
    questions: generateQuestionRatings(subject.avgRating, subject.responses)
  }));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = () => {
    alert('Report export functionality will be implemented');
  };

  const toggleSubject = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const getRatingColor = (rating) => {
    const r = parseFloat(rating);
    if (r >= 4.5) return 'text-green-600 bg-green-100';
    if (r >= 4.0) return 'text-blue-600 bg-blue-100';
    if (r >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getRatingBarColor = (rating) => {
    const r = parseFloat(rating);
    if (r >= 4.5) return 'bg-green-500';
    if (r >= 4.0) return 'bg-blue-500';
    if (r >= 3.5) return 'bg-yellow-500';
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
            <p className="text-xs text-gray-600">Total Subjects</p>
            <p className="text-sm font-bold text-gray-900">{subjectPerformance.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Subject-wise Performance with Expandable Question Analysis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border-2 border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Subject-wise Feedback Analysis</h2>
            <p className="text-xs text-gray-600">Click on a subject to view detailed question-wise analysis</p>
          </div>
        </div>

        <div className="space-y-4">
          {subjectPerformance.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Subject Header - Clickable */}
              <button
                onClick={() => toggleSubject(subject.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{subject.subjectCode}</p>
                    <p className="text-xs text-gray-600">{subject.subjectName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectTypeColor(subject.type)}`}>
                    {subject.type}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500">{subject.faculty}</p>
                    <p className="text-xs text-gray-400">{subject.responses} responses</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(subject.avgRating)}`}>
                    {subject.avgRating}/5
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform ${expandedSubject === subject.id ? 'rotate-180' : ''}`} 
                  />
                </div>
              </button>

              {/* Expanded Question-wise Analysis */}
              <AnimatePresence>
                {expandedSubject === subject.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t-2 border-gray-200 bg-gray-50"
                  >
                    <div className="p-4">
                      {/* Faculty Info on Mobile */}
                      <div className="sm:hidden mb-4 p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{subject.faculty}</p>
                        <p className="text-xs text-gray-500">{subject.responses} responses</p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <h3 className="text-sm font-bold text-gray-900">Question-wise Analysis</h3>
                      </div>

                      <div className="space-y-3">
                        {subject.questions.map((q) => (
                          <div
                            key={q.id}
                            className="bg-white rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-900">Q{q.id}. {q.question}</p>
                              </div>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-bold ml-2 ${getRatingColor(q.avgRating)}`}>
                                {q.avgRating}/5
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${getRatingBarColor(q.avgRating)}`}
                                style={{ width: `${(parseFloat(q.avgRating) / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsReport;
