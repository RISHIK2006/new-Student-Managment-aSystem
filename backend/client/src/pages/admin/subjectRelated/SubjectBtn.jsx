import AdminDashboard from "../../../components/AdminDashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function SubjectBtn() {
    const { classes } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (classes !== undefined) {
            setIsLoaded(true); // Mark as loaded once classes are fetched
        }
    }, [classes]);

    const handleClick = () => {
        if (!isLoaded) return;

        if (classes.length === 0) {
            toast.info("Create a class to add a Subject");
            navigate("/addclass");
        } else {
            navigate('/setclasssub');
        }
    };
    return <>
        <AdminDashboard />
        <section className="section-class">
            <h1>Add Subject</h1>
            <p>Click the below button to create a new Subject 👇</p>
        </section>
        <div className="Create-button">
            <button className="btn" onClick={handleClick} >Add Subject</button>
        </div>
    </>
}

export default SubjectBtn;