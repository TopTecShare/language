import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  Avatar,
  Select,
  Modal,
  Form,
} from "antd";
import { Input } from "antd";

import Flex from "components/shared-components/Flex";

import { COLORS } from "constants/ChartConstant";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../../_redux/project/projectActions";
import ProjectList from "./ProjectList";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import md5 from "md5";

const { Option } = Select;
const style = { padding: "0 15px" };

const getPaymentStatus = (status) => {
  if (status === "Paid") {
    return "success";
  }
  if (status === "Pending") {
    return "warning";
  }
  if (status === "Expired") {
    return "error";
  }
  return "";
};

const getShippingStatus = (status) => {
  if (status === "Ready") {
    return "blue";
  }
  if (status === "Shipped") {
    return "cyan";
  }
  return "";
};

const SalesDashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getProjectLists());
  }, []);
  let tmp = JSON.parse(localStorage.getItem("auth_token"));
  const [authData, setAuthData] = React.useState(tmp);

  const [visible, setVisible] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    currency: "",
    description: "",
  });

  const { TextArea } = Input;
  const projectListData = useSelector((state) => state.project.projectListData);
  const hideModal = () => {
    if (values.title && values.description && values.currency) {
      setVisible(false);
      dispatch(actions.addProject(values));
      window.location.href = "/app/dashboards";
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hash = md5(String(authData.email).trim().toLowerCase());
  // const hash = md5("mathews.kyle@gmail.com".trim().toLowerCase());

  const gravatar = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Card style={{ padding: "50px" }}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={8} style={{ margin: "0 auto" }}>
                <Flex
                  className="h-100"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <div style={{ margin: "0 auto" }}>
                    <Image
                      src={gravatar}
                      width={200}
                      align="center"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h1 className="mb-0">Welcome {authData.firstname}</h1>
                    <span className="text-muted">
                      Last Login: {authData.lastLogin}
                    </span>
                  </div>
                  {/* <Button style={{ marginTop: "20px" }} onClick={showModal}>
                    <PlusOutlined />
                    New Project
                  </Button> */}
                </Flex>
              </Col>
            </Row>
          </Card>
          {/* {projectListData &&
            projectListData.map((it) => <ProjectList list={it} />)} */}
        </Col>
      </Row>
      {/* <Modal
        title="New Project"
        visible={visible}
        onOk={hideModal}
        onCancel={() => setVisible(false)}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Row>
            <Col span={20} style={{ margin: "0 auto" }}>
              <Form.Item
                name="title"
                label="Title"
                style={style}
                rules={[{ required: true }]}
                fullwidth
              >
                <Input
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                style={style}
                rules={[{ required: true }]}
                fullwidth
              >
                <TextArea
                  rows={10}
                  onChange={(e) =>
                    setValues((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item
                name="currency"
                label="Currency"
                rules={[{ required: true }]}
                fullwidth
              >
                <Select
                  placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      currency: value,
                    }))
                  }
                >
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="CAD">CAD</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal> */}
    </>
  );
};

export default SalesDashboard;
