import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("accessToken");

function Home() {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setAssignment] = useState("");
  const [description, setFile] = useState("");
  const [course_id, setCourse] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const [test, setTest] = useState([]);

  const [next, setNext] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "/api/course/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTest(response.data);
      });
  }, []);

  const handleSelect = (e) => {
    setCourse(e.target.value)
      axios
        .get(baseUrl + "/api/course/" + e.target.value + "/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setNext(response.data);
        });
  }

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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token?.access_token;
      localStorage.setItem("accessToken", accessToken);
      const roles = response?.data?.roles;

      setAuth({ name: name, description: description, roles, accessToken });
      setAssignment("");
      setFile("");
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
          <p
            class="text-success"
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="container p-4">Submit your Assignment</h1>
          <form className="container p-4" onSubmit={handleSubmit}>
            <select
              onChange={handleSelect}
              name="assignment_id"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Select Course</option>
              {test.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
            <select
              onChange={(e) => setAssignment(e.target.value)}
              name="assignment_id"
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Select Assignment</option>
              {next.map((ass) => (
                <option value={ass.id}>{ass.name}</option>
              ))}
            </select>

            <label for="formFileLg" className="form-label mt-4">
              Upload your assignment submission
            </label>
            <input
              onChange={(e) => setFile(e.target.value)}
              className="form-control form-control-lg w-50 "
              id="formFileLg"
              type="file"
            />
            <button className="btn btn-primary mt-4 btn-lg">
              Submit Assignment
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default Home;
