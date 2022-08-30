import Home from './Home'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Result from './Result'
import Assignment from './Assignment'
import Test from './Test'
import Logout from './Logout'


import { Routes, Route } from 'react-router-dom'

function Main() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/result" element={<Result />} />
                <Route path="/assignment" element={<Assignment />} />
                <Route path="/test" element={<Test />} />

            </Routes>
        </div>
    );
}

export default Main;