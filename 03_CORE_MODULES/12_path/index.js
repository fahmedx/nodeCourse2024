const path = require("path")

const customPath = "/reports/falme/report01.pdf"

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))