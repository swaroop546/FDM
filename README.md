# FEEDBACK MANAGEMENT SYSTEM (FBMS)

## 📋 Project Overview

The Feedback Management System (FBMS) is a comprehensive, role-based college portal designed to collect, manage, and analyze academic feedback from students in a structured and automated way. The system digitizes the entire college feedback process end-to-end with three distinct roles: **Student**, **HOD (Head of Department)**, and **Admin**.

---

## 🎯 Core Objectives

- **Automate Feedback Collection**: Replace manual feedback forms with a digital, structured system
- **Role-Based Access Control**: Separate permissions for Students, HODs, and Admins
- **Real-Time Analytics**: Provide live, automatically updated performance summaries
- **Scalability**: Handle multiple programs, batches, regulations, and special cases
- **Data Integrity**: Ensure accurate mapping of students, subjects, and faculty
- **Anonymous Feedback**: Protect student identity while maintaining submission tracking

---

## 👥 System Roles & Responsibilities

### 1. **Student**
- **Login**: Roll Number + Date of Birth
- **Access**: View assigned subjects and submit feedback
- **Permissions**: Can only submit feedback for published forms; one submission per subject
- **Dashboard**: Displays name, branch, batch, semester, and mapped subjects with faculty

### 2. **HOD (Head of Department)**
- **Login**: Department-specific credentials
- **Access**: Manage feedback forms and view analytics
- **Permissions**: 
  - Map subjects to faculty members
  - Publish/unpublish feedback forms
  - View real-time analytics (subject-wise, faculty-wise, criteria-wise)
- **Restrictions**: Cannot modify master data (students, subjects, faculty)

### 3. **Admin**
- **Login**: Admin credentials
- **Access**: Full system control
- **Permissions**: 
  - Manage all master data (students, faculty, HODs, subjects, programs, batches)
  - Handle special cases (lateral entries, detained students, batch transfers)
  - Configure feedback questions/criteria
  - Reset passwords and manage user accounts
- **Responsibilities**: Initial data loading, system configuration, data maintenance

---

## 🔄 Complete Workflow

```
1. ADMIN loads master data (students, faculty, subjects, programs)
   ↓
2. HOD selects semester context (Program → Batch → Regulation → Year → Semester)
   ↓
3. HOD maps subjects to faculty (including labs, electives, minors, honors)
   ↓
4. HOD publishes feedback form
   ↓
5. STUDENTS log in and see published subjects with mapped faculty
   ↓
6. STUDENTS submit feedback (rating-based with optional comments)
   ↓
7. Feedback stored in database with anonymity preserved
   ↓
8. HOD views real-time analytics (automatically updated)
```

---

## 🗄️ Database Schema (MongoDB)

### Collections:

#### **student**
```javascript
{
  roll: String (unique),
  name: String,
  dob: Date,
  email: String,
  program: String,
  branch: String,
  batch_start: Number,
  batch_end: Number,
  regulation: String,
  currentYear: Number (for detained/lateral cases)
}
```

#### **faculty**
```javascript
{
  faculty_id: String (unique),
  name: String,
  email: String,
  branch: String,
  designation: String
}
```

#### **hod**
```javascript
{
  hod_id: String (unique),
  name: String,
  branch: String,
  email: String,
  password: String (hashed)
}
```

#### **subject**
```javascript
{
  subject_id: String (unique),
  subject_name: String,
  program: String,
  branch: String,
  regulation: String,
  year: Number,
  sem: Number
}
```

#### **map** (Subject-Faculty Mapping)
```javascript
{
  map_id: String (unique),
  program: String,
  batch: String,
  branch: String,
  year: Number,
  sem: Number,
  subject_id: String (ref: subject),
  faculty_id: String (ref: faculty) // Array for labs with multiple faculty
}
```

#### **feedback_publish** (Published Forms)
```javascript
{
  regulation: String,
  program: String,
  batch: String,
  branch: String,
  semester: Number,
  maps: [String], // Array of map_ids
  enable: Boolean,
  publish_by: String (HOD ID),
  publish_at: Date
}
```

#### **feedback** (Student Submissions)
```javascript
{
  student_roll: String,
  map_id: String (ref: map),
  question_id: Number,
  rating: Number (1-5),
  submitted_at: Date,
  comment: String (optional)
}
```

#### **feedback_question** (Feedback Criteria)
```javascript
{
  s_no: Number,
  criteria_text: String
}
```

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19
- **Build Tool**: Vite (Rolldown)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API / Zustand
- **Routing**: React Router DOM
- **Charts**: Recharts / Chart.js (for analytics)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Excel Processing**: xlsx / exceljs
- **Validation**: Joi / Zod
- **Environment**: dotenv

### **DevOps & Tools**
- **Version Control**: Git
- **Code Editor**: VS Code
- **API Testing**: Postman / Thunder Client
- **Package Manager**: npm

---

## 🚀 Features

### **Core Features**
✅ Role-based authentication (Student, HOD, Admin)  
✅ Dynamic subject-faculty mapping  
✅ Feedback form publishing/unpublishing  
✅ Rating-based feedback submission (1-5 scale)  
✅ Real-time analytics dashboard  
✅ Anonymous feedback with duplicate prevention  

### **Advanced Features**
✅ Support for labs with multiple faculty  
✅ Open electives, professional electives, minors, honors  
✅ Lateral entry student handling  
✅ Detained student management  
✅ Batch transfer support  
✅ Excel bulk upload for students and subjects  
✅ Subject-wise, faculty-wise, and criteria-wise analytics  
✅ Configurable feedback questions/criteria  

### **Planned Enhancements**
🔲 Email notifications for feedback deadlines  
🔲 Automatic form closure after deadline  
🔲 Partial feedback save (drafts)  
🔲 PDF/Excel report exports  
🔲 Audit logs for all actions  
🔲 Mobile-responsive design  
🔲 Password reset via email  

---

## 📁 Project Structure

```
sample_FeedBack/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI components
│   │   │   ├── student/         # Student-specific components
│   │   │   ├── hod/             # HOD-specific components
│   │   │   └── admin/           # Admin-specific components
│   │   ├── pages/
│   │   │   ├── student/         # Student pages
│   │   │   ├── hod/             # HOD pages
│   │   │   └── admin/           # Admin pages
│   │   ├── context/             # React Context providers
│   │   ├── utils/               # Helper functions
│   │   ├── routes/              # Route configurations
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── backend/                     # To be implemented
├── docs/
│   ├── STUDENT.md               # Student module documentation
│   ├── HOD.md                   # HOD module documentation
│   └── ADMIN.md                 # Admin module documentation
└── README.md                    # This file
```

---

## 🔐 Authentication Flow

### **Student Login**
1. Student enters Roll Number + Date of Birth
2. Backend verifies credentials against `student` collection
3. JWT token generated with role: "student" and student details
4. Frontend stores token and redirects to student dashboard

### **HOD Login**
1. HOD enters department credentials (hod_id + password)
2. Backend verifies credentials against `hod` collection
3. JWT token generated with role: "hod" and branch info
4. Frontend stores token and redirects to HOD dashboard

### **Admin Login**
1. Admin enters admin credentials
2. Backend verifies credentials
3. JWT token generated with role: "admin"
4. Frontend stores token and redirects to admin dashboard

**Protected Routes**: All routes verify JWT token and role permissions before granting access.

---

## 📊 Analytics Computation

Analytics are computed in real-time from the `feedback` collection:

1. **Subject-wise Average**: 
   - Aggregate all ratings for a specific subject across all questions and students
   - Calculate average rating per question and overall subject average

2. **Faculty-wise Average**:
   - Aggregate all ratings for subjects taught by a specific faculty
   - Calculate average rating across all subjects and questions

3. **Criteria-wise Average**:
   - Aggregate ratings for each specific question/criteria
   - Show which criteria have highest/lowest ratings

4. **Overall Department Average**:
   - Aggregate all feedback in a branch/semester
   - Provide department-level insights

**Note**: Student identity is hidden in analytics; only aggregate data is displayed.

---

## 🎓 Special Cases Handled

### **1. Lateral Entry Students**
- Students who join directly in 2nd or 3rd year
- Admin manually sets their `currentYear` field
- System displays subjects based on current year, not batch calculation

### **2. Detained Students**
- Students who fail and repeat a year
- Admin moves them to appropriate batch or sets `currentYear`
- They see subjects for their current academic year

### **3. Batch Transfers**
- Students who switch between batches/branches
- Admin updates their `batch`, `branch`, and `regulation` fields
- New mapping applies immediately

### **4. Multiple Faculty for Labs**
- Lab subjects can have 2-3 faculty members
- Each faculty gets separate feedback
- Students see all lab faculty and submit feedback for each

### **5. Electives**
- **Open Electives**: Students from different branches can choose
- **Professional Electives**: Branch-specific choices
- **Minors/Honors**: Cross-department subjects
- HOD maps electives based on student registrations

---

## 🔧 Installation & Setup

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
The app will run at `http://localhost:5173/`

### **Backend Setup** (To be implemented)
```bash
cd backend
npm install
# Configure .env file with MongoDB connection string
npm run dev
```

---

## 📖 Documentation

Detailed documentation for each role:
- **[STUDENT.md](./docs/STUDENT.md)** - Complete student module guide
- **[HOD.md](./docs/HOD.md)** - Complete HOD module guide
- **[ADMIN.md](./docs/ADMIN.md)** - Complete admin module guide

---

## 🤝 Contributing

This is a college project. For any modifications or improvements:
1. Document changes clearly
2. Update relevant README files
3. Test thoroughly before deployment
4. Maintain role-based access control integrity

---

## 📝 License

This project is developed for academic purposes.

---

## 📞 Support

For issues or queries, contact the development team or raise an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: In Development 🚧
