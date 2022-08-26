import Home from './Home'
import Login from './Login'
import Register from './Register'
import Submit from './Submit'
import Header from './Header'
import Result from './Result'
import Question from './Question'
import Test from './Test'


import { Routes, Route } from 'react-router-dom'

function Main() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/result" element={<Result />} />
                <Route path="/question" element={<Question />} />
                <Route path="/test" element={<Test />} />

            </Routes>
        </div>
    );
}

export default Main;