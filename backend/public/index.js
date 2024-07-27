const create = document.querySelector("#create-book")
const loadingDOM = document.querySelector(".loading-text")
const bookDOM = document.querySelector(".books")

const showBook = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/books")
    const books = await response.json()
    console.log(books)

    const allBooks = books
      .map((book) => {
        console.log(book.title)
        return `

        <div class="single-book">
        <a href="editor.html?${book._id}"><h2>${book.title}</h2></a>
        <button class="delete"><i class="fa-solid fa-plus"></i></button>
        </div>

        `
      })
      .join("")
    bookDOM.innerHTML = allBooks
  } catch (error) {
    console.log(error)
  }
}

create.addEventListener("click", async (e) => {
  e.preventDefault()
  try {
    const title = document.querySelector(".book-title").value
    await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    document.querySelector(".book-title").value = ""
    showBook()
    return
  } catch (error) {
    console.log(error)
  }
})

showBook()
