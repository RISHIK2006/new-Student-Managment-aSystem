import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/ClassDetails.css";
import { useNavigate } from "react-router-dom";

function ClassDetails() {
    const navigate = useNavigate();
    const { className } = useParams();
    const { loggedInStd } = useAuth();
    const [subjectCount, setSubjectCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);

    function handleClick() {
        navigate("/addstudent");
    }

    useEffect(() => {
        if (loggedInStd && loggedInStd.studentclass) {
            // Fetch subjects in the class
            axios.get("/api/subject/getsubjectbyclass", {
                params: { classId: loggedInStd.studentclass },
            })
                .then((response) => {
                    setSubjectCount(response.data.length); // Set subject count
                })
                .catch((error) => console.error("Error fetching subjects:", error));

            // Fetch students in the class
            axios.get("/api/std/getstudentsbyclass", {
                params: { classId: loggedInStd.studentclass },
            })
                .then((response) => {
                    setStudentCount(response.data.length); // Set student count
                })
                .catch((error) => console.error("Error fetching students:", error));
        }
    }, [loggedInStd]);

    const h1Style = {
        marginTop: "40px"
    };

    return (
        <>
            <AdminDashboard />
            <section className="section-cd">
                <h1 className="heading" style={h1Style}>Class Details</h1>
                <p className="class-name">This is class: {className}</p>
                <p className="class-name">Number of Subjects: {subjectCount}</p>
                <p className="class-name">Number of Students: {studentCount}</p>
                <div className="cd-btn-div">
                    <button className="btn cd-student" onClick={handleClick}>Add Student</button>
                </div>
            </section>
        </>
    );
}

export default ClassDetails;