const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the title name"],
  },
  content: {
    type: String,
    default: `{[
  { insert: 'Hello ' },
  { insert: 'World!', attributes: { bold: true } },
  { insert: '\n' },
]}`,
  },
  createdUnder: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
    required: [true, "Please provide book"],
  },
})

module.exports = mongoose.model("Note", noteSchema)
