/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';

import { EyeOutlined, FileExcelOutlined, SearchOutlined, PlusCircleOutlined,CheckCircleTwoTone } from '@ant-design/icons';
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

const discountData=[
	{
	  "id":"123",
	  "vendor_name": "The Yellow Chilli",
	  "transport_name": "Bus",
	  "oneway_price": "70",
	  "twoway_price": "110",
	  "enable": "1",
	  
	},
	{
		"id":"124",
		"vendor_name": "The Yellow Chilli",
		"transport_name": "Car",
		"oneway_price": "120",
		"twoway_price": "200",
		"enable": "1",
		
	 },{
		"id":"125",
		"vendor_name": "Cold Stone",
		"transport_name": "Bike",
		"oneway_price": "50",
		"twoway_price": "100",
		"enable": "1",
		
	  },{
		"id":"126",
		"vendor_name": "Arabian Tea House",
		"transport_name": "Bus",
		"oneway_price": "100",
		"twoway_price": "180",
		"enable": "1",
		
	  },{
		"id":"127",
		"vendor_name": "Cold Stone",
		"transport_name": "SUV",
		"oneway_price": "120",
		"twoway_price": "200",
		"enable": "1",
		
	  },
	  
	
	
  ]


const VendorTransList = () => {

	const [list, setList] = useState(discountData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleShowStatus = value => {
		if(value !== 'All') {
			const key = 'paymentStatus'
			const data = utils.filterArray(discountData, key, value)
			setList(data)
		} else {
			setList(discountData)
		}
	}

	

	const tableColumns = [
		{
			title: 'Transport ID',
			dataIndex: 'id'
		},
		{
			title: 'Vendor Name',
			dataIndex: 'vendor_name',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'vendor_name')
		},
		{
			title: 'Transport Name',
			dataIndex: 'transport_name',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'transport_name')
		},
		{
			title: 'Oneway Price',
			dataIndex: 'oneway_price',
			render: (_, record) => (
				<div className="d-flex">
					{record.oneway_price!=null?`AED${record.oneway_price}`:""}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'oneway_price')
		},
		{
			title: 'Twoway Price',
			dataIndex: 'twoway_price',
			render: (_, record) => (
				<div className="d-flex">
					{record.twoway_price!=null?`AED${record.twoway_price}`:""}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'twoway_price')
		},
		{
			title: 'Enable',
			dataIndex: 'enable',
			render: (_, record) => (
				<div className="d-flex">
					{record.enable==1?<CheckCircleTwoTone twoToneColor="#52c41a" />:""}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'enable')
		},
		{
			title: 'Edit',
			dataIndex: 'edit',
			render: (_, record) => (
				<div className="d-flex">
					<Button onClick="">Edit</Button>
				</div>
			),
		},
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : discountData
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
						
							placeholder="Vendors"
						>
							<Option value="All">All Vendors</Option>
							<Option value="The Yellow Chilli">The Yellow Chilli</Option>
							<Option value="Cold Stone">Cold Stone</Option>
							<Option value="Arabian Tea House">Arabian Tea House</Option>
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

export default VendorTransList
