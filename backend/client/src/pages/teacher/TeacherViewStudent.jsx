import "../../css/TeacherViewStudent.css";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TeacherViewStudent() {
    const navigate = useNavigate();
    const { subject } = useAuth();
    const { studentName, studentRollNumber } = useParams();

    const [marks, setMarks] = useState({
        studentname: studentName || "",
        studentRollNumber: studentRollNumber || "",
        chooseSubject: "",
        stuMarks: ""
    });

    function handleInput(e) {
        const { name, value } = e.target;
        setMarks(prevMarks => ({
            ...prevMarks,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/marks/storemarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(marks),
            });
            console.log(response);
            if (response.ok) {
                setMarks({ studentname: studentName || "", studentRollNumber: studentRollNumber || "", chooseSubject: "", stuMarks: "" });
                toast.success("Marks added successfully");
            } else {
                toast.error("Error Adding Marks");
            }
        } catch (error) {
            console.log(`Marks Error ${error}`);
        }
    }
    return (
        <>
            <section className="add-marks-section">
                <h1 className="add-marks-heading">Add Marks</h1>
                <p className="student-marks-name">Student name: {marks.studentname} </p>
                <p className="student-marks-name">Student Roll Number: {marks.studentRollNumber} </p>
                <div className="add-marks-form">
                    <form className="add-marks-form" onSubmit={handleSubmit}>
                        <div>
                            <select
                                name="chooseSubject"
                                id="choose-subject"
                                onChange={handleInput}
                                value={marks.chooseSubject}
                            >
                                <option value="" disabled>Select Subject</option>
                                {subject.map((subname, index) => (
                                    <option key={index} value={subname.subject}>
                                        {subname.subject}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <input
                                type="number"
                                name="stuMarks"
                                id="stu-marks"
                                placeholder="Enter student's Marks*"
                                onChange={handleInput}
                                value={marks.stuMarks}
                            />
                        </div>
                        <button className="add-attendence">Submit</button>
                    </form>
                    <button className="go-back add-marks-go-back" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </section>
        </>
    );
}

export default TeacherViewStudent;