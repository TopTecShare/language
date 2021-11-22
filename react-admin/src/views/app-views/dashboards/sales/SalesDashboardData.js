import { COLORS } from 'constants/ChartConstant';

export const weeklyRevenueData = {
	series: [
	  {
		name: 'Earning',
		data: [45, 52, 38, 24, 33, 26, 21]
	  }
	],
	categories:[
	  '08 Jul', 
	  '09 Jul', 
	  '10 Jul', 
	  '11 Jul', 
	  '12 Jul', 
	  '13 Jul', 
	  '14 Jul'
	]
}

export const topProductData = [
	{
		name: 'Landscapes Buggy Adventure',
		image: '/img/thumbs/1.png',
		category: '	',
		sales: 5930,
		status: 'up'
	},
	{
		name: 'Discover the night sky',
		image: '/img/thumbs/2.jpg',
		category: 'Cloths',
		sales: 5177,
		status: 'up'
	},
	{
		name: 'Sunset Lounge Exclusive',
		image: '/img/thumbs/3.jpg',
		category: 'Devices',
		sales: 4701,
		status: 'down'
	},
	{
		name: 'Stand Up Paddle Board',
		image: '/img/thumbs/4.jpg',
		category: 'Devices',
		sales: 2833,
		status: 'up'
	},
	{
		name: 'Pony Ride',
		image: '/img/thumbs/5.jpg',
		category: 'Bags',
		sales: 1692,
		status: 'down'
	},
]

export const customerChartData = [
	{
		name: 'This Month Customers',
		data: [28, 25, 64, 40, 75, 45, 70]
	},
	{
		name: 'Last Month Customers',
		data: [25, 15, 41, 25, 44, 12, 36]
	}
]

export const sessionColor = [COLORS[0], COLORS[1], COLORS[3], COLORS[5]]
export const sessionData = [3561, 1443, 2462, 1693]
export const sessionLabels = ['Discover Mleiha', 'Heart of Sharjah', 'Al Noor Island', 'Archaeological Centre']
const jointSessionData = () => {
	let arr = []
	for (let i = 0; i < sessionData.length; i++) {
		const data = sessionData[i];
		const label = sessionLabels[i];
		const color = sessionColor[i]
		arr = [...arr, {
			data: data,
			label: label,
			color: color
		}]
	}
	return arr
}
export const conbinedSessionData = jointSessionData()

export const recentOrderData = [
	{
		id: '#5331',
		name: 'Stand Up Paddle Board',
		image: '/img/thumbs/4.jpg',
		date: 1573430400,
		amount: 677,
		paymentStatus: 'Paid',
		orderStatus: 'Ready'
	},
	{
		id: '#5328',
		name: 'Discover the night sky',
		image: '/img/thumbs/2.jpg',
		date: 1572393600,
		amount: 1328.35,
		paymentStatus: 'Paid',
		orderStatus: 'Ready'
	},
	{
		id: '#5321',
		name: 'Sunset Lounge Exclusiveon Vargas',
		image: '/img/thumbs/3.jpg',
		date: 1593949805,
		amount: 629,
		paymentStatus: 'Paid',
		orderStatus: 'Ready'
	},
	{
		id: '#5287',
		name: 'Landscapes Buggy Adventure',
		image: '/img/thumbs/1.png',
		date: 1579132800,
		amount: 25.9,
		paymentStatus: 'Paid',
		orderStatus: 'Ready'
	},
	{
		id: '#5351',
		name: 'Pony Ride',
		image: '/img/thumbs/5.jpg',
		date: 1591286400,
		amount: 817.5,
		paymentStatus: 'Pending',
		orderStatus: 'Ready'
	},
]