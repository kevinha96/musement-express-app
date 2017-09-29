import creds from '../../client_creds'
import * as axios from 'axios'

const baseURL = 'https://developers.musement.com/api/v3/'

const doRequest = (config) => {

	return new Promise((resolve, reject) => {

		axios.request(config).then((response) => {
			resolve(response.data)
		}).catch((err) => {
			reject(err)
		})
	})
}

const buildRequestConfig = (method, url, {params, data}, authToken) => {
	if (authToken) {
		var headers = {Authorization: 'Bearer ' + authToken, 'X-Musement-Version': '3.2.0'}
	}

	return {method, url, params, headers, data}
}

export class AxiosClient {
	authState

	get isAuthorized() { return this.authState != null }

	async doAuthorization() {
		const res = await this.get('login', {params: {
			client_id: creds.client_id,
			client_secret: creds.secret_id,
			grant_type: 'client_credentials'
		}})

		this.authState= res.access_token
	}

	get(url, payload) {
		const authToken = this.authState

		const req = buildRequestConfig('get', baseURL+url, payload, authToken)
		return doRequest(req)
	}

	post(url, payload) {
		const authToken = this.authState

		const req = buildRequestConfig('post', baseURL+url, payload, authToken)
		return doRequest(req)
	}

	put(url, payload) {
		const authToken = this.authState

		const req = buildRequestConfig('put', baseURL+url, payload)
		return doRequest(req)
	}

	patch(url, payload) {
		const authToken = this.authState

		const req = buildRequestConfig('patch', baseURL+url, payload)
		return doRequest(req)
	}
}