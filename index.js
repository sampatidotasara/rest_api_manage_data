const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for books
let books = [];
let nextId = 1;

// ✅ Root route (optional)
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API! Use /books to access the API.');
});

// ✅ GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// ✅ POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ PUT /books/:id - Update an existing book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// ✅ DELETE /books/:id - Remove a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  books.splice(index, 1);
  res.status(204).send(); // No content
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Book API is running at http://localhost:${port}`);
});

