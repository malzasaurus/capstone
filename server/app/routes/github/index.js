"use strict";

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Bug = require('../../../db').model('bug');
var Application = require('../../../db').model('application');
var User = require('../../../db').model('user');
var localStorage = require('localStorage');
var Client = require('github/lib/index');
var github = new Client({});


router.get('/', function(req, res, next) {
    github.authenticate({
    type: "oauth",
    token: localStorage.getItem('accessToken')
    });
    github.repos.getAll({}, function(err, response) {
        console.log(response)
        res.send(response)
    })
});
