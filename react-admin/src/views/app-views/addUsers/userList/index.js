/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Col,
  Tag,
  Modal,
  Form,
  Row,
} from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import * as actions from "../../../_redux/users/usersActions";

function ListForm(props) {
  const { userListData } = props;
  const history = useHistory();

  function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, "my-secret-key@123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const [visible, setVisible] = React.useState(false);
  const [values, setValues] = React.useState({
    id: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpwd: "",
    role: "admin",
  });

  const dispatch = useDispatch();

  const showModal = (record) => {
    setValues({
      id: record._id,
      firstname: record.firstname,
      lastname: record.lastname,
      email: record.email,
      phonenumber: record.phonenumber,
      password: decryptPassword(record.password),
      confirmpwd: decryptPassword(record.password),
      role: "admin",
    });
    setVisible(true);
  };

  const hideModal = () => {
    if (
      values.firstname &&
      values.lastname &&
      values.password &&
      values.confirmpwd &&
      values.email &&
      values.phonenumber &&
      values.role
    ) {
      setVisible(false);
      dispatch(actions.updateUser(values));
      window.location.href = "/app/add-user/list";
    }
  };

  const style = { padding: "0 15px" };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const tableColumns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      render: (_, record) => <div className="d-flex">{record.firstname}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      render: (_, record) => <div className="d-flex">{record.lastname}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => <div className="d-flex">{record.email}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Password",
      dataIndex: "password",
      render: (password) => (
        <Tag
          className="text-capitalize"
          color={password === "Subscriptions" ? "cyan" : "green"}
        >
          {decryptPassword(password)}
          {/* {password} */}
        </Tag>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phonenumber",
      render: (_, record) => <div className="d-flex">{record.phonenumber}</div>,
    },
    // {
    // 	title: 'Address',
    // 	dataIndex: 'address',
    // 	render: (_, record) => (
    // 		<div className="d-flex">
    // 			{record.address} />
    // 		</div>
    // 	),
    // 	sorter: (a, b) => utils.antdTableSorter(a, b, 'address')
    // },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => <div className="d-flex">{record.role}</div>,
    },

    {
      title: "",
      dataIndex: "edit",
      render: (_, record) => (
        <div className="d-flex">
          <Button type="primary" onClick={(e) => userEdit(e, record)}>
            <EditOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      render: (_, record) => (
        <div className="d-flex">
          <Button onClick={(e) => userDelete(e, record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const userDelete = (e, id) => {
    dispatch(actions.deleteUser(id));
    window.location.href = "/app/add-user/list";
  };

  const userEdit = (event, record) => {
    showModal(record);
  };

  const userAdd = () => {
    window.location.href = "/app/add-user/new";
  };

  const [list, setList] = useState(userListData);

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = userListData;
    // const searchArray = e.currentTarget.value ? list : userListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  return (
    <Card style={{ padding: "30px" }}>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <h1>Administrators</h1>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <div>
          <Button
            type="primary"
            onClick={userAdd}
            icon={<UserAddOutlined />}
            block
          >
            Add
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
      <Modal
        title="Edit User"
        visible={visible}
        onOk={hideModal}
        onCancel={() => setVisible(false)}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Row>
            <Col span={12} style={{ margin: "0 auto" }}>
              <Form.Item
                name="firstname"
                label="First Name"
                style={style}
                rules={[{ required: true }]}
                value={values.firstname}
              >
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      firstname: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="lastname"
                label="Last Name"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      lastname: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                style={style}
                rules={[{ type: "email" }, { required: true }]}
              >
                <Input
                  placeholder="sample@gmail.com"
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="phonenumber"
                label="Phone Number"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      phonenumber: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                style={style}
                rules={[{ required: true }]}
              >
                <Input.Password
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirmpwd"
                label="Confirm Password"
                style={style}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      confirmpwd: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                  defaultValue={values.role}
                >
                  <Option value="admin">admin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Card>
  );
}

const UserList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(0);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  useEffect(() => {
    dispatch(actions.getUserLists(token));
    setLoad(1);
  }, []);

  const userListData = useSelector((state) => state.users.userListData);

  return (
    <div>
      {userListData && load == 1 && <ListForm userListData={userListData} />}
    </div>
  );
};

export default UserList;
