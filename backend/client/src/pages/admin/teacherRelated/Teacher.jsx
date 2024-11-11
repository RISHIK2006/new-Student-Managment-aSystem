import AdminDashboard from "../../../components/AdminDashboard";
// import "../../../css/Teacher.css";
import { useAuth } from "../../../store/auth";
import { useNavigate } from "react-router-dom";
function Teacher() {
    const { classes } = useAuth();
    const navigate = useNavigate();
    console.log(classes.length);

    function handleClick() {
        if (classes.length === 0) {
            alert("Create class to Add Teacher")
            navigate('/addclass');
        }
        else {
            navigate('/addteacher');
        }
    }
    return <>
        <AdminDashboard />
        <section className="section-class">
            <h1>Add Teacher</h1>
            <p>Click the below button to add a new Teacher 👇</p>
        </section>
        <div className="Create-button">
            <button className="btn" onClick={handleClick} >Add Teacher</button>
        </div>
    </>
}

export default Teacher;