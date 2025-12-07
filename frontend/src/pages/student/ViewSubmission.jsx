import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewSubmission = () => {
  const { mapId } = useParams();
  const navigate = useNavigate();

  // Mock submission data (will be fetched from API)
  const [submissionData] = useState({
    subject_code: 'CS502',
    subject_name: 'Database Management Systems',
    faculty_name: 'Dr. Johnson',
    faculty_id: 'FAC102',
    submitted_at: '2025-12-05T14:30:00',
    ratings: [
      { question_id: 1, criteria_text: 'Subject knowledge of the faculty', rating: 5 },
      { question_id: 2, criteria_text: 'Communication skills and clarity', rating: 4 },
      { question_id: 3, criteria_text: 'Use of teaching aids and technology', rating: 5 },
      { question_id: 4, criteria_text: 'Ability to solve doubts and queries', rating: 4 },
      { question_id: 5, criteria_text: 'Availability and approachability', rating: 5 },
      { question_id: 6, criteria_text: 'Encouragement for participation', rating: 4 },
      { question_id: 7, criteria_text: 'Timely completion of syllabus', rating: 4 },
      { question_id: 8, criteria_text: 'Fairness in evaluation', rating: 5 },
      { question_id: 9, criteria_text: 'Regularity and punctuality', rating: 5 },
      { question_id: 10, criteria_text: 'Overall teaching effectiveness', rating: 5 }
    ],
    comment: 'Excellent teacher! Very knowledgeable and approachable. Explains concepts clearly with practical examples.'
  });

  const averageRating = (submissionData.ratings.reduce((sum, r) => sum + r.rating, 0) / submissionData.ratings.length).toFixed(1);

  const getRatingColor = (rating) => {
    if (rating === 5) return 'text-green-600 bg-green-100';
    if (rating === 4) return 'text-lime-600 bg-lime-100';
    if (rating === 3) return 'text-yellow-600 bg-yellow-100';
    if (rating === 2) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRatingLabel = (rating) => {
    if (rating === 5) return 'Excellent';
    if (rating === 4) return 'Good';
    if (rating === 3) return 'Average';
    if (rating === 2) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Feedback Submission</h1>
                <p className="text-blue-100 text-sm">View your submitted feedback</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-xl transition-all font-medium border border-white/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Subject Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-blue-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-2xl shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{submissionData.subject_name}</h2>
                <p className="text-gray-600 mt-2 text-base">
                  <span className="font-bold">Code:</span> {submissionData.subject_code} | 
                  <span className="font-bold ml-3">Faculty:</span> {submissionData.faculty_name}
                </p>
              </div>
            </div>
            <div className="text-center bg-blue-50 px-6 py-4 rounded-2xl border-2 border-blue-200">
              <div className="text-5xl font-bold text-blue-600">{averageRating}</div>
              <div className="text-sm text-gray-600 mt-2 font-bold">Avg Rating</div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-5 border-t-2 border-blue-100">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span><strong className="font-bold">Submitted:</strong> {new Date(submissionData.submitted_at).toLocaleString()}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-xl shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Feedback Submitted
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-6 rounded-xl shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-lg shadow-sm">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-blue-800 font-bold text-base">Read-Only View</p>
              <p className="text-blue-700 text-sm mt-1.5 font-medium">
                This is a view of your submitted feedback. You cannot edit responses after submission.
              </p>
            </div>
          </div>
        </div>

        {/* Ratings Display */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            Your Ratings
          </h3>

          <div className="space-y-5">
            {submissionData.ratings.map((item) => (
              <div key={item.question_id} className="pb-5 border-b-2 border-blue-100 last:border-0">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <p className="text-gray-800 font-bold text-base">
                      {item.question_id}. {item.criteria_text}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`px-5 py-2.5 rounded-xl font-bold text-xl shadow-lg ${getRatingColor(item.rating)}`}>
                      {item.rating}
                    </span>
                    <span className="text-gray-600 text-sm font-bold min-w-[110px] text-right">
                      {getRatingLabel(item.rating)}
                    </span>
                  </div>
                </div>
                {/* Visual bar */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all shadow-sm"
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Display */}
        {submissionData.comment && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              Your Comments
            </h3>
            <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
              <p className="text-gray-800 leading-relaxed font-medium">{submissionData.comment}</p>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmission;
