import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "http://127.0.0.1:8000";

function Login() {
    const [userData, setUserData] = useState({
        'login_id': "",
        'password': "",
        'status': "success",
    });
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = () => {
        const userFormData = new FormData();
        userFormData.append("login_id", userData.login_id);
        userFormData.append("password", userData.password);
        console.log(userFormData);

        axios.post(baseUrl + "/api/login", userFormData).then((res) => {
            localStorage.setItem('userLoginStatus', "true");
            window.location.href = "/";
        });
    };

    const someApi = () => {
        /*
        try {
          axios.post(baseUrl, userFormData).then((response) => {
            console.log(response.data)
          });
        } catch (error) {
          console.log(error);
        }
        */
    };
    const userLoginStatus = localStorage.getItem("userLoginStatus");
    if (userLoginStatus === "true") {
        window.location.href = "/";
    }
    useEffect(() => {
        document.title = "Login";
    });
    return (
        <form className="p-4">
            {userData.status === "success" && (
                <p class="text-success">Login successful</p>
            )}
            {userData.status === "error" && (
                <p class="text-danger">Something went wrong</p>
            )}

            <div className="mb-3">
                <label for="email" className="form-label">
                    Email/Login Id
                </label>
                <input
                    onChange={handleChange}
                    value={userData.login_id}
                    name="login_id"
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                    or authenticate with your LMS instead
                </div>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">
                    Password
                </label>
                <input
                    onChange={handleChange}
                    value={userData.password}
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
                Login
            </button>
            <button
                onClick={someApi}
                type="submit"
                className="btn btn-primary mt-4 ms-4"
            >
                Login with LMS
            </button>
        </form>
    );
}
export default Login;
