import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Home, ChevronRight, Send, Edit, CheckCircle } from 'lucide-react';

const FeedbackPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { semesterId } = useParams();
  const { feedbackData } = location.state || { feedbackData: [] };

  const questions = [
    "How would you rate the faculty's teaching effectiveness?",
    "How would you rate the faculty's subject knowledge and expertise?",
    "How well does the faculty communicate complex concepts?",
    "How approachable and helpful is the faculty during office hours?",
    "How effectively does the faculty use teaching aids and technology?",
    "How well does the faculty encourage student participation?",
    "How fair and transparent is the faculty's evaluation process?",
    "How well does the faculty provide timely feedback on assignments?",
    "How organized and well-structured are the lectures?",
    "How relevant is the course content to practical applications?",
    "How punctual and regular is the faculty?",
    "How well does the faculty handle student queries and doubts?",
    "How effectively does the faculty maintain classroom discipline?",
    "How innovative are the teaching methods used?",
    "How well does the faculty inspire interest in the subject?",
    "How accessible are the course materials and resources?",
    "How well does the faculty relate theory to real-world examples?",
    "How balanced is the workload assigned by the faculty?",
    "How encouraging is the faculty towards academic excellence?",
    "Overall, how satisfied are you with this faculty's teaching?"
  ];

  const getRatingLabel = (rating) => {
    const labels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
    return labels[rating] || 'Not Rated';
  };

  const getRatingColor = (rating) => {
    const colors = { 
      1: 'text-red-600 bg-red-50', 
      2: 'text-orange-600 bg-orange-50', 
      3: 'text-yellow-600 bg-yellow-50', 
      4: 'text-blue-600 bg-blue-50', 
      5: 'text-green-600 bg-green-50' 
    };
    return colors[rating] || 'text-gray-600 bg-gray-50';
  };

  const completedCount = feedbackData.filter(item => item.rating !== null).length;
  const totalCount = feedbackData.length;
  const isComplete = completedCount === totalCount;

  const handleSubmit = () => {
    if (!isComplete) {
      alert('Please complete all feedback before submitting. You have ' + (totalCount - completedCount) + ' unanswered questions.');
      return;
    }
    if (window.confirm('Are you sure you want to submit your feedback? This action cannot be undone.')) {
      alert('Feedback submitted successfully!');
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4" />
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <button onClick={() => navigate('/student/dashboard')} className="text-gray-600 hover:text-blue-600">
              Dashboard
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-600">Semester {semesterId}</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="font-medium text-blue-600">Preview</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Preview Your Feedback</h1>
          <p className="text-sm text-gray-600 mt-1">Review your responses before submitting</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 rounded-lg p-4 ${isComplete ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className={`h-5 w-5 ${isComplete ? 'text-green-600' : 'text-yellow-600'}`} />
              <div>
                <p className={`text-sm font-medium ${isComplete ? 'text-green-900' : 'text-yellow-900'}`}>
                  {isComplete ? 'All feedback completed!' : 'Incomplete feedback'}
                </p>
                <p className={`text-xs ${isComplete ? 'text-green-700' : 'text-yellow-700'}`}>
                  {completedCount} of {totalCount} responses completed
                </p>
              </div>
            </div>
            {!isComplete && (
              <button
                onClick={() => navigate(`/student/semester/${semesterId}`)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Edit className="h-4 w-4" />
                Complete Feedback
              </button>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3">
            <h3 className="text-white font-semibold text-sm">Complete Feedback Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase">S.No</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase">Faculty</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase">Subject</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700 uppercase">Question</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-700 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feedbackData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.facultyName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.subject}</td>
                    <td className="py-3 px-4 text-xs text-gray-600">{questions[item.table - 1]}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRatingColor(item.rating)}`}>
                        {item.rating ? `${item.rating}/5 - ${getRatingLabel(item.rating)}` : 'Not Rated'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => navigate(`/student/semester/${semesterId}`)}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Edit className="h-4 w-4" />
            Edit Responses
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPreview;