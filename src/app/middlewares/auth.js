/**
 * Middle segue o padrão req res e tambem tera o next que sera usado quando a requisicao
 * precisar continuar. Se eu nao chamar o next eu retorno algum erro se eu chama-lo 
 * ele passa normal para o proximo middleware da cadeia
 * Pego o token atraves do header.
 * Depois eu desestruturo o array pegando apenas a parte do token
 * o authHeader e separado em um array de duas posicoes em espacamento como separador split
 * dentro do try catch eu verifico um o metodo verify do jwt caso de um erro ele cai no catch e 
 * retorna um status 401 com json nao autorizado.
 * O promisify e uma funcao que pega uma callback e transforma numa funcao que se pode 
 * utilizar asyn await. Estou promissificando uma callback
 * Dentro da variavel decoded vai ter os valores de payload criado la no session controller
 * caso nao consiga decodificar ele entra no catch caso consiga ele chama o next
 * toda rota que passa por esse middleware de autenticacao vai carregar o userID 
 * estou tirando do decoded e associando ao req.id assim nao preciso ficar passando 
 * em url ou em body
 */
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const authConfig = require('../../config/auth')

 module.exports = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        res.status(401).json({menssagem: "Token não informado"})
    }
    const [,token] = authHeader.split(' ')
    try {
        //Valor retornado do jwt verify
        
        const decoded = await promisify(jwt.verify)(token,authConfig.secret)
        req.userId = decoded.id
        
        console.log(req.userId);        
        return next();            
    } catch (error) {
        return res.status(401).json({error: "Token Invalido!!"})
    }
 }