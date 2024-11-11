import "../../css/TeacherHome.css";
import { useAuth } from "../../store/auth";

function TeacherHome() {
    const { notice } = useAuth();
    return <>
        <div className="dashboard">
            <div className="card">
                <div className="card-icon">👫</div>
                <div className="card-title">Class Students</div>
                <div className="card-value">3</div>
            </div>
            <div className="card">
                <div className="card-icon">📚</div>
                <div className="card-title">Total Lessons</div>
                <div className="card-value">23</div>
            </div>
            <div className="card">
                <div className="card-icon">📝</div>
                <div className="card-title">Tests Taken</div>
                <div className="card-value">24</div>
            </div>
            <div className="card">
                <div className="card-icon">⏰</div>
                <div className="card-title">Total Hours</div>
                <div className="card-value">30hrs</div>
            </div>
        </div>
        <table className="custom-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {notice.length > 0 ? notice.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.details}</td>
                        <td>{item.date}</td>
                    </tr>
                )) : <div className="notice">
                    No Notices to Show Right Now
                </div>}
            </tbody>
        </table>

    </>
}

export default TeacherHome