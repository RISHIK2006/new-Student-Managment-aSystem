import ShowStudent from "./ShowStudent";
import Students from "./Students";
// import AdminDashboard from "../../../components/AdminDashboard";
import { useAuth } from "../../../store/auth";

function StudentList() {
    const { student } = useAuth();
    return <>
        {student.length > 0 ? <ShowStudent /> : <Students />}
    </>
}

export default StudentList;