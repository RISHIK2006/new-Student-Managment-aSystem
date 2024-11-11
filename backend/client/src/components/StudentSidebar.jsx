// import menu from "../assets/menu.png";
import PropTypes from "prop-types";
import home from "../assets/home.png";
import subject from "../assets/subjects.png";
import attendance from "../assets/attendance.png";
import profile from "../assets/account.png";
import logout from "../assets/logout.png";
// import close from "../assets/close.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';


function StudentSidebar({ title }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="sidebar">
            {/* Navbar with conditional rendering for hamburger icon */}
            <div className="navbar-admin">
                {!sidebar && (
                    <FaBars onClick={showSidebar} className="menu-bars-admin" />
                )}
                <div className="dashboard-name">{title}</div>
            </div>

            {/* Sidebar */}
            <nav className={sidebar ? 'nav-menu-admin active' : 'nav-menu-admin'}>
                <ul className="nav-menu-items">
                    {/* Close button inside the sidebar */}
                    <li className="navbar-toggle-admin">
                        <FaTimes onClick={showSidebar} className="menu-bars-close" />
                    </li>
                    <Link to="studenthome"><li className="nav-text"><img src={home} alt="home" />Home</li></Link>
                    <Link to="studentattendance"><li className="nav-text"><img src={attendance} alt="attendance" />Attendance</li></Link>
                    <Link to="studentsubject"><li className="nav-text"><img src={subject} alt="subject" />Subject</li></Link>
                    <br />
                    <Link to="/student/studentprofile"><li className="nav-text"><img src={profile} alt="profile" />Profile</li></Link>
                    <Link to="/student/studentlogout"><li className="nav-text"><img src={logout} alt="logout" />Logout</li></Link>
                </ul>
            </nav>
        </div>
    );
}

StudentSidebar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default StudentSidebar;