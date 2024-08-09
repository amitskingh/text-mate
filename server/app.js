const express = require("express")
const app = express()
const connectDB = require("./db/connect.js")
require("express-async-errors")
require("dotenv").config()
const cors = require("cors")
const path = require("path")

const errorHandlerMiddleware = require("./middleware/error-handler.js")
const notFoundError = require("./middleware/not-found.js")

// routes
const bookRouter = require("./route/book.js")
const noteRouter = require("./route/note.js")
const authRouter = require("./route/auth.js")
const authenticateUser = require("./middleware/authentication.js")

app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.use(express.json())
app.use(cors())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/books", authenticateUser, bookRouter)
app.use("/api/v1/books", authenticateUser, noteRouter)

app.use(notFoundError)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
