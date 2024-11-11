import AdminDashboard from "./AdminDashboard";
import "../css/AttendenceView.css";
import { useNavigate } from "react-router-dom";
import UtilityTab from "./UtilityTab";

function AttendenceView() {
    const navigate = useNavigate();
    function handleAdd() {
        navigate("/studentattendence");
    }
    const data = [
        {
            subject: 'CO',
            present: 2,
            totalSessions: 23,
            percentage: '8.70%',
        },
    ];
    return <>
        <AdminDashboard />
        <UtilityTab />
        <div className="attendance-container">
            <h2>Attendance:</h2>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Present</th>
                        <th>Total Sessions</th>
                        <th>Attendance Percentage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.subject}</td>
                            <td>{item.present}</td>
                            <td>{item.totalSessions}</td>
                            <td>{item.percentage}</td>
                            <td>
                                <button className="btn details-btn">Details</button>
                                <button className="btn-remove">&#128465;</button> {/* Trash Icon */}
                                <button className="btn change-btn">Change</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Overall Attendance Percentage: 8.70%</p>
            <div className="action-buttons">
                <button className="btn-remove">Delete All</button>
                <button className="btn add-attendance-btn" onClick={handleAdd}>Add Attendance</button>
            </div>
        </div>
    </>
}

export default AttendenceView;