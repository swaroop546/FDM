import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, GraduationCap, Calendar, BookOpen, Users } from 'lucide-react';

const FeedbackManagement = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedRegulation, setSelectedRegulation] = useState(null);

  // Sample data - in real app, this would come from API based on HOD's branch
  const hodInfo = {
    branch: 'CSE',
    program: 'B.Tech'
  };

  const batches = {
    'B.Tech': [
      { id: 1, name: '2025-2029', year: 1, regulation: ['R23'] },
      { id: 2, name: '2024-2028', year: 2, regulation: ['R23'] },
      { id: 3, name: '2023-2027', year: 3, regulation: ['R23', 'R20'] },
      { id: 4, name: '2022-2026', year: 4, regulation: ['R20'] }
    ],
    'M.Tech': [
      { id: 5, name: '2025-2027', year: 1, regulation: ['R19'] },
      { id: 6, name: '2024-2026', year: 2, regulation: ['R19'] }
    ]
  };

  const currentBatches = batches[hodInfo.program] || [];

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setSelectedRegulation(null);
  };

  const handleRegulationSelect = (regulation) => {
    setSelectedRegulation(regulation);
    // Navigate to semester selection with batch and regulation
    navigate('/hod/feedback-management/semesters', { 
      state: { 
        batch: selectedBatch, 
        regulation,
        hodInfo 
      } 
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feedback Management</h1>
        <p className="text-sm text-gray-600 mt-1">Select batch and regulation to manage feedback</p>
      </motion.div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 overflow-x-auto">
        <span className="whitespace-nowrap">Dashboard</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium text-blue-600 whitespace-nowrap">Feedback Management</span>
        {selectedBatch && (
          <>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{selectedBatch.name}</span>
          </>
        )}
      </div>

      {/* Department Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Department</p>
              <p className="text-sm font-bold text-gray-900">{hodInfo.branch}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Program</p>
              <p className="text-sm font-bold text-gray-900">{hodInfo.program}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Step 1: Batch Selection */}
      {!selectedBatch && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Step 1: Select Batch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBatches.map((batch) => (
              <motion.button
                key={batch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => handleBatchSelect(batch)}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 p-6 text-left transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Year {batch.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{batch.name}</h3>
                <p className="text-sm text-gray-600">
                  Regulations: {batch.regulation.join(', ')}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Regulation Selection */}
      {selectedBatch && !selectedRegulation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => setSelectedBatch(null)}
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1"
          >
            ← Back to Batches
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Step 2: Select Regulation for {selectedBatch.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedBatch.regulation.map((reg, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRegulationSelect(reg)}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-500 p-8 text-center transition-all hover:shadow-lg group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl font-bold text-blue-600">{reg}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Regulation {reg}</h3>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackManagement;
