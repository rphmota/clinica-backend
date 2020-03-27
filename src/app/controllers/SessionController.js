/**
 * Aqui eu crio uma sessao
 * Primeiramente eu pego o cpf e o password vindos da requisicao
 * depois verifico se existe um usuario com aquele cpf, caso nao exista interrompe
 * aexecucao e manda um Usuario nao encontrado
 * Depois verifico se as senhas conferem com o auxilio do metodo
 * checkpassword implementado na model de usuario, observe o uso do await pois
 * a implementacao na model de usuario e feita com um metodo assincrono do bcrypt
 * Caso esteja tudo certo senha e usuario match vamos retornar o usuario com 
 * seu id nome cpf e o token gerado pelo jwt o metodo sign requer o payload
 * que sera utilizado id e cpf, o secret e uma configuracao de expiracao
 * no nosso caso de 15 dias(vide o arquivo auth.js dentro de config da nossa api)
 * 
 */
const jwt = require('jsonwebtoken')
const Auth = require('../../config/auth')
const User = require('../models/User')

 class SessionController {
     async save(req,res) {
         const {cpf,password} = req.body

         const user = await User.findOne({where: {cpf: cpf}})
         if(!user) {
            return res.status(401).json({error: 'Usuario nao encontrado'})
         }
         if(!(await user.checkPassword(password))) {
            return res.status(401).json({error: 'Senha invalida'})
         }

         const {id,name} = user

         return res.status(200).json({
             user: {
             id,
             name,
             cpf
             },
             token: jwt.sign({id},Auth.secret,{
                expiresIn: Auth.expiresIn
             }),
             menssagem: "Bem vindo ao back-end"
         })

     }
 }

 module.exports = new SessionController()