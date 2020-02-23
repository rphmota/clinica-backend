/**
 * Temos uma classe inicialmente importamos o express e o arquivo de rotas
 * temos as variaveis de instancia e os metodos
 * metodo middlewares tem apenas a utilização do json para ser tratado nas requisições
 * e o metodo routes que usa as rotas importadas do arquivo de rotas como parametro na funcao use
 * do express
 */
const express = require('express')
const routes = require('./routes')

const database = require('./database/index')

class App {
    constructor() {
        this.server= express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

}

module.exports = new App().server

