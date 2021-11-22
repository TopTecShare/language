/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import { EyeOutlined, UserAddOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import * as actions from "../../../_redux/vendoramenities/vendoramenitiesActions";
import { 
	
	CheckCircleTwoTone
	
} from '@ant-design/icons';

function ListForm(props) {
	const { vendorAmenitieListData } = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Amenity Name',
			dataIndex: 'amenity_name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'amenity_name')
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
					<Button onClick={e => userEdit(e, record.id)}>Edit</Button>
				</div>
			),
		},
	];

	const userEdit = (event, id) => {
		history.push("/app/vendor-amenities/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/vendor-amenities/new");
	}

	const [list, setList] = useState(vendorAmenitieListData)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : vendorAmenitieListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
					</div>
				</Flex>
				<div>
					<Button type="primary" onClick={userAdd} icon={<UserAddOutlined />} block>Add</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={list}
					rowKey='id'
				/>
			</div>
		</Card>
	)
}

const VendorAmensList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getVendorAmenitieLists());
		setLoad(1);
	}, []);
	const { vendorAmenitieListData } = useSelector(
        (state) => ({
            vendorAmenitieListData: state.vendoramenities.vendorAmenitieListData,
        }),
        shallowEqual
      );

	return (
		<div>
			{vendorAmenitieListData && load == 1 && <ListForm vendorAmenitieListData={vendorAmenitieListData} />}
		</div>
	)
}

export default VendorAmensList
