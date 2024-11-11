import teacherLogin from "../assets/teacher-login-portal.png";
import { useNavigate } from "react-router-dom";
import "../css/LoginTeacher.css";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function LoginTeacher() {
  const naviagte = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [teacherlogin, setteacherlogin] = useState({
    teacheremail: "",
    teacherpassword: ""
  });
  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;

    setteacherlogin({
      ...teacherlogin,
      [name]: value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createteacher/LoginTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherlogin),
      });
      // const result = await response.json();
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Login Teacher Successfull");
        setteacherlogin({ teacheremail: "", teacherpassword: "" });
        // console.log(responseData.token);
        storeTokenInLS(responseData.token);
        console.log("response Data from Login teacher", responseData);
        naviagte('/teacher/teacherhome');
      } else {
        console.log("There was an error in log in" + JSON.stringify(responseData))
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);

    }
  }
  function handleGoBack() {
    naviagte('/ChooseUser');
  }
  return <>
    <section className="student-login">
      <div className="container grid grid-two-cols">
        <div className="student-login-img">
          <img src={teacherLogin} alt="student login page" width={500} height={500} />
        </div>
        <div className="login-form">
          <h1 className="student-login-heading">Teacher Login</h1>
          <p className="student-login-para">Welcome, Please enter your details</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="teacheremail"
                id="teacher-email"
                placeholder="Enter your email*"
                onChange={handleInput}
                value={teacherLogin.email}
              />
            </div>

            <div>
              <input
                type="password"
                name="teacherpassword"
                id="std-password"
                placeholder="Enter Password*"
                onChange={handleInput}
                value={teacherLogin.password}
              />
            </div>
            <br />
            <button className="btn std-btn" >Login</button>
            <br />
            <button className="btn std-btn" onClick={handleGoBack}>Go Back</button>
          </form>
        </div>
      </div>
    </section>
  </>
}

export default LoginTeacher