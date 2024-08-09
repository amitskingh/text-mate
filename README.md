# TextMate
A note organization app with a great text-editor. Notes can be categorized under different sections.

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. add MONGO_URI(database connection), JWT_SECRET(key used to create the token) in .env

#### Routers

- auth.js
- book.js
- note.js