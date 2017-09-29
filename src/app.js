import express from 'express'
import {AppContext} from './AppContext'

const app = express()

AppContext.mountComponents()

// const ex = require('./run')

/*app.get('/', function(req, res) {
	res.send('Hello World!')
})*/

app.use('/api', function (req, res, next) {
	require('./router')(req, res, next)
})

app.use('/api/booking', function (req, res, next) {
	require('./booking')(req, res, next)
})

app.listen(3000, function() {
	console.log('App now running')

	// var newApp = new ex()
})