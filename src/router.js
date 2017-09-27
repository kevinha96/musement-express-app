const axios = require('axios')
const express = require('express')
const _ = require('lodash')
const config = require('./request_config')

const creds = require('../client_creds')

var router = express.Router();

// Authentication
router.get('/auth', function(req, res, next) {
	axios.request(config.GET_CONFIG('auth')).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Cataloging
router.get('/catalog/:cat/:id?/:events?', function(req, res, next) {
	var id = (req.params.id ? "/" + req.params.id : "")
	var events = (req.params.events ? "/" + req.params.events : "")

	var url = req.params.cat + id + events

	axios.request(config.GET_CONFIG('catalog', url)).then(function(response) {
		res.status(200).json(response.data)
		/*_.map(response.data, function(obj) {
			return _.pick(obj, ['id', 'name'])
		})*/
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

module.exports = router