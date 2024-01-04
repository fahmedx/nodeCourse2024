const fs = require("fs") //Importa file System

fs.readFile("file.txt","UTF-8", (err, data) => {
    if (err){
        console.log(err);
    } else {
        console.log(data);
    }
  });