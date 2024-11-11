import AdminDashboard from "../../../components/AdminDashboard";
import "../../../css/AddTeacher.css";
import { useState } from "react";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddTeacher() {
    const navigate = useNavigate();
    const { classes } = useAuth();
    const { subject } = useAuth();
    const [addteacher, setAddTeacher] = useState({
        teachername: "",
        teacheremail: "",
        teacherpassword: "",
        teacherclass: "",
        teachersubject: "",
    });
    function handleInput(e) {
        const { name, value } = e.target;
        setAddTeacher({
            ...addteacher,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/createteacher/addteacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addteacher),
            });
            console.log("response", response);

            const responseData = await response.json();
            if (response.ok) {
                setAddTeacher({ teachername: "", teacheremail: "", teacherpassword: "", teacherclass: "" });
                toast.success("Teacher added successfully");
                navigate("/showteacher")
                console.log("Response data", responseData);
            } else {
                if (responseData.message === "Class is already assigned to another teacher") {
                    toast.warning("This class is already assigned to another teacher. Please select a different class.");
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <AdminDashboard />
            <section className="add-teacher">
                <h1 className="add-teacher-heading">Add Teacher</h1>
                <div className="add-teacher-form">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="name">Name</label>
                            <input
                                type="text"
                                name="teachername"
                                id="name"
                                placeholder="Enter teacher's name"
                                onChange={handleInput}
                                value={addteacher.teachername}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="email">Email</label>
                            <input
                                type="email"
                                name="teacheremail"
                                id="email"
                                placeholder="Enter teacher's email"
                                onChange={handleInput}
                                value={addteacher.teacheremail}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="pass">Password</label>
                            <input
                                type="password"
                                name="teacherpassword"
                                id="password"
                                placeholder="Enter teacher's password"
                                onChange={handleInput}
                                value={addteacher.teacherpassword}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="classId" className="teacher-class">Class</label>
                            <select
                                name="teacherclass"
                                id="teacherclass"
                                onChange={handleInput}
                                value={addteacher.teacherclass}
                                required
                            >
                                <option value="">Select a class</option>
                                {classes.map((cls, index) => (
                                    <option key={index}>
                                        {cls.classes} {/* Assuming each class has a 'classes' field */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Subject-id" className="add-teacher-subject">Subject</label>
                            <select
                                name="teachersubject"
                                id="teachersubject"
                                onChange={handleInput}
                                value={addteacher.teachersubject}
                                required
                            >
                                <option value="">Select a Subject</option>
                                {subject.map((subname, index) => (
                                    <option key={index}>
                                        {subname.subject} {/* Assuming each class has a 'classes' field */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="add-teacher-button">Register</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default AddTeacher;
