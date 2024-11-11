import './App.css'
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseUser from './pages/ChooseUser';
import LoginPageAdmin from './pages/LoginPageAdmin';
import LoginStudent from './pages/LoginStudent';
import LoginTeacher from './pages/LoginTeacher';
import AdminRegister from './pages/AdminRegister';
// import AdminHome from './pages/admin/AdminHome';
import AdminDash from './pages/admin/AdminDash';
import Classes from './pages/admin/classRealted/Classes';
import AddClass from './pages/admin/classRealted/AddClass';
import ClassDetails from './pages/admin/classRealted/ClassDetails';
// import SubjectBtn from './pages/admin/subjectRelated/SubjectBtn';
import SubjectForm from "./pages/admin/subjectRelated/SubjectForm";
import ShowSubject from './pages/admin/subjectRelated/ShowSubject';
import Teacher from './pages/admin/teacherRelated/Teacher';
import AddTeacher from './pages/admin/teacherRelated/AddTeacher';
import Students from './pages/admin/studentRelated/Students';
import AddStudent from './pages/admin/studentRelated/AddStudent';
import ShowStudent from './pages/admin/studentRelated/ShowStudent';
import ViewStudent from "./pages/admin/studentRelated/ViewStudent";
import StudentAttendence from "./pages/admin/studentRelated/StudentAttendence";
import AttendenceView from './components/AttendenceView';
import AddMarks from './pages/admin/marks/AddMarks';
import Notices from './pages/admin/noticeRelated/Notices';
import AddNotice from './pages/admin/noticeRelated/AddNotice';
import ShowNotice from './pages/admin/noticeRelated/ShowNotice';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
// import StudentHome from './pages/student/StudentHome';
import PrivateRoute from "./PrivateRoute";
import Logout from './pages/Logout';
// import ShowClass from './pages/admin/classRealted/ShowClass';
import ClassDisplay from './pages/admin/classRealted/ClassDisplay';
import SetClassSub from "./pages/admin/subjectRelated/SetClassSub";
import ShowTeacher from './pages/admin/teacherRelated/ShowTeacher';
import SubjectList from './pages/admin/subjectRelated/SubjectList';
import TeacherList from './pages/admin/teacherRelated/TeacherList';
import StudentList from './pages/admin/studentRelated/StudentList';
import ViewMarks from "./pages/admin/marks/ViewMarks";
import NoticeList from './pages/admin/noticeRelated/NoticeList';
import AdminProfile from './pages/admin/AdminProfile';
function App() {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ChooseUser" element={<ChooseUser />} />
        {/* Login Routes */}

        <Route path='/LoginPageAdmin' element={<LoginPageAdmin />} />
        <Route path="/AdminDash" element={<PrivateRoute> <AdminDash /></PrivateRoute>} />
        <Route path="/adminprofile" element={<PrivateRoute> <AdminProfile /></PrivateRoute>} />
        <Route path='/AdminRegister' element={<AdminRegister />} />
        <Route path='/LoginStudent' element={<LoginStudent />} />
        <Route path='/LoginTeacher' element={<LoginTeacher />} />

        {/* Class Related */}

        <Route path='/classes' element={<PrivateRoute><Classes /></PrivateRoute>} />
        <Route path='/addclass' element={<PrivateRoute><AddClass /></PrivateRoute>} />
        <Route path='/classdetails/:className' element={<PrivateRoute><ClassDetails /></PrivateRoute>} />
        {/* <Route path='/classlist' element={<ShowClass />} /> */}
        <Route path='/classdisplay' element={<PrivateRoute><ClassDisplay /></PrivateRoute>} />
        {/* Subject Related */}

        {/* <Route path='/subject' element={<PrivateRoute><SubjectBtn /></PrivateRoute>} /> */}
        <Route path='/subjectform' element={<PrivateRoute><SubjectForm /></PrivateRoute>} />
        <Route path='/showsubject' element={<PrivateRoute><ShowSubject /></PrivateRoute>} />
        <Route path='/setclasssub' element={<PrivateRoute><SetClassSub /></PrivateRoute>} />
        <Route path='/subjectlist' element={<PrivateRoute><SubjectList /></PrivateRoute>} />

        {/* Teacher Related */}

        <Route path='/teacher' element={<PrivateRoute><Teacher /></PrivateRoute>} />
        <Route path='/addteacher' element={<PrivateRoute><AddTeacher /></PrivateRoute>} />
        <Route path='/showteacher' element={<PrivateRoute><ShowTeacher /></PrivateRoute>} />
        <Route path='/teacherlist' element={<PrivateRoute><TeacherList /></PrivateRoute>} />
        {/* Student Related */}

        <Route path='/student' element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path='/addstudent' element={<PrivateRoute><AddStudent /></PrivateRoute>} />
        <Route path='/showstudent' element={<PrivateRoute><ShowStudent /></PrivateRoute>} />
        <Route path='/viewstudent' element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path='/studentattendence/:studentName/:stdRollNo/:classname' element={<PrivateRoute><StudentAttendence /></PrivateRoute>} />
        <Route path='/studentlist' element={<PrivateRoute><StudentList /></PrivateRoute>} />
        {/* Attendence view */}

        <Route path='/attendenceview' element={<PrivateRoute><AttendenceView /></PrivateRoute>} />
        {/* Marks Related */}
        <Route path='/addmarks/:studentName/:studentRollNumber' element={<PrivateRoute><AddMarks /></PrivateRoute>} />
        <Route path='/viewmarks' element={<PrivateRoute><ViewMarks /></PrivateRoute>} />
        {/* Notice Related */}

        <Route path='/notice' element={<PrivateRoute><Notices /></PrivateRoute>} />
        <Route path='/addnotice' element={<PrivateRoute><AddNotice /></PrivateRoute>} />
        <Route path='/shownotice' element={<PrivateRoute><ShowNotice /></PrivateRoute>} />
        <Route path='/noticelist' element={<PrivateRoute><NoticeList /></PrivateRoute>} />
        {/* <Route path='/adminhome' element={<AdminHome />} /> */}
        {/* Student Section */}

        <Route path='/student/*' element={<StudentDashboard />} />
        {/* Teacher Section */}

        <Route path='/teacher/*' element={<TeacherDashboard />} />
        {/* Logout for Admin*/}

        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>

  </>
}

export default App;
