import "../../css/StudentHome.css";
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentHome() {
    const { loggedInStd, notice } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [presentCounts, setPresentCounts] = useState({});
    const [overallAttendance, setOverallAttendance] = useState(0);
    console.log("this is present count ", presentCounts);

    useEffect(() => {
        if (loggedInStd && loggedInStd.studentclass) {
            // Fetch subjects for the student's class
            axios
                .get(`/api/subject/getsubjectbyclass`, {
                    params: { classId: loggedInStd.studentclass },
                })
                .then((response) => {
                    setSubjects(response.data);
                    const subjectPromises = response.data.map((subject) =>
                        axios
                            .get(`/api/attendance/getpresentcount`, {
                                params: { rollnumber: loggedInStd.stdrollnumber, subject: subject.subject },
                            })
                            .then((countResponse) => ({
                                subjectId: subject._id,
                                presentCount: countResponse.data.presentCount,
                                session: subject.session,
                            }))
                    );

                    // Calculate total attendance percentage
                    Promise.all(subjectPromises).then((attendanceData) => {
                        let totalPresent = 0;
                        let totalSessions = 0;

                        const newPresentCounts = {};
                        attendanceData.forEach(({ subjectId, presentCount, session }) => {
                            newPresentCounts[subjectId] = presentCount;
                            totalPresent += presentCount;
                            totalSessions += session;
                        });

                        setPresentCounts(newPresentCounts);
                        const attendancePercentage = totalSessions > 0 ? (totalPresent / totalSessions) * 100 : 0;
                        setOverallAttendance(attendancePercentage.toFixed(2));
                    });
                })
                .catch((error) => {
                    console.error("Error fetching subjects:", error);
                });
        }
    }, [loggedInStd]);

    return (
        <div className="student-app">
            <div className="main-content">
                <div className="dashboard-content">
                    <div className="summary-card">
                        <h3>Total Subjects</h3>
                        <h1 className="stu-home-heading">{subjects.length}</h1>
                    </div>

                    <div className="summary-card">
                        <h3>Attendance</h3>
                        <h1 className="stu-home-heading">{overallAttendance}%</h1>
                    </div>
                </div>

                <div className="notices">
                    <h2>Notices</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Details</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notice && notice.length > 0 ? (
                                notice.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.details}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No notices available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentHome;
