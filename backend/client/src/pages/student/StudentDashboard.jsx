import StudentSidebar from "../../components/StudentSidebar";
import { Routes, Route } from "react-router-dom";
import StudentHome from "./StudentHome";
import StudentSubject from "./StudentSubject";
import ViewStdAttendance from "./ViewStdAttendance";
import StudentLogout from "./StudentLogout";
import PrivateRoute from "../../PrivateRoute";
import StudentProfile from "./StudentProfile";
function StudentDashboard() {
    return <>
        <div>
            <main className="admin-nav">
                <StudentSidebar title={"Student DashBoard"} />
            </main>
            <Routes>
                <Route path="/studenthome" element={<PrivateRoute> <StudentHome /></PrivateRoute>} />
                <Route path="/studentsubject" element={<PrivateRoute><StudentSubject /></PrivateRoute>} />
                <Route path="/studentattendance" element={<PrivateRoute><ViewStdAttendance /></PrivateRoute>} />
                <Route path="/studentlogout" element={<PrivateRoute><StudentLogout /></PrivateRoute>} />
                <Route path="/studentprofile" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
            </Routes>
        </div>
    </>
}

export default StudentDashboard;