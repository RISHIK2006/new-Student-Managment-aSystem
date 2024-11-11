import AdminDashboard from "../../../components/AdminDashboard";
import { useNavigate } from "react-router-dom";

function Notices() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/addnotice');
    }
    return <>
        <AdminDashboard />
        <section className="section-class">
            <h1>Add Notices</h1>
            <p>Click the below button to add a new Notice 👇</p>
        </section>
        <div className="Create-button">
            <button className="btn" onClick={handleClick} >Add Notice</button>
        </div>
    </>
}

export default Notices;