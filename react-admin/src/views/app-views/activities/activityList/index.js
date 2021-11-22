/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Table, Select, Input, Button, Badge, Menu, Tag } from 'antd';
import OrderListData from "assets/data/order-list.data.json"
import { EyeOutlined, UserAddOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import * as actions from "../../../_redux/activities/activitiesActions";

function ListForm(props) {

	const { activityList } = props;
	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	const history = useHistory();

	const activityAdd = () => {
		history.push("/app/activities/new");
	}

	const [list, setList] = useState(activityList)

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : activityList
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
					<Button type="primary" onClick={activityAdd} icon={<UserAddOutlined />} block>Add</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				{list.length != 0 && <TableForm list={list} /> }

			</div>
		</Card>
	)
}

function TableForm(props) {
	const {list} = props;
	const history = useHistory();

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Activity En-Name',
			dataIndex: 'username',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.activity_name} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Activity Ar-Name',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.activity_name_ar} />
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'role')
		},
		{
			title: 'Edit',
			dataIndex: 'edit',
			render: (_, record) => (
				<div className="d-flex">
					<Button onClick={e => activityEdit(e, record.id)}>Edit</Button>
				</div>
			),
		},
	];

	const activityEdit = (event, id) => {
		history.push("/app/activities/" + id);
	}

	return (
		<Table
			columns={tableColumns}
			dataSource={list}
			rowKey='id'
		/>
	)
}

function ActivityList() {

	const { activityList } = useSelector(
		(state) => ({
			activityList: state.activities.activityList,
		}),
		shallowEqual
	);

	const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.getActivitylist(token));
	}, []);

	return (
		<div>
			{activityList.length != 0 && <ListForm activityList={activityList} />}
		</div>

	)
}

export default ActivityList
