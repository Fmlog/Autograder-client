import axios from "axios";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";

const graderUrl = "http://127.0.0.1:8000/api";
const LMSUrl = "http://127.0.0.1:7000/api";
const token = localStorage.getItem("accessToken");

/** This component renders the submission page.
  * The submission information is fetched from autograder's server.
  * On successful grading the submission grade is sent to the LMS's server
  */
function Home() {
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [course, setCourse] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState({});
  const [results, setResults] = useState({});



  /** Populates the DOM with courses on load */
  useEffect(() => {
    axios
      .get(graderUrl + "/course/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourse(response.data);
      });
  }, []);

  /** Stores submission file from input*/
  const handleUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  /** Gets assignment from selected course */
  const handleSelect = (e) => {
    axios
      .get(graderUrl + "/course/" + e.target.value + "/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAssignmentList(response.data);
      });
  };

  /** Post submission request to the autograder.
    * Then Post the response (grade) to the sublogger i.e. LMS 
    */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignment_id", assignment);
    try {
      //Request to autograder
      const response = await axios({
        method: "post",
        url: graderUrl + "/course/submission",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setResults(response.data.result);
      setResponse(response.data)
      setAssignmentList([]);
      setSelectedFile(null);
      setCourse([]);
      setSuccess(true);

      // Submission grade
      const subData = new FormData();
      subData.append("assignment_id", assignment);
      subData.append("user_id", response.data.user_id);
      subData.append("posted_grade", response.data.grade);
      subData.append("comment", JSON.stringify(response.data.result));
      console.log(results.user_id);
      try {
        //Request to LMS (sublogger)
        const second = await axios({
          method: "post",
          url: LMSUrl + "/sublogger/",
          data: subData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(second);
      } catch (err) {
        console.log(err);
      }
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
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      {success ? (
        <section className="container mt-4 p-4">
          <h1 class="text-success">Submission Successful! </h1>
          <br />
          <h3>Grade: {response.grade}</h3>
          <ul className="list-group">
            {results.map((result) => (
              <li className="list-group-item">
                <div><strong>Testcase:</strong> {result.name}</div>
                <div><strong>Weight:</strong> {result.weight}</div>
                <div><strong>Grade:</strong> {result.grade}</div>
                <div><strong>Message:</strong> <pre>{result.message}</pre></div>
                <div><strong>Extra outputs:</strong> {}</div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={refreshPage}
            className="btn btn-primary btn-lg mt-4"
          >
            Submit again
          </button>
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
                <option value={item.id}>
                  [{item.course_code}] {item.name}
                </option>
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
              onChange={handleUpload}
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
