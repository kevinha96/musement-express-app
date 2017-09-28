const axios = require('axios')
const express = require('express')
const _ = require('lodash')
const config = require('./request_config')

const creds = require('../client_creds')
var axreq= require('./customAxios')

var router = express.Router();

// Ex add ticket
var postData = {
	tickets: [
		{
			metadata: {},
			product: {
				id: 53555979
			},
			quantity: 1
		}
	],
	customer: {
		email: "no_uuid_test_123@musement.com",
		firstname: "Mario",
		lastname: "Rossi",
		country: {
			id: 82
		}
	}
}
// Ex add customer
var custData = {
	customer: {
		email: "no_uuid_test_123@musement.com",
		firstname: "Mario",
		lastname: "Rossi",
		country: {
			id: 82
		}
	}
}
// Ex create order for cart
function cartData(id) {
	return {
		cart_uuid: id
	}
}
// Ex payment data for stripe
function paymentData(id) {
	return {
		order_uuid: id,
		stripe_token: "tok_visa"
	}
}

// Show available dates to book
router.get('/:eventId/dates', function(req, res, next) {
	var date_from = (req.query.date_from ? "date_from=" + req.query.date_from : "")
	var date_to = (req.query.date_to ? "&date_to=" + req.query.date_to : "")

	var url = 'events/' + req.params.eventId + '/dates?' + date_from + date_to

	axreq(config.GET_CONFIG('catalog', url), req, res, next)
})

// Get information about tickets on particular day
router.get('/:eventId/schedule/:eventDate', function(req, res, next) {
	var url = 'events/' + req.params.eventId + '/schedule/' + req.params.eventDate

	axreq(config.GET_CONFIG('catalog', url), req, res, next)
})

// Create new cart (requires authentication)
router.post('/cart', function(req, res, next) {
	axreq(config.POST_CONFIG('carts', postData), req, res, next)
})

// Add info to cart (customer/ more tickets)
router.patch('/cart/:cartId', function(req, res, next) {
	axreq(config.PATCH_CONFIG('carts/' + req.params.cartId, custData), req, res, next)
})

// Get cart information
router.get('/cart/:cartId', function(req, res, next) {
	axreq(config.GET_CONFIG('authorized', 'carts/' + req.params.cartId), req, res, next)
})

// Replace all the info in the cart
router.put('/cart/:cartId', function(req, res, next) {
	axreq(config.PUT_CONFIG('carts/' + req.params.cartId, postData), req, res, next)
})

// Create the order (Doesn't work but there is also an error on the webpage)
router.post('/order/:cartId', function(req, res, next) {
	axreq(config.POST_CONFIG('orders', cartData(req.params.cartId)), req, res, next)
})

router.post('/order/:orderId/payment', function(req, res, next) {
	axreq(config.POST_CONFIG('payments/stripe/payment', paymentData(req.params.orderId)), req, res, next)
})

router.use(function renderUnexpectedError (err, req, res, next) {
	res.status(500).json({err: 'Unexpected error'})
})

module.exports = router