/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import * as actions from "../../../_redux/users/usersActions";
import { Card, Select, Input, Button, Radio, Form, Row, Col } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { TextArea } = Input;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { userData } = useSelector(
    (state) => ({
      userData: state.users.userData,
    }),
    shallowEqual
  );

  const addUser = (values) => {
    dispatch(actions.addUser(values, token)).then(() => backToUserList());
  };

  const backToUserList = () => {
    history.push("/app/add-user");
  };

  const gotoList = () => {
    history.goBack();
  };
  const handleOnClick = useCallback(() => history.push("/add-user"), [history]);

  const [value, setValue] = React.useState(1);

  const style = { padding: "0 15px" };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["firstname"] = values["firstname"];
    data["lastname"] = values["lastname"];
    data["email"] = values["email"];
    data["phonenumber"] = values["phonenumber"];
    data["password"] = values["password"];
    data["role"] = values["role"];

    addUser(JSON.stringify(data));
    window.location.href = "/app/add-user/list";
  };

  return (
    <Row justify="center">
      <Col span={18}>
        <Card hoverable style={{ paddingRight: "4vw", paddingLeft: "4vw" }}>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <h2>Add User</h2>
            </Flex>
            <div>
              <Button
                type="primary"
                onClick={gotoList}
                icon={<LeftOutlined />}
                block
              >
                Back
              </Button>
            </div>
          </Flex>
          <div style={{ marginTop: 100 }}>
            {id == null && (
              <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
              >
                <Row>
                  <Col span={12} style={{ margin: "0 auto" }}>
                    <Form.Item
                      name="firstname"
                      label="First Name"
                      style={style}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="lastname"
                      label="Last Name"
                      style={style}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      style={style}
                      rules={[{ type: "email" }, { required: true }]}
                    >
                      <Input placeholder="sample@gmail.com" />
                    </Form.Item>

                    <Form.Item
                      name="phonenumber"
                      label="Phone Number"
                      style={style}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      style={style}
                      rules={[{ required: true }]}
                    >
                      <Input.Password />
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
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="role"
                      label="Role"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="admin">admin</Option>
                      </Select>
                    </Form.Item>

                    {/* <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="1">Super Admin</Option>
                    <Option value="2">Vendor</Option>
                  </Select>
                </Form.Item> */}
                    <Form.Item {...tailLayout}>
                      <Button
                        className="mr-2"
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
            {id != 0 && userData && load == 1 && (
              <EditForm userData={userData} />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserCreate;
