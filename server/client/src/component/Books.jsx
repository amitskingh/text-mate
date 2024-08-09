// Books.js
import { useEffect, useState } from "react"
import BookInput from "./BookInput"
import BookItem from "./BookItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { getHeaders } from "./GetHeaders"

const URL = process.env.API_URL

function Books() {
  const navigate = useNavigate()
  let [bookList, setBookList] = useState([])

  const getAllBooks = async () => {
    const headers = getHeaders()
    try {
      const response = await axios.get(`${URL}/api/v1/books`, {
        headers: headers,
      })
      const totalBook = response.data
      const newBookList = totalBook.map((item) => ({
        bookId: item._id,
        bookName: item.subject,
      }))
      setBookList(newBookList)
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      }
    }
  }

  useEffect(() => {
    getAllBooks()
  }, []) // Empty dependency array ensures this effect runs once on component mount

  const handleDeleteButton = async (event, bookId) => {
    event.preventDefault()
    try {
      const headers = getHeaders()
      const response = await axios.delete(`${URL}/api/v1/books/${bookId}`, {
        headers: headers,
      })
      const newBookList = bookList.filter(
        (item) => item.bookId !== response.data._id
      )
      setBookList(newBookList)
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      }
    }
  }

  return (
    <>
      <center className="book-section container">
        <BookInput getAllBooks={getAllBooks}></BookInput>
        <div></div>
        <div className="book-list">
          {bookList.map((item) => (
            <BookItem
              handleDeleteButton={handleDeleteButton}
              key={item.bookId}
              bookId={item.bookId}
              bookName={item.bookName}
            ></BookItem>
          ))}
        </div>
      </center>
    </>
  )
}

export default Books
