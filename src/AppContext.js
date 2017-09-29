import _ from 'lodash'
import {AxiosClient} from './clients/AxiosClient'
import {MusementClient} from './clients/MusementClient'

export const AppContext = {

	mountComponents() {

		this.axiosClient = new AxiosClient()
		this.musementClient = new MusementClient(this.axiosClient)

		this.axiosClient.doAuthorization()
			.then((res) => {
				console.log('Authorized!!!!')

				// this.musementClient.searchEventsByKeyword('water', 4).then(res => {
				// 	console.log(res)
				// })

				// this.musementClient.showDatesForEvent('07207c09-ce18-4587-9129-1471ba068b3c', '2017-10-06', '2017-10-10').then(res => {
				// 	console.log(res)
				// })

				// this.musementClient.getTicketInfo('07207c09-ce18-4587-9129-1471ba068b3c', '2017-10-06').then(res => {
				// 	console.log(res)
				// })

				// this.musementClient.createCart([{product_id: 53555988, quantity: 1}], {email: "no_uuid_test_123@musement.com", firstname: "Mario", lastname: "Rossi", country: {id: 82}}).then((res) => {
				// 	console.log('create cart ' + res)
				// })

				// this.musementClient.createOrder('7a0da68a-bbe9-47a7-963d-f4ec94e8fb03').then(res => {
				// 	console.log(res)
				// })

				// this.musementClient.payWithStripeToken('e2f678ea-e570-4c92-836f-f872de488ceb', 'tok_visa').then(res => {
				// 	console.log(res)
				// })
			})
			.catch(console.error)


	}
}
