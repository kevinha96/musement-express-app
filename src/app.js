const express = require('express')

const app = express()

app.get('/', function(req, res) {
	res.send('Hello World!')
})

app.use('/api', function (req, res, next) {
	require('./router')(req, res, next)
})

app.listen(3000, function() {
	console.log('Ex')
})