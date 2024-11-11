import "../css/Logout.css";
import AdminDashboard from "../components/AdminDashboard";
// import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
function Logout() {
    const navigate = useNavigate();
    const { LogoutUser } = useAuth();
    function handleLogout() {
        LogoutUser();
        navigate("/chooseuser");
    }
    return <>
        <AdminDashboard />
        <section className="stu-logout">
            <div className="logout">
                <h1>Admin name:</h1>
                <p className="logout-p">Are you sure you want to log out?</p>
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                <br />
                <button className="cancel-btn" onClick={() => navigate(-1)} > Cancel</button>
            </div>
        </section >
    </>
}

export default Logout;