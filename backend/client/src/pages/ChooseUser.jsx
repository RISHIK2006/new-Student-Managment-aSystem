import "../css/ChooseUser.css";
import { useNavigate } from "react-router-dom";
function ChooseUser() {
    const navigate = useNavigate();
    function handleAdmin() {
        navigate("/LoginPageAdmin");
    }
    function handleStudent() {
        navigate("/LoginStudent");
    }
    function handleTeacher() {
        navigate("/LoginTeacher");
    }
    return <>
        <main className="chooseUser">
            <div className="users">
                <div className="container grid grid-three-cols">
                    <div className="admin" onClick={handleAdmin} ><h1>Admin</h1>
                        <p>Login as Administrator to access the app and manage dashboard.</p>
                    </div>
                    <div className="student" onClick={handleStudent}><h1>Student</h1>
                        <p>Login as student to expolre subjects, materials and Assginments.</p>
                    </div>
                    <div className="teacher" onClick={handleTeacher}><h1>Teacher</h1>
                        <p>Login as Teacher to manage students, create course and Assignments.</p>
                    </div>
                </div>
            </div>
        </main>
    </>
}

export default ChooseUser;