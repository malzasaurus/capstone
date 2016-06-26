'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');

//get all bugs in an application
router.get('/', function(req, res, next) {
	Bug.findAll()
	.then(function(allBugs) {
		res.json(allBugs)
	})
	.catch(next)
})

//get one bug
router.get('/:id', function(req, res, next) {
	Bug.findById(req.params.id)
	.then(function(foundBug) {
		res.json(foundBug)
	})
	.catch(next)
})

//add new bug
router.post('/', function(req, res, next) {
	//find application where appID = appID
	//return application and application.add(bug)
	Application.find({
		where:{
			appId: req.body.appId
		}
	})
	.then(function(foundApplication){
		foundApplication.createBug(req.body)
	})
	.then(function(newBugCreated){
		res.status(201).send(newBugCreated)
	})
	.catch(next)
})

//update a bug
router.put('/:id', function(req, res, next) {
	Bug.findById(req.params.id)
	.then(function(foundBug) {
		return foundBug.update(req.body)
	})
	.then(function(updatedBug) {
		res.json(updatedBug)
	})
	.catch(next)
})

//delete a bug
router.delete('/:id', function(req, res, next) {
	Bug.findById(req.params.id)
	.then(function(foundBug) {
		return foundBug.destroy()
	})
	.then(function(response) {
		res.sendStatus(204)
	})
	.catch(next)
})