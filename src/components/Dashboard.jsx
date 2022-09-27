import axios from "axios";
import { useEffect, useState } from "react";

const LMSUrl = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("accessToken");

/** This component connects the allows the teacher user to
  * edit assignments in a course fetched from the autograder's server 
  */
function Dashboard() {
  const [assignmentList, setAssignmentList] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get(LMSUrl + "/course/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourse(response.data);
      });
  }, []);

  // TODO
  const handleTestcases = (e) => {};
  // TODO
  const handleConfig = (e) => {};

  /** Handles the deleting of an assignment by sending a DELETE request.
    * Called on the click of the delete button on the assignment item. 
    */
  const handleDelete = (e) => {
    axios
      .delete(LMSUrl + "/course/assignment/" + e.target.value + "/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        window.location.reload();
      });
  };
  /** Gets assignment from selected course */
  const handleSelect = (e) => {
    axios
      .get(LMSUrl + "/course/" + e.target.value + "/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAssignmentList(response.data);
      });
  };
  return (
    <div className="container p-4">
      <h1> Dashboard</h1>

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
      <ul className="list-group">
        {assignmentList.map((item) => (
          <li
            value={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div role="button" data-bs-toggle="dropdown">
              {item.name}
            </div>
            <div class="dropdown-menu p-4 text-muted">
              <p>{item.description}</p>
            </div>
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleTestcases}
              >
                Edit Testcases
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={handleConfig}
              >
                Edit Config
              </button>
              <button
                value={item.id}
                type="button"
                class="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
