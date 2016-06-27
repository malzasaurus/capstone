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
var Application = db.model('application');
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

var seedApplications = function () {

    var applications = [
        {
            name: 'App A',
            hostName: 'docs.sequelize.com',
            appId: '124sxq'
        },
        {
            name: 'App B',
            hostName: 'google.com',
            appId: '1248wqt'
        }
    ];

    var creatingApplications = applications.map(function (applicationObj) {
        return Application.create(applicationObj);
    });

    return Promise.all(creatingApplications);

};

var seedBugs = function () {

    var bugs = [
        {   
            appId: '124sxq',
            status: 'new',
            doNotTrack: 1,
            protocol: 'http:',
            formComments: 'the app looks funny',
            assignment: 'Nicole',
            applicationId: 1,
            hostName: 'google.com'
        },
        {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'why does not the button work',
            assignment: 'Nicole',
            applicationId: 1,
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'your page is broken',
            assignment: 'Nicole',   
            applicationId: 1,         
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'i am frustrated',
            assignment: 'Nicole',   
            applicationId: 1,         
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'the image is not loaded',
            assignment: 'Danielle',  
            applicationId: 1,          
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'this app is awesome',
            assignment: 'Danielle', 
            applicationId: 1,           
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'the logo is not showing up',
            assignment: 'Danielle',
            applicationId: 1,
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'the link is not working',
            assignment: 'Danielle', 
            applicationId: 1,           
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'i cannot submit something',
            assignment: 'Ashley',  
            applicationId: 1,          
            platform: 'MacIntel'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 5',
            assignment: 'Ashley',  
            applicationId: 1,          
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 6',
            assignment: 'Ashley',  
            applicationId: 2,          
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 7',
            assignment: 'Ashley',      
            applicationId: 2,      
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 8',
            assignment: 'Ashley',   
            applicationId: 2,         
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 9',
            assignment: 'unassigned',     
            applicationId: 2,       
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 10',
            assignment: 'unassigned',     
            applicationId: 2,       
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 11',
            assignment: 'unassigned',  
            applicationId: 2,          
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 12',
            assignment: 'unassigned', 
            applicationId: 2,           
            platform: 'MacIntel'
        },
                {
            appId: '1248wqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 13',
            assignment: 'unassigned',  
            applicationId: 2,          
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
        return seedApplications();
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
