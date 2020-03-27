/**
 * Primeiramente importo apenas o routes do express depois instancio um objeto do tipo Router
 * para ser utilizado no app.js (separando modulos)
 * Importo o User controller para atribuir uma rota ao metodo da controller que eu desejar
 * posso fazer uma tatica colocando routes.use(AuthMiddleware) e depois as rotas que eu quero proteger
 */
const { Router } = require('express')
const AuthMiddleware = require('./app/middlewares/auth')
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const routes = new Router()

routes.post('/users',UserController.save)

routes.post('/sigin',SessionController.save)
routes.put('/users',AuthMiddleware,UserController.edit)
 
module.exports = routes