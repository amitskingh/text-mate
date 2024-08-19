import { Link } from "react-router-dom"

function Navbar() {
  const handleLogout = (event) => {
    event.preventDefault()
  }

  return (
    <>
      (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Random-User</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/books"
                  className="nav-link active go-to-book-btn"
                  aria-current="page"
                >
                  Books
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <button
                onClick={handleLogout}
                className="btn btn-primary"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      )
    </>
  )
}

export default Navbar
