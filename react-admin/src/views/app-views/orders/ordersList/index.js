/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';

import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const { Option } = Select

const dateRangePicker=()=>{
	return (
		<div>
		  <RangePicker />
		
		</div>
	  );
}

const OrderListData=[
	{
        "id": "#5331",
        "name": "Eileen Horton",
        "image": "/img/avatars/thumb-1.jpg",
		"activity":"Sunset Lounge Exclusiveon Vargas & Stand Up Paddle Board",
        "date": 1629218167,
        "amount": 677,
        "paymentStatus": "Success",
       
    },
    {
        "id": "#5328",
        "name": "Terrance Moreno",
        "image": "/img/avatars/thumb-2.jpg",
		"activity":"Discover the night sky & Pony Ride",
        "date": 1629218167,
        "amount": 1328.35,
        "paymentStatus": "Success",
      
    },
    {
        "id": "#5321",
        "name": "Ron Vargas",
        "image": "/img/avatars/thumb-3.jpg",
		"activity":"Stand Up Paddle Board & Horseback Riding",
        "date": 1629218167,
        "amount": 629,
        "paymentStatus": "Success",
       
    },
    {
        "id": "#5287",
        "name": "Luke Cook",
        "image": "/img/avatars/thumb-4.jpg",
		"activity":"Landscapes Buggy Adventure",
        "date": 1629218167,
        "amount": 25.9,
        "paymentStatus": "Success",
      
    },
    {
        "id": "#5351",
        "name": "Joyce Freeman",
        "image": "/img/avatars/thumb-5.jpg",
		"activity":"Pony Ride & A Cultural Tour",
        "date": 1629218167,
        "amount": 817.5,
        "paymentStatus": "Pending",
       
    },
    {
        "id": "#5285",
        "name": "Samantha Phillips",
        "image": "/img/avatars/thumb-6.jpg",
		"activity":"Discover the night sky & Sounds of the Past",
        "date": 1629218167,
        "amount": 47.9,
        "paymentStatus": "Success",
      
    },
    {
        "id": "#5290",
        "name": "Tara Fletcher",
        "image": "/img/avatars/thumb-7.jpg",
		"activity":"Sunset Lounge Exclusiveon Vargas & Yoga at Sunrise",
        "date": 1629218167,
        "amount": 300,
        "paymentStatus": "Pending",
     
    },
    {
        "id": "#5337",
        "name": "Frederick Adams",
        "image": "/img/avatars/thumb-8.jpg",
		"activity":"Landscapes Buggy Adventure & Archery",
        "date": 1629218167,
        "amount": 730,
        "paymentStatus": "Failed",
        
    },
    {
        "id": "#5297",
        "name": "Carolyn Hanson",
        "image": "/img/avatars/thumb-9.jpg",
		"activity":"Pony Ride & Cycling Add-on",
        "date": 1629218167,
        "amount": 827,
        "paymentStatus": "Success",
       
    },
    {
        "id": "#5298",
        "name": "Brittany Hale",
        "image": "/img/avatars/thumb-10.jpg",
		"activity":"Stand Up Paddle Board & Landscapes SUV",
        "date": 1629218167,
        "amount": 1866,
        "paymentStatus": "Success",
      
    },
    {
        "id": "#5301",
        "name": "Lloyd Obrien",
        "image": "/img/avatars/thumb-11.jpg",
		"activity":"Landscapes Buggy Adventure & Landscapes SUV",
        "date": 1629218167,
        "amount": 269,
        "paymentStatus": "Success",
        
    },
    {
        "id": "#5304",
        "name": "Gabriella May",
        "image": "/img/avatars/thumb-12.jpg",
		"activity":"Discover the night sky & Overnight Camping",
        "date": 1629218167,
        "amount": 180,
        "paymentStatus": "Success",
       
    }
]
const getPaymentStatus = status => {
	if(status === 'Success') {
		return 'success'
	}
	if(status === 'Pending') {
		return 'warning'
	}
	if(status === 'Failed') {
		return 'error'
	}
	return ''
}



const paymentStatusList = ['Success', 'Pending', 'Expired']

const OrdersList = () => {

	const [list, setList] = useState(OrderListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(OrderListData, key, value)
			setList(data)
		} else {
			setList(OrderListData)
		}
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item>
				<Flex alignItems="center">
					<PlusCircleOutlined />
					<span className="ml-2">Add to remark</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'Order Number',
			dataIndex: 'id'
		},
		{
			title: 'Date',
			dataIndex: 'date',
			render: (_, record) => (
				<span>{moment.unix(record.date).format("DD/MM/YYYY")}</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
		},
		{
			title: 'Customer Name',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={30} src={record.image} name={record.name}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Activity',
			dataIndex: 'activity',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'activity')
		},
		
	
		
		{
			title: 'Total Amount',
			dataIndex: 'amount',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(record.amount * 100) / 100).toFixed(2)} 
						prefix={'AED'} 
						thousandSeparator={true} 
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
		},
		{
			title: 'Payment status',
			dataIndex: 'paymentStatus',
			render: (_, record) => (
				<><Badge status={getPaymentStatus(record.paymentStatus)} /><span>{record.paymentStatus}</span></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : OrderListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowStatus} 
							placeholder="Status"
						>
							<Option value="All">All payment </Option>
							{paymentStatusList.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</div>
					<div className="mb-3">
					{dateRangePicker()}		
					</div>

					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							
							placeholder="Destination"
						>
							<Option value="All">All Destination</Option>
							<Option value="Discover Mleiha">Discover Mleiha</Option>
							<Option value="Heart of Sharjah">Heart of Sharjah</Option>
							<Option value="Al Noor Island">Al Noor Island</Option>
							
						</Select>
					</div>

					
				</Flex>
				<div>
					<Button type="primary" icon={<FileExcelOutlined />} block>Export All</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default OrdersList
