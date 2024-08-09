import { jwtDecode } from "jwt-decode"
import { useLocation, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const location = useLocation()
  const hideNavbarPaths = ["/", "/not-found", "/login", "/register"]

  let userName = "User"
  let isTokenExpired = true

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token")

    const response = jwtDecode(token)

    const currentTime = Date.now() / 1000

    isTokenExpired = response.exp < currentTime
    userName = response.name
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    navigate("/")
  }

  const goToBook = () => {
    navigate("/books")
  }

  return (
    <>
      {!isTokenExpired && !hideNavbarPaths.includes(location.pathname) && (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand">{userName}</span>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span
                    onClick={goToBook}
                    className="nav-link active go-to-book-btn"
                    aria-current="page"
                  >
                    Books
                  </span>
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
      )}
    </>
  )
}

export default Navbar
