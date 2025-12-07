# HOD MODULE DOCUMENTATION

## 📚 Overview

The HOD (Head of Department) Module enables department heads to manage the complete feedback lifecycle including subject-faculty mapping, feedback form publishing/unpublishing, and viewing real-time analytics. HODs act as the bridge between Admin (who manages master data) and Students (who submit feedback).

---

## 🔐 Authentication

### **Login Credentials**
- **HOD ID**: Department-specific identifier (e.g., HOD_CSE, HOD_ECE)
- **Password**: Securely hashed password managed by Admin

### **Login Process**
1. HOD navigates to HOD login page
2. Enters HOD ID and Password
3. System validates credentials against `hod` collection
4. If valid:
   - JWT token generated with HOD details, role, and branch
   - Token stored in browser
   - Redirected to HOD Dashboard
5. If invalid:
   - Error message: "Invalid HOD ID or Password"

### **Session Management**
- JWT token contains HOD's branch information for data filtering
- Token expires after set duration
- Logout clears token and redirects to login

---

## 🏠 HOD Dashboard

### **Dashboard Overview**
The HOD dashboard has **two main modules**:
1. **Feedback Management** - Map subjects, publish/unpublish forms
2. **Feedback Analytics** - View real-time feedback results and insights

### **Dashboard Components**
- **HOD Profile Section**: Name, Branch, Department, Email
- **Quick Stats**: 
  - Total subjects mapped
  - Active feedback forms
  - Total feedback submissions
  - Pending subjects (not mapped)
- **Navigation**: Tabs/menu to switch between Management and Analytics

---

## 📋 MODULE 1: FEEDBACK MANAGEMENT

### **Purpose**
Enable HODs to select semester context, map subjects to faculty, and publish feedback forms for students.

---

### **Step 1: Select Semester Context**

HOD must select the following to define the feedback scope:

1. **Program**: B.Tech, M.Tech, MBA, etc.
2. **Batch**: e.g., 2021-2025, 2022-2026
3. **Regulation**: e.g., R20, R22, R23
4. **Year**: 1st Year, 2nd Year, 3rd Year, 4th Year
5. **Semester**: 1, 2, 3, 4, 5, 6, 7, 8

**UI Flow**:
```
┌──────────────────────────────────────────┐
│  SELECT SEMESTER CONTEXT                 │
│                                          │
│  Program: [B.Tech ▼]                     │
│  Batch: [2021-2025 ▼]                    │
│  Regulation: [R22 ▼]                     │
│  Year: [3rd Year ▼]                      │
│  Semester: [5 ▼]                         │
│                                          │
│  [Load Subjects]                         │
└──────────────────────────────────────────┘
```

After selection, click **"Load Subjects"** → System fetches all subjects from `subject` collection matching the selected criteria.

---

### **Step 2: View Subjects List**

System displays all subjects for selected semester from the `subject` collection.

**Subjects Table**:
| Subject Code | Subject Name | Type | Current Mapping | Action |
|--------------|--------------|------|-----------------|--------|
| CS501 | Operating Systems | Theory | Dr. Smith | [Edit] [Remove] |
| CS502 | DBMS | Theory | Not Mapped | [Map Faculty] |
| CS503 | OS Lab | Lab | Dr. A, Dr. B | [Edit] [Remove] |
| CS5XX | ML (Open Elective) | Elective | Not Mapped | [Map Faculty] |

**Subject Types**:
- **Theory**: Regular lecture-based subjects
- **Lab**: Practical subjects (can have multiple faculty)
- **Open Elective**: Available across branches
- **Professional Elective**: Branch-specific choices
- **Minor**: Cross-department subjects
- **Honors**: Specialized advanced subjects

---

### **Step 3: Map Faculty to Subjects**

For each subject, HOD assigns one or more faculty members.

#### **Mapping Regular Theory Subjects**
1. Click "Map Faculty" for a subject
2. Modal/dropdown opens with list of faculty from `faculty` collection (filtered by branch if needed)
3. Select one faculty member
4. Click "Save Mapping"
5. System creates entry in `map` collection:
   ```javascript
   {
     map_id: "MAP001",
     program: "B.Tech",
     batch: "2021-2025",
     branch: "CSE",
     year: 3,
     sem: 5,
     subject_id: "CS501",
     faculty_id: "FAC101"
   }
   ```

#### **Mapping Labs with Multiple Faculty**
1. Click "Map Faculty" for lab subject
2. System allows multiple faculty selection
3. Can assign 2-3 faculty for different sections
4. Each faculty gets separate map_id:
   ```javascript
   [
     { map_id: "MAP001", subject_id: "CS503", faculty_id: "FAC201" },
     { map_id: "MAP002", subject_id: "CS503", faculty_id: "FAC202" }
   ]
   ```
5. Students will see both faculty and submit separate feedback for each

#### **Mapping Electives**
- **Open Electives**: Available to students from any branch
  - HOD maps based on student registrations
  - Multiple sections possible with different faculty
- **Professional Electives**: Branch-specific
  - Students choose one from 3-4 options
  - HOD maps each elective option to a faculty
- **Minors/Honors**: Cross-department
  - HOD coordinates with other departments if needed
  - Maps based on enrollment data

#### **Editing Existing Mappings**
- Click "Edit" on already mapped subject
- Change faculty selection
- Update reflected immediately in `map` collection
- If feedback already published, system warns HOD about changes

#### **Removing Mappings**
- Click "Remove" to delete mapping
- Confirmation prompt shown
- Deleted map_id removed from database
- If part of published form, must unpublish first

---

### **Step 4: Review All Mappings**

Before publishing, HOD reviews complete mapping list:

**Review Screen**:
```
┌────────────────────────────────────────────────┐
│  MAPPING SUMMARY                               │
│  Program: B.Tech | Batch: 2021-2025 | Sem: 5  │
│                                                │
│  Total Subjects: 8                             │
│  Mapped: 8 ✅                                  │
│  Unmapped: 0                                   │
│                                                │
│  ───────────────────────────────────────────── │
│  1. CS501 - Operating Systems                  │
│     Faculty: Dr. Smith (FAC101)                │
│                                                │
│  2. CS502 - DBMS                               │
│     Faculty: Dr. Johnson (FAC102)              │
│                                                │
│  3. CS503 - OS Lab                             │
│     Faculty: Dr. A (FAC201), Dr. B (FAC202)    │
│                                                │
│  ... (remaining subjects)                      │
│                                                │
│  [Go Back] [Publish Feedback Form]             │
└────────────────────────────────────────────────┘
```

---

### **Step 5: Publish Feedback Form**

Once all subjects are mapped, HOD can publish the feedback form.

#### **Publishing Process**
1. Review all mappings on summary screen
2. Click **"Publish Feedback Form"**
3. Confirmation dialog appears:
   ```
   Are you sure you want to publish this feedback form?
   
   Once published, students will be able to submit feedback.
   You can unpublish or edit mappings later if needed.
   
   [Cancel] [Confirm & Publish]
   ```
4. On confirmation, system creates entry in `feedback_publish` collection:
   ```javascript
   {
     regulation: "R22",
     program: "B.Tech",
     batch: "2021-2025",
     branch: "CSE",
     semester: 5,
     maps: ["MAP001", "MAP002", "MAP003", "MAP004", ...], // Array of all map_ids
     enable: true,
     publish_by: "HOD_CSE",
     publish_at: Date.now()
   }
   ```
5. Success message: "Feedback form published successfully!"
6. Students can now see subjects and submit feedback

#### **What Publishing Does**
- Makes feedback form **visible to students**
- Students matching the criteria (program, batch, branch, year, semester) see mapped subjects on their dashboard
- Enables feedback submission for all mapped subjects
- Creates audit trail (who published, when)

---

### **Step 6: Unpublish or Disable Form**

HOD can unpublish or temporarily disable a published form.

#### **Unpublish**
- Click "Unpublish Form" button
- Sets `enable: false` in `feedback_publish` collection
- Students can no longer see or submit feedback
- Use case: Need to edit mappings, extend deadline, close feedback

#### **Re-enable**
- Click "Enable Form" to reactivate
- Sets `enable: true`
- Students can access again

#### **Edit Published Form**
1. Unpublish form first
2. Edit mappings as needed
3. Republish with updated mappings
4. Students see updated subjects/faculty

---

### **Bulk Operations** (Future Enhancement)
- Publish multiple semesters at once
- Copy mappings from previous semester
- Import mappings from Excel
- Schedule auto-publish/unpublish with deadlines

---

## 📊 MODULE 2: FEEDBACK ANALYTICS

### **Purpose**
Provide HODs with real-time, automatically updated insights into feedback submissions and performance metrics.

---

### **Analytics Dashboard Overview**

HOD can view analytics from multiple perspectives:
1. **Subject-wise Analytics**
2. **Faculty-wise Analytics**
3. **Criteria-wise Analytics**
4. **Overall Department Analytics**

---

### **Analytics Filters**

HOD can filter analytics by:
- **Program**: B.Tech, M.Tech, etc.
- **Batch**: 2021-2025, 2022-2026, etc.
- **Semester**: 1-8
- **Subject**: Specific subject or all
- **Faculty**: Specific faculty or all
- **Date Range**: Submission period

**Filter UI**:
```
┌──────────────────────────────────────────┐
│  ANALYTICS FILTERS                       │
│                                          │
│  Program: [B.Tech ▼] Batch: [2021 ▼]    │
│  Semester: [5 ▼] Subject: [All ▼]       │
│  Faculty: [All ▼]                        │
│                                          │
│  [Apply Filters] [Reset]                 │
└──────────────────────────────────────────┘
```

---

### **1. Subject-wise Analytics**

Shows performance metrics for each subject.

**Display Format**:
```
┌────────────────────────────────────────────────┐
│  SUBJECT-WISE ANALYTICS                        │
│                                                │
│  CS501 - Operating Systems                     │
│  Faculty: Dr. Smith                            │
│  Total Responses: 85/90 (94.4%)                │
│  Average Rating: 4.2/5.0 ⭐⭐⭐⭐              │
│                                                │
│  Question Breakdown:                           │
│  1. Subject knowledge: 4.5/5 ████████▌         │
│  2. Communication: 4.3/5 ████████▋             │
│  3. Teaching aids: 4.0/5 ████████              │
│  4. Doubt solving: 4.1/5 ████████▏             │
│  ... (all criteria)                            │
│                                                │
│  [View Detailed Report] [Export PDF]           │
└────────────────────────────────────────────────┘
```

**Metrics Shown**:
- Total responses vs expected (submission rate %)
- Overall subject average rating
- Question-wise breakdown with bar charts
- Highest and lowest rated criteria
- Trend over time (if multiple semesters available)

---

### **2. Faculty-wise Analytics**

Shows performance metrics for each faculty member across all subjects they teach.

**Display Format**:
```
┌────────────────────────────────────────────────┐
│  FACULTY-WISE ANALYTICS                        │
│                                                │
│  Dr. Smith (FAC101)                            │
│  Subjects Taught: 3                            │
│  Total Responses: 250                          │
│  Overall Average: 4.3/5.0 ⭐⭐⭐⭐             │
│                                                │
│  Subject Breakdown:                            │
│  • CS501 - Operating Systems: 4.2/5            │
│  • CS601 - Advanced OS: 4.4/5                  │
│  • CS701 - Distributed Systems: 4.3/5          │
│                                                │
│  Strengths:                                    │
│  ✅ Subject knowledge (4.6/5)                  │
│  ✅ Punctuality (4.5/5)                        │
│                                                │
│  Improvement Areas:                            │
│  ⚠️ Use of teaching aids (3.8/5)              │
│                                                │
│  [View Detailed Report] [Compare Faculty]      │
└────────────────────────────────────────────────┘
```

**Metrics Shown**:
- Faculty overall average across all subjects
- Individual subject ratings
- Strengths (top 3 criteria)
- Areas for improvement (bottom 3 criteria)
- Comparison with department average
- Historical performance (semester-wise trend)

---

### **3. Criteria-wise Analytics**

Shows how the entire department performs on each feedback criterion.

**Display Format**:
```
┌────────────────────────────────────────────────┐
│  CRITERIA-WISE ANALYTICS                       │
│  Department: CSE | Semester: 5                 │
│                                                │
│  1. Subject knowledge: 4.4/5 ████████▊         │
│     Best: Dr. A (4.8) | Lowest: Dr. B (3.9)    │
│                                                │
│  2. Communication skills: 4.2/5 ████████▍      │
│     Best: Dr. C (4.7) | Lowest: Dr. D (3.8)    │
│                                                │
│  3. Teaching aids: 3.9/5 ███████▊              │
│     Best: Dr. E (4.5) | Lowest: Dr. F (3.4)    │
│                                                │
│  ... (all criteria)                            │
│                                                │
│  Department Average: 4.1/5                     │
│                                                │
│  [Export Report]                               │
└────────────────────────────────────────────────┘
```

**Use Cases**:
- Identify department-wide strengths
- Find common improvement areas
- Compare faculty performance on specific criteria
- Plan training/development programs

---

### **4. Overall Department Analytics**

Provides high-level summary of entire department's feedback.

**Display Format**:
```
┌────────────────────────────────────────────────┐
│  DEPARTMENT ANALYTICS - CSE                    │
│  Semester: 5 (Odd Sem 2025)                    │
│                                                │
│  📊 Summary Statistics                         │
│  ───────────────────────────────────────────── │
│  Total Students: 450                           │
│  Total Subjects: 32                            │
│  Total Faculty: 18                             │
│  Feedback Forms Published: 8 batches           │
│                                                │
│  Response Rate: 92% ████████████▉              │
│  Department Average: 4.2/5 ⭐⭐⭐⭐            │
│                                                │
│  📈 Performance Distribution                   │
│  ───────────────────────────────────────────── │
│  Excellent (4.5-5.0): 6 faculty (33%)          │
│  Good (4.0-4.4): 8 faculty (44%)               │
│  Average (3.5-3.9): 3 faculty (17%)            │
│  Below Average (<3.5): 1 faculty (6%)          │
│                                                │
│  🏆 Top Performers                             │
│  1. Dr. Smith - 4.6/5                          │
│  2. Dr. Johnson - 4.5/5                        │
│  3. Dr. Williams - 4.5/5                       │
│                                                │
│  ⚠️ Needs Attention                            │
│  • Dr. X - 3.2/5 (Schedule meeting)            │
│                                                │
│  [Detailed Report] [Export Dashboard]          │
└────────────────────────────────────────────────┘
```

---

### **Analytics Computation Logic**

Analytics are computed in real-time from the `feedback` collection:

#### **Subject-wise Average**
```javascript
// Aggregate all ratings for a subject
db.feedback.aggregate([
  { $match: { map_id: "MAP001" } },
  { $group: {
      _id: "$question_id",
      avgRating: { $avg: "$rating" },
      totalResponses: { $sum: 1 }
    }
  }
]);
```

#### **Faculty-wise Average**
```javascript
// Get all map_ids for a faculty, then aggregate ratings
db.map.find({ faculty_id: "FAC101" }); // Get all subjects taught
// For each map_id, aggregate ratings
// Calculate overall average across all subjects
```

#### **Response Rate**
```javascript
// Total submissions / (Total students × Total subjects)
responseRate = (totalFeedbackSubmissions / (studentCount * subjectCount)) × 100;
```

---

### **Data Visualization**

Use charts and graphs for better insights:

- **Bar Charts**: Question-wise ratings, Faculty comparison
- **Pie Charts**: Response rate, Performance distribution
- **Line Charts**: Semester-wise trends, Historical performance
- **Heatmaps**: Faculty vs Criteria performance matrix
- **Radar Charts**: Multi-dimensional faculty comparison

**Recommended Libraries**: Recharts, Chart.js, Victory, Nivo

---

## 🎯 What HODs Can Do

### **✅ HODs CAN:**
- Select semester context (program, batch, year, semester)
- View all subjects for selected semester (loaded by Admin)
- Map subjects to faculty members
- Handle labs with multiple faculty
- Map electives (open, professional, minors, honors)
- Edit or remove subject-faculty mappings
- Publish feedback forms to make them visible to students
- Unpublish or disable feedback forms
- View real-time analytics (subject-wise, faculty-wise, criteria-wise)
- Filter analytics by various parameters
- Export reports as PDF/Excel
- Compare faculty performance
- Identify strengths and improvement areas

### **❌ HODs CANNOT:**
- Add or delete subjects (managed by Admin)
- Add or delete faculty (managed by Admin)
- Modify student records (managed by Admin)
- Create new programs/batches/regulations (managed by Admin)
- View individual student feedback submissions (anonymous)
- Edit feedback questions/criteria (managed by Admin)
- Access other departments' data (filtered by branch)
- Modify submitted feedback
- Access Admin module features

---

## 🔄 User Interface Flow

### **Feedback Management Flow**
```
Login → Dashboard → Feedback Management
  ↓
Select Context (Program/Batch/Year/Sem)
  ↓
Load Subjects
  ↓
Map Faculty to Each Subject
  ↓
Review Mappings
  ↓
Publish Form
  ↓
Students Can Now Submit Feedback
```

### **Analytics Flow**
```
Login → Dashboard → Feedback Analytics
  ↓
Apply Filters (Program/Batch/Semester)
  ↓
Select View Type (Subject/Faculty/Criteria/Overall)
  ↓
View Real-time Analytics
  ↓
Export Report (Optional)
```

---

## 🔔 Notifications & Alerts

### **System Notifications**
- 📢 "New feedback submissions received" (real-time count)
- ⚠️ "Low response rate for CS501" (if < 70%)
- ✅ "Feedback form published successfully"
- 🔴 "Unmapped subjects found" (reminder)
- 📊 "Analytics updated" (after batch submissions)

### **Email Notifications** (Future Enhancement)
- Daily summary of submission rates
- Weekly analytics digest
- Alert when a faculty has very low ratings
- Reminder to publish feedback for new semester

---

## 🛡️ Security & Permissions

### **Branch-Level Access Control**
- HODs can only see data for their own branch/department
- JWT token contains branch info for filtering
- Database queries automatically filter by HOD's branch
- Cannot access other departments' feedback or analytics

### **Data Privacy**
- Analytics show aggregate data only
- Individual student identities never revealed
- Student roll numbers not visible in analytics
- Comments anonymized (no student names)

### **Audit Trail**
- All publish/unpublish actions logged
- Mapping changes tracked with timestamps
- System maintains history of who did what and when

---

## 🔧 Technical Implementation

### **Frontend Components**
```
src/pages/hod/
├── HODLogin.jsx                  # Login page
├── HODDashboard.jsx              # Main dashboard
├── FeedbackManagement.jsx        # Mapping and publishing
├── FeedbackAnalytics.jsx         # Analytics dashboard
└── Reports.jsx                   # Export reports

src/components/hod/
├── SemesterSelector.jsx          # Context selection
├── SubjectMappingTable.jsx       # Subject list with mapping
├── FacultySelector.jsx           # Dropdown/modal for faculty selection
├── PublishConfirmation.jsx       # Publish dialog
├── AnalyticsCard.jsx             # Individual analytics display
├── SubjectAnalytics.jsx          # Subject-wise view
├── FacultyAnalytics.jsx          # Faculty-wise view
├── CriteriaAnalytics.jsx         # Criteria-wise view
└── DepartmentOverview.jsx        # Overall summary
```

### **API Endpoints**

#### **POST /api/hod/login**
Request:
```json
{ "hod_id": "HOD_CSE", "password": "securepass" }
```

#### **GET /api/hod/subjects**
Query: `?program=B.Tech&batch=2021&regulation=R22&year=3&sem=5`
Response: List of subjects

#### **POST /api/hod/map-faculty**
Request:
```json
{
  "subject_id": "CS501",
  "faculty_id": "FAC101",
  "program": "B.Tech",
  "batch": "2021-2025",
  "year": 3,
  "sem": 5
}
```

#### **POST /api/hod/publish-form**
Request:
```json
{
  "regulation": "R22",
  "program": "B.Tech",
  "batch": "2021-2025",
  "semester": 5,
  "maps": ["MAP001", "MAP002", ...]
}
```

#### **GET /api/hod/analytics/subject/:map_id**
Response: Subject-wise analytics data

#### **GET /api/hod/analytics/faculty/:faculty_id**
Response: Faculty-wise analytics data

#### **GET /api/hod/analytics/criteria**
Query: `?semester=5&batch=2021`
Response: Criteria-wise analytics data

---

## ✅ Testing Checklist

- [ ] HOD can log in with correct credentials
- [ ] Invalid credentials rejected
- [ ] Dashboard loads with correct branch data
- [ ] Can select semester context and load subjects
- [ ] Can map faculty to subjects
- [ ] Can handle multiple faculty for labs
- [ ] Can edit existing mappings
- [ ] Can remove mappings
- [ ] Publish form successfully
- [ ] Students see published subjects
- [ ] Can unpublish form
- [ ] Analytics load correctly
- [ ] Filters work properly
- [ ] Real-time updates reflect new submissions
- [ ] Cannot access other departments' data
- [ ] Export reports work
- [ ] Logout clears session

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| No subjects loading | Admin hasn't uploaded subjects | Contact Admin to upload subject data |
| Faculty list empty | Admin hasn't added faculty | Contact Admin to add faculty records |
| Cannot publish | Unmapped subjects | Map all subjects before publishing |
| Analytics not updating | Caching issue | Refresh page or clear cache |
| Wrong data showing | Filter not applied | Verify semester/batch filters |
| Students can't see form | Not published or disabled | Check publish status, enable if needed |

---

## 📞 Support

For HOD-related issues:
- Contact Admin for master data problems
- Report mapping/publishing bugs to development team
- Request analytics features or reports
- Coordinate with other HODs for cross-department subjects

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Module Owner**: HOD Management Team
