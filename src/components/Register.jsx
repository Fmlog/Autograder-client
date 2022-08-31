import axios from "axios";
import { useEffect, useState, useRef } from "react";

const baseUrl = "http://127.0.0.1:8000";

function Register() {
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    login_id: "",
    password: "",
    is_lecturer: "True",
  });
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async () => {
    const userFormData = new FormData();
    userFormData.append("name", userData.name);
    userFormData.append("login_id", userData.login_id);
    userFormData.append("password", userData.password);
    userFormData.append("is_lecturer", userData.is_lecturer);
    try {
      const response = await axios.post(
        baseUrl + "/api/register/lecturer",
        userFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Fields)");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Submission Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    document.title = "Login";
  });
  return (
    <div>
      {success ? (
        <section>
          <h1 class="text-success p-4">You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to Home</a>
            {window.location.href = "/"}
          </p>
          
        </section>
      ) : (
        <form className="container p-4">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
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
      )}
    </div>
  );
}
export default Register;
