const express = require('express')
var router = express.Router();

router.use(function renderUnexpectedError (err, req, res, next) {
	res.status(500).json({error: 'Unexpected error'})
})

module.exports = router