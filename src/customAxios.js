const axios = require('axios')


module.exports = function(config, req, res, next) {
	axios.request(config).then(function(response) {
		res.status(200).json(response.data)
	}).catch(function(err) {
		console.log(err)
		res.status(400).json({err: 'Invalid api request'})
	})
}