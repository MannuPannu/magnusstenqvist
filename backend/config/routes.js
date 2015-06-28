'use strict'

var api = require('../controllers/api');
// var passport = require('passport');
var express = require('express');
var Account = require('../models/account');

module.exports = function(router, passport) {
		
	router.get('/api/blogentries', function(req, res){
		api.GetBlogEntries(req, res);
	});


	router.post('/login', passport.authenticate('local'), function(req, res) {
		res.redirect('/');
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.send(true);
	});

	router.get('/loggedin', function(req, res) {
		res.send(req.user);		 
	});

	router.get('/ping', function(req, res){
		res.status(200).send("pong!");
	});

};

