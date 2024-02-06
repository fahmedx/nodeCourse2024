const express = require("express")
const router = express.Router()
const path = require("path")

const basePath = path.join(__dirname,'../templates')

router.get('/create', (req,res) =>{
    res.sendFile(`${basePath}/noteForm.html`)
})

router.post('/save', (req,res) =>{
    console.log(req.body)

    const note = req.body.noteText

    console.log(`${note}`)

    res.sendFile(`${basePath}/noteForm.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    //leitura da tabela users e resgatar no banco
    console.log(`Buscando nota ${id}`)

    res.sendFile(`${basePath}/notes.html`)
})

module.exports = router