const creds = require('../client_creds')

const baseURL = 'https://developers.musement.com/api/v3/'
const authToken = 'OWE4MzExMjZjZTViYTY1YjI1MDY3MDQ2YTZhNTAwMDI2OWRlYmJiODFhNDUzYzg0OWVkNTA1Njg0MGRhODI2ZQ'
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
				Authorization: authHeader,
				"X-Musement-Version": "3.2.0"
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