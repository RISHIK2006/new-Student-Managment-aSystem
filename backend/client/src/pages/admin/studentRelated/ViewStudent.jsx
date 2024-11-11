import AdminDashboard from "../../../components/AdminDashboard";
import "../../../css/ViewStudent.css";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import UtilityTab from "../../../components/UtilityTab";
function ViewStudent() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/showstudent");
    }
    return <>
        <AdminDashboard />
        <UtilityTab />
        <section className="student-details">
            <div className="details">
                <h1 className="sudent-details-heading">Student Details</h1>
                <div className="name-details">
                    Name:
                </div>
                <div className="roll-number-details">
                    Roll-Number:
                </div>
                <div className="class-details">
                    Class:
                </div>
                <div className="school-details">
                    School:
                </div>
                <button className="btn-remove">Delete</button>
                <br />
                <button className="go-back stu-go-back" onClick={handleClick}>Go Back</button>
            </div>
        </section>
    </>
}

export default ViewStudent;