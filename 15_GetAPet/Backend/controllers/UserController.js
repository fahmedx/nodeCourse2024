const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController {
    static async register(req,res){
        /*const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const image = req.body.image
        const phone = req.body.phone */

        const { name, email, phone, password, confirmPassword } = req.body

        if(!name){
            res.status(422).json({message: 'O parâmetro nome é obrigatório.'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O parâmetro email é obrigatório.'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O parâmetro telefone é obrigatório.'})
            return
        }
        if(!password){
            res.status(422).json({message: 'Senha obrigatória.'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message: 'Confirmação de senha obrigatória.'})
            return
        }

        if (password !== confirmPassword){
            res.status(422).json({message: 'Senha e Confirmação não batem.'})
            return
        }

        //check id user exists
        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({message: 'Usuário já existe na base, por favor utilize outro e-mail.'})
            return
        }

        // Salvar User
       const salt = await bcrypt.genSalt(12)     
       const passwordHash = await bcrypt.hash(password,salt)    

       // Create User

       const user = new User({
            name:name,
            email:email,
            phone:phone,
            password:passwordHash
       })

       try {
            const newUser = await user.save()
            const token = await createUserToken(newUser,req,res)
            res.status(201).json({
                message: 'Usuário registrado com sucesso.',
                newUser,
                authToken: token
            })
       } catch (error) {
            res.status(500).json({message:error})
       }
    }

    static async login(req, res){
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: 'O parâmetro email é obrigatório.'})
            return
        }

        if(!password){
            res.status(422).json({message: 'O parâmetro senha é obrigatório.'})
            return
        }

        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Não há usuário cadastrado com esse e-mail.'})
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword){
            res.status(422).json({
                message: "Senha Invalida!"
            })
            return
        }

        try {
            const token = await createUserToken(user,req,res)
            res.status(200).json({message: "Usuário logado com sucesso.", token, user: user._id})
        } catch (error) {
            res.status(500).json({message:error})
        }
    }

    static async checkUser(req, res){
        let currentUser
      
        if (req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secretKey')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        }
        else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
}