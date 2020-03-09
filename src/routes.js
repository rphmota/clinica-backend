/**
 * Primeiramente importo apenas o routes do express depois instancio um objeto do tipo Router
 * para ser utilizado no app.js (separando modulos)
 * Importo o User controller para atribuir uma rota ao metodo da controller que eu desejar
 */
const { Router } = require('express')
const UserController = require('./app/controllers/UserController')

const routes = new Router()

routes.post('/users',UserController.save)
 
module.exports = routes