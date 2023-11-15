const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// definindo handlebars com template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// definindo a pasta public como estática
app.use(express.static("public"))

// trabalhar com dados no formato json
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// rotas
app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, (error, data) => {
        if (error) {
          return console.log(error)
        }

        const book = data[0]

        res.render("book", {book})
        
    })
})

app.post("/register/save", (req, res) => {
    const {title, pageqty} = req.body

    const query = `
        INSERT INTO books (title, pageqty) 
        VALUES ('${title}', '${pageqty}')
    `
    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        res.redirect("/")
    })
})

// rota get
app.get("/", (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
          return console.log(error)
        }

        const books = data

        res.render("home", {books})
    })
})

// definindo a conexão com o banco de dados
const conn = mysql.createConnection({
    host: "localhost",
    database: "nodemysql",
    port: 3306,
    user: "root",
    password: "Veritas@16"
})

conn.connect((err) => {
    if (err) {
        console.log(err)
        return
    } 

    console.log("Conexão com o banco de dados realizada com sucesso")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
    
})