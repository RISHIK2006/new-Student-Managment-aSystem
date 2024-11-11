import { useAuth } from "../../store/auth";
// import { useState } from "react";
import AdminDashboard from "../../components/AdminDashboard";
import pp from "../../assets/profile_pic.jpg";

function AdminProfile() {
    const { loggedInUser } = useAuth();
    if (!loggedInUser) {
        return <p>Loading...</p>;
    }

    return <>
        <AdminDashboard />
        {/* <h1>This is Admin Profile Page</h1>
        <p>Admin Name:  {loggedInUser.adminname} </p>
        <p>Admin Email:  {loggedInUser.adminemail} </p>
        <p>Admin school:  {loggedInUser.schoolname} </p> */}
        <div className="profile-page">
            <h1>Student Profile</h1>
            <div className="profile-pic-container">
                <img
                    src={pp}
                    alt="Profile"
                    className="profile-pic"
                />
                <label className="upload-button">
                    Add Profile Pic
                    <input type="file" accept="image/*" />
                </label>
            </div>
            <div className="student-info">
                <p><strong>Student Name:</strong> {loggedInUser.adminname}</p>
                <p><strong>Student Roll Number:</strong> {loggedInUser.adminemail}</p>
                <p><strong>Student Class:</strong> {loggedInUser.schoolname}</p>
            </div>
        </div>
    </>
}

export default AdminProfile;