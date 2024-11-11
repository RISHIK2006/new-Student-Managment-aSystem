const express = require('express');
const cors = require('cors');
const path = require('path');
const adminRegister = require(path.join(__dirname, 'router', 'admin-register-router'));
const createClass = require(path.join(__dirname, 'router', 'create-class-router'));
const subjectRoute = require(path.join(__dirname, 'router', 'add-subject-router'));
const teacherRoute = require(path.join(__dirname, 'router', 'add-teacher-router'));
const studentRoute = require(path.join(__dirname, 'router', 'add-student-router'));
const noticeRouter = require(path.join(__dirname, 'router', 'notice-router'));
const attendanceRouter = require(path.join(__dirname, 'router', 'add-attendance-router'));
const marksRouter = require(path.join(__dirname, 'router', 'add-marks-router'));
const connectDb = require(path.join(__dirname, 'utils', 'db'));

const app = express();
const port = process.env.PORT || 3500;

// CORS configuration
const corsOption = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
};
app.use(cors(corsOption));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', adminRegister);
app.use('/api/makeclass', createClass);
app.use('/api/dispclass', createClass);
app.use('/api/subject', subjectRoute);
app.use('/api/createteacher', teacherRoute);
app.use('/api/std', studentRoute);
app.use('/api/createnotice', noticeRouter);
app.use('/api/data', noticeRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/marks', marksRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle any requests that don’t match the above routes (for SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Database connection and server start
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
});
