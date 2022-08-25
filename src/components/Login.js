import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'http://127.0.0.1:8000/api/login';

function Login() {
  const [userData, setUserData] = useState({
    "login_id": "",
    "password": "",
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
    userFormData.append("login_id", userData.login_id)
    userFormData.append("password", userData.password)
    console.log(userFormData)
    try {
      axios.post(baseUrl, userFormData).then((response) => {
        console.log(response.data)
      });
    } catch (error) {
      console.log(error);
    }
  }
  const someApi = () => {
    /*
    try {
      axios.post(baseUrl, userFormData).then((response) => {
        console.log(response.data)
      });
    } catch (error) {
      console.log(error);
    }
    */
  }
  return (
    <form className='p-4'>
      <div className="mb-3">
        <label for="email" className="form-label">Email/Login Id</label>
        <input onChange={handleChange} name="login_id" type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">or authenticate with your LMS instead</div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input onChange={handleChange} name="password" type="password" className="form-control" id="password" />
      </div>
      <button onClick={submitForm} type="submit" className="btn btn-primary mt-4">Login</button>
      <button onClick={someApi} type="submit" className="btn btn-primary mt-4 ms-4">Login with LMS</button>
    </form>
  )
}
export default Login;