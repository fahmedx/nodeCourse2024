const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('nodemysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos ao MySQL!')
}catch(error){
    console.log(`Não foi possível se conectar: ${error}`)
}

exports.default = sequelize