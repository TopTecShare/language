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
import * as actions from "../../../_redux/discounts/discountsActions";

function ListForm(props) {
	const { discountsList } = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Discount Code',
			dataIndex: 'discount_code',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.discount_code} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'discount_code')
		},
		{
			title: 'Type',
			dataIndex: 'type',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.type} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'type')
		},
        {
			title: 'Value',
			dataIndex: 'value',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.value} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'value')
		},
        // {
		// 	title: 'Enable',
		// 	dataIndex: 'enable',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			<AvatarStatus name={record.enable} />
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'enable')
		// },
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
		history.push("/app/discounts/" + id);
	}
	
	const userAdd = () => {
		history.push("/app/discounts/new");
	}

	const [list, setList] = useState(discountsList)


	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : discountsList
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

const DiscountList = () => {

	const dispatch = useDispatch();
	const history = useHistory();
    const [load, setLoad] = useState(0);
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	useEffect(() => {
        dispatch(actions.getDiscountslist());
		setLoad(1);
	}, []);
	const { discountsList } = useSelector(
        (state) => ({
            discountsList: state.discounts.discountsList,
        }),
        shallowEqual
      );

	return (
		<div>
			{discountsList && load == 1 && <ListForm discountsList={discountsList} />}
		</div>
	)
}

export default DiscountList
