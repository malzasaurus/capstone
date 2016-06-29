'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('invitedUser', {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        appId: {
            type: Sequelize.STRING,
            allowNull: false
        },
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