import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";
import "../../../css/ShowTeacher.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShowTeacher() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/addteacher");
  }
  const { teacher, setTeacher } = useAuth();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/createteacher/prof/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTeacher((prev) => prev.filter((noticeItem) => noticeItem._id !== id));
        toast.info("Teacher Deleted ");
      }
    } catch (error) {
      console.error(error);

    }
  }
  return <>
    <AdminDashboard />
    <table className="teacher-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Class</th>
          <th>Subject</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teacher.map((data, index) => (
          <tr key={index}>
            <td>{data.teachername}</td>
            <td>{data.teacheremail}</td>
            <td>{data.teacherclass}</td>
            <td>{data.teachersubject}</td>
            <td>
              <button className="delete-btn" onClick={() => handleDelete(data._id)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="btn" onClick={handleClick}>Add New Teacher</button>
  </>
}

export default ShowTeacher;