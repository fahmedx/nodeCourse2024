const express = require("express")
const app = express()
const port = 3000 //variavel de ambiente

const path = require("path")


/*
const checkAuth = function(req, res, next) {
    req.authStatus = false

    if(req.authStatus){
        console.log("Login validado!")
        next()
    }else{
        console.log("Seu login não está autenticado para realizar esta operação.")
        next()
    }
}

app.use(checkAuth)
*/

//Lendo o body

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

const basePath = path.join(__dirname,'templates')

app.get('/users/create', (req,res) =>{
    res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req,res) =>{
    console.log(req.body)

    const name = req.body.name
    const age  = req.body.age

    console.log(`O nome do usuário é ${name} e ele tem ${age} anos`)

    res.sendFile(`${basePath}/userForm.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users e resgatar no banco
    console.log(`Buscando usuário ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
