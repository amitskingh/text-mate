import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Notes from "./component/Notes"
import Form from "./component/Form"
import Books from "./component/Books"
import Navbar from "./component/Navbar"
import QuillEditor from "./component/QuillEditor"
import Home from "./component/Home"
import NotFound from "./component/NotFound"

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Form />
      <Books />
      <Notes />
      <QuillEditor />
      <NotFound />
    </>
  )
}

export default App

/* <Router>
  <Navbar></Navbar>
  <Routes>
    <Route
      exact
      path="/not-found"
      element={<NotFound></NotFound>}
    ></Route>
    <Route exact path="/" element={<Home></Home>}></Route>
    <Route exact path="/login" element={<Form />}></Route>
    <Route exact path="/register" element={<Form />}></Route>

    <Route element={<PrivateRoutes />}>
      <Route exact path="/books" element={<Books />}></Route>
      <Route path="/books/:bookId/notes" element={<Notes />} />
      <Route
        path="/books/:bookId/notes/:noteId"
        element={<QuillEditor></QuillEditor>}
      ></Route>
    </Route>
  </Routes>
</Router> */
