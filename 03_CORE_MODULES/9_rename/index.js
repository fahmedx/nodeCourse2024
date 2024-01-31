const fs = require("fs")

fs.rename("arquivo.txt","file.txt",function(err){
    if(err){
        console.log(err)
        return
    }

    console.log('Arquivo Renomeado!')
})