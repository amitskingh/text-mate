import { useNavigate } from "react-router-dom"
import groupImage from "../assets/books.png"

function Home() {
  const navigate = useNavigate()

  const handleSignUpClick = (event) => {
    event.preventDefault()
    navigate("/login")
  }

  const handleGoToBook = (event) => {
    event.preventDefault()
    navigate("/books")
  }

  return (
    <div className="container big-container">
      <div className="info-container">
        <h2>
          Welcome to <span className="home-textmate">Textmate</span>
          <br />
          <h3 className="home-textmate-bottom">Your Ultimate Note-Taking Companion</h3>
        </h2>
        <p className="display-6">Transforming the Way You Learn and Organize Information</p>
        <p>
          Get Started Today Ready to revolutionize your note-taking experience?
          Sign up now and discover how Textmate can make your learning and
          organization more efficient and enjoyable.
        </p>
        <div className="home-btn-container">
          <button onClick={handleSignUpClick} className="btn btn-primary">
            Sign Up
          </button>
          <button onClick={handleGoToBook} className="btn btn-outline-primary">
            Go To Book
          </button>
        </div>
      </div>
      <div className="home-img-container">
        <img className="home-img" src={groupImage} alt="" />
      </div>
    </div>
  )
}

export default Home
