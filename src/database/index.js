/**
 * Aqui eu faço a conexao com o banco de dados e carrego todos os meus models
 * o metodo init faz a conexao com o banco e carrega os models
 * this.connection = new Sequelize eu passo a configuração de banco que eu criei no
 * modulo /config/database.js
 * a variavel this.connection e a variavel esperada dentro do nosso model no metodo init
 * tenho o array de models que será percorrido usando map e em cada um deles vao ser
 * passados a conexao de banco para os mesmos
 * 
 */
const Sequelize = require('sequelize')
const User = require('../app/models/User')
const databaseConfig = require('../config/database')
const models = [User]

class Database {
    constructor() {
        this.init()
    } 

    init() {
        this.connection = new Sequelize(databaseConfig)
        models.map(model => model.init(this.connection))

    }

}

module.exports = new Database()