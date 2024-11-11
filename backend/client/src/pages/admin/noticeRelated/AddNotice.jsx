import AdminDashboard from "../../../components/AdminDashboard"
import "../../../css/AddNotice.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../store/auth"; // Import useAuth
import { toast } from "react-toastify";

function AddNotice() {
    const navigate = useNavigate();
    // const { addNotice } = useAuth(); // Destructure addNotice from useAuth
    const [notice, setnotice] = useState({
        title: "",
        details: "",
        date: ""
    });
    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        setnotice({
            ...notice,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const response = await fetch("/api/createnotice/addnotice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(notice),
            });
            if (response.ok) {
                toast.success("Notice Added Successfully");
                const responseData = await response.json();
                // addNotice(responseData.msg);
                setnotice({ title: "", details: "", date: "" });
                console.log(responseData);
                navigate('/shownotice');
            } else {
                toast.error("Error Adding Notice");
            }
        } catch (error) {
            console.error("Error adding notice", error);
        }
    }
    return <>
        <AdminDashboard />
        <section className="section-notice">
            <div className="add-notice">
                <h1 className="add-notice-heading">Add Notice</h1>
                <form className="add-notice-form" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="title">Title</label>
                        <input type="text" name="title" id="title" placeholder="Enter Notice Title" onChange={handleInput} value={notice.title} />
                    </div>
                    <div>
                        <label htmlFor="details" className="details">Details</label>
                        <textarea type="text" name="details" id="details" placeholder="Enter Notice Details" onChange={handleInput} value={notice.details} />
                    </div>
                    <div>
                        <label htmlFor="date" className="date">Date</label>
                        <input type="date" name="date" id="date" onChange={handleInput} value={notice.date} />
                    </div>
                    <button className="add-notice-button">Add</button>
                </form>
            </div>
        </section>
    </>
}

export default AddNotice