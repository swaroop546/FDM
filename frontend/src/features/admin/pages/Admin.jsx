import React, { useState } from 'react'
import { 
  Users, Upload, BookOpen, 
  Calendar, X, GraduationCap, FileText, MapPin,
  Briefcase, UserCheck, Layers, Save
} from 'lucide-react'
import { students, faculty, subjects, programs, branches, batches, hods } from '../../../shared/constants/student'

// --- Reusable Upload Modal Component ---
const UploadModal = ({ isOpen, onClose, title, subtitle, columns, onUpload, file, setFile }) => {
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
      e.target.value = null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full transform transition-all">
        {/* Header - Purple Gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Upload size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm text-purple-100">{subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Required Columns Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 p-2 rounded-lg shrink-0">
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-900 mb-2">Required Excel Columns:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
                  {columns.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-blue-700">{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">Select Excel File</label>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
                id={`file-input-${title}`}
              />
              <label
                htmlFor={`file-input-${title}`}
                className="flex items-center justify-center gap-3 w-full px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer group"
              >
                <Upload size={32} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Excel files (.xlsx, .xls) only</p>
                </div>
              </label>
            </div>
            
            {/* Selected File Preview */}
            {file && (
              <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-100 rounded-lg animate-in fade-in slide-in-from-top-2">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <FileText size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-purple-900 truncate">{file.name}</p>
                  <p className="text-xs text-purple-600">Ready to upload</p>
                </div>
                <button onClick={() => setFile(null)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-white border-2 border-gray-200 hover:bg-gray-100 text-gray-700 rounded-lg transition-all font-medium">
            Cancel
          </button>
          <button
            onClick={onUpload}
            disabled={!file}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all font-medium flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={18} />
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('batch-management')

  // --- State for Management Columns ---
  // Batch
  const [showBatchUpload, setShowBatchUpload] = useState(false)
  const [batchFile, setBatchFile] = useState(null)

  // Program
  const [showProgramUpload, setShowProgramUpload] = useState(false)
  const [programFile, setProgramFile] = useState(null)

  // Branch
  const [showBranchUpload, setShowBranchUpload] = useState(false)
  const [branchFile, setBranchFile] = useState(null)

  // HOD
  const [showHodUpload, setShowHodUpload] = useState(false)
  const [hodFile, setHodFile] = useState(null)

  // Student
  const [showStudentUpload, setShowStudentUpload] = useState(false)
  const [studentFile, setStudentFile] = useState(null)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')

  // Faculty
  const [showFacultyUpload, setShowFacultyUpload] = useState(false)
  const [facultyFile, setFacultyFile] = useState(null)
  const [facultyFilter, setFacultyFilter] = useState({ program: '', branch: '' })

  // Subject
  const [showSubjectUpload, setShowSubjectUpload] = useState(false)
  const [subjectFile, setSubjectFile] = useState(null)
  const [selectedRegulation, setSelectedRegulation] = useState('R23')
  const [availableRegulations] = useState(['R23', 'R22', 'R20', 'R19'])

  // Feedback/Mapping
  const [mappingFilters, setMappingFilters] = useState({ batch: '', program: '', branch: '', semester: '' })
  const [subjectMappings, setSubjectMappings] = useState({})
  
  // Handlers
  const handleUploadGeneric = (file, type, setFile, setShow) => {
    if (!file) {
      alert('Please select an Excel file')
      return
    }
    console.log(`Processing ${type} Excel file:`, file.name)
    alert(`${type} uploaded successfully! (Excel parsing to be implemented)`)
    setShow(false)
    setFile(null)
  }

  const tabs = [
    { id: 'batch-management', label: 'Batch Management', icon: Calendar },
    { id: 'program-management', label: 'Program Management', icon: Briefcase },
    { id: 'branch-management', label: 'Branch Management', icon: Layers },
    { id: 'hod-management', label: 'HOD Management', icon: UserCheck },
    { id: 'student-management', label: 'Student Management', icon: Users },
    { id: 'faculty-management', label: 'Faculty Management', icon: GraduationCap },
    { id: 'subject-management', label: 'Subject Management', icon: BookOpen },
    { id: 'faculty-mapping', label: 'Feedback Mapping', icon: MapPin },
  ]

  // Filter Data Helpers
  const filteredStudents = students.filter(s => {
    if (selectedProgram && s.programId !== Number(selectedProgram)) return false
    if (selectedBranch && s.branchId !== Number(selectedBranch)) return false
    return true
  })

  const filteredFaculty = faculty.filter(f => {
    if (facultyFilter.branch && f.branchId !== Number(facultyFilter.branch)) return false
    return true
  })

  const filteredSubjects = subjects.filter(s => {
    if (selectedRegulation && s.regulation !== selectedRegulation) return false
    if (selectedProgram && s.programId !== Number(selectedProgram)) return false
    if (selectedBranch && s.branchId !== Number(selectedBranch)) return false
    return true
  })

  // Mock upload handlers
  const onUploadBatch = () => handleUploadGeneric(batchFile, 'Batches', setBatchFile, setShowBatchUpload)
  const onUploadProgram = () => handleUploadGeneric(programFile, 'Programs', setProgramFile, setShowProgramUpload)
  const onUploadBranch = () => handleUploadGeneric(branchFile, 'Branches', setBranchFile, setShowBranchUpload)
  const onUploadHod = () => handleUploadGeneric(hodFile, 'HODs', setHodFile, setShowHodUpload)
  const onUploadStudent = () => handleUploadGeneric(studentFile, 'Students', setStudentFile, setShowStudentUpload)
  const onUploadFaculty = () => handleUploadGeneric(facultyFile, 'Faculty', setFacultyFile, setShowFacultyUpload)
  const onUploadSubject = () => handleUploadGeneric(subjectFile, 'Subjects', setSubjectFile, setShowSubjectUpload)


  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Super Admin Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">Feedback Management System - Full Control</p>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm rounded-xl mb-6">
        <div className="px-2 sm:px-4">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-thin py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 font-semibold transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        
        {/* === BATCH MANAGEMENT === */}
        {activeTab === 'batch-management' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Batch Management</h2>
            <button onClick={() => setShowBatchUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
              <Upload size={18} /> Upload Batches
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Batch Name</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Period</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Regulation</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((b, i) => (
                    <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b">{b.name}</td>
                      <td className="px-4 py-3 border-b">{b.startYear} - {b.endYear}</td>
                      <td className="px-4 py-3 border-b">{b.regulation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UploadModal
              isOpen={showBatchUpload}
              onClose={() => setShowBatchUpload(false)}
              title="Upload Batches"
              subtitle="Bulk import academic batches"
              columns={['Batch Name', 'Start Year', 'End Year', 'Regulation']}
              onUpload={onUploadBatch}
              file={batchFile}
              setFile={setBatchFile}
            />
          </div>
        )}

        {/* === PROGRAM MANAGEMENT === */}
        {activeTab === 'program-management' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Program Management</h2>
            <button onClick={() => setShowProgramUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
              <Upload size={18} /> Upload Programs
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Program Name</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Duration (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b">{p.name}</td>
                      <td className="px-4 py-3 border-b">{p.duration || 4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UploadModal
              isOpen={showProgramUpload}
              onClose={() => setShowProgramUpload(false)}
              title="Upload Programs"
              subtitle="Bulk import academic programs"
              columns={['Program Name', 'Program Code', 'Duration']}
              onUpload={onUploadProgram}
              file={programFile}
              setFile={setProgramFile}
            />
          </div>
        )}

        {/* === BRANCH MANAGEMENT === */}
        {activeTab === 'branch-management' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Branch Management</h2>
            <button onClick={() => setShowBranchUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
              <Upload size={18} /> Upload Branches
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Branch Name</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Code</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Specialization</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((b, i) => (
                    <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b">{b.name}</td>
                      <td className="px-4 py-3 border-b">{b.code}</td>
                      <td className="px-4 py-3 border-b">{b.specialization}</td>
                      <td className="px-4 py-3 border-b">{programs.find(p => p.id === b.programId)?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UploadModal
              isOpen={showBranchUpload}
              onClose={() => setShowBranchUpload(false)}
              title="Upload Branches"
              subtitle="Bulk import branches"
              columns={['Branch Name', 'Branch Code', 'Program Code', 'Specialization']}
              onUpload={onUploadBranch}
              file={branchFile}
              setFile={setBranchFile}
            />
          </div>
        )}

        {/* === HOD MANAGEMENT === */}
        {activeTab === 'hod-management' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">HOD Management</h2>
            <button onClick={() => setShowHodUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
              <Upload size={18} /> Upload HODs
            </button>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Branch</th>
                    <th className="px-4 py-3 text-left border-b font-semibold text-gray-700">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {hods.map((h, i) => (
                    <tr key={h.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b">{h.name}</td>
                      <td className="px-4 py-3 border-b">{h.email}</td>
                      <td className="px-4 py-3 border-b">{branches.find(b => b.id === h.branchId)?.name}</td>
                      <td className="px-4 py-3 border-b">{h.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UploadModal
              isOpen={showHodUpload}
              onClose={() => setShowHodUpload(false)}
              title="Upload HODs"
              subtitle="Bulk import Head of Departments"
              columns={['Name', 'Email', 'Branch Code', 'Password', 'Designation']}
              onUpload={onUploadHod}
              file={hodFile}
              setFile={setHodFile}
            />
          </div>
        )}

        {/* === STUDENT MANAGEMENT === */}
        {activeTab === 'student-management' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-4">Student Management</h2>
             <div className="flex gap-4 mb-6">
                <button onClick={() => setShowStudentUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all">
                  <Upload size={18} /> Upload Students
                </button>
                {/* Honors/Minors can be added here similarly */}
             </div>
             
             {/* Filters */}
             <div className="grid grid-cols-2 gap-4 mb-4">
                <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">All Programs</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                   <option value="">All Branches</option>
                   {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 border-b text-left">Roll Number</th>
                      <th className="px-4 py-3 border-b text-left">Name</th>
                      <th className="px-4 py-3 border-b text-left">Branch</th>
                      <th className="px-4 py-3 border-b text-left">Batch</th>
                    </tr>
                 </thead>
                 <tbody>
                    {filteredStudents.map((s, i) => (
                      <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                         <td className="px-4 py-3 border-b">{s.rollNumber}</td>
                         <td className="px-4 py-3 border-b">{s.name}</td>
                         <td className="px-4 py-3 border-b">{branches.find(b => b.id === s.branchId)?.name}</td>
                         <td className="px-4 py-3 border-b">{s.batch}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
             <UploadModal
                isOpen={showStudentUpload}
                onClose={() => setShowStudentUpload(false)}
                title="Upload Students"
                subtitle="Bulk import students"
                columns={['Roll Number', 'Name', 'DOB', 'Program ID', 'Batch', 'Regulation']}
                onUpload={onUploadStudent}
                file={studentFile}
                setFile={setStudentFile}
             />
          </div>
        )}

        {/* === FACULTY MANAGEMENT === */}
        {activeTab === 'faculty-management' && (
           <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Faculty Management</h2>
              <button onClick={() => setShowFacultyUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
                <Upload size={18} /> Upload Faculty
              </button>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                     <tr>
                       <th className="px-4 py-3 border-b text-left">Name</th>
                       <th className="px-4 py-3 border-b text-left">Designation</th>
                       <th className="px-4 py-3 border-b text-left">Branch</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredFaculty.map((f, i) => (
                       <tr key={f.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 border-b">{f.facultyName}</td>
                          <td className="px-4 py-3 border-b">{f.designation}</td>
                          <td className="px-4 py-3 border-b">{branches.find(b => b.id === f.branchId)?.name}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
              <UploadModal
                isOpen={showFacultyUpload}
                onClose={() => setShowFacultyUpload(false)}
                title="Upload Faculty"
                subtitle="Bulk import faculty members"
                columns={['Name', 'Email', 'Designation', 'Branch']}
                onUpload={onUploadFaculty}
                file={facultyFile}
                setFile={setFacultyFile}
             />
           </div>
        )}

        {/* === SUBJECT MANAGEMENT === */}
        {activeTab === 'subject-management' && (
           <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subject Management</h2>
              <button onClick={() => setShowSubjectUpload(true)} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all mb-6">
                 <Upload size={18} /> Upload Regulation
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select value={selectedRegulation} onChange={e => setSelectedRegulation(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                    {availableRegulations.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">All Branches</option>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead className="bg-gray-100">
                       <tr>
                         <th className="px-4 py-3 border-b text-left">Subject Name</th>
                         <th className="px-4 py-3 border-b text-left">Year</th>
                         <th className="px-4 py-3 border-b text-left">Semester</th>
                         <th className="px-4 py-3 border-b text-left">Type</th>
                       </tr>
                    </thead>
                    <tbody>
                       {filteredSubjects.map((s, i) => (
                         <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 border-b">{s.subjectName}</td>
                            <td className="px-4 py-3 border-b">{s.year}</td>
                            <td className="px-4 py-3 border-b">{s.semester}</td>
                            <td className="px-4 py-3 border-b"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{s.subjectType}</span></td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <UploadModal
                isOpen={showSubjectUpload}
                onClose={() => setShowSubjectUpload(false)}
                title="Upload Subjects"
                subtitle="Bulk import subjects for regulation"
                columns={['Subject Name', 'Code', 'Program', 'Branch', 'Regulation', 'Year', 'Semester', 'Type']}
                onUpload={onUploadSubject}
                file={subjectFile}
                setFile={setSubjectFile}
             />
           </div>
        )}

        {/* === FACULTY / FEEDBACK MAPPING === */}
        {activeTab === 'faculty-mapping' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback Mapping</h2>
            <p className="text-sm text-gray-500 mb-6">Map faculty to subjects for a specific batch, branch, and semester.</p>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                 <label className="block text-sm font-semibold mb-1">Batch</label>
                 <select 
                    value={mappingFilters.batch} 
                    onChange={e => setMappingFilters({...mappingFilters, batch: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                 >
                    <option value="">Select Batch</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name} ({b.regulation})</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-semibold mb-1">Program</label>
                 <select 
                    value={mappingFilters.program} 
                    onChange={e => setMappingFilters({...mappingFilters, program: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                 >
                    <option value="">Select Program</option>
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-semibold mb-1">Branch</label>
                 <select 
                    value={mappingFilters.branch} 
                    onChange={e => setMappingFilters({...mappingFilters, branch: e.target.value})}
                    disabled={!mappingFilters.program}
                    className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-100"
                 >
                    <option value="">Select Branch</option>
                    {branches.filter(b => b.programId === Number(mappingFilters.program)).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-semibold mb-1">Semester</label>
                 <select 
                    value={mappingFilters.semester} 
                    onChange={e => setMappingFilters({...mappingFilters, semester: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                 >
                    <option value="">Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
            </div>

            {mappingFilters.batch && mappingFilters.program && mappingFilters.branch && mappingFilters.semester ? (
               <div className="space-y-4 animate-in fade-in">
                  <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg border border-purple-100">
                     <span className="font-semibold text-purple-800">
                        Mapping for {batches.find(b => b.id === Number(mappingFilters.batch))?.name} 
                        {' • '} 
                        {branches.find(b => b.id === Number(mappingFilters.branch))?.name}
                     </span>
                     <button 
                        onClick={() => alert('Mappings Saved!')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                     >
                        <Save size={18} /> Save Mapping
                     </button>
                  </div>
                  
                  {/* Mapping Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {subjects
                        .filter(s => s.branchId === Number(mappingFilters.branch) && s.semester === Number(mappingFilters.semester))
                        .map(subject => (
                          <div key={subject.id} className="border rounded-xl p-4 hover:shadow-md transition-all">
                             <div className="flex justify-between items-start mb-3">
                                <div>
                                   <h4 className="font-bold text-gray-800">{subject.subjectName}</h4>
                                   <p className="text-xs text-gray-500">{subject.subjectCode} • {subject.subjectType}</p>
                                </div>
                                {subjectMappings[subject.id] ? (
                                   <button onClick={() => setSubjectMappings({...subjectMappings, [subject.id]: null})} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={16}/></button>
                                ) : (
                                   <span className="text-xs text-amber-500 bg-amber-50 px-2 py-1 rounded">Pending</span>
                                )}
                             </div>
                             
                             <select 
                                value={subjectMappings[subject.id] || ''}
                                onChange={(e) => setSubjectMappings({...subjectMappings, [subject.id]: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg text-sm"
                             >
                                <option value="">Select Faculty</option>
                                {faculty.filter(f => f.branchId === Number(mappingFilters.branch)).map(f => (
                                   <option key={f.id} value={f.id}>{f.facultyName}</option>
                                ))}
                             </select>
                          </div>
                     ))}
                     {subjects.filter(s => s.branchId === Number(mappingFilters.branch) && s.semester === Number(mappingFilters.semester)).length === 0 && (
                        <div className="col-span-2 text-center py-10 text-gray-400">
                           No subjects found for this criteria.
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-xl">
                  <MapPin size={40} className="mx-auto mb-3 opacity-20" />
                  <p>Please select all filters to view mapping options</p>
               </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPage
