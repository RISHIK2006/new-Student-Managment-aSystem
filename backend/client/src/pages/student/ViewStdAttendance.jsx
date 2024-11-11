import "../../css/ViewStdAttendance.css";
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function ViewStdAttendance() {
    const { loggedInStd } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [presentCounts, setPresentCounts] = useState({});

    useEffect(() => {
        if (loggedInStd && loggedInStd.studentclass) {
            axios
                .get(`/api/subject/getsubjectbyclass`, {
                    params: { classId: loggedInStd.studentclass },
                })
                .then((response) => {
                    setSubjects(response.data);
                    // Fetch present count for each subject
                    response.data.forEach(subject => {
                        axios
                            .get(`/api/attendance/getpresentcount`, {
                                params: { rollnumber: loggedInStd.stdrollnumber, subject: subject.subject },
                            })
                            .then((countResponse) => {
                                setPresentCounts(prevCounts => ({
                                    ...prevCounts,
                                    [subject._id]: countResponse.data.presentCount,
                                }));
                            });
                    });
                })
                .catch((error) => {
                    console.error("Error fetching subjects:", error);
                });
        }
    }, [loggedInStd]);

    const handleClick = () => {

    };


    return (
        <div className="attendance-container">
            <h1 className="view-std-attendance-h1">Attendance</h1>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Present</th>
                        <th>Total Sessions</th>
                        <th>Total Attendance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.length > 0 ? (
                        subjects.map((subject) => (
                            <tr key={subject._id}>
                                <td>{subject.subject}</td>
                                <td>{presentCounts[subject._id] || 0}</td>
                                <td>{subject.session}</td>
                                <td>{((presentCounts[subject._id] / subject.session) * 100).toFixed(2)}%</td>
                                <td>
                                    <button className="delete-btn" onClick={handleClick}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No subjects found for this class.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ViewStdAttendance;



