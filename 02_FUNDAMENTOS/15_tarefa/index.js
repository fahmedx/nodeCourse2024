const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
    {
        name: 'nome', 
        message: 'Digite seu nome: ',
    }, 
    {
        name: 'idade', 
        message: 'Digite sua idade: ',
    },
]).then((answers) => {
    if (!answers.nome || !answers.idade){
        throw new Error('Os valores não podem ser nulos.')
    }
    console.log(chalk.black.bgYellow.bold(`${answers.nome} tem ${answers.idade} anos.`))
  }).catch(err => console.log(err))