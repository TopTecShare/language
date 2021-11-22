import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import Flex from "components/shared-components/Flex";
import { useDispatch } from "react-redux";

import * as actions from "../../../_redux/project/projectActions";
import { Redirect } from "react-router";
import { Link, Router } from "react-router-dom";
import { useHistory } from "react-router";
import {
  EyeOutlined,
  EditOutlined,
  DeleteColumnOutlined,
} from "@ant-design/icons";

function ProjectList({ list }) {
  const { TextArea } = Input;
  const [visible, setVisible] = React.useState(false);
  const [values, setValues] = React.useState({
    _id: list._id,
    title: list.title,
    currency: list.currency,
    description: list.desc,
  });
  const style = { padding: "0 15px" };

  const dispatch = useDispatch();

  const hideModal = () => {
    if (values.title && values.description && values.currency) {
      setVisible(false);
      dispatch(actions.updateProject(values));
      // window.location.href = "/app/dashboards";
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const deleteProject = () => {
    dispatch(actions.deleteProject(values._id));
    window.location.href = "/app/dashboards";
  };

  const history = useHistory();

  const viewUnits = (title) => {
    // window.location.href = "/app/units";
    localStorage.setItem("selectedTitle", title);
    window.location.href = "/app/units";
  };

  return (
    <Card style={{ padding: "40px" }}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Space direction="vertical" size="10">
            <Flex
              className="h-100"
              flexDirection="column"
              justifyContent="between"
            >
              <div>
                <h1 className="mb-0">Project {list.title}</h1>
                <span className="text-muted">{list.desc}</span>
              </div>
              <Row style={{ marginTop: "70px" }}>
                <Button
                  style={{ marginRight: "5px" }}
                  onClick={() => viewUnits(list.title)}
                  type="primary"
                >
                  <EyeOutlined /> View units of this project
                </Button>

                <Button
                  onClick={showModal}
                  style={{ marginRight: "5px" }}
                  type="primary"
                >
                  <EditOutlined />
                  Edit this project
                </Button>

                <Button
                  onClick={deleteProject}
                  style={{ marginRight: "5px" }}
                  type="danger"
                >
                  <DeleteColumnOutlined />
                  Delete this project
                </Button>
              </Row>
            </Flex>
          </Space>
        </Col>
      </Row>
      <Modal
        title="Edit Project"
        visible={visible}
        onOk={hideModal}
        onCancel={() => setVisible(false)}
        okText="Submit"
        cancelText="Cancel"
        initialValues={values}
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
      </Modal>
    </Card>
  );
}

export default ProjectList;
