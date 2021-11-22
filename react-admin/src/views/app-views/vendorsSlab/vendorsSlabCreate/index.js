/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import * as actions from "../../../_redux/vendorsslab/vendorsslabActions";
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
  const { vendorsSlabData, form, onFinish } = props;
  return (
    <Form
      layout="vertical"
      initialValues={vendorsSlabData}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Form.Item
        name="slab_name"
        label="Meal Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="percentage"
        label="Percentage"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} max={100} style={{ width: "100%" }} />
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
  const { vendorsSlabData, id } = props;
  const [form] = Form.useForm();
  const [load, setLoad] = useState(0);
  const onFinish = (values) => {
    values["id"] = id;
    addVendorsSlab(JSON.stringify(values));
  };

  useEffect(() => {
    setLoad(1);
  }, [vendorsSlabData]);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const addVendorsSlab = (values) => {
    dispatch(actions.addVendorsSlab(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    // dispatch(actions.setvendorMealData());
    history.goBack();
  };

  return (
    <div>
      {vendorsSlabData && load == 1 ? (
        <NewForm
          vendorsSlabData={vendorsSlabData}
          form={form}
          onFinish={onFinish}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

const VendorsSlabCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { vendorsSlabData } = useSelector(
    (state) => ({
      vendorsSlabData: state.vendorsslab.vendorsSlabData,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (id != null) {
      dispatch(actions.getVendorsSlabData(id, token));
      setLoad(1);
    }
    // else
    // dispatch(actions.setvendorMealData());
  }, [id]);

  const addVendorsSlab = (values) => {
    dispatch(actions.addVendorsSlab(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    history.goBack();
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values["id"] = 0;
    addVendorsSlab(JSON.stringify(values));
  };

  return (
    <Row justify="center">
      <Col span={18}>
        <Card hoverable style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <h2>Add Agent Slabs</h2>
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
                  name="slab_name"
                  label="Meal Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="percentage"
                  label="Percentage"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} max={100} style={{ width: "100%" }} />
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
            {id != 0 && vendorsSlabData && load == 1 && (
              <EditForm vendorsSlabData={vendorsSlabData} id={id} />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default VendorsSlabCreate;
