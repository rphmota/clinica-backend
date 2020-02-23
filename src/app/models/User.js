/**
 * metodo init e chamado automaticamente pelo sequelize
 * super refere-se a classe pai no caso o Model eu chamo o metodo init
 * enviamos as colunas da base no metodo init, evitando as colunas de chave primaria, estrangeira
 * updated_at e created_at, o segundo parametro para o metodo init e o sequeelize e podemos
 * ter diversas configurações vide a documentação
 */
const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class User extends Model {
    static init(sequelize){
        super.init(
        {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            access_level: Sequelize.STRING(1),
            cpf: Sequelize.INTEGER,
            phone: Sequelize.INTEGER            
        },
        {
             sequelize,             
        })
    }
}

module.exports = User