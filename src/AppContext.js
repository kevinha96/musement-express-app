import _ from 'lodash'
import {AxiosClient} from './clients/AxiosClient'
import {MusementClient} from './clients/MusementClient'

export const AppContext = {

	mountComponents() {

		this.axiosClient = new AxiosClient()
		this.musementClient = new MusementClient(this.axiosClient)

		this.axiosClient.doAuthorization()
			.then((res) => {
				//console.log('Auth Status: ' + res)
			})
			.catch(console.error)

		//const eventDates = AppContext.getEventDates('0f5d1163-2046-11e7-9cc9-06a7e332783f', {})

		//this.getEventDates('0f5d1163-2046-11e7-9cc9-06a7e332783f', {})

		/**************THIS WORKS****************/
		// var headers = { Authorization: 'asdfaeewv'}
		// var params = { q: 'aevw', city: 3}
		// console.log({params, headers})
		/**************THIS WORKS****************/

		this.musementClient.searchEventsByKeyword('water', 4).then(res => {
			_.map(res.data, function(obj) {
				console.log(_.pick(obj, 'title'))
			})
		})

		/*this.musementClient.showDatesForEvent({eventId: '0f5d1163-2046-11e7-9cc9-06a7e332783f'},{date_from: '2017-10-01', date_to: '2017-10-10'}).then(res => {
			console.log('worked')
		})*/
	}

	// async getEventDates(eventId, query) {
	// 	const result = await this.musementClient.showDatesForEvent({ eventId },{})
	// 	console.log('function 1')
	// },




}
