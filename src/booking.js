const axios = require('axios')
const express = require('express')
const _ = require('lodash')
const config = require('./request_config')

const creds = require('../client_creds')

var router = express.Router();

// Ex add ticket
var postData = {
	tickets: [
		{
			product: {
				id: 275106037
			},
			quantity: 1
		}
	]
}
// Ex add customer
var custData = {
	customer: {
		email: "guest136a@fakemail.com",
		firstname: "Guest136a",
		lastname: "surname136a",
		country: {
			id: 123
		}
	}
}
var replaceCartData = {
	tickets: [
		{
			product: {
				id: 275106037
			},
			quantity: 1
		}
	],
	customer: {
		email: "guest136a@fakemail.com",
		firstname: "Guest136a",
		lastname: "surname136a",
		country: {
			id: 123
		}
	}
}
// Ex create order for cart
var cartData = {
	cart_id: '74686cc-74e0-4b78-b421-d3a03dc5cc84'
}

// Show available dates to book
router.get('/:eventId/dates', function(req, res, next) {
	var date_from = (req.query.date_from ? "date_from=" + req.query.date_from : "")
	var date_to = (req.query.date_to ? "&date_to=" + req.query.date_to : "")

	var url = 'events/' + req.params.eventId + '/dates?' + date_from + date_to

	axios.request(config.GET_CONFIG('catalog', url)).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Get information about tickets on particular day
router.get('/:eventId/schedule/:eventDate', function(req, res, next) {
	var url = 'events/' + req.params.eventId + '/schedule/' + req.params.eventDate

	axios.request(config.GET_CONFIG('catalog', url)).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Create new cart (requires authentication)
router.post('/cart', function(req, res, next) {
	axios.request(config.POST_CONFIG('carts', postData)).then(function(response) {
		res.send(response.data)
	}).catch(function(err) {
		console.log(err)
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Add info to cart (customer/ more tickets)
router.patch('/cart/:cartId', function(req, res, next) {
	axios.request(config.PATCH_CONFIG('carts/' + req.params.cartId, custData)).then(function(response) {
		res.send(response.data)
	}).catch(function(err) {
		console.log(err)
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Get cart information
router.get('/cart/:cartId', function(req, res, next) {
	axios.request(config.GET_CONFIG('authorized', 'carts/' + req.params.cartId)).then(function(response) {
		res.send(response.data)
	}).catch(function(err) {
		console.log(err)
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Replace all the info in the cart
router.put('/cart/:cartId', function(req, res, next) {
	axios.request(config.PUT_CONFIG('carts/' + req.params.cartId, replaceCartData)).then(function(response) {
		res.send(response.data)
	}).catch(function(err) {
		console.log(err)
		res.status(400).json({err: 'Invalid api request'})
	})
})

// Create the order (Doesn't work but there is also an error on the webpage)
router.post('/order', function(req, res, next) {
	axios.request(config.POST_CONFIG('orders', cartData)).then(function(response) {
		res.send(response.data)
	}).catch(function(err) {
		console.log(JSON.stringify(err.response.data))
		res.status(400).json({err: 'Invalid api request'})
	})
})

router.use(function renderUnexpectedError (err, req, res, next) {
	res.status(500).json({err: 'Unexpected error'})
})

module.exports = router