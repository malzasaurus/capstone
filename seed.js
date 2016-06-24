/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Company = db.model('company');
var Bug = db.model('bug');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedCompanies = function () {

    var companies = [
        {
            name: 'Company A',
            hostName: 'docs.sequelize.com'
        },
        {
            name: 'Company B',
            hostName: 'google.com'
        }
    ];

    var creatingCompanies = companies.map(function (companyObj) {
        return Company.create(companyObj);
    });

    return Promise.all(creatingCompanies);

};

var seedBugs = function () {

    var bugs = [
        {
            doNotTrack: 1,
            protocol: 'http:',
            hostName: 'google.com'
        },
        {
            doNotTrack: 1,
            protocol: 'https',
            platform: 'MacIntel'
        }
    ];

    var creatingBugs = bugs.map(function (bugObj) {
        return Bug.create(bugObj);
    });

    return Promise.all(creatingBugs);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function() {
        return seedCompanies();
    })
    .then(function() {
        return seedBugs();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
