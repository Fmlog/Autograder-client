import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";

const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("accessToken");

function Home() {
  const errRef = useRef();

  const [results, setResults] = useState("");

  const printed = JSON.stringify(results)

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);



  const [course, setCourse] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [assignment, setAssignment] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  useEffect(() => {
    axios
      .get(baseUrl + "/api/course/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourse(response.data);
      });
  }, []);

  const handleSelect = (e) => {
      axios
        .get(baseUrl + "/api/course/" + e.target.value + "/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAssignmentList(response.data);
        });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignment_id", assignment);
    try {
      const response = await axios({
        method: "post",
        url: baseUrl + "/api/course/submission",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setResults(response.data);
      const printed = JSON.stringify(response.data)
      setAssignmentList("");
      setSelectedFile(null);
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
        setErrMsg("Submission Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1 class="text-success p-4">Submission Successful! </h1>
          <br />
          {printed}
          {/*results.map((item) =>(
          <h3>
            {item.result}
          </h3>
          ))*/}
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
              {course.map((item) => (
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
              {assignmentList.map((ass) => (
                <option value={ass.id}>{ass.name}</option>
              ))}
            </select>

            <label for="formFileLg" className="form-label mt-4">
              Upload your assignment submission
            </label>
            <input
              onChange={changeHandler}
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
