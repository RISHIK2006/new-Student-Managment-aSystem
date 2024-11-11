import "../../css/StudentSubject.css";
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentSubject() {
    const { loggedInStd } = useAuth();
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (loggedInStd && loggedInStd.studentclass) {
            console.log("Fetching subjects for class:", loggedInStd.studentclass);
            axios
                .get(`/api/subject/getsubjectbyclass`, {
                    params: { classId: loggedInStd.studentclass },
                })
                .then((response) => {
                    console.log("API response:", response);
                    setSubjects(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching subjects:", error);
                });
        }
    }, [loggedInStd]);

    if (!loggedInStd) {
        return <p>Loading...</p>;
    }


    return (
        <main className="std-subject">
            <div className="std-subject-div">
                <h1 className="std-heading">Class Details</h1>
                <p className="std-para1">
                    You are Currently in Class: {loggedInStd.studentclass}
                </p>
                <p className="std-para2">And these are your Subjects:</p>
                <ul>
                    {subjects.length > 0 ? (
                        subjects.map((subject) => (
                            <li key={subject._id}>
                                {subject.subject} ({subject.code})
                            </li>
                        ))
                    ) : (
                        <li>No subjects found for this class.</li>
                    )}
                </ul>
            </div>
        </main>
    );
}

export default StudentSubject;
