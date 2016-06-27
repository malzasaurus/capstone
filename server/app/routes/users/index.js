'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');

//get all users
router.get('/', function(req, res, next) {
	User.findAll()
	.then(function(allUsers) {
		res.json(allUsers)
	})
	.catch(next)
})

//get one user
router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		res.json(foundUser)
	})
	.catch(next)
})

//add new user
router.post('/', function(req, res, next) {
	User.create(req.body)
	.then(function(newUser) {
		res.json(newUser)
	})
	.catch(next)
})

//update a user
router.put('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		return foundUser.update(req.body)
	})
	.then(function(updatedUser) {
		res.json(updatedUser)
	})
	.catch(next)
})

//delete a user
router.delete('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(foundUser) {
		return foundUser.destroy()
	})
	.then(function(response) {
		res.sendStatus(204)
	})
	.catch(next)
})