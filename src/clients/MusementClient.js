import queryString from 'query-string'

export class MusementClient {

	constructor(axiosClient) {
		this.axiosClient = axiosClient
	}

	async searchEventsByKeyword(keyword, cityCode) {

		const url = 'events/search-extended'
		var params = { q: keyword, city: cityCode}


		try {
			const res = await this.axiosClient.get(url, {params})

			return res
		}
		catch (err) {
			console.error(err)
		}
	}
	async showDatesForEvent(params, query) {

		const {eventId} = params

		const qs = queryString.stringify(query)
		const url  = `events/${eventId}/dates?${qs}`
		console.log('what is the url: ' + JSON.stringify({url}))

		try {

			const res = await this.axiosClient.get(url, {params})
			return res
		}
		catch (err) {
			console.error(err)
		}


		// var url = 'events/' + req.params.eventId + '/dates?' + date_from + date_to
		//
		//
		// axreq(config.GET_CONFIG('catalog', url), req, res, next)

	}
}
