const chalk = require('chalk')
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

const nota = args["nota"]

if (nota >= 7){
    console.log(chalk.green.bold('Parabéns! Você foi aprovado!'))
} else{
    console.log(chalk.red.bold('Que pena, Você foi reprovado, será necessário realizar a recuperação'))
}