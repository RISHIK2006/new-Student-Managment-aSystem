import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";

function ViewMarks() {
    const { marks = [] } = useAuth();
    console.log("Marks are", marks);

    return <>
        <AdminDashboard />
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        <th >Class</th>
                        <th >Marks</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((stdmarks, index) => (
                        <tr key={index}>
                            <td>{stdmarks.studentname}</td>
                            <td>{stdmarks.studentRollNumber}</td>
                            <td>{stdmarks.chooseSubject}</td>
                            <td>{stdmarks.stuMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default ViewMarks;