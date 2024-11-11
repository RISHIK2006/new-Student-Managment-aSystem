import AdminDashboard from "../../../components/AdminDashboard";
import { useNavigate } from "react-router-dom";
function Students() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/addstudent');
    }
    return <>
        <AdminDashboard />
        <section className="section-class">
            <h1>Add Student</h1>
            <p>Click the below button to add a new Student 👇</p>
        </section>
        <div className="Create-button">
            <button className="btn" onClick={handleClick} >Add Student</button>
        </div>
    </>
}

export default Students;