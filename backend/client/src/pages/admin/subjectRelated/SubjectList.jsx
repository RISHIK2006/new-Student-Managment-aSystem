import { useAuth } from "../../../store/auth";
import ShowSubject from "./ShowSubject";
// import AddClass from "../classRealted/AddClass";
import SubjectBtn from "./SubjectBtn";
// import SetClassSub from "./SetClassSub";

function SubjectList() {
    const { subject } = useAuth();
    return <>
        {subject.length > 0 ? <ShowSubject /> : <SubjectBtn />}
    </>
}

export default SubjectList;