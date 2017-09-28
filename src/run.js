const axios = require('axios')
const creds = require('../client_creds')
const _ = require('lodash')

var prompt = require('prompt')

const baseURL = 'http://localhost:3000/'
const apiURL = baseURL + 'api/'

class data {
	constructor() {
		var access_token = ''
		var country_id = 0
		var event_uuid = ""
	}
}

class app {
	constructor() {
		var data = data()

		prompt.start()

		// Authentication
		axios.request({
			method: 'get',
			url: apiURL + 'auth',
			params: {
				client_id: creds.client_id,
				client_secret: creds.secret_id,
				grant_type: 'client_credentials'
			}
		}).then(function(res) {
			data.access_token = res.data.access_token

			var eventUrl = apiURL + 'catalog/countries'
			// Display countries
			axios.get(eventUrl).then(function(res) {
				_.map(res.data, function(obj) {
					console.log(_.pick(obj, ['id', 'name']))
				})
				// Choose country
				prompt.get('country_id', function(err, result) {
					data.country_id = result.country_id

					eventUrl = eventUrl + '/' + data.country_id + '/events'
					console.log(eventUrl)
					// Display events
					axios.get(eventUrl).then(function(res) {
						_.map(res.data, function(obj) {
							console.log(_.pick(obj, ['uuid', 'title']))
						})
						// Choose event
						prompt.get('event_uuid', function(err, result) {
							data.event_uuid = result.event_uuid


						})
					}).catch(function(err) {
						console.log('get id error: ' + err)
					})
				})

			}).catch(function(err) {
				console.log('get countries err: ' + err)
			})
		})




	}
}

module.exports = app