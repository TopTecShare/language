import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { useHistory } from "react-router-dom";
import { Card, Select, Input, Button, Radio, Form, notification } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function BasicForm(props) {
  const { activityData, addActivityStatusData, addActivityId } = props;

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const editActivity = (values) => {
    dispatch(actions.editActivity(values, token));
  };

  useEffect(() => {
    setRadValue(activityData?.activity_type);
    setSelectVal(selectValue);
  }, [activityData]);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    values["id"] = addActivityId;
    values["activity_type"] = radValue;
    values["vendor_id"] = selectVal;
    editActivity(JSON.stringify(values));
  };

  const [radValue, setRadValue] = useState(1);

  const radChanged = (e) => {
    setRadValue(e.target.value);
  };

  ////////dialog///////
  useEffect(() => {
    if (addActivityStatusData != null) {
      openNotification();
      dispatch(actions.setActivityStatusData(token));
    }
  }, [addActivityStatusData]);

  const openNotification = () => {
    notification.open({
      message: "Success",
      description: addActivityStatusData,
    });
  };

  const [selectVal, setSelectVal] = useState(1);
  function handleChange(value) {
    setSelectVal(value);
  }

  const selectValue = activityData?.vendor_id.toString();

  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      // className="ant-advanced-search-form"
      initialValues={activityData}
    >
      <Card hoverable style={{ width: '60vw', marginLeft: '3vw', marginTop: '5vh' }}>
        <Form.Item label="Vendor" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            defaultValue={selectValue}
            onChange={handleChange}
            allowClear
          >
            <Option value="1">Super Admin</Option>
            <Option value="2">Vendor</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="activity_type"
          label="Type"
          rules={[{ required: true }]}
        >
          <Radio.Group onChange={radChanged} value={radValue}>
            <Radio value={1}>Activity One</Radio>
            <Radio value={2}>Activity Two</Radio>
            <Radio value={3}>Activity Three</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="activity_name"
          label="English Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="activity_name_ar"
          label="Arabic Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="activity_description"
          label="English Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="activity_description_ar"
          label="Arabic Description"
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
      </Card>
    </Form>
  );
}

function BasicInfo(props) {
  const { editId } = props;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    setLoad(1);
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const { addActivityStatusData, addActivityId, activityData, errorEdit } =
    useSelector(
      (state) => ({
        addActivityStatusData: state.activities.addActivityStatusData,
        addActivityId: state.activities.addActivityId,
        activityData: state.activities.activityData,
        errorEdit: state.activities.errorEdit,
      }),
      shallowEqual
    );
  return (
    <div>
      {activityData && load == 1 ? (
        <BasicForm
          activityData={activityData}
          addActivityStatusData={addActivityStatusData}
          addActivityId={addActivityId}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default BasicInfo;
