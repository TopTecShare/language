import React from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge } from 'antd';
import utils from 'utils'




const getEmployeeStatus = status => {
	if(status === 'Active') {
		return 'green'
	}
	if(status === 'Pending') {
		return 'cyan'
	}
	if(status === 'Expired') {
		return 'red'
	}
	return ''
}


const invoiceData = [
	{
		id: 'INV123',
		bookingid: 'PAY123',
		username: 'John Doe',
		destination: 'Discover Meliha',
		date: '12-08-2021',
        status:'Active'
	},

    {
		id: 'INV124',
		bookingid: 'PAY856',
		username: 'Mike Tye',
		destination: 'Heart of Sharjah',
		date: '12-08-2021',
        status:'Active'
	},

    {
		id: 'INV125',
		bookingid: 'PAY875',
		username: 'Balwinder Kumar',
		destination: 'Al Noor Island',
		date: '13-08-2021',
        status:'Active'
	},

    {
		id: 'INV126',
		bookingid: 'PAY654',
		username: 'Anderson',
		destination: 'Discover Meliha',
		date: '15-08-2021',
        status:'Active'
	}
	
]


const tableColumns = [
	{
		title: 'Invoice ID',
		dataIndex: 'id'
	},
	{
		title: 'Booking Id',
		dataIndex: 'bookingid',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'bookingid')
	},
	{
		title: 'User Name',
		dataIndex: 'username',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'username')
	},
	{
		title: 'Destination',
		dataIndex: 'destination',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'destination')
	},
	{
		title: 'Date',
		dataIndex: 'date',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (_, record) => (
			<><Tag color={getEmployeeStatus(record.status)}>{record.status}</Tag></>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
	}
]

const Invoices = () => (
	<Card title="Employee">
		<Table
			pagination={false}
			columns={tableColumns} 
			dataSource={invoiceData} 
			rowKey='srno'
		/>
	</Card>
)

const InvoiceList = () => {

	return (
		<>
			
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Invoices/>
				</Col>
			</Row>
		</>
	)
}

export default InvoiceList
