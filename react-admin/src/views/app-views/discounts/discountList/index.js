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

const discountData=[
	{
	  "id":"123",
	  "discount_code": "DISSHQ10",
	  "status": "Active",
	  "time_used": "70",
	  "start_date": "01/08/2021",
	  "end_date": "31/08/2021",
	  
	},
	{
		"id":"1223",
		"discount_code": "UAEBARQ",
		"status": "Expired",
		"time_used": "65",
		"start_date": "01/08/2021",
		"end_date": "18/08/2021",
		
	  },
	
	  {
		"id":"124",
		"discount_code": "FRONTLINE",
		"status": "Active",
		"time_used": "50",
		"start_date": "01/08/2021",
		"end_date": "12/09/2021",
		
	  },
	
	  {
		"id":"125",
		"discount_code": "BOGO",
		"status": "Active",
		"time_used": "40",
		"start_date": "01/08/2021",
		"end_date": "31/12/2021",
		
	  },

	  {
		"id":"126",
		"discount_code": "BOGOSOTP",
		"status": "Expired",
		"time_used": "35",
		"start_date": "10/08/2021",
		"end_date": "15/08/2021",
		
	  },

	  {
		"id":"127",
		"discount_code": "OK12",
		"status": "Active",
		"time_used": "28",
		"start_date": "12/08/2021",
		"end_date": "31/08/2021",
		
	  },

	  {
		"id":"128",
		"discount_code": "BOGOSTAR",
		"status": "Active",
		"time_used": "25",
		"start_date": "01/08/2021",
		"end_date": "10/10/2021",
		
	  },

	  {
		"id":"129",
		"discount_code": "BOGOESTAR",
		"status": "Active",
		"time_used": "20",
		"start_date": "01/08/2021",
		"end_date": "31/08/2021",
		
	  },

	  {
		"id":"130",
		"discount_code": "B2G2Kids",
		"status": "Active",
		"time_used": "10",
		"start_date": "01/08/2021",
		"end_date": "31/08/2021",
		
	  },
	
	  
	
	
  ]


const OrdersList = () => {

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
			title: 'Discount Code',
			dataIndex: 'discount_code',
			
			sorter: (a, b) => utils.antdTableSorter(a, b, 'discount_code')
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: status => (
				<Tag className ="text-capitalize" color={status === 'Active'? 'cyan' : 'red'}>{status}</Tag>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
		},

		{
			title: 'Times Used',
			dataIndex: 'time_used',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'time_used')
		},


		{
			title: 'Start Date',
			dataIndex: 'start_date',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'start_date')
		},

		{
			title: 'End Date',
			dataIndex: 'end_date',
		
			sorter: (a, b) => utils.antdTableSorter(a, b, 'end_date')
		},
		
	
		
		
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<Button>Edit</Button>
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
