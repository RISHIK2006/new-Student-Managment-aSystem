import pp from "../../assets/profile_pic.jpg";
import "../../css/TeacherProfile.css";

function TeacherProfile() {
    return <>
        <div className="profile-page">
            <h1>Teacher Profile</h1>
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
                <p><strong>Teacher Name:</strong> </p>
                <p><strong>Teacher Email:</strong> </p>
                <p><strong>Teacher Class:</strong> </p>
            </div>
        </div>
    </>
};

export default TeacherProfile;