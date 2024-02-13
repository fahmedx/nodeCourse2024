const express = require("express")
const exphbs = require("express-handlebars")
const pool = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine("handlebars",exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.get('/', (req, res) =>{
    res.render("home")
})

app.post('/books/insertbook', (req, res) =>{
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const query = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title','pageqty', title, pagesqty]

    pool.query(query, data, function(err){
        if(err){
            console.log(err)
        }

        res.redirect('/')
    })
})

app.get('/books', (req,res) => {
    const sql = "SELECT * FROM books"

    pool.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)

        res.render('books', { books })
    })

})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id',id]

    pool.query(query, data, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        console.log(book)

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) =>{
    const id = req.params.id

    const sql = `SELECT * FROM  books WHERE ?? = ?`
    const data = ['id',id]

    pool.query(sql, data, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        console.log(book)

        res.render('editbook', { book })
    })
})

app.post('/books/updatebook', (req,res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pagesqty
    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

    pool.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]
        console.log(book)

        res.redirect('/books')
    })

})

app.post('/books/deletebook/:id', (req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id',id]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/books')
    })

})
/*
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function(err) {
    if(err){
        console.log(err)
    }

    console.log('Conectado ao banco')
    app.listen(3000)
})
*/
app.listen(3000)