/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import * as actions from "../../../_redux/salesagent/salesagentActions";
import {
  Card,
  Select,
  Input,
  Checkbox,
  Button,
  Radio,
  Form,
  InputNumber,
  Row,
  Col,
} from "antd";
import ImageUploading from "react-images-uploading";
import { CloseCircleOutlined } from "@ant-design/icons";
import { PageHeaderAlt } from "components/layout-components/PageHeaderAlt";
import { addSalesAgent } from "views/_redux/salesagent/salesagentCrud";
import { constant } from "lodash-es";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function NewForm(props) {
  const {
    salesAgentData,
    form,
    onFinish,
    images,
    onChange,
    selectedChanged,
    checkVal,
  } = props;
  var defaultCheckVal = false;
  if (!salesAgentData) {
    form.resetFields();
  } else {
    defaultCheckVal = salesAgentData.enable;
  }

  return (
    <Form
      // {...layout}
      layout="vertical"
      form={form}
      initialValues={salesAgentData}
      name="control-hooks"
      onFinish={onFinish}
      preserve={true}
    >
      <PageHeaderAlt className="border-bottom" overlap>
        <div
          style={{
            paddingLeft: "3vw",
            paddingRight: "3vw",
            marginBottom: "0.2vh",
          }}
        >
          <Flex
            className="py-1"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">Edit Sales Agent</h2>
            <div className="mb-3">
              {/* <Button
                type="primary"
                onClick={gotoList}
                icon={<LeftOutlined />}
                block
              >
                Back
              </Button>{" "} */}
              <Form.Item>
                <Button
                  className="mr-2"
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right", marginBottom: "0.2vh" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      {/* <Card> */}
      {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <h2>Add Vendor</h2>
          </Flex>
          <div></div>
        </Flex> */}
      <div style={{ marginTop: 100 }}>
        <Row gutter={20}>
          <Col span={14}>
            <Card
              title={<h3 style={{ fontWeight: "bold" }}>Vendor</h3>}
              hoverable
              style={{ paddingRight: "2vw", paddingLeft: "2vw" }}
            >
              <Form.Item
                name="username"
                label="User Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="password_reset_key"
                label="Confirm Password"
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
                name="first_name"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="company_name"
                label="Company Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="commission_slab"
                label="Commission Slab"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Enable" rules={[{ required: true }]}>
                <Checkbox
                  name="enable"
                  onChange={selectedChanged}
                  checked={checkVal}
                ></Checkbox>
              </Form.Item>
            </Card>
          </Col>
          <Col span={10}>
            <Card
              hoverable
              title={<h3 style={{ fontWeight: "bold" }}>Logo</h3>}
              style={{ height: "60vh" }}
            >
              <Form.Item rules={[{ required: true }]}>
                <ImageUploading
                  value={images}
                  onChange={onChange}
                  dataURLKey="data_url"
                  name="logo"
                >
                  {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="dropzone dropzone-default dropzone-success dz-clickable dz-clickable dz-started dz-max-files-reached"
                      id="kt_dropzone_3"
                    >
                      <div
                        className="dropzone-msg dz-message needsclick"
                        {...dragProps}
                      >
                        <div className="upload__image-wrapper">
                          <div onClick={onImageUpload}>
                            <h3 className="dropzone-msg-title">
                              Drop image here or click to upload.
                            </h3>
                          </div>
                          &nbsp;
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "center" }}
                        >
                          {imageList.map((image, index) => (
                            <div
                              key={index}
                              className="mr-6 ml-6"
                              style={{ marginLeft: 10 }}
                            >
                              <div
                                className="image-input image-item__btn-wrapper image-input-wrapper"
                                id="kt_image_3"
                              >
                                <span
                                  style={{ float: "right" }}
                                  onClick={() => onImageRemove(index)}
                                >
                                  <CloseCircleOutlined />
                                </span>
                                <div className="image-input-wrapper">
                                  <img
                                    src={image["data_url"]}
                                    alt=""
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: "50%" }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </div>
      {/* </Card> */}
    </Form>
  );
}

function EditForm(props) {
  const { salesAgentData, id } = props;
  const [form] = Form.useForm();
  const [checkVal, setCheckVal] = useState(0);

  const [load, setLoad] = useState(0);
  const onFinish = (values) => {
    values["id"] = id;
    values["enable"] = checkVal;
    delete values["password_reset_key"];
    addSalesAgent(JSON.stringify(values));
  };

  useEffect(() => {
    setLoad(1);
  }, [salesAgentData]);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const addSalesAgent = (values) => {
    dispatch(actions.addSalesAgent(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    // dispatch(actions.setvendorData());
    history.push("/app/sales_agent/list");
  };

  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const selectedChanged = (e) => {
    setCheckVal(e.target.checked);
  };

  return (
    // <div>
    //   {salesAgentData && load == 1 ? (
    <NewForm
      salesAgentData={salesAgentData}
      form={form}
      onFinish={onFinish}
      images={images}
      onChange={onChange}
      selectedChanged={selectedChanged}
      checkVal={checkVal}
    />
    //   ) : (
    //     <div></div>
    //   )}
    // </div>
  );
}

const SalesAgentCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const [checkVal, setCheckVal] = useState(0);
  const { salesAgentData } = useSelector(
    (state) => ({
      salesAgentData: state.salesagent.salesAgentData,
    }),
    shallowEqual
  );

  useEffect(() => {
    setLoad(1);
  }, [salesAgentData]);

  const selectedChanged = (event) => {
    setCheckVal(event.target.checked);
  };

  useEffect(() => {
    if (id != null) {
      setLoad(0);
      dispatch(actions.getSalesAgentData(id, token));
    }
    // else
    // dispatch(actions.setVendorData());
  }, [id]);

  const addSalesAgent = (values) => {
    dispatch(actions.addSalesAgent(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    history.push("/app/sales_agent/list");
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values["enable"] = checkVal;
    addSalesAgent(JSON.stringify(values));
  };

  //////////
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div>
      {id > 0 && (!salesAgentData || load != 1) ? (
        <div></div>
      ) : (
        <EditForm salesAgentData={id > 0 ? salesAgentData : null} id={id} />
      )}
    </div>
  );
};

export default SalesAgentCreate;
