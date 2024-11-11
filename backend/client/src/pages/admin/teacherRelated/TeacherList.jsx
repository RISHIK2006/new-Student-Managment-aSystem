import ShowTeacher from "./ShowTeacher";
import Teacher from "./Teacher";
import { useAuth } from "../../../store/auth";

function TeacherList() {
    const { teacher } = useAuth();
    return <>
        {teacher.length > 0 ? <ShowTeacher /> : <Teacher />}
    </>
}

export default TeacherList;