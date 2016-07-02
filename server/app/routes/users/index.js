'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');
var InvitedUser = require('../../../db').model('invitedUser');
var Promise = require('bluebird');


//get all users
router.get('/', function(req, res, next) {
	User.findAll()
	.then(function(allUsers) {
		res.json(allUsers);
	})
	.catch(next);
});

//get one user
router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		res.json(foundUser);
	})
	.catch(next);
});

//add new user
router.post('/', function(req, res, next) {
	User.create(req.body) //create user
	.then(function(newUser) {
		var createdUser = newUser;
		InvitedUser.findAll({  //look for user in the invited model by email - find all in case of multiple apps
			where: { 
				email: req.body.email
			}
		})
		.then(function(appsInvitedTo){
			if(appsInvitedTo.length>0){ ///user has been invited to one or more apps
				var userEmail = req.body.email;
				var findUser = createdUser;
				Promise.each(appsInvitedTo, function(singleApp){  //then for each instance found in invite table 
					var level = singleApp.dataValues.accessLevel;
					var findApp = Application.findOne({
						where: {appId: singleApp.dataValues.appId}
					});
					Promise.all([findApp, findUser])
					.then(function(foundData){
						var foundApp =foundData[0];
						var foundUser = foundData[1];
						console.log('the found app is : ', foundApp);
						foundApp.addUser(foundUser, {accessLevel: level});
					});					
				})
				.then(function(response){//appAccess table has been updated at this point
					InvitedUser.destroy({where: {  //for all instances: remove from invited user model
						email: req.body.email
					}})
					.then(function(deletedInvites){
						res.json(createdUser);
					});
				});
			} else {  //if not in invitedUser list then just create user as usual				
					res.json(createdUser);
			}
		});
	})  //end of .then after user.create
	.catch(next);
});

//update a user
router.put('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		return foundUser.update(req.body);
	})
	.then(function(updatedUser) {
		res.json(updatedUser);
	})
	.catch(next);
});

//delete a user
router.delete('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		return foundUser.destroy();
	})
	.then(function(response) {
		res.sendStatus(204);
	})
	.catch(next);
});