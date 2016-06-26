'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');
var AppAccess = require('../../../db').model('appAccess');

//get all applications
router.get('/', function(req, res, next) {
	Application.findAll()
	.then(function(allApplications) {
		res.json(allApplications)
	})
	.catch(next)
})

//get all applications by userId
router.get('/', function(req, res, next) {
		//check is user is logged in. if so use req.userID
	if(!req.session.userId){
		res.sendStatus(400);
		return;
	} else {
		User.findById(req.session.userId)
		.then(function(foundUser){
			return foundUser.getApplications()
		})
		.then(function(allApplications) {
			res.json(allApplications)
		})
		.catch(next)
	}
})

//get one application
router.get('/:id', function(req, res, next) {
	Application.findById(req.params.id)
	.then(function(foundApplication) {
		res.json(foundApplication)
	})
	.catch(next)
})

//get bugs for one application
router.get('/:id/bugs', function(req, res, next) {
	Bug.findAll({
		where: {
			applicationId: req.params.id
		}
	})
	.then(function(foundBugs) {
		res.json(foundBugs)
	})
	.catch(next)
})

//add new application
router.post('/', function(req, res, next) {
	var application;
	Application.create(req.body)
	.then(function(newApplicationCreated) {
		application = newApplicationCreated
		//set the user as admin in assoc. table
		return User.findById(req.session.userId)
		.then(function(foundUser){
			return application.addUser(foundUser,  { appAccess: "admin" })
		})
		.then(function(newApplicationCreated){
			res.status(201).send(newApplicationCreated)	
		})
	})
	.catch(next)
})

//update an application
router.put('/:id', function(req, res, next) {
	Application.findById(req.params.id)
	.then(function(foundApplication) {
		return foundApplication.update(req.body)
	})
	.then(function(updatedApplication) {
		res.json(updatedApplication)
	})
	.catch(next)
})

//app updates one bug
router.put('/:applicationId/:bugId', function(req, res, next) {
	Bug.findById(req.params.bugId)
	.then(function(foundBug) {
		return foundBug.update(req.body)
	})
	.then(function(updatedBug) {
		res.json(updatedBug)
	})
	.catch(next)
})

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