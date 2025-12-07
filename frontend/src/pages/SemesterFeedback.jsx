import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft, Eye } from 'lucide-react';

const SemesterFeedback = () => {
  const navigate = useNavigate();
  const { semesterId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Sample faculty data - 10 rows per table, 2 tables per page = 20 subjects per page
  // Total: 5 pages × 20 = 100 subjects
  const generateFeedbackData = () => {
    const data = [];
    const facultyNames = ['Dr. Smith', 'Prof. Johnson', 'Dr. Williams', 'Prof. Brown', 'Dr. Jones', 'Prof. Davis', 'Dr. Miller', 'Prof. Wilson', 'Dr. Moore', 'Prof. Taylor'];
    const subjects = ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Web Development', 'Machine Learning', 'AI', 'Cloud Computing'];
    
    for (let page = 1; page <= totalPages; page++) {
      for (let table = 1; table <= 2; table++) {
        for (let row = 1; row <= 10; row++) {
          const index = (page - 1) * 20 + (table - 1) * 10 + row - 1;
          data.push({
            id: index + 1,
            page: page,
            table: table,
            facultyName: facultyNames[index % facultyNames.length],
            subject: subjects[index % subjects.length],
            rating: null
          });
        }
      }
    }
    return data;
  };

  const [feedbackData, setFeedbackData] = useState(generateFeedbackData());

  const handleRatingChange = (id, rating) => {
    setFeedbackData(prev => 
      prev.map(item => item.id === id ? { ...item, rating } : item)
    );
  };

  const getCurrentPageData = () => {
    return feedbackData.filter(item => item.page === currentPage);
  };

  const getTableData = (tableNumber) => {
    return getCurrentPageData().filter(item => item.table === tableNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreview = () => {
    navigate(`/student/semester/${semesterId}/preview`, { state: { feedbackData } });
  };

  const RatingRow = ({ item }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="font-medium text-sm">{item.facultyName}</span>
          <span className="text-xs text-gray-600 mt-1">{item.subject}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center justify-center gap-6">
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name={`rating-${item.id}`}
                value={rating}
                checked={item.rating === rating}
                onChange={() => handleRatingChange(item.id, rating)}
                className="w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600">{rating}</span>
            </label>
          ))}
        </div>
      </td>
    </tr>
  );

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

  const FeedbackTable = ({ tableNumber, title }) => {
    const tableData = getTableData(tableNumber);
    
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3">
          <h3 className="text-white font-semibold text-sm">{questions[tableNumber - 1]}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/3">
                  Faculty & Subject Information
                </th>
                <th className="py-3 px-6 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-2/3">
                  Rating (1-5)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map(item => (
                <RatingRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="h-4 w-4" />
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <button onClick={() => navigate('/student/dashboard')} className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-600">Semester {semesterId}</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="font-medium text-blue-600">Page {currentPage}</span>
          </div>
          <button onClick={() => navigate('/student/dashboard')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Semester {semesterId} Feedback</h1>
          <p className="text-sm text-gray-600 mt-1">Page {currentPage} of {totalPages}</p>
        </motion.div>

        {/* Feedback Tables */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeedbackTable tableNumber={1} />
          <FeedbackTable tableNumber={2} />
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8 bg-white rounded-lg px-6 py-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo(0, 0);
                }}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentPage < totalPages ? (
            <button
              onClick={handleNextPage}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:shadow-lg transition-all"
            >
              <Eye className="h-4 w-4" />
              Preview & Submit
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Overall Progress</span>
            <span className="text-xs font-medium text-gray-900">{currentPage}/{totalPages} Pages</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterFeedback;