import creds from '../../client_creds'
import * as axios from 'axios'

const baseURL = 'https://developers.musement.com/api/v3/'

const doRequest = (config) => {

	// - TODO: include the authToken/Header in this request...
	const {authToken} = config

	return new Promise((resolve, reject) => {

		axios.request(config).then((response) => {

			resolve(response.data)
			// res.status(200).json(response.data)

		}).catch((err) => {

			console.log(err)
			reject(err)
			// res.status(400).json({err: 'Invalid api request'})
		})
	})


}
const buildRequestConfig = (method, url, {params, headers, data}, authToken) => {
	return {method, url, params, headers, data, authToken}
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

		//console.log(res)

		this.authState= res.access_token

		//console.log('authToken is ' + this.authState)
	}

	get(url, payload) {

		const authToken = this.authState
		const req = buildRequestConfig('get', baseURL+url, payload, authToken)
		return doRequest(req)
	}

	post(url, payload) {

		const req = buildRequestConfig('post', baseURL+url, payload)
		return doRequest(req)
	}

	put(url, payload) {

		const req = buildRequestConfig('put', baseURL+url, payload)
		return doRequest(req)
	}

	patch(url, payload) {

		const req = buildRequestConfig('patch', baseURL+url, payload)
		return doRequest(req)
	}
}