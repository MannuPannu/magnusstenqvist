'use strict'

var api = require('../controllers/api');
var express = require('express');
var Account = require('../models/account');

module.exports = function(router, passport) {
		
	router.get('/api/blogentries', function(req, res){
		api.GetBlogEntries(req, res);
	});

	router.get('/api/blogentriesbytag', function(req, res){
		api.GetBlogEntriesByTag(req, res, req.query.tag);
	});

	router.get('/api/blogentriesbyid', function(req, res){
		api.GetBlogEntriesById(req, res, req.query.id);
	});

	router.post('/api/createblogentry', function(req, res) {

		if(req.isAuthenticated()){
				
			return api.CreateOrUpdateBlogEntry(req, res);
		}
		else {
			res.send(400);
		}
	});

	router.post('/api/deleteblogentry', function(req, res) {

		if(req.isAuthenticated()){
				
			var err = api.DeleteBlogEntry(req, res);

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

