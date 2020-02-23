module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'clinica',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}