import teacherclass from "../assets/teacherclass.png";
// import menu from "../assets/menu.png";
import home from "../assets/home.png";
import profile from "../assets/account.png";
import logout from "../assets/logout.png";
// import close from "../assets/close.png";
import { Link } from "react-router-dom";
import notice from "../assets/notice.png";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from "prop-types";

function TeacherSidebar({ title }) {
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
                    <Link to="teacherhome"><li className="nav-text"><img src={home} alt="home" />Home</li></Link>
                    <Link to="teacherclassdetails"><li className="nav-text"><img src={teacherclass} alt="classes" />Class </li></Link>
                    <Link to="teachernotice"><li className="nav-text"><img src={notice} alt="notice" />Notices</li></Link>
                    <br />
                    <Link to="/teacher/teacherprofile"><li className="nav-text"><img src={profile} alt="profile" />Profile</li></Link>
                    <Link to="/teacher/teacherlogout"><li className="nav-text"><img src={logout} alt="logout" />Logout</li></Link>
                </ul>
            </nav>
        </div>
    );
}

TeacherSidebar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TeacherSidebar;