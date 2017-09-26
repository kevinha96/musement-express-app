const axios = require('axios')
const express = require('express')
const _ = require('lodash')

const creds = require('../client_creds')

var router = express.Router();

// Authentication
router.get('/auth', function(req, res, next) {
	var url = 'https://developers.musement.com/api/v3/login'

	axios.get(url, {
		params: {
			client_id: creds.client_id,
			client_secret: creds.secret_id,
			grant_type: 'client_credentials'
		}
	}).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})

})

// Cataloging
router.get('/catalog/:cat/:id?/:events?', function(req, res, next) {
	var url = 'https://developers.musement.com/api/v3/'
	var category = req.params.cat
	var id = (req.params.id ? "/" + req.params.id : "")
	var events = (req.params.events ? "/" + req.params.events : "")

	url = url + category + id + events

	axios.get(url).then(function(response) {
		res.status(200).json(response.data)
		/*_.map(response.data, function(obj) {
			return _.pick(obj, ['id', 'name'])
		})*/
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Show available dates to book
router.get('/booking/:eventId/dates', function(req, res, next) {
	var url = 'https://developers.musement.com/api/v3/'
	var eventId = req.params.eventId

	var date_from = (req.query.date_from ? "date_from=" + req.query.date_from : "")
	var date_to = (req.query.date_to ? "&date_to=" + req.query.date_to : "")

	url = url + 'events/' + eventId + '/dates?' + date_from + date_to

	axios.get(url).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Get informtipn about tickets on particular day
router.get('/booking/:eventId/schedule/:eventDate', function(req, res, next) {
	var url = 'https://developers.musement.com/api/v3/'
	var eventId = req.params.eventId
	var eventDate = req.params.eventDate

	url = url + 'events/' + eventId + '/schedule/' + eventDate
	console.log(url)

	axios.get(url).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Create new cart (requires authentication)
router.post('/booking/cart', function(req, res, next) {
	var url = 'https://developers.musement.com/api/v3/'


})

// router.use(function renderUnexpectedError (err, req, res, next) {
// 	res.status(500).json({err: 'Unexpected error'})
// })

module.exports = router