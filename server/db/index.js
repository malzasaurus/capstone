'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Company = require('./models/company')(db);
var Bug = require('./models/bug')(db);

Company.hasMany(Bug, {as: "Bugs"})
User.belongsTo(Company)