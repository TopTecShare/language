import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import utils from 'utils'
import AvatarStatus from 'components/shared-components/AvatarStatus';


const userData=[
	{
	  "id": "eileenHorton-1153",
	  "name": "Arabian Tea House",
	  "email": "eileen_h@hotmail.com",
	  "img": "/img/avatars/thumb-1.jpg",
	  "phoneNumber": "+12-123-1234",
	  "role": "Vendor",
	  "lastOnline": 1573430400,
	  "status": "active",
	  "type":"Standard",
	  "commision":5,
	  "personalInfo": {
		"location": "New York, US",
		"title": "Product Manager",
		"birthday": "10/10/1992",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "terranceMoreno-1322",
	  "name": "The Yellow Chilli",
	  "email": "",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-2.jpg",
	  "role": "Vendor",
	  "lastOnline": 1572393600,
	  "status": "active",
	  "type":"Premium",
	  "commision":10,
	  "personalInfo": {
		"location": "New York, US",
		"title": "Software Engineer",
		"birthday": "03/02/1984",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "ronVargas7653",
	  "name": "Fish Corner",
	  "email": "ronnie_vergas@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-3.jpg",
	  "role": "Vendor",
	  "lastOnline": 1572393600,
	  "status": "blocked",
	  "type":"Standard",
	  "commision":15,
	  "personalInfo": {
		"location": "New York, US",
		"title": "UI/UX Designer",
		"birthday": "07/11/1987",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "lukeCook4721",
	  "name": "Cold Stone",
	  "email": "cookie_lukie@hotmail.com",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-4.jpg",
	  "role": "Vendor",
	  "lastOnline": 1579132800,
	  "status": "active",
	  "commision":10,
	  "type":"Exclusive",
	  "personalInfo": {
		"location": "New York, US",
		"title": "HR Executive",
		"birthday": "07/11/1987",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "joyceFreeman1384",
	  "name": "Al Gaffal",
	  "email": "joyce991@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-5.jpg",
	  "role": "Vendor",
	  "lastOnline": 1582416000,
	  "status": "active",
	  "commision":20,
	  "type":"Exclusive",
	  "personalInfo": {
		"location": "New York, US",
		"title": "Frontend Developer",
		"birthday": "17/11/1993",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "samanthaPhillips8493",
	  "name": "Auberge",
	  "email": "samanthaphil@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-6.jpg",
	  "role": "Vendor",
	  "lastOnline": 1583107200,
	  "status": "active",
	  "commision":20,
	  "type":"Premium",
	  "personalInfo": {
		"location": "London, UK",
		"title": "Compliance Manager",
		"birthday": "17/11/1993",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "taraFletcher1263",
	  "name": "Daily Fresh",
	  "email": "taratarara@imaze.edu.du",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-7.jpg",
	  "role": "Vendor",
	  "lastOnline": 1582761600,
	  "status": "active",
	  "commision":25,
	  "type":"Premium",
	  "personalInfo": {
		"location": "London, UK",
		"title": "Compliance Manager",
		"birthday": "17/11/1993",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "frederickAdams6532",
	  "name": "Frederick Adams",
	  "email": "iamfred@imaze.infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-8.jpg",
	  "role": "Vendor",
	  "lastOnline": 1579219200,
	  "status": "blocked",
	  "type":"Exclusive",
	  "commision":5,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Compliance Manager",
		"birthday": "17/11/1993",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "carolynHanson7953",
	  "name": "Carolyn Hanson",
	  "email": "carolyn_h@gmail.com",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-9.jpg",
	  "role": "Vendor",
	  "lastOnline": 1584489600,
	  "status": "blocked",
	  "type":"Standard",
	  "commision":5,
	  "personalInfo": {
		"location": "Texas, US",
		"title": "Compliance Manager",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "brittanyHale3683",
	  "name": "Brittany Hale",
	  "email": "brittany1134@gmail.com",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-10.jpg",
	  "role": "Vendor",
	  "lastOnline": 1583452800,
	  "status": "active",
	  "commision":13,
	  "type":"Standard",
	  "personalInfo": {
		"location": "Texas, US",
		"title": "Compliance Manager",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "lloydObrien1564",
	  "name": "Lloyd Obrien",
	  "email": "handsome-obrien@hotmail.com",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-11.jpg",
	  "role": "Vendor",
	  "lastOnline": 1584576000,
	  "status": "active",
	  "type":"Standard",
	  "commision":20,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Software Engineer",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "gabriellaMay2850",
	  "name": "Gabriella May",
	  "email": "maymaymay12@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-12.jpg",
	  "role": "Vendor",
	  "lastOnline": 1574208000,
	  "status": "blocked",
	  "type":"Premium",
	  "commision":15,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Software Engineer",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "leeWheeler1941",
	  "name": "Lee Wheeler",
	  "email": "",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-13.jpg",
	  "role": "Vendor",
	  "lastOnline": 1586649600,
	  "status": "active",
	  "type":"Premium",
	  "commision":25,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Software Engineer",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "gailBarnes7615",
	  "name": "Gail Barnes",
	  "email": "gailby0116@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-14.jpg",
	  "role": "Vendor",
	  "lastOnline": 1583020800,
	  "status": "active",
	  "type":"Premium",
	  "commision":5,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Software Engineer",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	},
	{
	  "id": "ellaRobinson1093",
	  "name": "Ella Robinson",
	  "email": "ella_robinson@infotech.io",
	  "phoneNumber": "+12-123-1234",
	  "img": "/img/avatars/thumb-15.jpg",
	  "role": "Vendor",
	  "lastOnline": 1586217600,
	  "status": "active",
	  "type":"Exclusive",
	  "commision":25,
	  "personalInfo": {
		"location": "London, UK",
		"title": "Software Engineer",
		"birthday": "03/06/1991",
		"phoneNumber": "+12-123-1234",
		"facebook": "facebook.com/sample",
		"twitter": "twitter.com/sample",
		"instagram": "instagram.com/sample",
		"site": "samplesite.com"
	  }
	}
  ]
  
export class EmployeeList extends Component {

	state = {
		users: userData,
		userProfileVisible: false,
		selectedUser: null
	}

	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	render() {
		const { users, userProfileVisible, selectedUser } = this.state;

		const tableColumns = [
			
			{
				title: 'Name',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Contact Into',
				dataIndex: 'phoneNumber',
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
  						b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Role',
				dataIndex: 'role',
				sorter: {
					compare: (a, b) => a.role.length - b.role.length,
				},
			},
			{
				title: 'Last online',
				dataIndex: 'lastOnline',
				render: date => (
					<span>{moment.unix(date).format("MM/DD/YYYY")} </span>
				),
				sorter: (a, b) => moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
			},
			{
				title: 'Commission',
				dataIndex: 'commision',
			
				sorter: (a, b) => utils.antdTableSorter(a, b, 'commision')
			},
			{
				title: 'Status',
				dataIndex: 'status',
				render: status => (
					<Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
				),
				sorter: {
					compare: (a, b) => a.status.length - b.status.length,
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right d-flex justify-content-end">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={users} rowKey='id' />
				</div>
				<UserView data={selectedUser} visible={userProfileVisible} close={()=> {this.closeUserProfile()}}/>
			</Card>
		)
	}
}

export default EmployeeList
