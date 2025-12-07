import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Book } from 'lucide-react';

const StudentProfile = () => {
  const studentInfo = {
    name: 'Ravi Kumar Sharma',
    email: 'ravi.sharma@jntugv.ac.in',
    rollNumber: 'CSE2024001',
    phone: '+91 98765 43210',
    branch: 'B.Tech',
    department: 'Computer Science & Engineering',
    semester: 'Semester 3-1',
    batch: '2024-2028',
    section: 'A',
    address: 'Vizianagaram, Andhra Pradesh',
    dateOfBirth: 'January 15, 2006',
    admissionYear: '2024'
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-600 mt-1">View and manage your profile information</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            RK
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{studentInfo.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{studentInfo.email}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {studentInfo.rollNumber}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {studentInfo.branch}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.dateOfBirth}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Book className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Current Semester</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.semester}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Batch</p>
                <p className="text-sm font-medium text-gray-900">{studentInfo.batch}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Book className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Section</p>
                <p className="text-sm font-medium text-gray-900">Section {studentInfo.section}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;