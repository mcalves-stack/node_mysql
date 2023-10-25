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

// rota get
app.get("/", (req, res) => {
    res.send("home")
})

// definindo a conexão com o banco de dados
const conn = mysql.createConnection({
    host: "localhost",
    database: "nodemysql",
    port: 3306,
    user: "root",
    password: "root"
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