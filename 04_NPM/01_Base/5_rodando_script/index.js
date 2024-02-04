const _     = require("lodash")
const chalk = require("chalk")

const a = [1, 2, 3, 4, 5]
const b = [2, 4, 6, 7, 8]

const diff = _.difference(a, b)

console.log(chalk.bgRed.bold(diff))


// Para verificar se existem atualizações no geral: npx npm-check-updates
// Para atualizar: npm update

// Para instalar um pacote global: adicionar -g para a instalação. Ela fica instalada no "server" não na pasta de projeto.