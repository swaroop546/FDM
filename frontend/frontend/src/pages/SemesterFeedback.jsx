import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft, Eye, ChevronDown } from 'lucide-react';

const SemesterFeedback = () => {
  const navigate = useNavigate();
  const { semesterId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // Sample faculty data - 10 faculty per question
  // Total: 20 questions × 10 faculty = 200 ratings
  const generateFeedbackData = () => {
    const data = [];
    const facultyNames = ['Dr. Smith', 'Prof. Johnson', 'Dr. Williams', 'Prof. Brown', 'Dr. Jones', 'Prof. Davis', 'Dr. Miller', 'Prof. Wilson', 'Dr. Moore', 'Prof. Taylor'];
    const subjects = ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Web Development', 'Machine Learning', 'AI', 'Cloud Computing'];
    
    // 20 questions total
    for (let questionIndex = 0; questionIndex < 20; questionIndex++) {
      // 10 faculty per question
      for (let facultyIndex = 0; facultyIndex < 10; facultyIndex++) {
        data.push({
          id: `q${questionIndex}-f${facultyIndex}`,
          questionIndex: questionIndex,
          facultyName: facultyNames[facultyIndex],
          subject: subjects[facultyIndex],
          rating: null
        });
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

  // Get questions for current page: Page 1: 6, Page 2: 6, Page 3: 8
  const getQuestionsForPage = (page) => {
    if (page === 1) return [0, 1, 2, 3, 4, 5]; // Questions 1-6
    if (page === 2) return [6, 7, 8, 9, 10, 11]; // Questions 7-12
    if (page === 3) return [12, 13, 14, 15, 16, 17, 18, 19]; // Questions 13-20
    return [];
  };

  const getQuestionData = (questionIndex) => {
    return feedbackData.filter(item => item.questionIndex === questionIndex);
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

  const handleDemoFill = () => {
    setFeedbackData(prev => 
      prev.map(item => ({
        ...item,
        rating: Math.floor(Math.random() * 5) + 1 // Random rating between 1-5
      }))
    );
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
    "Teacher is prepared for class and good at blackboard management.",
    "Teacher knows his/her subject. His lecture is audible and expressive with clarity.",
    "Teacher is organized and neat. Teacher has clear classroom procedures so students don't waste time.",
    "Teacher is punctual to the class, plans class time and help students to solve problems and think critically. Teacher provides activities that make subject matter meaningful.",
    "Teacher is flexible in accommodating for individual student needs.",
    "Teacher is clear in giving directions and on explaining what is expected on tests. He has clear idea in setting question paper.",
    "Teacher allows you to be active in the classroom learning environment.",
    "Teacher manages the time well and covers the syllabus.",
    "Teacher awards marks fairly. Teacher conducts examination as per schedule.",
    "I have learned a lot about this subject and the teacher motivates the students in global aspects besides teaching.",
    "Teacher gives me good feedback so that I can improve.",
    "Teacher uses advanced teaching aids. Teacher is creative in developing activities and lessons.",
    "Teacher encourages students to speak up and be active in the class.",
    "Teacher follows through on what he/she says. You can count on the teacher's word.",
    "Teacher listens and understands students' point of view. Teacher respects the opinions and decisions of students.",
    "Teacher adjusts class work when on leave or compensates missed classes. Teacher is willing to accept responsibility for his/her own mistakes.",
    "Teacher is consistent, fair and firm in discipline without being too strict.",
    "Teacher is sensitive to the needs of students. Teacher likes and respects students.",
    "Teacher helps you when you ask for help.",
    "Teacher's words and actions match. I trust this teacher."
  ];

  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleQuestion = (questionIndex) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const QuestionCard = ({ questionIndex }) => {
    const questionData = getQuestionData(questionIndex);
    const isExpanded = expandedQuestions[questionIndex];
    const filledCount = questionData.filter(item => item.rating !== null).length;
    
    const handleToggle = () => {
      toggleQuestion(questionIndex);
    };
    
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 h-fit">
        <button
          type="button"
          onClick={handleToggle}
          className="w-full bg-blue-600 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 hover:bg-blue-700 transition-all"
        >
          <div className="flex items-start gap-2 flex-1 text-left pointer-events-none">
            <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
              {questionIndex + 1}
            </span>
            <h3 className="text-white font-semibold text-xs sm:text-sm flex-1 leading-snug">{questions[questionIndex]}</h3>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pointer-events-none">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${filledCount === questionData.length ? 'bg-green-400 text-gray-900' : 'bg-yellow-400 text-gray-900'}`}>
              {filledCount}/10
            </span>
            <ChevronDown className={`h-4 w-4 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-2 sm:p-3">
            <div className="mb-2 pb-2 border-b border-gray-200">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <span className="font-semibold text-gray-700">Scale:</span>
                <span className="text-red-600 font-medium">1-Poor</span>
                <span className="text-orange-500 font-medium">2-Fair</span>
                <span className="text-yellow-500 font-medium">3-Avg</span>
                <span className="text-blue-500 font-medium">4-Good</span>
                <span className="text-green-600 font-medium">5-Excellent</span>
              </div>
            </div>
            <div className="space-y-1">
              {questionData.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-50 border border-gray-100">
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <div className="font-medium text-[11px] text-gray-900">{item.facultyName}</div>
                    <div className="text-[9px] text-gray-600">{item.subject}</div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    {[1, 2, 3, 4, 5].map(rating => (
                        <label key={rating} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name={`rating-${item.id}`}
                            value={rating}
                            checked={item.rating === rating}
                            onChange={() => handleRatingChange(item.id, rating)}
                            className="w-3 h-3 text-blue-600 cursor-pointer"
                          />
                          <span className="ml-0.5 text-[11px] text-gray-700 group-hover:text-blue-600 font-medium">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900 transition-colors shrink-0">
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 shrink-0" />
            <button onClick={() => navigate('/student/dashboard')} className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
              Dashboard
            </button>
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 shrink-0" />
            <span className="text-gray-600 whitespace-nowrap">Semester {semesterId}</span>
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-400 shrink-0" />
            <span className="font-medium text-blue-600 whitespace-nowrap">Page {currentPage}</span>
          </div>
          <button onClick={() => navigate('/student/dashboard')} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap ml-2">
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SEMESTER {semesterId} FEEDBACK</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Page {currentPage} of {totalPages}</p>
          </div>
          <button
            onClick={handleDemoFill}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-md"
          >
            🎲 Demo Fill
          </button>
        </motion.div>

        {/* Feedback Questions - 2 Column Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {getQuestionsForPage(currentPage).map(qIndex => (
            <QuestionCard key={qIndex} questionIndex={qIndex} />
          ))}
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-6 sm:mt-8 bg-white rounded-lg px-3 sm:px-6 py-3 sm:py-4 shadow-md">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Previous
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo(0, 0);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          ) : (
            <button
              onClick={handlePreview}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:shadow-lg transition-all"
            >
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Preview & Submit
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 sm:mt-6 bg-white rounded-lg p-3 sm:p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-gray-600">OVERALL PROGRESS</span>
            <span className="text-xs sm:text-sm font-medium text-gray-900">{currentPage}/{totalPages} Pages</span>
          </div>
          <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterFeedback;