/**
 * Controller de Usuario primeiramnte importamos o modelo de usuario para a controler
 * Note que exportamos uma instancia do objeto controller com module.exports = new UserController
 * As funcoes aqui declaradas(as principais de CRUD) terao um formato de middleware contendo parametros de req res
 * Os dados que de fato seram gravados no banco serao vindos do body assim para acessa-los sera com req.body
 * No metodo save eu faco a primeira verificacao se ja existe o email ou cpf na base caso exista ele retorna um erro 
 * Quando de fato eu cadastro um usuario na base seria melhor retornar para o front apenas alguns dados desse usuario cadastrado
 * portando o retorno do create apenas algumas informacoes estao vindo do retorno
 */
const User = require('../models/User')
class UserController {
    async save(req,res) {
        const emailExists = await User.findOne({where:{email: req.body.email}})
        const cpfExists = await User.findOne({where: {cpf: req.body.cpf}})        
        if(emailExists) {
            return res.status(400).json({Msg: 'E-MAIL ja cadastrado na base de dados'})
        } if(cpfExists) {
            return res.status(400).json({Msg: 'CPF  ja cadastrado na base de dados'})
        } else {
            const {id,name,email,access_level} = await User.create(req.body)
            return res.json({
                id,
                name,
                email,
                access_level})
        }
    }

}
module.exports = new UserController()