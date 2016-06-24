'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Company = require('../../../db').model('company');
var User = require('../../../db').model('user');

//get all bugs
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
	Bug.create(req.body)
	.then(function(newBugCreated) {
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