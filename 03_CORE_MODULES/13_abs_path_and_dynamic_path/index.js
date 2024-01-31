const path = require("path")

//path absoluto
console.log(path.resolve('test.txt'))

//formar path
const midFolder = "reports"
const filename  = "test01.txt" 

const finalPath = path.join('/','files',midFolder,filename)
console.log(finalPath)