const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// connect to database
const ab = new sqlite3.Database('./Database/Book.sqlite');

// parse incoming request
app.use(express.json());

// create books table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

app.get('/books', (req, res) => {
    db.all('SELECT  *  FROM books WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
          if (!row) {
            res.status(404).send('Book not found');
          } else {
            res.json(row);
          }
        }
    });
});

app.post('/books', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO BOOK (title, author) VALUES (?, ?)', book.title, book.author, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

app.put('/books/:id', (req, res) => {
    const book = req.body;
    ab.run('UPDATE books SET title = ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(book);
        }
    });
});

app.delete('/book/:id', (req, res) => {
    db.run('DELETE FROM BOOKS WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));