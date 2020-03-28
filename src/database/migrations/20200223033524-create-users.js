/**
 * Arquivos d migrations consistem em criações 
 * de tabelas no banco de dados o metodo up cria
 * a tabela e o metodo down faz o rollback
 * O comando para rodar a migrate e yarn sequelize db:migrate
 * caso eu queira desfazer a migration eu rodo yarn sequelize db:migrate:undo
 * db:migrate:undo:all desfaz tudo
 */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access_level: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'C'
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      } 
    });
    
  },

  down: (queryInterface, Sequelize) => {    
    return queryInterface.dropTable('users');    
  }
};
