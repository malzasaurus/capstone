'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');
// var AppAccess = require('../../../db').model('appAccess');
var InvitedUser = require('../../../db').model('invitedUser');
var localStorage = require('localStorage');
var Client = require('github/lib/index');
var github = new Client({
    debug: true,
    headers: {
        "Accept": "application/vnd.github.the-key-preview"
    }
});
//var gmailConfig = app.getValue('env').GMAIL;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "grasshopperreporter@gmail.com",
        pass: "vEzu8_cHAbraxaz",
    }
}));

//get all applications
// router.get('/', function(req, res, next) {
// 	Application.findAll()
// 	.then(function(allApplications) {
// 		res.json(allApplications)
// 	})
// 	.catch(next)
// })

//get all applications by userId
router.get('/', function(req, res, next) {
    req.user.getApplications()
        .then(function(allApplications) {
            res.json(allApplications);
        })
        .catch(next);
});

//get one application
router.get('/:id', function(req, res, next) {
    console.log('i am in the routes');
    Application.findById(req.params.id)
        .then(function(foundApplication) {
            res.json(foundApplication);
        })
        .catch(next);
});

//get bugs for one application
router.get('/:id/bugs', function(req, res, next) {
    console.log('i am in the bugs route');
    Bug.findAll({
            where: {
                applicationId: req.params.id
            }
        })
        .then(function(foundBugs) {
            // console.log('the found bugs look like this: ', foundBugs);
            res.json(foundBugs);
        })
        .catch(next);
});

//get one bug detail for application
router.get('/:id/bugs/:bugId', function(req, res, next) {
    Bug.findById(req.params.bugId)
        .then(function(foundBug) {
            res.json(foundBug);
        })
        .catch(next);
});

//app updates one bug details
router.put('/:id/bugs/:bugId', function(req, res, next) {
    Bug.findById(req.params.bugId)
        .then(function(foundBug) {
            return foundBug.update(req.body);
        })
        .then(function(updatedBug) {
            res.json(updatedBug);
        })
        .catch(next);
});
//add new application
router.post('/', function(req, res, next) {
    //var application;
    var id = req.user.id;
    //THIS USER ID NEEDS TO COME FROM SESSION!!!
    //console.log("user", req.user.id)
    var createApp = Application.create(req.body);
    var findUser = User.findById(id);
    Promise.all([createApp, findUser])
        .then(function(values) {
            return values[0].addUser(values[1], { accessLevel: "admin" });
        })
        .then(function(newApplicationCreated) {
            res.status(201).send(newApplicationCreated);
        })
        .catch(next);
});

//get all users
router.get('/:id/users', function(req, res, next) {
    Application.findById(req.params.id)
        .then(function(foundApp) {
            foundApp.getUsers()
                .then(function(appUsers) {
                    res.json(appUsers);
                });
        })
        .catch(next);
});

//add a new user to application
// router.post('/:id/users', function(req, res, next) {
// 	var userEmail = req.body.email;
// 	var level = req.body.accessLevel;
// 	var findApp = Application.findById(req.params.id);
// 	var findUser = User.findOne({
// 		where:{
// 			email: userEmail
// 		}
// 	});
// 	Promise.all([findApp, findUser])
// 	.then(function(values){
// 		return values[0].addUser(values[1], { accessLevel: level });
// 	})
// 	.then(function(newUserAdded){
// 		res.status(201).send(newUserAdded);	
// 	})
// 	.catch(next);	
// });

//add a new user to application
router.post('/:id/users', function(req, res, next) {
    var userEmail = req.body.email;
    var level = req.body.accessLevel;
    var findApp = Application.findById(req.params.id);
    var findUser = User.findOne({ //look for user in users model by email address
        where: {
            email: userEmail
        }
    });
    Promise.all([findApp, findUser])
        .then(function(foundData) {
            var foundApp = foundData[0];
            var foundUser = foundData[1];
            if (foundUser) { //if found setApplications to the appID
                foundApp.addUser(foundUser, { accessLevel: level })
                    .then(function(updatedUser) {
                        res.status(201).send(updatedUser); //check status code
                    });
            } else { //else create new user in the invite model with the email, appID and access leve (need to add access level to invited users model)
                InvitedUser.create({
                        email: userEmail,
                        appId: foundApp.appId,
                        accessLevel: level
                    })
                    .then(function(createdUser) {
                        var mailOptions = {
                            from: '"Grasshopper Bug Reporter " <grasshopperreporter@gmail.com>', // sender address
                            to: userEmail, // list of receivers
                            subject: 'You have been invited to join an application on Grasshopper Bug Reporter', // Subject line
                            text: 'Hello! \n\nYou have been invited to join the ' + foundApp.dataValues.name + ' application dashboard as a ' + level + '.  To participate please navigate to the Grasshopper Reporter web app and sign up.'
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });
                        res.status(201).send(createdUser);
                    });
            }
        })
        .catch(next);
});

//getting the access level for a particular app for one user
router.get('/:id/user', function(req, res, next) {
    var userID = req.user.id;
    // var findApp = Application.findById(req.params.id);
    // var findUser = User.findById(userID);	
    // Promise.all([findApp, findUser])
    // .then(function(foundData){
    Application.findById(req.params.id)
        .then(function(foundApp) {
            foundApp.getUsers({ where: { id: userID } })
                .then(function(response) {
                    res.status(201).send(response);
                });
            // })
            // var foundApp =foundData[0];
            // var foundUser = foundData[1];		
        });
});

//updating the access level for a particular app for one user
router.put('/:id/users', function(req, res, next) {
    var userID = req.body.id;
    var updatedLevel = req.body.appAccess.accessLevel;
    var findApp = Application.findById(req.params.id);
    var findUser = User.findById(userID);
    Promise.all([findApp, findUser])
        .then(function(foundData) {
            var foundApp = foundData[0];
            var foundUser = foundData[1];
            foundApp.addUser(foundUser, { accessLevel: updatedLevel })
                .then(function(response) {
                    res.status(201).send(response);
                });
        });
});


//remove user from a particular applicaiton
router.delete('/:appID/users/:userID', function(req, res, next) {
    console.log('in the delete route');
    console.log('the req.body.id is: ', req.params.userID);
    var findApp = Application.findById(req.params.appID);
    var findUser = User.findById(req.params.userID);

    Promise.all([findApp, findUser])
        .then(function(foundData) {
            var foundApp = foundData[0];
            var foundUser = foundData[1];
            console.log('the app is: ', foundApp);
            console.log('the user is: ', foundUser);
            foundApp.removeUser([foundUser])
                .then(function(removedApp) {
                    console.log('the removed app is: ', removedApp);
                    if (removedApp) {
                        console.log('sending a response');
                        res.status(201).send({ message: removedApp });
                    }
                    // console.log('this is the removed app: ', removedApp);
                    // res.status(410).send(removedApp);
                });
        })
        .catch(next);
});
//update an application
router.put('/:id', function(req, res, next) {
    Application.findById(req.params.id)
        .then(function(foundApplication) {
            return foundApplication.update(req.body);
        })
        .then(function(updatedApplication) {
            res.json(updatedApplication);
        })
        .catch(next);
});


//delete an application
router.delete('/:id', function(req, res, next) {
    Application.findById(req.params.id)
        .then(function(foundApplication) {
            return foundApplication.destroy()
        })
        .then(function(response) {
            res.sendStatus(204)
        })
        .catch(next)
});

router.get('/:id/github', function(req, res, next) {
    github.authenticate({
        type: "oauth",
        token: localStorage.getItem('accessToken')
    });
    github.repos.getAll({
        visibility: 'public',
    }, function(err, response) {
        console.log(response)
        res.send(response)
    })
});

router.post('/:id/bugs/add_issue', function(req, res, next) {
    var repoName;
    var bugId = req.body.bugId

    Promise.all([Bug.findById(bugId), Application.findById(req.params.id)])
        .then(function(values) {
            var bug = values[0];
            var app = values[1];
            var description = bug.toString();
            repoName = app.repoId;
            github.authenticate({
                type: "oauth",
                token: localStorage.getItem('accessToken')
            });
            github.issues.create({
                user: req.user.name,
                repo: repoName,
                title: "new issue",
                body: description
            }, function(err, response) {
                console.log(response)
                res.send(response);
            })
        })

});
