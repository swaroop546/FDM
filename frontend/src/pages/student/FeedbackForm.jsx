import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RatingInput from '../../components/student/RatingInput';

const FeedbackForm = () => {
  const { mapId } = useParams();
  const navigate = useNavigate();

  // Mock subject data (will be fetched from API based on mapId)
  const [subjectData] = useState({
    subject_code: 'CS501',
    subject_name: 'Operating Systems',
    faculty_name: 'Dr. Smith',
    faculty_id: 'FAC101'
  });

  // Mock feedback questions (will be fetched from API)
  const [questions] = useState([
    { s_no: 1, criteria_text: 'Subject knowledge of the faculty' },
    { s_no: 2, criteria_text: 'Communication skills and clarity' },
    { s_no: 3, criteria_text: 'Use of teaching aids and technology' },
    { s_no: 4, criteria_text: 'Ability to solve doubts and queries' },
    { s_no: 5, criteria_text: 'Availability and approachability' },
    { s_no: 6, criteria_text: 'Encouragement for participation' },
    { s_no: 7, criteria_text: 'Timely completion of syllabus' },
    { s_no: 8, criteria_text: 'Fairness in evaluation' },
    { s_no: 9, criteria_text: 'Regularity and punctuality' },
    { s_no: 10, criteria_text: 'Overall teaching effectiveness' }
  ]);

  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (questionId, rating) => {
    setRatings(prev => ({ ...prev, [questionId]: rating }));
  };

  const allQuestionsAnswered = questions.every(q => ratings[q.s_no]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting');
      return;
    }

    setIsSubmitting(true);

    // Prepare feedback data
    const feedbackData = {
      map_id: mapId,
      ratings: Object.entries(ratings).map(([questionId, rating]) => ({
        question_id: parseInt(questionId),
        rating: rating
      })),
      comment: comment.trim()
    };

    console.log('Submitting feedback:', feedbackData);

    // TODO: API call to submit feedback
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Feedback submitted successfully!');
      navigate('/student/dashboard');
    }, 1500);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your responses will not be saved.')) {
      navigate('/student/dashboard');
    }
  };

  const completionPercentage = Math.round((Object.keys(ratings).length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Feedback Form</h1>
                <p className="text-blue-100 text-sm">Submit your feedback for the course</p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all font-medium border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Subject Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-blue-100">
          <div className="flex items-center gap-5 mb-5">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-2xl shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{subjectData.subject_name}</h2>
              <p className="text-gray-600 mt-2 text-base">
                <span className="font-bold">Code:</span> {subjectData.subject_code} | 
                <span className="font-bold ml-3">Faculty:</span> {subjectData.faculty_name}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-800">Completion Progress</span>
              <span className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm">{completionPercentage}% Complete</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              {Object.keys(ratings).length} of {questions.length} questions answered
            </p>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Rate the following criteria (1-5)</h3>
            <p className="text-sm text-gray-600 font-medium bg-blue-50 p-3 rounded-xl border-l-4 border-blue-600">
              1 = Poor | 2 = Below Average | 3 = Average | 4 = Good | 5 = Excellent
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.s_no} className="border-b-2 border-blue-100 pb-6 last:border-0">
                <label className="block mb-4">
                  <span className="text-gray-800 font-bold text-base">
                    {question.s_no}. {question.criteria_text}
                  </span>
                </label>
                <RatingInput
                  value={ratings[question.s_no]}
                  onChange={(rating) => handleRatingChange(question.s_no, rating)}
                />
              </div>
            ))}
          </div>

          {/* Comment Box */}
          <div className="mt-10">
            <label className="block mb-3">
              <span className="text-gray-800 font-bold text-base">Additional Comments (Optional)</span>
              <span className="text-gray-500 text-sm ml-2 font-medium">(Max 500 characters)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={4}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-gray-50 focus:bg-white transition-all"
              placeholder="Share any additional feedback or suggestions..."
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">
              {comment.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!allQuestionsAnswered || isSubmitting}
              className={`flex-1 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 transform hover:scale-105 ${
                allQuestionsAnswered && !isSubmitting
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Feedback
                </>
              )}
            </button>
          </div>

          {!allQuestionsAnswered && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 rounded-xl">
              <p className="text-center text-red-700 text-sm font-bold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please answer all questions before submitting
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
