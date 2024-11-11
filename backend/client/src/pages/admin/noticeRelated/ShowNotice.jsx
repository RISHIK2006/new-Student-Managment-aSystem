import "../../../css/ShowNotice.css";
import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
// import { useState } from "react";

function ShowNotice() {
    // const { token } = useAuth();
    const navigate = useNavigate();
    function handleClick() {
        navigate("/addnotice");
    }
    const { notice, setNotice } = useAuth();
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/data/notice/delete/${id}`, {
                method: "DELETE",
                // No headers included if Authorization is not required
            });
            if (response.ok) {
                console.log("Notice deleted successfully.");
                setNotice((prevNotice) => prevNotice.filter((noticeItem) => noticeItem._id !== id));
                // Optionally refresh or remove the deleted notice from the UI
            } else {
                console.error("Failed to delete notice");
            }
        } catch (error) {
            console.error("Error deleting notice:", error);
        }
    }


    return <>
        <AdminDashboard />
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
                {notice.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.details}</td>
                        <td>{item.date}</td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className="btn" onClick={handleClick}>Create New Notice</button>
    </>
}

export default ShowNotice;



