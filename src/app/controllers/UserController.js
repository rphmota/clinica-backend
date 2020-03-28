/**
 * Controller de Usuario primeiramnte importamos o modelo de usuario para a controler
 * Note que exportamos uma instancia do objeto controller com module.exports = new UserController
 * As funcoes aqui declaradas(as principais de CRUD) terao um formato de middleware contendo parametros de req res
 * Os dados que de fato seram gravados no banco serao vindos do body assim para acessa-los sera com req.body
 * No metodo save eu faco a primeira verificacao se ja existe o email ou cpf na base caso exista ele retorna um erro 
 * Quando de fato eu cadastro um usuario na base seria melhor retornar para o front apenas alguns dados desse usuario cadastrado
 * portando o retorno do create apenas algumas informacoes estao vindo do retorno
 */
const Yup = require('yup')
 const User = require('../models/User')
class UserController {
    async save(req,res) {        
        const cpfExists = await User.findOne({where: {cpf: req.body.cpf}})        
        if(cpfExists) {
            return res.status(400).json({Msg: 'CPF ja cadastrado na base de dados'})
        } else {
            const {name,access_level,cpf} = await User.create(req.body)
            return res.json({                
                menssagem: 'Usuario cadastrado com sucesso',
                name,
                cpf,                
                access_level})
        }
    }
    async edit(req,res) {
       const {login,oldPassword} = req.body

       const user = await User.findByPk(req.userId_token)

       if(login!=user.cpf) {
           const userExists = await User.findOne({where: {cpf: login}})
           if(userExists) {
            return   res.status(400).json({error: "Usuario ja existe"})
           }
       }
       if(oldPassword && !(await user.checkPassword(oldPassword))) {
           return   res.status(401).json({error: "Senha nao confere"}) 
       }

       const {id,name,cpf,access_level} = await user.update(req.body)

       return res.status(200).json(
            {
                menssagem: "Usuario Atualizado com sucesso",
                id,
                name,
                cpf,
                access_level
            }
            )
    }

}
module.exports = new UserController()