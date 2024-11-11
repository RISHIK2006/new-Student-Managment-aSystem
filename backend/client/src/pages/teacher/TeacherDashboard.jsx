import TeacherSidebar from "../../components/TeacherSidebar";
import { Routes, Route } from "react-router-dom";
import TeacherHome from "./TeacherHome";
import TeacherClassDetails from "./TeacherClassDetails";
import TeacherViewStudent from "./TeacherViewStudent";
import TeacherAttendance from "./TeacherAttendance";
import TeacherNotice from "./TeacherNotice";
import TeacherLogout from "./TeacherLogout";
import PrivateRoute from "../../PrivateRoute";
// import PropTypes from "prop-types";
import TeacherProfile from "./TeacherProfile";
function TeacherDashboard() {
    return <>
        <div>
            <main className="admin-nav">
                <TeacherSidebar title={"Teacher Dashboard"} />
            </main>
            <Routes>
                <Route path="/teacherhome" element={<PrivateRoute><TeacherHome /></PrivateRoute>} />
                <Route path="/teacherclassdetails" element={<PrivateRoute><TeacherClassDetails /></PrivateRoute>} />
                <Route path="/teacherviewstudent/:studentName/:studentRollNumber" element={<PrivateRoute><TeacherViewStudent /></PrivateRoute>} />
                <Route path="/teacherattendance/:studentName/:stdRollNo/:classname" element={<PrivateRoute><TeacherAttendance /></PrivateRoute>} />
                <Route path="/teachernotice" element={<PrivateRoute><TeacherNotice /></PrivateRoute>} />
                <Route path="/teacherlogout" element={<PrivateRoute><TeacherLogout /></PrivateRoute>} />
                <Route path="/teacher/teacherprofile" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />
            </Routes>
        </div>
    </>
}

export default TeacherDashboard;