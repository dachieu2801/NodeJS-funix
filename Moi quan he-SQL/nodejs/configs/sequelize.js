const Sequelize = require('sequelize');

const sequelize = new Sequelize(`lab11`, 'root', 'hieuha2801', {
    dialect: 'mysql',
    host: 'localhost',
})

module.exports = sequelize;