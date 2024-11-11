import registerImg from "../assets/register.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";
import "../css/AdminRegister.css";
import { toast } from "react-toastify";

function AdminRegister() {
    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();
    const [registeradmin, setregisteradmin] = useState({
        adminname: "",
        schoolname: "",
        adminemail: "",
        adminpassword: ""
    });
    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;

        setregisteradmin({
            ...registeradmin,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/AdminRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registeradmin),
            });
            console.log(response);

            if (response.ok) {
                const responseData = await response.json();
                setregisteradmin({ adminname: "", schoolname: "", adminemail: "", adminpassword: "" });
                storeTokenInLS(responseData.token);
                toast.success("Registration Successfull, Welcome to the Admin DashBoard");
                console.log(responseData);
                navigate("/AdminDash");
            } else {
                toast.error("Invalid Details");
            }
        } catch (error) {
            console.log("Register", error);

        }
    }
    return <>
        <section className="section-register">
            <div className="container grid grid-two-cols" >
                <div className="register-img">
                    <img src={registerImg} alt="" width={500} height={500} />
                </div>
                <div className="register-form">
                    <h1 className="admin-heading">Admin Register</h1>
                    <p className="admin-para">Create your own school by registering as an admin.
                        You will be able to add students and faculty and manage the system.</p>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="adminname" id="admin-name" placeholder="Enter your name* " autoComplete="off" onChange={handleInput} />
                        </div>

                        <div>
                            <input type="text" name="schoolname" id="schoolname" placeholder="Create your School Name* " autoComplete="off" onChange={handleInput} />
                        </div>

                        <div>
                            <input type="email" name="adminemail" id="admin-email" placeholder="Enter your email* " autoComplete="off" onChange={handleInput} />
                        </div>

                        <div>
                            <input type="password" name="adminpassword" id="admin-password" placeholder="Password* " autoComplete="off" onChange={handleInput} />
                        </div>
                        <button className="btn" >Register</button>
                    </form>
                </div>

            </div>
        </section>
    </>
}

export default AdminRegister;