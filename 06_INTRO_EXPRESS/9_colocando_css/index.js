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

app.use(express.static('public'))

const basePath = path.join(__dirname,'templates')

const userRoutes = require('./users')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
