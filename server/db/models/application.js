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
            type: Sequelize.STRING
        },
        repoId: {
            type: Sequelize.STRING
        }
    },{
        hooks: {
            afterCreate: function (application) {
                var guid = createGuid();
                return application.updateAttributes({
                    appId: guid
                })
            }
        }
    });
};


function createGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}