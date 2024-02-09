const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboards', (req, res) => {
    const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    res.render('dashboards', { sequence })
})

app.get('/blog',(req,res) =>{
    const posts = [
        {
            title: 'C# Learnpath',
            category: 'C#',
            body: 'Loren ipsum',
            comments: 1
        },
        {
            title: 'Java Learnpath',
            category: 'Java',
            body: 'Loren ipsum',
            comments: 2
        },
        {
            title: 'Python Learnpath',
            category: 'Python',
            body: 'Loren ipsum',
            comments: 5
        },
    ]

    res.render('blog',{posts})
})

app.get('/post', (req, res) =>{
    const post = {
        title: 'Nodejs Learnpath',
        category: 'JavaScript',
        body: 'Loren ipsum',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.get('/', (req, res) => {
    const user = {
        name: "Fulano",
        surname: "de Tal",
        age: 25
    }

    const palavra = "teste"
    const auth = true
    res.render('home', { user: user, palavra, auth })
})

app.listen(3000, () => {
    console.log(`App rodando na porta 3000!`)
})