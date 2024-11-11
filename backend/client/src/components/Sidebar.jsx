import PropTypes from "prop-types";
import home from "../assets/home.png";
import classes from "../assets/class.png";
import subject from "../assets/subjects.png";
import teachers from "../assets/teachers.png";
import student from "../assets/student.png";
import notice from "../assets/notice.png";
import profile from "../assets/account.png";
import logout from "../assets/logout.png";
import "../css/Sidebar.css";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Sidebar({ title }) {
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
                    <Link to="/AdminDash"><li className="nav-text"><img src={home} alt="home" />Home</li></Link>
                    <Link to="/classdisplay"><li className="nav-text"><img src={classes} alt="classes" />Classes</li></Link>
                    <Link to="/subjectlist"><li className="nav-text"><img src={subject} alt="subject" />Subject</li></Link>
                    <Link to="/teacherlist"><li className="nav-text"><img src={teachers} alt="teachers" />Teacher</li></Link>
                    <Link to="/studentlist"><li className="nav-text"><img src={student} alt="student" />Student</li></Link>
                    <Link to="/noticelist"><li className="nav-text"><img src={notice} alt="notice" />Notices</li></Link>
                    <br />
                    <Link to="/adminprofile"><li className="nav-text"><img src={profile} alt="profile" />Profile</li></Link>
                    <Link to="/logout"><li className="nav-text"><img src={logout} alt="logout" />Logout</li></Link>
                </ul>
            </nav>
        </div>
    );
}

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Sidebar;
