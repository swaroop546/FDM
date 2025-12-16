export const programs = [
    { id: 1, name: 'B.Tech' },
    { id: 2, name: 'M.Tech' },
    { id: 3, name: 'MBA' }
];

export const branches = [
    { id: 1, name: 'CSE', specialization: 'Computer Science and Engineering', programId: 1 },
    { id: 2, name: 'ECE', specialization: 'Electronics and Communication Engineering', programId: 1 },
    { id: 3, name: 'ME', specialization: 'Mechanical Engineering', programId: 1 },
    { id: 4, name: 'CSE-AI', specialization: 'Artificial Intelligence', programId: 2 }
];

export const students = [
    {
        id: 1,
        rollNumber: '21011A0501',
        name: 'John Doe',
        programId: 1,
        branchId: 1,
        batch: '2021-2025',
        regulation: 'R20',
        currentYear: 4,
        currentSemester: 7,
        isHonors: false,
        isMinors: false
    },
    {
        id: 2,
        rollNumber: '21011A0502',
        name: 'Jane Smith',
        programId: 1,
        branchId: 1,
        batch: '2021-2025',
        regulation: 'R20',
        currentYear: 4,
        currentSemester: 7,
        isHonors: true,
        isMinors: false
    },
    {
        id: 3,
        rollNumber: '21011A0401',
        name: 'Robert Brown',
        programId: 1,
        branchId: 2,
        batch: '2021-2025',
        regulation: 'R20',
        currentYear: 4,
        currentSemester: 7,
        isHonors: false,
        isMinors: true
    },
    {
        id: 4,
        rollNumber: '22011A0501',
        name: 'Alice Johnson',
        programId: 1,
        branchId: 1,
        batch: '2022-2026',
        regulation: 'R20',
        currentYear: 3,
        currentSemester: 5,
        isHonors: false,
        isMinors: false
    }
];

export const faculty = [
    {
        id: 1,
        facultyName: 'Dr. Alan Turing',
        designation: 'Professor',
        branchId: 1,
        email: 'alan@college.edu'
    },
    {
        id: 2,
        facultyName: 'Prof. Ada Lovelace',
        designation: 'Associate Professor',
        branchId: 1,
        email: 'ada@college.edu'
    },
    {
        id: 3,
        facultyName: 'Dr. Grace Hopper',
        designation: 'Assistant Professor',
        branchId: 1,
        email: 'grace@college.edu'
    },
    {
        id: 4,
        facultyName: 'Mr. Nikola Tesla',
        designation: 'Associate Professor',
        branchId: 2,
        email: 'nikola@college.edu'
    }
];

export const subjects = [
    {
        id: 1,
        subjectName: 'Artificial Intelligence',
        subjectCode: 'CS4101',
        programId: 1,
        branchId: 1,
        year: 4,
        semester: 7,
        regulation: 'R20',
        subjectType: 'core'
    },
    {
        id: 2,
        subjectName: 'Machine Learning',
        subjectCode: 'CS4102',
        programId: 1,
        branchId: 1,
        year: 4,
        semester: 7,
        regulation: 'R20',
        subjectType: 'core'
    },
    {
        id: 3,
        subjectName: 'Cloud Computing',
        subjectCode: 'CS4103',
        programId: 1,
        branchId: 1,
        year: 4,
        semester: 7,
        regulation: 'R20',
        subjectType: 'professional-elective'
    },
    {
        id: 4,
        subjectName: 'VLSI Design',
        subjectCode: 'EC4101',
        programId: 1,
        branchId: 2,
        year: 4,
        semester: 7,
        regulation: 'R20',
        subjectType: 'core'
    },
    {
        id: 5,
        subjectName: 'Database Management Systems',
        subjectCode: 'CS3101',
        programId: 1,
        branchId: 1,
        year: 3,
        semester: 5,
        regulation: 'R20',
        subjectType: 'core'
    }
];
