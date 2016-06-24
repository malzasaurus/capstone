'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('bug', {
        cookieEnabled: {
            type: Sequelize.BOOLEAN
        },
        plugins: {
            type: Sequelize.STRING
        },
        doNotTrack: {
            type: Sequelize.INTEGER
        },
        appVersion: {
            type: Sequelize.STRING
        },
        platform: {
            type: Sequelize.STRING
        },
        hostName: {
            type: Sequelize.STRING
        },
        pathName: {
            type: Sequelize.STRING
        },
        protocol: {
            type: Sequelize.STRING
        }
    });
};
