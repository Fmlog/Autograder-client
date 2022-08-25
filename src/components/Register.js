import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'http://127.0.0.1:8000/register/lecturer';

function Register() {
  const [userData, setUserData] = useState({
    "name": "",
    "login_id": "",
    "password": "",
    "is_lecturer": "True",
    "status": true
  });
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  }

  const submitForm = () => {
    const userFormData = new FormData();
    userFormData.append("name", userData.name)
    userFormData.append("login_id", userData.login_id)
    userFormData.append("password", userData.password)
    userFormData.append("is_lecturer", userData.is_lecturer)
    userFormData.append("is_student", userData.is_student)
    console.log(userFormData)
    try {
      axios.post(baseUrl, userFormData).then((response) => {
        console.log(response.data)
      });
    } catch (error) {
      console.log(error);
    }
    console.log("it works")
  }
  return (
    <form className='p-4'>
      <div className="mb-3">
        <label for="name" className="form-label">name</label>
        <input onChange={handleChange} name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Full  Name not required</div>
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">Email/Login Id</label>
        <input onChange={handleChange} name="login_id" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Authenticate with your LMS instead</div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input onChange={handleChange} name="password" type="password" className="form-control" id="password" />
      </div>
      <button onClick={submitForm} type="submit" className="btn btn-primary mt-4">Register</button>
    </form>
  )
}
export default Register;