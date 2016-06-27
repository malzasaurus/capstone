'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db) {

    return db.define('bug', {
        appId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            validate: {
                isIn: [
                    ["new", "in-progress", "resolved"]
                ]
            },
            defaultValue: "new"
        },
        priority: {
            type: Sequelize.STRING,
            validate: {
                isIn: [
                    ["blocker", "critical", "major", "minor", "trivial"]
                ]
            }
        },
        assignment: {
            type: Sequelize.STRING,
            defaultValue: "unassigned"
        },
        devComments: {
            type: Sequelize.TEXT
        },
        browser: {
            type: Sequelize.STRING
        },
        browserVer: {
            type: Sequelize.STRING
        },
        cookieEnabled: {
            type: Sequelize.BOOLEAN
        },
        // would like to include extensions array (i.e. ad blockers)
        // plugins: {
        //     type: Sequelize.STRING
        // },
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
        },
        comments: {
            type: Sequelize.TEXT
        }
    });
};
