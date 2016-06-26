'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('application', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hostName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        appId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
