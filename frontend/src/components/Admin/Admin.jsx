import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LogOut, Users, Upload, BookOpen, 
  Calendar, Plus, Trash2, Save, 
  X, Award, GraduationCap, FileText, MapPin, AlertCircle 
} from 'lucide-react'
import { students, faculty, subjects, programs, branches } from '../../data/student'

const AdminPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('student-management')

  // Student Management State
  const [showUploadStudents, setShowUploadStudents] = useState(false)
  const [showHonorsMinors, setShowHonorsMinors] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [studentFile, setStudentFile] = useState(null)
  const [honorsMinorsData, setHonorsMinorsData] = useState({
    semester: '', programId: '', branchId: ''
  })
  const [honorsStudents, setHonorsStudents] = useState([])
  const [minorsStudents, setMinorsStudents] = useState([])
  const [honorsMinorsFile, setHonorsMinorsFile] = useState(null)

  // Faculty Management State
  const [showUploadFaculty, setShowUploadFaculty] = useState(false)
  const [facultyFilter, setFacultyFilter] = useState({ program: '', branch: '' })
  const [facultyFile, setFacultyFile] = useState(null)

  // Subject Management State
  const [showUploadSubjects, setShowUploadSubjects] = useState(false)
  const [selectedRegulation, setSelectedRegulation] = useState('R23')
  const [subjectFile, setSubjectFile] = useState(null)
  const [availableRegulations, setAvailableRegulations] = useState(['R23', 'R22', 'R20', 'R19'])

  // Faculty Mapping State
  const [mappingFilters, setMappingFilters] = useState({ program: '', branch: '', semester: '' })
  const [subjectMappings, setSubjectMappings] = useState({})

  // Feedback Period State
  const [showPublishFeedback, setShowPublishFeedback] = useState(false)
  const [newFeedbackPeriod, setNewFeedbackPeriod] = useState({
    semester: '', startDate: '', endDate: ''
  })

  // Handler Functions
  const handleUploadStudents = () => {
    if (!studentFile) {
      alert('Please select an Excel file')
      return
    }
    
    // TODO: Parse Excel file and add students to database
    // For now, just show success message
    console.log('Processing student Excel file:', studentFile.name)
    alert('Students uploaded successfully! (Excel parsing to be implemented)')
    setShowUploadStudents(false)
    setStudentFile(null)
  }

  const handleStudentFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setStudentFile(file)
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      e.target.value = null
    }
  }

  const handleSaveHonorsMinors = () => {
    // Update students with honors/minors status
    students.forEach(student => {
      if (honorsStudents.includes(student.id)) {
        student.isHonors = true
        student.isMinors = false
      } else if (minorsStudents.includes(student.id)) {
        student.isHonors = false
        student.isMinors = true
      } else {
        student.isHonors = false
        student.isMinors = false
      }
    })
    
    console.log('Honors students:', honorsStudents)
    console.log('Minors students:', minorsStudents)
    alert('Honors and Minors assignments saved successfully!')
    handleCloseHonorsMinors()
  }

  const handleCloseHonorsMinors = () => {
    setShowHonorsMinors(false)
    setHonorsMinorsFile(null)
  }

  const handleUploadHonorsMinors = () => {
    if (!honorsMinorsFile) {
      alert('Please select an Excel file')
      return
    }
    
    // TODO: Parse Excel file and add honors/minors students to database
    console.log('Processing honors/minors Excel file:', honorsMinorsFile.name)
    alert('Honors/Minors uploaded successfully! (Excel parsing to be implemented)')
    setShowHonorsMinors(false)
    setHonorsMinorsFile(null)
  }

  const handleHonorsMinorsFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setHonorsMinorsFile(file)
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      e.target.value = null
    }
  }

  const handleUploadFaculty = () => {
    if (!facultyFile) {
      alert('Please select an Excel file')
      return
    }
    
    // TODO: Parse Excel file and add faculty to database
    console.log('Processing faculty Excel file:', facultyFile.name)
    alert('Faculty uploaded successfully! (Excel parsing to be implemented)')
    setShowUploadFaculty(false)
    setFacultyFile(null)
  }

  const handleFacultyFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setFacultyFile(file)
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      e.target.value = null
    }
  }

  const handleUploadSubjects = () => {
    if (!subjectFile) {
      alert('Please select an Excel file')
      return
    }
    
    // TODO: Parse Excel file and add subjects to database
    console.log('Processing subjects Excel file:', subjectFile.name)
    alert('Subjects uploaded successfully! (Excel parsing to be implemented)')
    setShowUploadSubjects(false)
    setSubjectFile(null)
  }

  const handleSubjectFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSubjectFile(file)
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      e.target.value = null
    }
  }

  const handlePublishEndSemester = () => {
    console.log('Publishing end-semester feedback:', newFeedbackPeriod)
    setShowPublishFeedback(false)
    setNewFeedbackPeriod({ semester: '', startDate: '', endDate: '' })
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    navigate('/')
    return null
  }

  const tabs = [
    { id: 'student-management', label: 'Student Management', icon: Users },
    { id: 'faculty-management', label: 'Faculty Management', icon: GraduationCap },
    { id: 'subject-management', label: 'Subject Management', icon: BookOpen },
    { id: 'faculty-mapping', label: 'Faculty Mapping', icon: MapPin },
    { id: 'feedback-periods', label: 'Feedback Periods', icon: Calendar }
  ]

  // Filter students by program and branch
  const filteredStudents = students.filter(s => {
    if (selectedProgram && s.programId !== Number(selectedProgram)) return false
    if (selectedBranch && s.branchId !== Number(selectedBranch)) return false
    return true
  })

  // Filter faculty
  const filteredFaculty = faculty.filter(f => {
    if (facultyFilter.branch && f.branchId !== Number(facultyFilter.branch)) return false
    return true
  })

  // Filter subjects
  const filteredSubjects = subjects.filter(s => {
    if (selectedRegulation && s.regulation !== selectedRegulation) return false
    if (selectedProgram && s.programId !== Number(selectedProgram)) return false
    if (selectedBranch && s.branchId !== Number(selectedBranch)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Admin Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Feedback Management System</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm sticky top-[56px] sm:top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-thin">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 font-semibold transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        
        {/* Student Management */}
        {activeTab === 'student-management' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Student Management</h2>
              
              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <button
                  onClick={() => setShowUploadStudents(true)}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  <Upload size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">Upload Students</span>
                  <span className="sm:hidden">Upload</span>
                </button>
                <button
                  onClick={() => setShowHonorsMinors(true)}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  <Award size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden md:inline">Honors/Minors</span>
                  <span className="md:hidden">H/M</span>
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Program</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm sm:text-base"
                  >
                    <option value="">All Programs</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm sm:text-base"
                  >
                    <option value="">All Branches</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} - {b.specialization}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Roll Number</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">Program</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Branch</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">Batch</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden lg:table-cell">Regulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={student.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{student.rollNumber}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">{student.name}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden md:table-cell">{programs.find(p => p.id === student.programId)?.name}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{branches.find(b => b.id === student.branchId)?.name}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden lg:table-cell">{student.batch}</td>
                        <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden lg:table-cell">{student.regulation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Student Modal */}
            {showUploadStudents && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Upload size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Students</h3>
                        <p className="text-sm text-green-100">Bulk import student data from Excel</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowUploadStudents(false)} 
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900 mb-1">
                            Required Excel Columns:
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Roll Number</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Name</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Date of Birth</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Program ID</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Batch</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Regulation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                        <p className="text-xs text-amber-800 flex items-center gap-2">
                          <AlertCircle size={14} />
                          <span><strong>Note:</strong> Honors and Minors students are uploaded separately using the "Honors/Minors" button</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-700">Select Excel File</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleStudentFileChange}
                          className="hidden"
                          id="student-file-input"
                        />
                        <label
                          htmlFor="student-file-input"
                          className="flex items-center justify-center gap-3 w-full px-6 py-8 border-3 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group"
                        >
                          <Upload size={32} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 group-hover:text-green-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Excel files (.xlsx, .xls) only</p>
                          </div>
                        </label>
                      </div>
                      {studentFile && (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="bg-green-500 p-2 rounded-lg">
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-green-800">{studentFile.name}</p>
                            <p className="text-xs text-green-600">Ready to upload</p>
                          </div>
                          <button
                            onClick={() => setStudentFile(null)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3 justify-end">
                    <button
                      onClick={() => { setShowUploadStudents(false); setStudentFile(null); }}
                      className="px-5 py-2.5 bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadStudents}
                      disabled={!studentFile}
                      className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload size={18} />
                      Upload Students
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Honors/Minors Modal */}
            {showHonorsMinors && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Upload size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Honors & Minors</h3>
                        <p className="text-sm text-amber-100">Bulk import honors and minors student data from Excel</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleCloseHonorsMinors} 
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                    {/* Filters */}
                    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                        <select
                          value={honorsMinorsData.semester}
                          onChange={(e) => setHonorsMinorsData({ ...honorsMinorsData, semester: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Semester</option>
                          {[5, 6, 7, 8].map(sem => (
                            <option key={sem} value={sem}>Semester {Math.ceil(sem / 2)}-{sem % 2 === 0 ? 2 : 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Program</label>
                        <select
                          value={honorsMinorsData.programId}
                          onChange={(e) => setHonorsMinorsData({ ...honorsMinorsData, programId: e.target.value, branchId: '' })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                          <option value="">Select Program</option>
                          {programs.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                        <select
                          value={honorsMinorsData.branchId}
                          onChange={(e) => setHonorsMinorsData({ ...honorsMinorsData, branchId: e.target.value })}
                          disabled={!honorsMinorsData.programId}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-100"
                        >
                          <option value="">Select Branch</option>
                          {branches.map(b => (
                            <option key={b.id} value={b.id}>{b.name} - {b.specialization}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {honorsMinorsData.semester && honorsMinorsData.programId && honorsMinorsData.branchId ? (
                      <div className="grid grid-cols-2 gap-6">
                        {/* Students List */}
                        <div className="border-2 border-gray-200 rounded-lg p-4">
                          <h4 className="text-lg font-bold text-gray-800 mb-4">
                            Students in {branches.find(b => b.id === Number(honorsMinorsData.branchId))?.name} - Sem {honorsMinorsData.semester}
                          </h4>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {students
                              .filter(s => 
                                s.branchId === Number(honorsMinorsData.branchId) && 
                                s.programId === Number(honorsMinorsData.programId)
                              )
                              .map(student => (
                                <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-medium text-gray-800">{student.name}</p>
                                      <p className="text-sm text-gray-500">{student.rollNumber}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => toggleHonors(student.id)}
                                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        honorsStudents.includes(student.id)
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {honorsStudents.includes(student.id) ? '✓ Honors' : 'Honors'}
                                    </button>
                                    <button
                                      onClick={() => toggleMinors(student.id)}
                                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                        minorsStudents.includes(student.id)
                                          ? 'bg-green-500 text-white'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {minorsStudents.includes(student.id) ? '✓ Minors' : 'Minors'}
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Selected Lists */}
                        <div className="space-y-4">
                          {/* Honors List */}
                          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                            <h4 className="text-lg font-bold text-blue-700 mb-3">
                              Honors Students ({honorsStudents.length})
                            </h4>
                            <div className="space-y-2 max-h-44 overflow-y-auto">
                              {honorsStudents.map(studentId => {
                                const student = students.find(s => s.id === studentId)
                                return (
                                  <div key={studentId} className="bg-white rounded p-2 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{student?.name}</p>
                                      <p className="text-xs text-gray-500">{student?.rollNumber}</p>
                                    </div>
                                    <button
                                      onClick={() => toggleHonors(studentId)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                )
                              })}
                              {honorsStudents.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No students selected</p>
                              )}
                            </div>
                          </div>

                          {/* Minors List */}
                          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                            <h4 className="text-lg font-bold text-green-700 mb-3">
                              Minors Students ({minorsStudents.length})
                            </h4>
                            <div className="space-y-2 max-h-44 overflow-y-auto">
                              {minorsStudents.map(studentId => {
                                const student = students.find(s => s.id === studentId)
                                return (
                                  <div key={studentId} className="bg-white rounded p-2 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">{student?.name}</p>
                                      <p className="text-xs text-gray-500">{student?.rollNumber}</p>
                                    </div>
                                    <button
                                      onClick={() => toggleMinors(studentId)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                )
                              })}
                              {minorsStudents.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No students selected</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Award size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Please select Semester, Program, and Branch to view students</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t px-6 py-4 flex gap-3 justify-end bg-gray-50">
                    <button
                      onClick={handleCloseHonorsMinors}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveHonorsMinors}
                      disabled={honorsStudents.length === 0 && minorsStudents.length === 0}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Save Assignments
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Faculty Management */}
        {activeTab === 'faculty-management' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Faculty Management</h2>
              
              <button
                onClick={() => setShowUploadFaculty(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6"
              >
                <Upload size={18} />
                Upload Faculty
              </button>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    value={facultyFilter.branch}
                    onChange={(e) => setFacultyFilter({ ...facultyFilter, branch: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Branches</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} - {b.specialization}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Faculty Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Branch</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFaculty.map((fac, idx) => (
                      <tr key={fac.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium">{fac.facultyName}</td>
                        <td className="px-4 py-3 text-sm">{fac.designation}</td>
                        <td className="px-4 py-3 text-sm">{branches.find(b => b.id === fac.branchId)?.specialization}</td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upload Faculty Modal */}
            {showUploadFaculty && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <GraduationCap size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Faculty</h3>
                        <p className="text-sm text-purple-100">Bulk import faculty members from Excel</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowUploadFaculty(false)} 
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900 mb-1">
                            Required Excel Columns:
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Name</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Email</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Designation</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Branch</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-700">Select Excel File</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFacultyFileChange}
                          className="hidden"
                          id="faculty-file-input"
                        />
                        <label
                          htmlFor="faculty-file-input"
                          className="flex items-center justify-center gap-3 w-full px-6 py-8 border-3 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer group"
                        >
                          <Upload size={32} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Excel files (.xlsx, .xls) only</p>
                          </div>
                        </label>
                      </div>
                      {facultyFile && (
                        <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="bg-purple-500 p-2 rounded-lg">
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-purple-800">{facultyFile.name}</p>
                            <p className="text-xs text-purple-600">Ready to upload</p>
                          </div>
                          <button
                            onClick={() => setFacultyFile(null)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3 justify-end">
                    <button
                      onClick={() => { setShowUploadFaculty(false); setFacultyFile(null); }}
                      className="px-5 py-2.5 bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadFaculty}
                      disabled={!facultyFile}
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload size={18} />
                      Upload Faculty
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subject Management */}
        {activeTab === 'subject-management' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subject Management</h2>
              
              <button
                onClick={() => setShowUploadSubjects(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6"
              >
                <Upload size={18} />
                Upload Regulation
              </button>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Regulation</label>
                  <select
                    value={selectedRegulation}
                    onChange={(e) => setSelectedRegulation(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Regulations</option>
                    {availableRegulations.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Program</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Programs</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Branches</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Semester</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Regulation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((subject, idx) => (
                      <tr key={subject.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium">{subject.subjectName}</td>
                        <td className="px-4 py-3 text-sm">{subject.year}</td>
                        <td className="px-4 py-3 text-sm">{subject.semester}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            subject.subjectType === 'core' ? 'bg-blue-100 text-blue-700' :
                            subject.subjectType === 'professional-elective' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {subject.subjectType || 'core'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{subject.regulation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upload Subject Modal */}
            {showUploadSubjects && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Upload size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Upload Complete Regulation</h3>
                        <p className="text-sm text-indigo-100">Bulk import all subjects for a regulation from Excel</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setShowUploadSubjects(false); setSubjectFile(null); }} 
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-blue-900 mb-1">
                            Required Excel Columns:
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Subject Name</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Program</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Branch</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Regulation</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Year</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Semester</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-blue-700">Subject Type (core/professional-elective/open-elective)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-700">Select Excel File</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleSubjectFileChange}
                          className="hidden"
                          id="subject-file-input"
                        />
                        <label
                          htmlFor="subject-file-input"
                          className="flex items-center justify-center gap-3 w-full px-6 py-8 border-3 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group"
                        >
                          <Upload size={32} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                          <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 group-hover:text-green-600">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Excel files (.xlsx, .xls) only</p>
                          </div>
                        </label>
                      </div>
                      {subjectFile && (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="bg-green-500 p-2 rounded-lg">
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-green-800">{subjectFile.name}</p>
                            <p className="text-xs text-green-600">Ready to upload</p>
                          </div>
                          <button
                            onClick={() => setSubjectFile(null)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3 justify-end">
                    <button
                      onClick={() => { setShowUploadSubjects(false); setSubjectFile(null); }}
                      className="px-5 py-2.5 bg-white border-2 border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadSubjects}
                      disabled={!subjectFile}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload size={18} />
                      Upload Regulation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Faculty Mapping */}
        {activeTab === 'faculty-mapping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Faculty Mapping</h2>
              <p className="text-sm text-gray-600 mb-6">Map faculty to subjects for each branch and semester</p>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Program</label>
                  <select
                    value={mappingFilters.program}
                    onChange={(e) => setMappingFilters({ ...mappingFilters, program: e.target.value, branch: '', semester: '' })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select Program</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    value={mappingFilters.branch}
                    onChange={(e) => setMappingFilters({ ...mappingFilters, branch: e.target.value, semester: '' })}
                    disabled={!mappingFilters.program}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Branch</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                  <select
                    value={mappingFilters.semester}
                    onChange={(e) => setMappingFilters({ ...mappingFilters, semester: e.target.value })}
                    disabled={!mappingFilters.branch}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {Math.ceil(sem / 2)}-{sem % 2 === 0 ? 2 : 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              {mappingFilters.program && mappingFilters.branch && mappingFilters.semester ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-700">
                      Subjects for {branches.find(b => b.id === Number(mappingFilters.branch))?.name} - Semester {Math.ceil(Number(mappingFilters.semester) / 2)}-{Number(mappingFilters.semester) % 2 === 0 ? 2 : 1}
                    </h3>
                    <button
                      onClick={() => {
                        // Save all mappings
                        console.log('Saving faculty mappings:', subjectMappings)
                        alert('Faculty mappings saved successfully!')
                      }}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save All Mappings
                    </button>
                  </div>
                  
                  {/* Compact Subjects List with Faculty Mapping */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredSubjects
                      .filter(s => s.semester === Number(mappingFilters.semester) && s.branchId === Number(mappingFilters.branch))
                      .map((subject) => (
                        <div 
                          key={subject.id} 
                          className={`border-2 rounded-xl overflow-hidden ${
                            subject.subjectType === 'core' ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100' :
                            subject.subjectType === 'professional-elective' ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100' :
                            'border-green-300 bg-gradient-to-br from-green-50 to-green-100'
                          }`}
                        >
                          {/* Subject Header */}
                          <div className="p-4 border-b bg-white/50 backdrop-blur-sm">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-base font-bold text-gray-800 flex-1">{subject.subjectName}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                                subject.subjectType === 'core' ? 'bg-blue-500 text-white' :
                                subject.subjectType === 'professional-elective' ? 'bg-purple-500 text-white' :
                                'bg-green-500 text-white'
                              }`}>
                                {subject.subjectType === 'core' ? 'Core' :
                                 subject.subjectType === 'professional-elective' ? 'PE' :
                                 'OE'}
                              </span>
                            </div>
                            <span className="text-xs text-gray-600">
                              Year {subject.year} • Semester {subject.semester}
                            </span>
                          </div>

                          {/* Assigned Faculty Display */}
                          <div className="p-4 bg-white">
                            {subjectMappings[subject.id] ? (
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm font-bold text-green-800">{subjectMappings[subject.id].facultyName}</p>
                                    <p className="text-xs text-green-600">
                                      {subjectMappings[subject.id].designation} • {branches.find(b => b.id === subjectMappings[subject.id].branchId)?.name}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => setSubjectMappings({ ...subjectMappings, [subject.id]: null })}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                    title="Remove assignment"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                                <p className="text-xs text-amber-700 font-medium">⚠️ No faculty assigned</p>
                              </div>
                            )}

                            {/* Quick Faculty Selection Dropdown */}
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-2">Assign Faculty:</label>
                              <select
                                value={subjectMappings[subject.id]?.id || ''}
                                onChange={(e) => {
                                  const selectedFaculty = faculty.find(f => f.id === Number(e.target.value))
                                  setSubjectMappings({
                                    ...subjectMappings,
                                    [subject.id]: selectedFaculty || null
                                  })
                                }}
                                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
                              >
                                <option value="">-- Select Faculty --</option>
                                {faculty
                                  .filter(f => f.branchId === Number(mappingFilters.branch) || !mappingFilters.branch)
                                  .map((fac) => (
                                    <option key={fac.id} value={fac.id}>
                                      {fac.facultyName} ({fac.designation} - {branches.find(b => b.id === fac.branchId)?.name})
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Please select Program, Branch, and Semester to view subjects</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feedback Periods */}
        {activeTab === 'feedback-periods' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">End-Semester Feedback Management</h2>
              <p className="text-sm text-gray-600 mb-6">Publish end-semester feedback periods (Mid-semester managed by HODs)</p>
              
              <button 
                onClick={() => setShowPublishFeedback(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
              >
                <Calendar size={18} />
                Publish End-Semester Feedback
              </button>
            </div>

            {/* Publish End-Semester Feedback Modal */}
            {showPublishFeedback && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                  <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Publish End-Semester Feedback</h3>
                    <button onClick={() => setShowPublishFeedback(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                      <select
                        value={newFeedbackPeriod.semester}
                        onChange={(e) => setNewFeedbackPeriod({ ...newFeedbackPeriod, semester: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                          <option key={sem} value={sem}>Semester {Math.ceil(sem / 2)}-{sem % 2 === 0 ? 2 : 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newFeedbackPeriod.startDate}
                        onChange={(e) => setNewFeedbackPeriod({ ...newFeedbackPeriod, startDate: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={newFeedbackPeriod.endDate}
                        onChange={(e) => setNewFeedbackPeriod({ ...newFeedbackPeriod, endDate: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-purple-700 font-medium">End-Semester Feedback</p>
                      <p className="text-xs text-purple-600 mt-1">This feedback will be available to all students in the selected semester.</p>
                    </div>
                  </div>
                  <div className="border-t px-6 py-4 flex gap-3 justify-end">
                    <button
                      onClick={() => setShowPublishFeedback(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublishEndSemester}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
                    >
                      Publish Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPage
