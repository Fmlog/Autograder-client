import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "http://127.0.0.1:8000";

function Register() {
    const [userData, setUserData] = useState({
        name: "",
        login_id: "",
        password: "",
        is_lecturer: "True",
        status: "success",
    });
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = () => {
        const userFormData = new FormData();
        userFormData.append("name", userData.name);
        userFormData.append("login_id", userData.login_id);
        userFormData.append("password", userData.password);
        userFormData.append("is_lecturer", userData.is_lecturer);

        axios.post(baseUrl + "/api/register/lecturer", userFormData).then((res) => {
            localStorage.setItem('userLoginStatus', "true");
            window.location.href = "/";
        });
    };
    const userLoginStatus = localStorage.getItem("userLoginStatus");
    if (userLoginStatus === "true") {
        window.location.href = "/";
    }
    useEffect(() => {
        document.title = "Login";
    });
    return (
        <form className="container p-4">
            {userData.status === "success" && (
                <p class="text-success">Registeration successful</p>
            )}
            {userData.status === "error" && (
                <p class="text-danger">Something went wrong</p>
            )}
            <div className="mb-3">
                <label for="name" className="form-label">
                    name
                </label>
                <input
                    value={userData.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                    Full Name not required
                </div>
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">
                    Email/Login Id
                </label>
                <input
                    value={userData.login_id}
                    onChange={handleChange}
                    name="login_id"
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                    Authenticate with your LMS instead
                </div>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">
                    Password
                </label>
                <input
                    value={userData.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                />
            </div>
            <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary mt-4"
            >
                Register
            </button>
        </form>
    );
}
export default Register;
