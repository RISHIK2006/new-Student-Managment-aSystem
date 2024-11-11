import "../../css/TeacherClassDetails.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

function TeacherClassDetails() {
    const { student } = useAuth();
    const navigate = useNavigate();
    function handleView(studentName, rollnumber) {
        navigate(`/teacher/teacherviewstudent/${studentName}/${rollnumber}`);
    }
    function handleAttendence(studentName, rollnumber, classname) {
        navigate(`/teacher/teacherattendance/${studentName}/${rollnumber}/${classname}`);
    }
    return <>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th className="class-th">Class</th>
                        <th className="action-th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {student.length > 0 ? (
                        student.map((studentinfo, index) => (
                            <tr key={index}>
                                <td>{studentinfo.stdname}</td>
                                <td>{studentinfo.stdrollnumber}</td>
                                <td>{studentinfo.studentclass}</td>
                                <td className="actions">
                                    <button className="view-btn" onClick={() => handleView(studentinfo.stdname, studentinfo.stdrollnumber)}>Add Marks</button>
                                    <button className="attendance-btn" onClick={() => handleAttendence(studentinfo.stdname, studentinfo.stdrollnumber, studentinfo.studentclass)}>TAKE ATTENDANCE</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>
}

export default TeacherClassDetails;