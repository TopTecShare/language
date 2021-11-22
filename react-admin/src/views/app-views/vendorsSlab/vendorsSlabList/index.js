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
import * as actions from "../../../_redux/vendorsslab/vendorsslabActions";

function ListForm(props) {
	const { vendorsSlabListData } = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Slab Name',
			dataIndex: 'slab_name',
			
			sorter: (a, b) => utils.antdTableSorter(a, b, 'slab_name')
		},
		{
			title: 'Percentage',
			dataIndex: 'percentage',
			
			sorter: (a, b) => utils.antdTableSorter(a, b, 'percentage')
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
		history.push("/app/vendors-slab/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/vendors-slab/new");
	}

	const [list, setList] = useState(vendorsSlabListData)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : vendorsSlabListData
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

const VendorsSlabList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getVendorsSlabLists());
		setLoad(1);
	}, []);
	const { vendorsSlabListData } = useSelector(
        (state) => ({
            vendorsSlabListData: state.vendorsslab.vendorsSlabListData,
        }),
        shallowEqual
      );

	return (
		<div>
			{vendorsSlabListData && load == 1 && <ListForm vendorsSlabListData={vendorsSlabListData} />}
		</div>
	)
}

export default VendorsSlabList
