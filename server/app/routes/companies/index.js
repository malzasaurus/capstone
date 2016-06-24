'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Company = require('../../../db').model('company');
var User = require('../../../db').model('user');

//get all companies
router.get('/', function(req, res, next) {
	Company.findAll()
	.then(function(allCompanies) {
		res.json(allCompanies)
	})
	.catch(next)
})

//get one company
router.get('/:id', function(req, res, next) {
	Company.findById(req.params.id)
	.then(function(foundCompany) {
		res.json(foundCompany)
	})
	.catch(next)
})

//get bugs for one company
router.get('/:id/bugs', function(req, res, next) {
	Bug.findAll({
		where: {
			companyId: req.params.id
		}
	})
	.then(function(foundBugs) {
		res.json(foundBugs)
	})
	.catch(next)
})

//add new company
router.post('/', function(req, res, next) {
	Company.create(req.body)
	.then(function(newCompanyCreated) {
		res.status(201).send(newCompanyCreated)
	})
	.catch(next)
})

//update a company
router.put('/:id', function(req, res, next) {
	Company.findById(req.params.id)
	.then(function(foundCompany) {
		return foundCompany.update(req.body)
	})
	.then(function(updatedCompany) {
		res.json(updatedCompany)
	})
	.catch(next)
})

//company updates one bug
router.put('/:companyId/:bugId', function(req, res, next) {
	Bug.findById(req.params.bugId)
	.then(function(foundBug) {
		return foundBug.update(req.body)
	})
	.then(function(updatedBug) {
		res.json(updatedBug)
	})
	.catch(next)
})

//delete a company
router.delete('/:id', function(req, res, next) {
	Company.findById(req.params.id)
	.then(function(foundCompany) {
		return foundCompany.destroy()
	})
	.then(function(response) {
		res.sendStatus(204)
	})
	.catch(next)
})