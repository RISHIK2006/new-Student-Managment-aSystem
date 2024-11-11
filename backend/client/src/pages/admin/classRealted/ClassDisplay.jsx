import { useAuth } from "../../../store/auth";
import ShowClass from "./ShowClass";
// import AddClass from "./AddClass";
import Classes from "./Classes";

function ClassDisplay() {
    const { classes } = useAuth();
    console.log(classes.length);

    return <>
        {classes.length > 0 ? <ShowClass /> : <Classes />}
    </>
}

export default ClassDisplay;