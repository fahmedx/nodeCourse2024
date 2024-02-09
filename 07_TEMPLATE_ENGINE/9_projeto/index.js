const express = require("express")
const exphbs  = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const products = [
    {
        index: 1,
        name:  "Prod1",
        price: 5,
        cat:   "Cat1"
    },
    {
        index: 2,
        name:  "Prod2",
        price: 10,
        cat:   "Cat2"
    },
    {
        index: 3,
        name:  "Prod3",
        price: 15,
        cat:   "Cat3"
    },
]

app.get('/:id', (req,res) =>{
    const product = products[parseInt(req.params.id) - 1]
    res.render('details', {product})
})


app.get('/', (req,res) =>{
    res.render('home', {products})
})

app.listen(3000, () =>{
    console.log('Aplicação rodando na porta 3000')
})