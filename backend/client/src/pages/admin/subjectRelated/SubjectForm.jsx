import { useState } from 'react';
import Subject from "../../../assets/subjects.jpg";
import AdminDashboard from "../../../components/AdminDashboard";
import "../../../css/SubjectForm.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


function SubjectForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [subjectList, setSubjectList] = useState([
        { subject: "", code: "", session: "", selectedClassId: location.state.selectedClassId }
    ]);

    console.log(subjectList)

    function addSubject() {
        setSubjectList([
            ...subjectList,
            { subject: "", code: "", session: "", selectedClassId: location.state.selectedClassId }
        ]);
    }

    function removeSubject(index) {
        const updatedSubjects = subjectList.filter((_, i) => i !== index);
        setSubjectList(updatedSubjects);
    }

    function handleInputChange(index, e) {
        const { name, value } = e.target;
        const updatedSubjects = [...subjectList];
        updatedSubjects[index][name] = value;
        setSubjectList(updatedSubjects);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(subjectList)
        try {
            const response = await fetch("/api/subject/subjectform", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subjects: subjectList  // Add selectedClassId in the request body
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setSubjectList([{ subject: "", code: "", session: "", selectedClassId: "" }]); // Reset to an empty form
                alert("Subjects added successfully");
                console.log(responseData);
                navigate("/showsubject");
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.log("Add subject error", error);
        }
    };

    return (
        <>
            <AdminDashboard />
            <section className="add-subject">
                <div className="container grid grid-two-cols">
                    <div className="add-subject-img">
                        <img src={Subject} alt="Subject" width={500} height={500} />
                    </div>
                    <div className="add-subject-form">
                        <h1 className="add-class-heading">Add Subject</h1>
                        <form method='POST' onSubmit={handleSubmit}>
                            {subjectList.map((subject, index) => (
                                <div key={index}>
                                    <div>
                                        <input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            placeholder="Subject Name*"
                                            required
                                            onChange={(e) => handleInputChange(index, e)}
                                            value={subject.subject}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            placeholder="Subject Code*"
                                            required
                                            onChange={(e) => handleInputChange(index, e)}
                                            value={subject.code}
                                        />
                                        <input
                                            type="number"
                                            name="session"
                                            id="session"
                                            placeholder="Sessions*"
                                            required
                                            onChange={(e) => handleInputChange(index, e)}
                                            value={subject.session}
                                        />
                                        {index > 0 && (
                                            <button type="button" className='btn-remove' onClick={() => removeSubject(index)}>
                                                Remove Subject
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button className="btn" type="button" onClick={addSubject}>
                                Add Subject
                            </button>
                            <button className="btn" type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

SubjectForm.propTypes = {
    selectedClassId: PropTypes.string
}

export default SubjectForm;
