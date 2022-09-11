import axios from "../api/axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const baseUrl = "http://127.0.0.1:8000/api/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [login_id, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [login_id, password]);
  const { setAuth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseUrl,
        JSON.stringify({ login_id: login_id, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token?.access_token;
      localStorage.setItem('accessToken', accessToken);
      const roles = response?.data?.roles;
      setAuth({ login_id: login_id, password: password, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1 class="text-success p-4">You are logged in!</h1>
          <br />
          <p>{/* <a href="#">Go to Home</a> */}</p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="container p-4" >Log In</h1>
          <form className="container p-4" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              className="form-control"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={login_id}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
            />
            <button className="btn btn-primary mt-4" >Sign In</button>
          </form>
          <p className="container p-4">
            Need an Account?
            <br />
            <span className="line">
              <a href="/#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
export default Login;