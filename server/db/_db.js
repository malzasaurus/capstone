var path = require('path');
var Sequelize = require('sequelize');
var db;
var env = require(path.join(__dirname, '../env'));
//var db = new Sequelize(env.DATABASE_URI);

if(process.env.DATABASE_URL){
 db = new Sequelize(process.env.DATABASE_URL, {
   dialect: 'postgres',
   port: 5432,
   logging: false
 });
} else {
 db = new Sequelize('grasshopperdb', '', null, {
   dialect: 'postgres',
   port: 5432,
   logging: false
 });
}

module.exports = db;
