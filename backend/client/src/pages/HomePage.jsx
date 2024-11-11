// import student from "../assets/students.svg";
// import { useNavigate } from "react-router-dom";
// import "../css/HomePage.css";
// function HomePage() {
//     const navigate = useNavigate();
//     function handleClick() {
//         navigate('/ChooseUser');
//     }
//     return <>
//         <section className="section-homepage">
//             <div className="container grid grid-two-cols">
//                 <div className="homepage-img">
//                     <img src={student} alt="Students" />
//                 </div>
//                 <div className="intro">
//                     <h1 className="introduction">Welcome To School Management System</h1>
//                     <p className="para-login">Streamline school management, class organization, and add students and faculty. Seamlessly track attendance, assess performance, and provide feedback. Access records, view marks, and communicate effortlessly.</p>
//                     <button className="btn" onClick={handleClick}>Login</button>
//                 </div>
//             </div>

//         </section>
//     </>
// }

// export default HomePage;

import student from "../assets/students.svg";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/ChooseUser');
    }

    return (
        <section className="section-homepage">
            <div className="container grid grid-two-cols">
                <div className="homepage-img">
                    <img src={student} alt="Students" />
                </div>
                <div className="intro">
                    <h1 className="introduction">Welcome To School Management System</h1>
                    <p className="para-login">
                        Streamline school management, class organization, and add students and faculty. Seamlessly track attendance, assess performance, and provide feedback. Access records, view marks, and communicate effortlessly.
                    </p>
                    <button className="btn btn-hover" onClick={handleClick}>Login</button>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
