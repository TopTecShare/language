import React, { Component } from "react";
import { Form, Button, Input, Row, Col, message, Select } from "antd";

export class Categories extends Component {
  render() {
    return (
      <>
        <h2 className="mb-4 ml-4">Categories</h2>

        <Form name="categories" layout="vertical">
          <Row>
            <Col xs={24} sm={24} md={24} lg={22}>
              <Row>
                <Col xs={24} sm={24} md={12}>
                  <div className="mt-4 mr-4">
                    <Form.Item label="Primary category" name="primary_category">
                      <Select placeholder="Select">
                        <Option value="primary1">1</Option>
                        <Option value="primary2">2</Option>
                        <Option value="primary3">3</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="mt-4 mr-4">
                    <Form.Item label="2nd category" name="2nd_category">
                      <Select placeholder="Select">
                        <Option value="2nd1">1</Option>
                        <Option value="2nd2">2</Option>
                        <Option value="2nd3">3</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="mt-4 mr-4">
                    <Form.Item label="3rd category" name="3rd_category">
                      <Select placeholder="Select">
                        <Option value="3rd1">1</Option>
                        <Option value="3rd2">2</Option>
                        <Option value="3rd3">3</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div className="mt-4 mr-4">
                    <Form.Item label="4th category" name="4th_category">
                      <Select placeholder="Select">
                        <Option value="4th1">1</Option>
                        <Option value="4th2">2</Option>
                        <Option value="4th3">3</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Button
                className="mb-4 ml-4"
                type="ml-2"
                style={{ width: 100 }}
                htmlType="submit"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default Categories;
