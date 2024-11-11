import loginImg from "../assets/login.png";
import "../css/LoginPageAdmin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function LoginPageAdmin() {
    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();
    const [adminlogin, setadminlogin] = useState({
        email: "",
        password: ""
    });
    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        setadminlogin({
            ...adminlogin,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/LoginPageAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adminlogin),
            });

            const responseData = await response.json();
            if (response.ok) {
                toast.success("Login Successfull");
                setadminlogin({ email: "", password: "" });
                storeTokenInLS(responseData.token);
                console.log(responseData);
                navigate("/admindash");
            } else {
                console.log("There was an error in log in" + JSON.stringify(responseData))
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            console.log(error);

        }
    }
    function handleGoBack() {
        navigate("/chooseuser");
    }
    return <>
        <section className="admin-login">
            <div className="admin-conatainer grid grid-two-cols">
                <div className="admin-login-img">
                    <img src={loginImg} alt="" width={500} height={500} />
                </div>
                <div className="adm-login-form">
                    <h1 className="admin-login-heading">Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                id="adm-email"
                                placeholder="Enter your email*"
                                onChange={handleInput}
                                value={adminlogin.email}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                id="adm-password"
                                placeholder="Password*"
                                onChange={handleInput}
                                value={adminlogin.password}
                            />
                        </div>
                        <br />
                        <button className="btn">Login</button>
                        <br />
                        <button className="btn std-btn" onClick={handleGoBack}>Go Back</button>
                    </form>
                    <p className="signup-link">Do not have an account? <a href="/AdminRegister" >Sign up</a></p>
                </div>
            </div>
        </section>
    </>
}

export default LoginPageAdmin;