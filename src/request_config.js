const creds = require('../client_creds')

const baseURL = 'https://developers.musement.com/api/v3/'
const authToken = 'MGU2M2M5ZGFjZTk0NTkyZjQ5OWMwYWY1YTllZDkxZjI3OTMzNjYwMTg2ZjdlYTg2MGU0NGJjM2QwNzc5YTQyZQ'
const authHeader = 'Bearer ' + authToken

module.exports = {
	GET_CONFIG: function GET_CONFIG(requestType, url) {
		if (requestType == 'auth') {
			return {
				method: 'get',
				url: baseURL + 'login',
				params: {
					client_id: creds.client_id,
					client_secret: creds.secret_id,
					grant_type: 'client_credentials'
				}
			}
		} else if (requestType == 'catalog') {
			return {
				method: 'get',
				url: baseURL + url
			}
		} else if (requestType == 'authorized') {
			return {
				method: 'get',
				url: baseURL + url,
				headers: {
					Authorization: authHeader
				}
			}
		}
	},
	POST_CONFIG: function POST_CONFIG(url, data) {
		return {
			method: 'post',
			url: baseURL + url,
			headers: {
				Authorization: authHeader
			},
			data: data
		}
	},
	PUT_CONFIG: function PUT_CONFIG(url, data) {
		return {
			method: 'put',
			url: baseURL + url,
			headers: {
				Authorization: authHeader
			},
			data: data
		}
	},
	PATCH_CONFIG: function PATCH_CONFIG(url, data) {
		return {
			method: 'patch',
			url: baseURL + url,
			headers: {
				Authorization: authHeader
			},
			data: data
		}
	}
}