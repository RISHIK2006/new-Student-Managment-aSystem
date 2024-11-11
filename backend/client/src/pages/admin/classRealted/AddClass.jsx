import AdminDashboard from "../../../components/AdminDashboard";
import classroom from "../../../assets/classroom.png";
import "../../../css/AddClass.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function AddClass() {
    const [addclass, setaddclass] = useState({
        classes: ""
    });
    function handleInput(e) {
        setaddclass({
            ...addclass,
            classes: e.target.value
        });
    }
    const formStyle = {
        marginTop: "50px"
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/makeclass/createclass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addclass),
            });
            console.log(response);

            if (response.ok) {
                const responseData = await response.json();
                setaddclass("");
                toast.success("Class created ");
                console.log(responseData);
                // navigate("/classdetails");
            }
            else {
                const errorText = await response.text(); // Handle non-JSON response
                console.log("Error:", errorText);
                toast.error("Error Adding Class");
            }
        } catch (error) {
            console.log("AddClass", error);
        }
    }
    return <>
        <AdminDashboard />
        <section className="add-class" style={formStyle}>
            <div className="container grid grid-two-cols">
                <div className="add-class-img">
                    <img src={classroom} alt="" />
                </div>

                <div className="add-class-form">
                    <h1 className="add-class-heading">Create Class</h1>
                    <form method="POST" onSubmit={handleSubmit}>
                        <input type="text" name="className" id="class" placeholder="Create a Class*" onChange={handleInput} value={addclass.className} />
                        <br />
                        <button className="btn">Create</button>
                        <br />
                        <button className="go-back" onClick={() => navigate(-1)}> Go Back</button>
                    </form>
                </div>
            </div>
        </section>
    </>
}
export default AddClass;