import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";
import { FaTrash } from "react-icons/fa";
import "../../../css/ShowSubject.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShowSubject() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/setclasssub");
    }
    const { subject, setSubject } = useAuth();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/subject/sub/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setSubject((prevSub) => prevSub.filter((Item) => Item._id !== id));
                toast.info("Subject Deleted successfully ");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return <>
        <AdminDashboard />
        <section className="showSub">
            <h1 className="sub-heading">Subject List </h1>
            <table className="show-sub-table">
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Class</th>
                        <th>Class Code</th>
                        <th>Session</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subject.map((item, index) => (
                        <tr key={index}>
                            <td>{item.subject}</td>
                            <td>{item.classes.classes}</td>
                            <td>{item.code}</td>
                            <td>{item.session}</td>
                            {/* <td>{item.date}</td> */}
                            <td>
                                <button className="delete-btn trash" onClick={() => handleDelete(item._id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section >
        <button className="btn" onClick={handleClick}>Add New Subject</button>
    </>
}

export default ShowSubject;