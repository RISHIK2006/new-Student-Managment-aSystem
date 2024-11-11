import AdminDashboard from "../../../components/AdminDashboard";
import "../../../css/Classes.css";
import { useNavigate } from "react-router-dom";
function Classes() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/AddClass');
    }
    return <>
        <AdminDashboard />
        <section className="section-class">
            <h1>Add Class</h1>
            <p>Click the below button to create a new Class 👇</p>
        </section>
        <div className="Create-button">
            <button className="btn" onClick={handleClick} >Create Class</button>
        </div>
    </>
}

export default Classes;