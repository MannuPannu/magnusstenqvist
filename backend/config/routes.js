'use strict'

var api = require('../controllers/api');
// var passport = require('passport');
var express = require('express');
var Account = require('../models/account');

module.exports = function(router, passport) {
		
	router.get('/api/blogentries', function(req, res){
		api.GetBlogEntries(req, res);
	});

	router.post('/api/createblogentry', function(req, res) {

		if(req.isAuthenticated()){
				
			var err = api.CreateBlogEntry(req.body);

			if(err) {
				res.send(400);
			}
			else {
				res.send(200);
			}
		}
		else {
			res.send(400);
		}
	});

	router.post('/api/deleteblogentry', function(req, res) {

		if(req.isAuthenticated()){
				
			var err = api.DeleteBlogEntry(req.body);

			if(err) {
				res.send(400);
			}
			else {
				res.send(200);
			}
		}
		else {
			res.send(400);
		}
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

