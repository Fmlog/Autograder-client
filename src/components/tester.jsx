import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/course/";
//const baseUrl = "https://jsonplaceholder.typicode.com/posts/";
const token = localStorage.getItem("accessToken");
function Test() {
  const [test, setTest] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTest(response.data);
      });
  }, []);
  console.log(test);
  return (
    <div className="p-4">
      <ul className="list-group">
        {test.map((item) => (
          <li className="list-group-item">{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;