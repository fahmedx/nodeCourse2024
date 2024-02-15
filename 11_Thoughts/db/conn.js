const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
}catch(err){
    console.log(`Não foi possível se conectar: ${err}`)
}

module.exports = sequelize