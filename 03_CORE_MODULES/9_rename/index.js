const fs = require("fs")

const arqOld = "arquivo.txt"
const arqNew = "file.txt"

fs.rename(arqOld,arqNew,function(err){
    if(err){
        console.log(err)
        return
    }

    console.log(`O arquivo ${arqOld} foi renomeado para ${arqNew}!`)
})