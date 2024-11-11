import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";
import "../../../css/SetClassSub.css";
import { useNavigate } from "react-router-dom";
import SubjectBtn from "./SubjectBtn";

function SetClassSub() {
    const navigate = useNavigate();
    const { classes } = useAuth();
    function handleClick(classId) {
        console.log("id is", classId);
        navigate("/SubjectForm", { state: { selectedClassId: classId } });
    }
    return <>
        <AdminDashboard />
        {classes.length > 0 ? <div className="table-container setclasssub-table">
            <table className="setClasssub-table">
                <thead>
                    <tr>
                        <th className='class-name-th'>Class Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => (
                        <tr key={index} >
                            <td>{classItem.classes}</td>
                            <td className="actions">
                                <button className="view-btn choose-btn" onClick={() => handleClick(classItem._id)} >Choose</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> :
            <SubjectBtn />
        }

    </>
}

export default SetClassSub;