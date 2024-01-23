const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
    {
        name: 'p1', 
        message: 'Nota 1? ',
    }, 
    {
        name: 'p2', 
        message: 'Nota 2? ',
    },
]).then((answers) => {
    console.log(answers)
    const media = (((parseInt(answers.p1)+ parseInt(answers.p2))/ 2))

    if (media >= 7){
        console.log(chalk.green.bold(`Parabéns! Você foi aprovado! Media: ${media}`))
    } else{
        console.log(chalk.red.bold(`Que pena, Você foi reprovado, será necessário realizar a recuperação. Média: ${media}`))
    }

  }).catch(err => console.log(err))