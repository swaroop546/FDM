import { motion } from 'framer-motion';
import { User, Mail, Calendar, Book } from 'lucide-react';

const StudentProfile = () => {
  const studentInfo = {
    name: 'P. Sneha Swaroop',
    email: 'swarooppinakana@gmail.com',
    rollNumber: '23VV1A0546',
    branch: 'B.Tech',
    department: 'Computer Science & Engineering',
    semester: 'Semester 3-1',
    batch: '2023-2027',
    dateOfBirth: 'January 15, 2006',
    admissionYear: '2023'
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 pt-16 lg:pt-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm lg:text-base text-gray-500 mt-2">View and manage your profile information</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10">
        <div className="flex items-center gap-6 lg:gap-8 mb-8 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl lg:text-4xl font-bold shadow-lg">
            RK
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{studentInfo.name}</h2>
            <p className="text-sm lg:text-base text-gray-500 mt-1">{studentInfo.email}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-lg">
                {studentInfo.rollNumber}
              </span>
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg">
                {studentInfo.branch}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-5 lg:space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-blue-500 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Email Address</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 mt-1">{studentInfo.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-purple-500 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Date of Birth</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 mt-1">{studentInfo.dateOfBirth}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <Book className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-500 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Department</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 mt-1">{studentInfo.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <User className="h-5 w-5 lg:h-6 lg:w-6 text-orange-500 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Current Semester</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 mt-1">{studentInfo.semester}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-pink-500 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Batch</p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 mt-1">{studentInfo.batch}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;