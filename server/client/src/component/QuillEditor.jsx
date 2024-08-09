import React, { useEffect, useRef, useState } from "react"

import Editor from "./Editor"
import Quill from "quill"
import styles from "./QuillEditor.module.css"

import "quill/dist/quill.snow.css"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { getHeaders } from "./GetHeaders"

const Delta = Quill.import("delta")

const URL = import.meta.env.VITE_API_URL

function __Quill() {
  const [range, setRange] = useState()
  const [lastChange, setLastChange] = useState()
  const [readOnly, setReadOnly] = useState(false)

  // Use a ref to access the quill instance directly
  const quillRef = useRef()
  const req = useParams()

  const noteTitleElement = useRef()
  const warningRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const getNote = async () => {
      try {
        const headers = getHeaders()
        const { bookId, noteId } = req
        const response = await axios.get(
          `${URL}/api/v1/books/${bookId}/notes/${noteId}`,
          { headers: headers }
        )

        noteTitleElement.current.value = response.data.title
        quillRef.current.setContents(JSON.parse(response.data.content))
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login")
        } else if (error.response.status === 404) {
          navigate("/not-found")
        } else {
          // bad-request
          navigate("/")
        }
      }
    }
    getNote()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = noteTitleElement.current.value
    const content = JSON.stringify(quillRef.current.getContents())

    try {
      const headers = getHeaders()
      const { bookId, noteId } = req
      const response = await axios.patch(
        `${URL}/api/v1/books/${bookId}/notes/${noteId}`,
        { title: title, content: content },
        { headers: headers }
      )

      warningRef.current.innerText = ""

      // noteTitleElement.current.value = response.data.title
    } catch (error) {
      if (error.response.status === 400) {
        warningRef.current.innerText = "Please Provide the title"
      } else {
        navigate("/login")
      }
    }
  }

  return (
    <center className={`${styles["editor-section"]}`}>
      <div ref={warningRef} className="warning-message"></div>
      <form
        className={`${styles["editor-container"]} form-container`}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            id="title"
            ref={noteTitleElement}
            placeholder="Note Name"
          ></input>
        </div>

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <div className="controls">
          <button className="btn btn-outline-primary">Save</button>
          <label>
            Read Only:{" "}
            <input
              type="checkbox"
              value={readOnly}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
          </label>
        </div>
      </form>
    </center>
  )
}

export default __Quill
