import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function Register() {
    const [cookies, setCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.user) {
            navigate("/");
        }
    }, [cookies, navigate]);

    const [values, setValues] = useState({ email: "", password: "" });
    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:8012/register",
                {
                    ...values
                },
                { withCredentials: false }
            );
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    setCookie("user", data.user);
                    navigate("/");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account ?<Link to="/login"> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Register;