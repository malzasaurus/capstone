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
var AppAccess = db.model('appAccess');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            name: 'Test Name',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            name: 'Barack Obama',
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            name: 'Danielle Sheehan', 
            email: 'danielle@gmail.com',
            password: 'sheehan'
        },
        {
            name: 'Nichole Bates',
            email: 'nichole@gmail.com',
            password: 'bates'
        },
        {
            name: 'Ashley Hartt',
            email: 'ashley@gmail.com',
            password: 'hartt'
        },
        {
            name:'Mallory Payne',
            email: 'mallory@gmail.com',
            password: 'payne'
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
        },
        {
            name: 'App C',
            hostName: 'amazon.com',
            appId: '1248tqt'
        },
        {
            name:  'App D',
            hostName: 'cuteoverload.com',
            appId: '6789tyu'
        },
        {
            name: 'App E',
            hostName: 'facebook.com',
            appId: '3456jkl'
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
            hostName: 'google.com', 
            browser: 'Chrome',
            priority: "blocker",
            browserVer: '50',
            difficulty: 1,
            pathName: '/home',
            createdAt: '2016-06-25 07:09:14.53-04'
        },
        {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'why does not the button work',
            assignment: 'Nicole',
            applicationId: 1,
            platform: 'MacIntel',
            browser: 'Chrome',
            priority: "blocker",
            browserVer: '50',
            difficulty: 2,
            pathName: '/home',
            createdAt: '2016-06-30 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'your page is broken',
            assignment: 'Nicole',   
            applicationId: 1,         
            platform: 'MacIntel',
            browser: 'Chrome',
            priority: "critical",
            browserVer: '40',
            difficulty: 3,
            pathName: '/home',
            createdAt: '2016-06-30 07:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'i am frustrated',
            assignment: 'Nicole',   
            applicationId: 1,         
            platform: 'MacIntel',
            browser:'Safari',
            priority: "major",
            browserVer: '99',
            difficulty: 4,
            pathName: '/home',
            createdAt: '2016-06-29 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'the image is not loaded',
            assignment: 'Danielle',  
            applicationId: 1,          
            platform: 'MacIntel',
            browser:'Safari',
            priority: "trivial",
            browserVer: '98',
            difficulty: 5,
            pathName: '/home',
            createdAt: '2016-06-19 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'this app is awesome',
            assignment: 'Danielle', 
            applicationId: 1,           
            platform: 'MacIntel',
            browser:'Safari',
            priority: "trivial",
            browserVer: '97',
            difficulty: 1,
            pathName: '/about',
            createdAt: '2016-06-25 18:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'the logo is not showing up',
            assignment: 'Danielle',
            applicationId: 1,
            platform: 'MacIntel',
            browser: 'Internet Explorer',
            priority: "critical",
            browserVer: '75',
            difficulty: 1, 
            pathName: '/about',
            createdAt: '2016-06-27 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'the link is not working',
            assignment: 'Danielle', 
            applicationId: 1,           
            platform: 'MacIntel',
            browser:'Internet Explorer',
            priority: "critical",
            browserVer:'75',
            difficulty: 2,
            pathName: '/documentation',
            createdAt: '2016-06-22 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'i cannot submit something',
            assignment: 'Ashley',  
            applicationId: 1,          
            platform: 'MacIntel',
            browser:'Internet Explorer',
            priority: "critical",
            browserVer:'75',
            difficulty: 3, 
            pathName: '/documentation',
            createdAt: '2016-06-23 13:09:14.53-04'
        },
                {
            appId: '124sxq',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 5',
            assignment: 'Ashley',  
            applicationId: 1,          
            platform: 'MacIntel',
            browser: 'Opera',
            priority: "major",
            browserVer: '6',
            difficulty: 4,
            pathName: '/documentation',
            createdAt: '2016-06-29 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 6',
            assignment: 'Ashley',  
            applicationId: 2,          
            platform: 'MacIntel',
            browser:'Chrome',
            priority: "blocker",
            browserVer: '50',
            difficulty: 1,
            pathName: '/home',
            createdAt: '2016-06-25 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 7',
            assignment: 'Ashley',      
            applicationId: 2,      
            platform: 'MacIntel',
            browser:'Chrome',
            priority: "major",
            browserVer: '55',
            difficulty: 1, 
            pathName: '/home',
            createdAt: '2016-06-30 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            status: 'resolved',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 8',
            assignment: 'Ashley',   
            applicationId: 2,         
            platform: 'MacIntel',
            browser:'Safari',
            priority: "major",
            browserVer: '99',
            difficulty: 1, 
            pathName: '/home',
            createdAt: '2016-06-27 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 9',
            assignment: 'unassigned',     
            applicationId: 2,       
            platform: 'MacIntel',
            browser:'Safari',
            priority: "major",
            browserVer: '99',
            difficulty: 5, 
            pathName: '/help',
            createdAt: '2016-06-27 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 10',
            assignment: 'unassigned',     
            applicationId: 2,       
            platform: 'MacIntel',
            browser:'Internet Explorer',
            priority: "trivial",
            browserVer: '75',
            difficulty: 5,
            pathName: '/help',
            createdAt: '2016-06-24 13:09:14.53-04'
        },
                {
            appId: '1248tqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 11',
            assignment: 'unassigned',  
            applicationId: 3,          
            platform: 'MacIntel',
            browser:'Chrome',
            priority: "blocker",
            browserVer: '50',
            difficulty: 1, 
            pathName: '/home',
            createdAt: '2016-06-25 13:09:14.53-04'
        },
                {
            appId: '1248tqt',
            status: 'in-progress',
            doNotTrack: 1,
            protocol: 'https',
            formComments: 'comment 12',
            assignment: 'unassigned', 
            applicationId: 3,           
            platform: 'MacIntel',
            browser:'Chrome',
            priority: "major",
            browserVer:'55',
            difficulty: 2,
            pathName: '/about',
            createdAt: '2016-06-30 13:09:14.53-04'
        },
                {
            appId: '1248wqt',
            doNotTrack: 1,
            status: 'new',
            protocol: 'https',
            formComments: 'comment 13',
            assignment: 'unassigned',  
            applicationId: 3,          
            platform: 'MacIntel',
            browser: 'Safari',
            priority: "trivial",
            browserVer: '98',
            difficulty: 3,
            pathName: '/documentation',
            createdAt: '2016-06-20 13:09:14.53-04'
        }
    ];

    var creatingBugs = bugs.map(function (bugObj) {
        return Bug.create(bugObj);
    });

    return Promise.all(creatingBugs);

};

var seedAppsUsers = function(){
    appsAndUsers = [
        {
            accessLevel: 'admin',
            userId: 1,
            applicationId: 1
        },
              {
            accessLevel: 'admin',
            userId: 1,
            applicationId: 2
        },
              {
            accessLevel: 'contributor',
            userId: 1,
            applicationId: 3
        },
        {
            accessLevel: 'admin',
            userId: 2,
            applicationId: 2
        },
        {
            accessLevel: 'admin',
            userId: 2,
            applicationId: 3
        },  
        {
            accessLevel: 'contributor',
            userId: 2,
            applicationId: 4
        },
        {
            accessLevel: 'contributor',
            userId: 3,
            applicationId: 3
        },
        {
            accessLevel: 'admin',
            userId: 3,
            applicationId: 4
        },
        {
            accessLevel: 'admin',
            userId: 3,
            applicationId: 5
        },      
        {
            accessLevel: 'admin',
            userId: 4,
            applicationId: 1
        },      {
            accessLevel: 'contributor',
            userId: 4,
            applicationId: 2
        },      {
            accessLevel: 'admin',
            userId: 5,
            applicationId: 2
        },      {
            accessLevel: 'admin',
            userId: 5,
            applicationId: 3
        },      {
            accessLevel: 'admin',
            userId: 6,
            applicationId: 4
        },      {
            accessLevel: 'contributor',
            userId: 6,
            applicationId: 5
        }        
    ];
        var creatingAppUsers = appsAndUsers.map(function (appsUsersObj) {
        return AppAccess.create(appsUsersObj);
    });

    return Promise.all(creatingAppUsers);

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
    .then(function() {
        return seedAppsUsers();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
