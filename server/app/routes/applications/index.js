'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');
var AppAccess = require('../../../db').model('appAccess');
var InvitedUser = require('../../../db').model('invitedUser');

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
		var id = req.user.id;
		User.findById(id)
		.then(function(foundUser){
			return foundUser.getApplications();
		})
		.then(function(allApplications) {
			res.json(allApplications);
		})
		.catch(next);
	// }
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
		console.log('the found bugs look like this: ', foundBugs);
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
	.then(function(values){
		return values[0].addUser(values[1], { accessLevel: "admin" });
	})
	.then(function(newApplicationCreated){
		res.status(201).send(newApplicationCreated);	
	})
	.catch(next);
});


router.get('/:id/users', function(req, res, next){
	Application.findById(req.params.id)
	.then(function(foundApp){
		foundApp.getUsers()
		.then(function(appUsers){
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

router.post('/:id/users', function(req, res, next){
	var userEmail = req.body.email;
	var level = req.body.accessLevel;
	var findApp = Application.findById(req.params.id);
	var findUser = User.findOne({ //look for user in users model by email address
		where:{
			email: userEmail
		}
	});	
	Promise.all([findApp, findUser])
	.then(function(foundData){
		var foundApp =foundData[0];
		var foundUser = foundData[1];
		if(foundUser){ //if found setApplications to the appID
			foundUser.setApplications([foundApp])
			.then(function(updatedUser){
				res.status(201).send(updatedUser); //check status code
			});
		} else {  //else create new user in the invite model with the email, appID and access leve (need to add access level to invited users model)
			InvitedUser.create({
				email: userEmail,
				appId: foundApp.appId, 
				accessLevel: level
			})
			.then(function(createdUser){
				res.status(201).send(createdUser);
			});
		}
	})
	.catch(next);	
});

//updating the access leve for a particular app for one user
router.put('/:id/users', function(req, res, next){
	console.log('in the user post route');
	console.log('the app id is: ', req.params.id);
	var userID = req.body.id;
	var updatedLevel = req.body.appAccess.accessLevel;
	console.log('the user id is: ', userID);
	console.log('the user access is: ', updatedLevel);
	var findApp = Application.findById(req.params.id);
	var findUser = User.findById(userID);	
	Promise.all([findApp, findUser])
	.then(function(foundData){
		var foundApp =foundData[0];
		var foundUser = foundData[1];
		foundApp.addUser(foundUser, {accessLevel: updatedLevel})
		.then(function(response){
			res.status(201).send(response);
		});
	});
});


//remove user from a particular applicaiton
router.delete('/:appID/users/:userID', function(req, res, next){
	console.log('in the delete route');
	console.log('the req.body.id is: ', req.params.userID);
	var findApp = Application.findById(req.params.appID);
	var findUser = User.findById(req.params.userID);	

	Promise.all([findApp, findUser])
	.then(function(foundData){
		var foundApp =foundData[0];
		var foundUser = foundData[1];
		console.log('the app is: ', foundApp);
		console.log('the user is: ', foundUser);
		foundApp.removeUser([foundUser])
		.then(function(removedApp){
			console.log('the removed app is: ', removedApp);
			if(removedApp){
				console.log('sending a response');
				res.status(201).send({message: removedApp});
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
})