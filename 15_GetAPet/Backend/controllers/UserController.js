const User = require('../models/User')
const bcrypt = require('bcrypt')

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
            res.status(201).json({
                message: 'Usuário registrado com sucesso.',
                newUser
            })
       } catch (error) {
            res.status(500).json({message:error})
       }
    }
}