const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

// Config JSON Response
app.use(express.json())


// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// Public folder images
app.use(express.static('public'))

// Routes

const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)



app.get('/', (req,res)=>{
    res.status(200).json({message: 'Primeira rota criada com sucesso'})
})

console.log(`Server started at ${port} port` )

app.listen(port)