import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import Assignment from './components/Assignment'
import Test from './components/Test'
import Logout from './components/Logout'


import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assignment" element={<Assignment />} />
                <Route path="/test" element={<Test />} />

            </Routes>
            <Footer />
        </div>
    );
}

export default App;