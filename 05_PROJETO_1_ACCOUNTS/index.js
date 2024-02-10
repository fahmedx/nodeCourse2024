const inquirer = require("inquirer")
const chalk = require("chalk")
const fs = require("fs")

operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],
    },
    ])
        .then((answer) => {
            const action = answer['action']
            if (action == 'Criar Conta') {
                createAccount()
            }else if (action == 'Consultar Saldo'){
                getAccountBalance()
            }else if (action == 'Depositar'){
                deposit()
            }
            else if (action == 'Sacar'){
                takeOut()
            }
            else if (action == 'Sair'){
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!!'))
                process.exit()
            }
            
        })
        .catch((err) => console.log(err))
}


function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir:'))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome de sua conta:'
        },
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Essa conta já existe!! Tente outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) { console.log(err) })

        console.log(chalk.green('Obrigado por escolher nosso banco!'))

        operation()
    })
        .catch((err) => console.log(err))
}

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome de sua conta:'
        },
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if (!checkAccounnt(accountName)) {
            return deposit()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Digite a quantidade que deseja depositar:'
        }]).then((answer) =>{
            const amount = answer['amount']
            addAmount(accountName,amount)            
        })
        .catch((err) => console.log(err))
    })
        .catch((err) => console.log(err))
}

function takeOut(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome de sua conta:'
        },
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if (!checkAccounnt(accountName)) {
            return takeOut()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Digite a quantidade que deseja sacar:'
        }]).then((answer) =>{
            const amount = answer['amount']
            subtractAmount(accountName,amount)            
        })
        .catch((err) => console.log(err))
    })
        .catch((err) => console.log(err))
}

function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome de sua conta:'
        },
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)
        if(!checkAccounnt(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgGreen.black(`O saldo atual de sua conta é de R$${accountData.balance}`))

        operation()
    })
    .catch((err) => console.log(err))
}

function checkAccounnt(accountName){
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Essa conta não existe!! Tente novamente!'))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        },
    )
    console.log(chalk.bgGreen.black(`Depósito de R$${amount} realizado com sucesso, seu novo saldo é de: R$${accountData.balance}`))
    operation()
}

function subtractAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return takeOut()
    }
    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor Indisponível!'))
        return takeOut()
    }        
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount) 
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.log(err)
        },
    )
    console.log(chalk.bgGreen.black(`Saque de R$${amount} realizado com sucesso, seu novo saldo é de: R$${accountData.balance}`))
    operation()   
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}