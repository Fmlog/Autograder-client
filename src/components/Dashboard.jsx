import axios from "axios";
import { useRef, useEffect, useState } from "react";

const baseUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("accessToken");

function Dashboard() {
  const [assignmentList, setAssignmentList] = useState([]);
  const [course, setCourse] = useState([]);

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
  };
  return (
    <div className="container p-4">
      <h1> Dashboard</h1>
      <ul className="list-group">
        <select
          onChange={handleSelect}
          name="assignment_id"
          class="form -select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option selected>Select Course</option>
          {course.map((item) => (
            <option value={item.id}>
              [{item.course_code}] {item.name}
            </option>
          ))}
        </select>
        {assignmentList.map((item) => (
          <li className="list-group-item d-flex justify-content-between">
            <div role="button" data-bs-toggle="dropdown">
              {item.name}
            </div>
            <div class="dropdown-menu p-4 text-muted">
              <p>
              {item.description}
              </p>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button type="button" class="btn btn-warning ">
                Edit Testcases
              </button>
              <button type="button" class="btn btn-danger">
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
