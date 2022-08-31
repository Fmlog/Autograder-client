import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="container">
          <Link className="navbar-brand" to="/login">
            Autograder
          </Link>
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
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
              <a className="nav-link" href="/#">
                Dashboard
              </a>
              <a className="nav-link" href="/#">
                API Endpoints
              </a>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Instructor
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="Teacher-login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/assignment">
                      Create Assignment
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
