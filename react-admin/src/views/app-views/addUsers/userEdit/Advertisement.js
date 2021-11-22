import React, { useState, Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Radio,
  Select,
  Col,
  message,
  Divider,
  Card,
  Space,
  Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { Upload, Modal } from "antd";
import {
  PlusOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const Advertisement = () => {
  const [value, setValue] = React.useState("front");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <h2 className="mb-4 ml-4">Advertisement</h2>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <h4 className="mb-4">Where should your ad be placed?</h4>
          </Col>
        </Row>
      </Flex>
      <Form name="basicInformation" layout="vertical">
        <Row>
          <Col xs={24} sm={24} md={24} lg={22}>
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <div className="mb-4">
                  <Radio.Group
                    name="radiogroup"
                    onChange={onChange}
                    defaultValue={"front"}
                  >
                    <Radio value={"front"}>Top 5 on front page</Radio>
                    <Radio value={"city"}>Top 5 on city page</Radio>
                    <Radio value={"category"}>Top 5 in category</Radio>
                    <Radio value={"profiles"}>Between profiles</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={22}>
                {value === "front" ? (
                  <Row>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-6.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-4.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-8.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-9.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-5.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-2.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Select position" name="position">
                          <Select placeholder="Select">
                            <Option value="position1">First</Option>
                            <Option value="position2">Second</Option>
                            <Option value="position3">Third</Option>
                            <Option value="position4">Fourth</Option>
                            <Option value="position5">Fifth</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Duration" name="duration">
                          <Select placeholder="Select">
                            <Option value="7days">7 days</Option>
                            <Option value="14days">14 days</Option>
                            <Option value="30days">30 days</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>

              <Col xs={24} sm={24} md={24} lg={22}>
                {value === "city" ? (
                  <Row>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-6.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-6.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-7.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-3.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-7.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-7.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-2.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Select position" name="position">
                          <Select placeholder="Select">
                            <Option value="position1">First</Option>
                            <Option value="position2">Second</Option>
                            <Option value="position3">Third</Option>
                            <Option value="position4">Fourth</Option>
                            <Option value="position5">Fifth</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Duration" name="duration">
                          <Select placeholder="Select">
                            <Option value="7days">7 days</Option>
                            <Option value="14days">14 days</Option>
                            <Option value="30days">30 days</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="City" name="city">
                          <Select placeholder="Select or Search">
                            <Option value="copenhagen">Copenhagen</Option>
                            <Option value="aarhus">Aarhus</Option>
                            <Option value="odense">Odense</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col xs={24} sm={24} md={24} lg={22}>
                {value === "category" ? (
                  <Row>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-4.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-2.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-6.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-8.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-4.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Select position" name="position">
                          <Select placeholder="Select">
                            <Option value="position1">First</Option>
                            <Option value="position2">Second</Option>
                            <Option value="position3">Third</Option>
                            <Option value="position4">Fourth</Option>
                            <Option value="position5">Fifth</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Duration" name="duration">
                          <Select placeholder="Select">
                            <Option value="7days">7 days</Option>
                            <Option value="14days">14 days</Option>
                            <Option value="30days">30 days</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Category" name="category">
                          <Select placeholder="Select">
                            <Option value="category1">category1</Option>
                            <Option value="category2">category2</Option>
                            <Option value="category3">category3</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col xs={24} sm={24} md={24} lg={22}>
                {value === "profiles" ? (
                  <Row>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-3.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-1.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-2.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-5.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={10} className="advertise-color-div">
                      <div className="advertise-between">
                        <div>
                          <span className="between-website">
                            therapyseminars.com
                          </span>
                          <span className="between-website-content">
                            We are the best schoolwith the highestlevel of
                            training
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6} className="advertise-color-div">
                      <div className="advertise-readmore">
                        <Button type="primary" danger>
                          Read more
                        </Button>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={8}></Col>
                    <Col xs={24} sm={24} md={12}>
                      <Space direction="horizontal">
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-6.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-7.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-4.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                        <Card
                          className="advertise-card-body"
                          title=""
                          style={{ width: 180, opacity: 0.5 }}
                        >
                          <div className="advertise-card-image">
                            <img src="/img/avatars/thumb-7.jpg" />
                          </div>
                          <div className="advertise-card">
                            <span className="card-title">
                              Free Profile - different layout
                            </span>
                            <span className="card-zip-city">
                              2300, Copenhagen
                            </span>
                          </div>
                          <div className="card-content">
                            <span>
                              This is the part of short description where 150
                              chars are allowedand then it's a ...
                            </span>
                          </div>
                          <Divider className="advertise-card-divider" />
                          <div className="advertise-card-footer">
                            <Tag className="advertise-card-tag" color="#717171">
                              Massage
                            </Tag>
                          </div>
                        </Card>
                      </Space>
                    </Col>
                    <Col xs={24} sm={24} md={12}></Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Select city" name="profile_city">
                          <Select placeholder="Select or Search">
                            <Option value="copenhagen">Copenhagen</Option>
                            <Option value="aarhus">Aarhus</Option>
                            <Option value="odense">Odense</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Duration" name="duration">
                          <Select placeholder="Select">
                            <Option value="7days">7 days</Option>
                            <Option value="14days">14 days</Option>
                            <Option value="30days">30 days</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                      <div className="mt-4 mr-4">
                        <Form.Item label="Category" name="category">
                          <Select placeholder="Select">
                            <Option value="category1">category1</Option>
                            <Option value="category2">category2</Option>
                            <Option value="category3">category3</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <h4 className="mb-2">Price</h4>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <h5 className="mb-2 mb-4">Based on previous selections</h5>
              </Col>
            </Row>
            <Button type="ml-2" style={{ width: 120 }} htmlType="submit">
              Buy now
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Advertisement;
