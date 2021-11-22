/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import * as actions from "../../../_redux/vendortransports/vendortransportsActions";
import {
  Card,
  Select,
  Input,
  Button,
  Checkbox,
  Form,
  InputNumber,
  Row,
  Col,
} from "antd";
import ImageUploading from "react-images-uploading";
import { CloseCircleOutlined } from "@ant-design/icons";

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
    vendorTransportsData,
    form,
    onFinish,
    checkVal,
    selectChanged,
    selectVal,
    handleChange,
    vendorData,
  } = props;
  return (
    <Form
      layout="vertical"
      initialValues={vendorTransportsData}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Form.Item label="Vendor" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          defaultValue={selectVal}
          onChange={handleChange}
          allowClear
        >
          {vendorData?.map((vendor, index) => {
            return (
              <Option key={index} value={vendor.id}>
                {vendor.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="transport_name"
        label="Transprot Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="oneway_price"
        label="Oneway Price"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="twoway_price"
        label="Twoway Price"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Enable" rules={[{ required: true }]}>
        <Checkbox
          name="enable"
          onChange={(e) => selectChanged(e)}
          checked={checkVal}
        ></Checkbox>
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
  const { vendorTransportsData, vendorData, id } = props;
  const [form] = Form.useForm();
  const [load, setLoad] = useState(0);
  const onFinish = (values) => {
    values["id"] = id;
    values["enable"] = checkVal;
    values["vendor_id"] = selectVal;
    addVendorTransport(JSON.stringify(values));
  };

  useEffect(() => {
    setLoad(1);
    setCheckVal(vendorTransportsData?.enable);
    setSelectVal(vendorTransportsData?.vendor_id);
  }, [vendorTransportsData]);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const addVendorTransport = (values) => {
    dispatch(actions.addVendorTransport(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    // dispatch(actions.setvendorMealData());
    history.goBack();
  };
  const [checkVal, setCheckVal] = useState(0);

  const selectChanged = (event) => {
    setCheckVal(event.target.checked);
  };

  const [selectVal, setSelectVal] = useState(1);
  function handleChange(value) {
    setSelectVal(value);
  }

  return (
    <div>
      {vendorTransportsData && load == 1 ? (
        <NewForm
          vendorTransportsData={vendorTransportsData}
          vendorData={vendorData}
          form={form}
          onFinish={onFinish}
          checkVal={checkVal}
          selectChanged={selectChanged}
          selectVal={selectVal}
          handleChange={handleChange}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

const VendorTransCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { vendorTransportsData, vendorData } = useSelector(
    (state) => ({
      vendorData: state.vendortransports.vendorData,
      vendorTransportsData: state.vendortransports.vendorTransportsData,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.getVendor());

    if (id != null) {
      dispatch(actions.getVendorTransportData(id, token));
      setLoad(1);
    }
    // else
    // dispatch(actions.setvendorMealData());
  }, [id]);

  const addVendorTransport = (values) => {
    dispatch(actions.addVendorTransport(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    history.goBack();
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values["id"] = 0;
    values["enable"] = checkVal;
    addVendorTransport(JSON.stringify(values));
  };

  //////////
  const [checkVal, setCheckVal] = useState(0);

  const selectChanged = (event) => {
    setCheckVal(event.target.checked);
  };

  return (
    <Row justify="center">
      <Col span={18}>
        <Card hoverable style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <h2>Add VendorTransport</h2>
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
                <Form.Item
                  name="vendor_id"
                  label="Vendor"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                  >
                    {vendorData?.map((vendor, index) => {
                      return (
                        <Option key={index} value={vendor.id}>
                          {vendor.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="transport_name"
                  label="Transprot Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="oneway_price"
                  label="Oneway Price"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="twoway_price"
                  label="Twoway Price"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Enable" rules={[{ required: true }]}>
                  <Checkbox
                    name="enable"
                    onChange={(e) => selectChanged(e)}
                    checked={checkVal}
                  ></Checkbox>
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
            )}
            {id != 0 && vendorTransportsData && load == 1 && (
              <EditForm
                vendorTransportsData={vendorTransportsData}
                id={id}
                vendorData={vendorData}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default VendorTransCreate;
