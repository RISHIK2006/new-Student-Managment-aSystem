import { FaTrash } from 'react-icons/fa';
import AdminDashboard from '../../../components/AdminDashboard';
import "../../../css/ShowClass.css";
import { useAuth } from '../../../store/auth';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { toast } from 'react-toastify';

function ShowClass() {
  const { classes, setClasses } = useAuth();

  const navigate = useNavigate();
  // console.log(classes.length);

  const handleClick = (className) => {
    navigate(`/classdetails/${className}`);
  }

  function handleAddClass() {
    navigate("/addclass");
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/api/dispclass/class/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setClasses((prevClasses) => prevClasses.filter((classItem) => classItem._id !== id));
        toast.error("Class Deleted ");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <AdminDashboard />
    <div className="class-container ">
      <table>
        <thead>
          <tr>
            <th className='class-name-th'>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((className, index) => (
            <tr key={index} >
              <td>{className.classes}</td>
              <td className="actions">
                <button className="delete-btn" onClick={() => handleDelete(className._id)}>
                  <FaTrash />
                </button>
                <button className="view-btn" onClick={() => handleClick(className.classes)} >VIEW</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div >
      <button className="btn" onClick={handleAddClass}>Add Class</button>
    </div>
  </>
}

export default ShowClass;