/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import * as actions from "../../../_redux/vendors/vendorsActions";
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
    vendorData,
    form,
    onFinish,
    images,
    onChange,
    checkVal,
    selectedChanged,
  } = props;
  // const { vendorData, form, onFinish, images, onChange } = props;
  return (
    <Form
      {...layout}
      initialValues={vendorData}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      {/* <PageHeaderAlt className="border-bottom" overlap>
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">Add New Vendor</h2>
            <div className="mb-3">
              <Button className="mr-2">Discard</Button>
              <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                // loading={submitLoading}
              >
                Add
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt> */}
      <Form.Item label="Logo" rules={[{ required: true }]}>
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
                <div className="row" style={{ justifyContent: "center" }}>
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
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="our_commission"
        label="Our Commission"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="allowed_users"
        label="Allowed Users"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
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
    </Form>
  );
}

function EditForm(props) {
  const { vendorData, id } = props;
  const [form] = Form.useForm();
  const [load, setLoad] = useState(0);
  const onFinish = (values) => {
    values["id"] = id;
    values["enable"] = checkVal;
    addVendor(JSON.stringify(values));
  };

  useEffect(() => {
    setLoad(1);
  }, [vendorData]);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const addVendor = (values) => {
    dispatch(actions.addVendor(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    // dispatch(actions.setvendorData());
    history.goBack();
  };

  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const [checkVal, setCheckVal] = useState(0);

  const selectedChanged = (val) => {
    setCheckVal(val);
  };

  return (
    <div>
      {vendorData && load == 1 ? (
        <NewForm
          vendorData={vendorData}
          form={form}
          onFinish={onFinish}
          images={images}
          onChange={onChange}
          checkVal={checkVal}
          selectedChanged={selectedChanged}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

const VendorCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const [checkVal, setCheckVal] = useState(0);
  const { vendorData } = useSelector(
    (state) => ({
      vendorData: state.vendors.vendorData,
    }),
    shallowEqual
  );

  const selectedChanged = (event) => {
    setCheckVal(event.target.checked);
  };

  useEffect(() => {
    if (id != null) {
      dispatch(actions.getVendorData(id, token));
    }
    // else
    // dispatch(actions.setVendorData());
  }, [id]);

  const addVendor = (values) => {
    dispatch(actions.addVendor(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    // history.goBack();
    history.push("/app/vendors/list");
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values["enable"] = checkVal;
    // values["id"] = 0;

    addVendor(JSON.stringify(values));
  };

  //////////
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div>
      {id != 0 && vendorData && load == 1 ? (
        <EditForm vendorData={vendorData} id={id} />
      ) : (
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
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
                <h2 className="mb-3">Add New Vendor</h2>
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
                    name="name"
                    label="Name"
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
                    name="confirmpwd"
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
                    name="firstname"
                    label="First Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="companyname"
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
                    name="commision_slab"
                    label="Commision Slab"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Enable" rules={[{ required: true }]}>
                    <Checkbox
                      name="enable"
                      onChange={(e) => selectedChanged(e)}
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
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemove,
                        dragProps,
                      }) => (
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
      )}
    </div>
  );
};

export default VendorCreate;
