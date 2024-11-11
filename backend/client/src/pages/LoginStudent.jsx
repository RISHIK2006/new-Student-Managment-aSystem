import studentlogin from "../assets/student-login.png"
import { useNavigate } from "react-router-dom";
import "../css/LoginStudent.css";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function LoginStudent() {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [stdlogin, setstdlogin] = useState({
    stdrollnumber: "",
    stdname: "",
    stdpassword: ""
  });
  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;

    setstdlogin({
      ...stdlogin,
      [name]: value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/std/LoginStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stdlogin),
      });
      console.log(response);

      const responseData = await response.json();
      if (response.ok) {
        toast.success("Student Login Successfull");
        setstdlogin({ stdrollnumber: "", stdname: "", stdpassword: "" });
        storeTokenInLS(responseData.token);
        console.log("Response data from student", responseData);
        navigate('/student/studenthome');
      } else {
        console.log("There was an error in log in" + JSON.stringify(responseData))
        toast.error("Invalid Credentials");
      }
    } catch (error) {

      console.error(error);
    }
  }
  return (
    <section className="student-login">
      <div className="container grid grid-two-cols">
        <div className="student-login-img">
          <img src={studentlogin} alt="student login page" width={500} height={500} />
        </div>
        <div className="login-form">
          <h1 className="student-login-heading">Student Login</h1>
          <p className="student-login-para">Welcome, Please enter your details</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="number"
                name="stdrollnumber"
                id="stu-roll-number"
                placeholder="Enter student's Roll Number"
                onChange={handleInput}
                value={stdlogin.sturollnumber}
              />
            </div>

            <div>
              <input
                type="text"
                name="stdname"
                id="std-name"
                placeholder="Enter student's Name"
                onChange={handleInput}
                value={stdlogin.studentname}
              />
            </div>

            <div>
              <input
                type="password"
                name="stdpassword"
                id="std-password"
                placeholder="Enter student's Password"
                onChange={handleInput}
                value={stdlogin.studentpassword}
              />
            </div>
            <br />
            <button className="btn std-btn" >Login</button>
            <br />
            <button className="btn std-btn" onClick={() => navigate(-1)}>Go Back</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginStudent;



// function LoginStudent() {
//   return <>
//     <section className="student-login">
//       <div className="container grid grid-two-cols">
//         <div className="student-login-img">
//           <img src={studentlogin} alt="" />
//         </div>
//       </div>
//     </section>
//   </>
// }

// export default LoginStudent;