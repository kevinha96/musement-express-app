import queryString from 'query-string'
import _ from 'lodash'

export class MusementClient {

	constructor(axiosClient) {

		this.axiosClient = axiosClient
	}

	// Search events in the city by keyword

	async searchEventsByKeyword(keyword, cityCode) {

		const url = 'events/search-extended'
		var params = { q: keyword, city: cityCode}

		try {
			const res = await this.axiosClient.get(url, {params})
			return _.map(res.data, r =>  _.pick(r, ['title', 'uuid']))
		}
		catch (err) {
			console.error(err)
		}
	}

	// Show dates in a range for an event (set date param to null if not required)
	async showDatesForEvent(eventId, date_from, date_to ) {
		const url = `events/${eventId}/dates`
		var params = {date_from: date_from, date_to: date_to}

		try {
			const res = await this.axiosClient.get(url, {params})
			return _.map(res, r => _.pick(r, ['day', 'sold_out']))
		}
		catch (err) {
			console.error(err)
		}
	}

	// get ticket info of event on certain date
	async getTicketInfo(eventId, eventDate) {
		const url = `events/${eventId}/schedule/${eventDate}`

		try {
			const res = await this.axiosClient.get(url, {})

			// Iterate through json response to list every product available
			var tickets = (group) => {
				return _.map(group.slots, slot => {
					return _.map(slot.products, product => {
						return {
							name: group.name,
							time: slot.time,
							age: product.name,
							product_id: product.product_id
						}
					})
				})
			}
			return _.chain(res[0].groups).map(tickets).flatten().value()
		}
		catch (err) {
			console.error(err)
		}
	}

	// Create cart by posting data (Can take list of {product_id, quantity} and customer json data)
	async createCart( ticketInfo, customer) {
		const url = 'carts'

		// Append ticket info to tickets array of objects
		var tickets = []
		const template = (product_id, quantity) => {
			return {
				product: {
					id: product_id
				},
				quantity: quantity
			}
		}
		_.forEach(ticketInfo, obj => {
			tickets.push(template(obj.product_id, obj.quantity))
		})

		var data = {tickets: tickets, customer: customer}

		try {
			const res = await this.axiosClient.post(url, {data})
			return res
		}
		catch(err) {
			console.error(err)
		}
	}

	async createOrder(cart_uuid) {
		const url = 'orders'

		var data = {cart_uuid : cart_uuid}

		try {
			const res = await this.axiosClient.post(url, {data})
			return res
		}
		catch(err) {
			console.error(err)
		}
	}

	async payWithStripeToken(order_uuid, stripe_token) {

		const url = 'payments/stripe/payment'

		var data = {order_uuid: order_uuid, stripe_token: stripe_token}

		try {
			const res = await this.axiosClient.post(url, {data})
			return res
		}
		catch(err) {
			console.error(err)
		}
	}
}