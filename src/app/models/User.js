/**
 * metodo init e chamado automaticamente pelo sequelize
 * super refere-se a classe pai no caso o Model eu chamo o metodo init
 * enviamos as colunas da base no metodo init, evitando as colunas de chave primaria, estrangeira
 * updated_at e created_at, o segundo parametro para o metodo init e o sequeelize e podemos
 * ter diversas configurações vide a documentação
 * Os campos aqui declarados nao precisao ser um refletoda base de dados o campos password 
 * e do tipo virtual e ele nao existe  na base
 * A o hook e uma funcionalidade do seqelize que nada mais e que um trecho de codigo
 * que e executado antes de alguma acao beforeSave,beforeUpdate... 
 * O metodo checkPassword dessa classe compara atraves do bcrypt a senha do objeto instanciado com 
 * uma senha passada por parametro retorna um booleano obs: o bcrypt.compare e assincrono
 * entao atentar para seu uso a necessidade do await
 * 
 */
const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
    static init(sequelize){
        super.init(
        {
            name: Sequelize.STRING,            
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            access_level: Sequelize.STRING(1),
            cpf: Sequelize.INTEGER            
        },
        {
             sequelize,             
        })
        this.addHook('beforeSave', async (User) => {
             if(User.password) {
                 User.password_hash = await bcrypt.hash(User.password,8)
             }
        })
        return this
    }
        checkPassword(password) {
            return bcrypt.compare(password,this.password_hash)
        }
}
module.exports = User