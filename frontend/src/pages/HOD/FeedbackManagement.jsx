import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, GraduationCap, Calendar, BookOpen, Users } from 'lucide-react';

const FeedbackManagement = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedRegulation, setSelectedRegulation] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const hodInfo = {
    branch: 'CSE'
  };

  // Program options
  const programs = ['B.Tech', 'M.Tech'];

  // Batch options based on program
  const batches = {
    'B.Tech': [
      { id: 1, name: '2025-2029', year: 1, regulations: ['R23'] },
      { id: 2, name: '2024-2028', year: 2, regulations: ['R23'] },
      { id: 3, name: '2023-2027', year: 3, regulations: ['R23', 'R20'] },
      { id: 4, name: '2022-2026', year: 4, regulations: ['R20'] }
    ],
    'M.Tech': [
      { id: 5, name: '2025-2027', year: 1, regulations: ['R23'] },
      { id: 6, name: '2024-2026', year: 2, regulations: ['R23'] }
    ]
  };

  // Get available batches for selected program
  const availableBatches = selectedProgram ? batches[selectedProgram] || [] : [];

  // Get selected batch object
  const currentBatch = availableBatches.find(b => b.name === selectedBatch);

  // Get available regulations for selected batch
  const availableRegulations = currentBatch?.regulations || [];

  // Get available semesters based on batch year
  const getAvailableSemesters = (year) => {
    if (!year) return [];
    const semesterMap = {
      1: ['1-1', '1-2'],
      2: ['2-1', '2-2'],
      3: ['3-1', '3-2'],
      4: ['4-1', '4-2']
    };
    return semesterMap[year] || [];
  };

  const availableSemesters = currentBatch ? getAvailableSemesters(currentBatch.year) : [];

  // Handle program change
  const handleProgramChange = (program) => {
    setSelectedProgram(program);
    setSelectedBatch('');
    setSelectedRegulation('');
    setSelectedSemester('');
  };

  // Handle batch change
  const handleBatchChange = (batchName) => {
    setSelectedBatch(batchName);
    setSelectedRegulation('');
    setSelectedSemester('');
  };

  // Handle regulation change
  const handleRegulationChange = (regulation) => {
    setSelectedRegulation(regulation);
    setSelectedSemester('');
  };

  // Handle proceed to timetable
  const handleProceed = () => {
    if (selectedProgram && selectedBatch && selectedRegulation && selectedSemester) {
      navigate('/hod/feedback-management/timetable', {
        state: {
          batch: currentBatch,
          regulation: selectedRegulation,
          semester: { id: selectedSemester, name: `Semester ${selectedSemester}` },
          hodInfo: { ...hodInfo, program: selectedProgram }
        }
      });
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feedback Management</h1>
        <p className="text-sm text-gray-600 mt-1">Select program, batch, regulation and semester to manage feedback</p>
      </motion.div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 overflow-x-auto">
        <span className="whitespace-nowrap">Dashboard</span>
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium text-blue-600 whitespace-nowrap">Feedback Management</span>
      </div>

      {/* Department Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">Department</p>
            <p className="text-sm font-bold text-gray-900">{hodInfo.branch}</p>
          </div>
        </div>
      </motion.div>

      {/* Selection Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Select Program
            </label>
            <div className="relative">
              <select
                value={selectedProgram}
                onChange={(e) => handleProgramChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
              >
                <option value="">-- Select Program --</option>
                {programs.map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Batch Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Select Batch
            </label>
            <div className="relative">
              <select
                value={selectedBatch}
                onChange={(e) => handleBatchChange(e.target.value)}
                disabled={!selectedProgram}
                className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-blue-500 focus:outline-none transition-colors ${!selectedProgram ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <option value="">-- Select Batch --</option>
                {availableBatches.map((batch) => (
                  <option key={batch.id} value={batch.name}>
                    {batch.name} (Year {batch.year})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Regulation Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Select Regulation
            </label>
            <div className="relative">
              <select
                value={selectedRegulation}
                onChange={(e) => handleRegulationChange(e.target.value)}
                disabled={!selectedBatch}
                className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-blue-500 focus:outline-none transition-colors ${!selectedBatch ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <option value="">-- Select Regulation --</option>
                {availableRegulations.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Select Semester
            </label>
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                disabled={!selectedRegulation}
                className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-blue-500 focus:outline-none transition-colors ${!selectedRegulation ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <option value="">-- Select Semester --</option>
                {availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedProgram && selectedBatch && selectedRegulation && selectedSemester && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p className="text-sm text-green-800 font-medium">Selected:</p>
            <p className="text-sm text-green-700 mt-1">
              {selectedProgram} → {selectedBatch} → {selectedRegulation} → Semester {selectedSemester}
            </p>
          </motion.div>
        )}

        {/* Proceed Button */}
        <div className="mt-6">
          <button
            onClick={handleProceed}
            disabled={!selectedProgram || !selectedBatch || !selectedRegulation || !selectedSemester}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
              selectedProgram && selectedBatch && selectedRegulation && selectedSemester
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Timetable →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackManagement;
