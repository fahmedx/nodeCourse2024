const express = require("express")
const app     = express()
const port    = 5000
const path    = require("path")

app.use(express.static('public'))

const basePath = path.join(__dirname,'templates')

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

const noteRoutes = require("./notes")

app.use('/notes', noteRoutes)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, ()=>{
    console.log(`Server rodando na porta ${port}`)
})

// Para instalar o nodemon apenas em ambiente dev, npm install nodemon --save-dev