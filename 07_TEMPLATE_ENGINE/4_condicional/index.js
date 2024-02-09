const express = require("express")
const exphbs  = require("express-handlebars")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboards', (req, res) =>{
    res.render('dashboards')
})

app.get('/',(req,res) => {
    const user = {
        name: "Fulano",
        surname: "de Tal",
        age: 25
    }

    const palavra = "teste"
    const auth = true
    res.render('home', { user: user, palavra , auth})
})

app.listen(3000, () =>{
    console.log(`App rodando na porta 3000!`)
})