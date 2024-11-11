import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UtilityTab.css";

function UtilityTab() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details');

    const handleTabDetail = (tab) => {
        setActiveTab(tab); // Update the active tab on click
        navigate('/viewstudent');
    };

    const handleTabAttendence = (tab) => {
        setActiveTab(tab); // Update the active tab on click
        navigate('/attendenceview');
    };

    const handleTabMarks = (tab) => {
        setActiveTab(tab); // Update the active tab on click
        navigate('/addmarks');
    };

    return <>
        <div className="navbar-utility">
            <div
                className={`nav-item-utility ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => handleTabDetail('details')}
            >
                DETAILS
            </div>
            <div
                className={`nav-item-utility ${activeTab === 'attendance' ? 'active' : ''}`}
                onClick={() => handleTabAttendence('attendance')}
            >
                ATTENDANCE
            </div>
            <div
                className={`nav-item-utility ${activeTab === 'marks' ? 'active' : ''}`}
                onClick={() => handleTabMarks('marks')}
            >
                MARKS
            </div>
        </div>
    </>
}

export default UtilityTab;