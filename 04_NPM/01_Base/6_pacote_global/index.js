const _ = require("lodash")

const arr = [1,2,3,3,4,5,5,6,7,8,8,9]

console.log(_.sortedUniq(arr))

// Para verificar se existem atualizações no geral: npx npm-check-updates
// Para atualizar: npm update

// Para instalar um pacote global: adicionar -g para a instalação. Ela fica instalada no "server" não na pasta de projeto.

// Para linkar uma lib global que usa os arquivos dentro do projeto, rodar npm link <pacote>