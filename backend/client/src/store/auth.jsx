import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [notice, setNotice] = useState([]);
    const [classes, setClasses] = useState([]);
    const [student, setStudent] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [subject, setSubject] = useState([]);
    const [marks, setMarks] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState();
    const [loggedInStd, setLoggedInStd] = useState();
    // const [loggedInprof, setLoggedInprof] = useState();
    const [countStd, setCountStd] = useState();

    //Store token for login and register
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    //check if user is logged in or not 
    const isLoggedIn = !!token;
    console.log("Token:", token);
    console.log("isLogged:", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    };

    //Display the notices on Show notices
    const getNotices = async () => {
        try {
            const response = await fetch("/api/data/shownotice", {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data.msg);
                setNotice(data.msg);
            }
        } catch (error) {
            console.log(`Notices ${error}`);
        }
    };

    //Display all the subjects
    const getAllSubjects = async () => {
        try {
            const response = await fetch("/api/subject/showsubject", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setSubject(data.msg);
            }
        } catch (error) {
            console.log(`Subject ${error}`);

        }
    }

    //display all the class present
    const getClass = async () => {
        try {
            const response = await fetch("/api/dispclass/showclass", {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setClasses(data.msg);
            }
        } catch (error) {
            console.log(`Class ${error}`);

        }
    }

    // const addNotice = (newNotice) => {
    //     setNotice((prevNotices) => [...prevNotices, newNotice]);
    // };

    //Display all the students
    const getStudent = async () => {
        try {
            const response = await fetch("/api/std/dispstudent", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Student data", data.msg);
                setStudent(data.msg);

            }
        } catch (error) {
            console.log(`student ${error}`);
        }
    };

    //Display Teacher data
    const getTeacher = async () => {
        try {
            const response = await fetch("/api/createteacher/dispteacher", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setTeacher(data.msg);
            }
        } catch (error) {
            console.log(`teacher ${error}`);
        }
    };
    //Display all marks
    const getAllMarks = async () => {
        try {
            const response = await fetch("/api/marks/dispmarks", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setMarks(data.msg);
            }
        } catch (error) {
            console.log(`Marks ${error}`);

        }
    };

    // JWT Authentication to get the user data currently loggedIn
    const userAuthentication = async () => {
        try {
            const response = await fetch("/api/auth/logindata", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setLoggedInUser(data.msg);
                console.log("This logged in user data from auth.jsx", data.msg);

            }
        } catch (error) {
            console.log("Error fetching Logged in user Data", error);

        }
    };

    const studentAuth = async () => {
        try {
            const response = await fetch("/api/std/authstudent", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setLoggedInStd(data.msg);
                console.log("This logged in student data from", data.msg);

            }
        } catch (error) {
            console.log("Error fetching Logged in user Data", error);

        }
    };
    // const teacherAuth = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3500/api/createteacher/authteacher", {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setLoggedInprof(data.msg);
    //             console.log("This logged in teacher data from", data.msg);

    //         }
    //     } catch (error) {
    //         console.log("Error fetching Logged in user Data", error);

    //     }
    // };

    const numberStudent = async () => {
        try {
            const response = await fetch("/api/std/countstudent", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setCountStd(data.msg);
                console.log('count from auth', data.msg);
            }
        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        getNotices();
        getClass();
        getStudent();
        getTeacher();
        getAllSubjects();
        getAllMarks();
        userAuthentication();
        studentAuth();
        // teacherAuth();
        numberStudent();
    }, []);
    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, user, notice, classes, student, teacher, subject, marks, loggedInUser, loggedInStd, countStd, setClasses, setNotice, setStudent, setTeacher, setSubject }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
