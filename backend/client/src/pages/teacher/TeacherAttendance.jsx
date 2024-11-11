// import { useState } from "react";
// import "../../css/TeacherAttendance.css";
// import { useNavigate } from "react-router-dom";

// function TeacherAttendance() {
//     const navigate = useNavigate();

//     // State for form inputs
//     const [attendanceStatus, setAttendanceStatus] = useState("");
//     const [attendanceDate, setAttendanceDate] = useState("");

//     function handleGoBack(e) {
//         e.preventDefault(); // Prevent the default form submission behavior
//         navigate('/teacher/teacherclassdetails');
//     }

//     // Handler for form submission (you can add more logic as needed)
//     function handleSubmit(e) {
//         e.preventDefault(); // Prevent page reload
//         // Logic to handle form submission (e.g., save data)
//         console.log({ attendanceStatus, attendanceDate });
//     }

//     return (
//         <>
//             <section className="std-attendance">
//                 <div className="stu-name-attendance">Student Name: </div>
//                 <div className="stu-subject-attendance">Subject Name: </div>
//                 <form className="stu-attendance-form" onSubmit={handleSubmit}>
//                     <div>
//                         <select
//                             name="std-attendance"
//                             id="std-attendance"
//                             value={attendanceStatus}
//                             onChange={(e) => setAttendanceStatus(e.target.value)}
//                             required
//                         >
//                             <option value="" disabled>Attendance Status</option>
//                             <option value="Present">Present</option>
//                             <option value="Absent">Absent</option>
//                         </select>
//                     </div>

//                     <div>
//                         <input
//                             type="date"
//                             name="std-date"
//                             id="std-date"
//                             value={attendanceDate}
//                             onChange={(e) => setAttendanceDate(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button className="teacher-attendance" type="submit">Submit</button>
//                     <button className="btn std-btn" onClick={handleGoBack}>Go Back</button>
//                 </form>
//             </section>
//         </>
//     );
// }

// export default TeacherAttendance;

// import AdminDashboard from "../../../components/AdminDashboard";
// import "../../../css/StudentAttendence.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function TeacherAttendance() {
    const { subject } = useAuth();
    const { studentName, stdRollNo, classname } = useParams(); // Destructure params
    const [attendance, setAttendance] = useState({
        studentname: "",
        rollnumber: "",
        classname: "",
        stusubject: "",
        attendenceStatus: "",
        date: ""
    });

    // Set initial values for studentname, rollnumber, and classname from URL parameters
    useEffect(() => {
        setAttendance(prevAttendance => ({
            ...prevAttendance,
            studentname: studentName || "",
            rollnumber: stdRollNo || "",
            classname: classname || ""
        }));
    }, [studentName, stdRollNo, classname]);

    function handleInput(e) {
        const { name, value } = e.target;
        setAttendance({
            ...attendance,
            [name]: value,
        });
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/attendance/addattendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(attendance),
            });
            console.log(`Response from attendance is ${response}`);
            const responseData = await response.json();
            if (response.ok) {
                setAttendance({ studentname: "", rollnumber: "", classname: "", stusubject: "", attendenceStatus: "", date: "" });
                toast.success("Attendance Added Succsfully");
                navigate("/showstudent");
                console.log(responseData);
            } else {
                toast.error("Error Adding Attendance");
            }
        } catch (error) {
            console.log(`Error adding attendace ${error}`);
        }
    }
    return (
        <>
            {/* <AdminDashboard /> */}
            <section className="student-attendence">
                <div className="student-name">Take Attendance</div>
                <form className="student-attendence-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="std-attendance-name" className="name">Name</label>
                        <input
                            type="text"
                            name="studentname"
                            id="name"
                            value={attendance.studentname}
                            onChange={handleInput}
                            readOnly // Read-only as it's set from params
                        />
                    </div>
                    <div>
                        <label htmlFor="std-attendance-rollnumber" className="name">Roll Number</label>
                        <input
                            type="number"
                            name="rollnumber"
                            id="rollnumber"
                            value={attendance.rollnumber}
                            onChange={handleInput}
                            readOnly // Read-only as it's set from params
                        />
                    </div>
                    <div>
                        <label htmlFor="std-attendance-class" className="name">Class</label>
                        <input
                            type="text"
                            name="classname"
                            id="classname"
                            value={attendance.classname}
                            onChange={handleInput}
                            readOnly // Read-only as it's set from params
                        />
                    </div>

                    <div>
                        <select
                            name="stusubject"
                            id="stu-subject"
                            onChange={handleInput}
                            value={attendance.stusubject}
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
                        <select
                            name="attendenceStatus"
                            id="attendence-status"
                            onChange={handleInput}
                            value={attendance.attendenceStatus}
                        >
                            <option value="" disabled>Attendance Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={handleInput}
                            value={attendance.date}
                        />
                    </div>
                    <button className="add-attendence" >Submit</button>
                </form>
            </section>
        </>
    );
}

export default TeacherAttendance;

