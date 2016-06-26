'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Application = require('./models/application')(db);
var Bug = require('./models/bug')(db);
var AppAccess = require('./models/appAccess')(db);

Application.hasMany(Bug, {as: "Bugs"});
Bug.belongsTo(Application);
User.belongsToMany(Application, {through: AppAccess});
Application.belongsToMany(User, {through: AppAccess});
