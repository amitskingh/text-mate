const connectDB = require("./db/connect")
require("dotenv").config()
const schema = require("./model/Note")
// const schema = require("./model/User")
// const schema = require("./model/Book")

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await schema.deleteMany()
    console.log("Successfull!")
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
