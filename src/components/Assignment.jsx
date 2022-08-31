import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("accessToken");

function Assignment() {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [course_id, setCourse] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const [test, setTest] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "/api/course/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTest(response.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseUrl + "/api/course/assignment/",
        JSON.stringify({
          name: name,
          description: description,
          course_id: course_id,
        }),
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token?.access_token;
      localStorage.setItem("accessToken", accessToken);
      const roles = response?.data?.roles;

      setAuth({ name: name, description: description, roles, accessToken });
      setName("");
      setDesc("");
      setCourse("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Fields)");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Assignment Creation Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 class="text-success p-4">Assignment Created</h1>
          <br />
          <p>{/* <a href="#">Go to Home</a> */}</p>
        </section>
      ) : (
        <section>
          <p class="text-success"
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="container p-4">Create Assignment</h1>
          <form className="container p-4" onSubmit={handleSubmit}>
            <select
              onChange={(e) => setCourse(e.target.value)}
              name="assignment_id"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Select Course</option>
              {test.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
            <label className="mt-3" htmlFor="name">
              Assignment Name:
            </label>
            <input
              type="text"
              id="name"
              ref={userRef}
              className="form-control mt-2"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <label className="mt-3" htmlFor="password">
              Assignment description:
            </label>
            <textarea
              id="password"
              className="form-control mt-2"
              onChange={(e) => setDesc(e.target.value)}
              value={description}
              required
            />
            <button className="btn btn-primary mt-4">Create Assignment</button>
          </form>
        </section>
      )}
    </>
  );
}
export default Assignment;
