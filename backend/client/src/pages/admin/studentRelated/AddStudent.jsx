import AdminDashboard from "../../../components/AdminDashboard";
import "../../../css/AddStudent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

function AddStudent() {
    const { classes } = useAuth();
    const [addstudent, setaddstudent] = useState({
        stdname: "",
        stdrollnumber: "",
        stdpassword: "",
        studentclass: ""
    });
    function handleInput(e) {
        const { name, value } = e.target;
        setaddstudent({
            ...addstudent,
            [name]: value
        });
    }

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/std/addstudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addstudent),
            });
            if (response.ok) {
                const responseData = await response.json();
                setaddstudent({ stdname: "", stdrollnumber: "", stdpassword: "", studentclass: "" });
                toast.success("Student Added Successfully");
                console.log(responseData);
                navigate("/showstudent");

            }
        } catch (error) {
            console.log(`Add Student ${error}`);

        }
    }
    return <>
        <AdminDashboard />
        <div className="form-container">
            <h1 className="add-student-heading">Add Student</h1>
            <form className="add-student-form" method="POST" onSubmit={handleSubmit}>

                <label htmlFor="name" className="stu-name">Name</label>
                <input type="text" id="student-name" name="stdname" placeholder="Enter student's name" required onChange={handleInput} value={addstudent.stdname} />

                <label htmlFor="class" className="stu-class">Class</label>
                <select name="studentclass" id="student-class" required onChange={handleInput} value={addstudent.studentclass}>
                    {/* <option value="">Select Class</option>
                    <option value="dummy1">dummy1</option>
                    <option value="dummy2">dummy2</option> */}
                    <option value="">Select Class</option>
                    {classes.map((className, index) => (
                        <option key={index}>
                            {className.classes}
                        </option>
                    ))}
                    {/* {classes.map(cls => (
                        <option key={cls.id} value={cls.name}>
                            {cls.name}
                        </option>
                    ))} */}
                    {/* class options will be added dynamicallly from the database here */}
                </select>

                <label htmlFor="roll-number" className="stu-roll-number">Roll Number</label>
                <input type="number" id="student-roll-number" name="stdrollnumber" placeholder="Enter student's roll number" required onChange={handleInput} value={addstudent.stdrollnumber} />

                <label htmlFor="password" className="stu-password">Password</label>
                <input type="password" id="student-password" name="stdpassword" placeholder="Enter student's password" required onChange={handleInput} value={addstudent.stdpassword} />

                <button className="add-student-button" type="submit"> Add</button>
            </form>
        </div>
    </>
}

export default AddStudent;