import React, { Component } from "react";
import {
  Card,
  Table,
  Tooltip,
  Button,
  Input,
  Modal,
  Row,
  Col,
  Form,
  Tag,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import moment from "moment";
import { useDispatch, useHistory, useSelector } from "react-redux";
import UserView from "./UserView";
import utils from "utils";
import Flex from "components/shared-components/Flex";
import CryptoJS from "crypto-js";

import { CheckCircleTwoTone } from "@ant-design/icons";
import * as actions from "../../../_redux/users/usersActions";

function CustomerList() {
  const dispatch = useDispatch();
  React.useEffect(async () => {
    await dispatch(actions.getCustomerList()).then((data) => console.log(data));
  }, []);

  const [visible, setVisible] = React.useState(false);

  const users = useSelector((state) => state.users.customerListData);
  const [list, setList] = React.useState();
  React.useEffect(async () => {
    await setList(users);
  }, [users]);
  const [values, setValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });
  // if (!list) setList(users);

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = users;
    // const searchArray = e.currentTarget.value ? list : userListData;
    const data = utils.wildCardSearch(searchArray, value);

    setList(data);
  };

  function showModal() {
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
  }

  function deleteCustomer(id) {
    dispatch(actions.deleteCustomer(id));
    window.location.href = "/app/customers/list";
  }

  function onSubmit() {
    dispatch(actions.addCustomer(values)).then((res) => console.log(res));
    hideModal();
    // window.location.href = "/app/customers/list";
  }

  const style = { padding: "0 15px" };

  function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, "my-secret-key@123").toString();
  }

  function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, "my-secret-key@123");
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const tableColumns = [
    // {
    //   title: "First name",
    //   dataIndex: "firstname",
    // },
    // {
    //   title: "Last name",
    //   dataIndex: "lastname",
    // },
    {
      title: "Email",
      dataIndex: "email",
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
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-left">
          <Tooltip title="Delete">
            <Button
              type="danger"
              onClick={() => deleteCustomer(elm._id)}
              icon={<DeleteOutlined />}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <Card bodyStyle={{ padding: "30px" }}>
      <h1>Users</h1>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
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
            onClick={showModal}
            icon={<UserAddOutlined />}
            block
          >
            Add
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        {users && (
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        )}
      </div>
      <Modal
        title="Add new users"
        centered
        visible={visible}
        onOk={onSubmit}
        onCancel={() => hideModal()}
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Row>
            <Col span={20} style={{ margin: "0 auto" }}>
              <Form.Item
                name="firstname"
                label="First Name"
                style={style}
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
                value={values.email}
              >
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      email: e.target.value,
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
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Card>
  );
}

export default CustomerList;
