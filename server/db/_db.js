var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
console.log("look at my ENV: ", env);
var db = new Sequelize(env.DATABASE_URI);

module.exports = db;
