const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/mongoose')
    console.log('Conectou ao mongoDB via Mongoose!')
}

main().exports = mongoose