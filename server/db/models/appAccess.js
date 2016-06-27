'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('appAccess', {
        accessLevel: {
            type: Sequelize.STRING,
            validate: {
                isIn: [
                    ["admin", "contributor"]
                ]
            }
        }
    });
};
