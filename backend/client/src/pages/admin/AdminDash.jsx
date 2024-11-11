// import "../../css/AdminDash.css";
// import AdminDashboard from "../../components/AdminDashboard";
// import student from "../../assets/img1.png";
// import classes from "../../assets/img2.png";
// import teacher from "../../assets/img3.png";
// import fees from "../../assets/img4.png";
// function AdminDash() {
//     return <>
//         <AdminDashboard />
//         <div className="dash-section">
//             <div className="container grid grid-four-cols">
//                 <div className="stu">
//                     <img src={student} alt="" />
//                     <br />
//                     Total Students
//                     <br />
//                     <p>0</p>
//                 </div>
//                 <div className="cla">
//                     <img src={classes} alt="" />
//                     <br />
//                     Total Classes
//                     <br />
//                     <p>0</p>
//                 </div>
//                 <div className="tea">
//                     <img src={teacher} alt="" />
//                     <br />
//                     Total Teachers
//                     <br />
//                     <p>0</p>
//                 </div>
//                 <div className="col">
//                     <img src={fees} alt="" />
//                     <br />
//                     Fees Collections
//                     <br />
//                     <p>0</p>
//                 </div>
//             </div>
//         </div>
//     </>
// }
// export default AdminDash;


// import { useEffect, useState } from "react";
import "../../css/AdminDash.css";
import AdminDashboard from "../../components/AdminDashboard";
import student from "../../assets/img1.png";
import classes from "../../assets/img2.png";
import teacher from "../../assets/img3.png";
// import fees from "../../assets/img4.png";
import { useAuth } from "../../store/auth";
// import axios from "axios";

function AdminDash() {
    // const { countStd } = useAuth();
    const { notice } = useAuth();
    return (
        <>
            <AdminDashboard />
            <div className="dash-section">
                <div className="container grid grid-four-cols">
                    <div className="stu">
                        <img src={student} alt="" />
                        <br />
                        Total Students
                        <br />
                        <p>5</p>
                    </div>
                    <div className="cla">
                        <img src={classes} alt="" />
                        <br />
                        Total Classes
                        <br />
                        <p>4</p>
                    </div>
                    <div className="tea">
                        <img src={teacher} alt="" />
                        <br />
                        Total Teachers
                        <br />
                        <p>3</p> {/* Update this once teacher count logic is implemented */}
                    </div>
                    {/* <div className="col">
                        <img src={fees} alt="" />
                        <br />
                        Fees Collections
                        <br />
                        <p></p>
                    </div> */}
                </div>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notice.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.details}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AdminDash;
