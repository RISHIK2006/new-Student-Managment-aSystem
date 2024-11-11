import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/StudentProfile.css";
import pp from "../../assets/profile_pic.jpg";

function StudentProfile() {
    const { loggedInStd } = useAuth();
    const [profilePic, setProfilePic] = useState(null);
    const defaultAvatar = pp; // Replace with actual default avatar path

    useEffect(() => {
        if (loggedInStd) {
            axios.get(`/api/student/getProfilePic/${loggedInStd.stdrollnumber}`)
                .then((response) => {
                    setProfilePic(response.data.profilePic);
                })
                .catch((error) => {
                    console.error("Error fetching profile picture:", error);
                });
        }
    }, [loggedInStd]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("profilePic", file);
        formData.append("rollnumber", loggedInStd.stdrollnumber);

        try {
            const response = await axios.post("/api/student/uploadProfilePic", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setProfilePic(response.data.profilePic);
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    if (!loggedInStd) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <h1>Student Profile</h1>
            <div className="profile-pic-container">
                <img
                    src={profilePic || defaultAvatar}
                    alt="Profile"
                    className="profile-pic"
                />
                <label className="upload-button">
                    Add Profile Pic
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>
            <div className="student-info">
                <p><strong>Student Name:</strong> {loggedInStd.stdname}</p>
                <p><strong>Student Roll Number:</strong> {loggedInStd.stdrollnumber}</p>
                <p><strong>Student Class:</strong> {loggedInStd.studentclass}</p>
            </div>
        </div>
    );
}

export default StudentProfile;
