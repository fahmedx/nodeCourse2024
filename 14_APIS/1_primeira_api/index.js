const express = require('express')
const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post('/createProduct', (req,res) =>{
    const name = req.body.name
    const price = req.body.price

    console.log(name)
    console.log(price)

    res.status(201).json({message: `Produto criado com o nome ${name} e preço ${price}`})
})

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Primeira rota criada com sucesso'})
})

console.log(`Server started at ${port} port` )

app.listen(port)