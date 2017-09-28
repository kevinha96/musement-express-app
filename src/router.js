const axios = require('axios')
const express = require('express')
const config = require('./request_config')

const creds = require('../client_creds')
var axreq= require('./customAxios')

var router = express.Router();

// Authentication
router.get('/auth', function(req, res, next) {
	axreq(config.GET_CONFIG('auth'), req, res, next)
})

// Cataloging
router.get('/catalog/:cat/:id?/:events?', function(req, res, next) {
	var id = (req.params.id ? "/" + req.params.id : "")
	var events = (req.params.events ? "/" + req.params.events : "")

	var url = req.params.cat + id + events

	axreq(config.GET_CONFIG('catalog', url), req, res, next)
})

module.exports = router
