/**
 * Controller de Usuario primeiramnte importamos o modelo de usuario para a controler
 * Note que exportamos uma instancia do objeto controller com module.exports = new UserController
 * As funcoes aqui declaradas(as principais de CRUD) terao um formato de middleware contendo parametros de req res
 * Os dados que de fato seram gravados no banco serao vindos do body assim para acessa-los sera com req.body
 * No metodo save eu faco a primeira verificacao se ja existe o email ou cpf na base caso exista ele retorna um erro 
 * Quando de fato eu cadastro um usuario na base seria melhor retornar para o front apenas alguns dados desse usuario cadastrado
 * portando o retorno do create apenas algumas informacoes estao vindo do retorno
 * Validacoes feitas com YUP declaro uma variavel schema e depois digo que um objeto
 * YUP tem as seguintes caracteristicas(sahpe), apos isso verifico se esta valido o que foi passado no body
 * com o metodo isValid caso a validacao nao passe retorno um json com erro. Nas validacoes podemos utilizar
 * condicionais pois o yup permite observamos tais condicionais no metodo edit
 * No yup temos o .when() que e quando eu quero fazer um condicional em cima de qq outra variavel declarada eanteriormente
 * assim o segundo parametro e uma funcao que o primeiro parametro e a propria variavel e o segundo parametro e
 * a continuacao da validacao do proprio campo em questao
 */
const Yup = require('yup')
 const User = require('../models/User')
class UserController {

    async list(req,res) {
        const users = await User.findAll()
        
        res.status(200).json({users})
    }

    async save(req,res) {
        const schema = Yup.object().shape({
            cpf: Yup.string().required(),
            name: Yup.string().required(),
            access_level: Yup.string(),
            password: Yup.string().required().min(6)                
        })     
        
        if(!(await schema.isValid(req.body))) {
            res.status(400).json({erro: 'falha na validacao'})
        }
        
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
       const schema = Yup.object().shape({
           login: Yup.string().required(),
           name: Yup.string(),
           access_level: Yup.string(),
           oldPassword: Yup.string().min(6),  
           password: Yup.string().min(6).when('oldPassword',(oldPassword, field) => {
                oldPassword ? field.required() : field 
           })
       })     
        
       if(!(await schema.isValid(req.body))) {
           res.status(400).json({erro: 'falha na validacao'})
       }
       const {login,oldPassword} = req.body

       const user = await User.findOne({where: {cpf: req.body.login}})

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