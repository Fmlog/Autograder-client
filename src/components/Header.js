import {Link} from 'react-router-dom';

function Header() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/login">Autograder</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
                <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                <a className="nav-link" href="#">Dashboard</a>
                <a className="nav-link" href="#">API Endpoints</a>
                <Link className="nav-link" to='/login'>Login</Link>
                <Link className="nav-link" to='/register'>Register</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;
  