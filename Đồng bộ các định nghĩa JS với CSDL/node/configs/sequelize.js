const Sequelize = require('sequelize');

const sequelize = new Sequelize(`node-complete`, 'root', 'hieuha2801', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize;