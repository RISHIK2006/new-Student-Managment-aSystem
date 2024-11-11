import "../../css/Logout.css";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

function TeacherLogout() {
  const navigate = useNavigate();
  const { LogoutUser } = useAuth();
  function handleLogout() {
    LogoutUser();
    navigate("/chooseuser");
  }
  return <>
    <section className="stu-logout">
      <div className="logout">
        <h1>Student name:</h1>
        <p className="logout-p">Are you sure you want to log out?</p>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        <br />
        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </section>
  </>
}

export default TeacherLogout;