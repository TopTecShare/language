/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import {
  Card,
  Select,
  Input,
  Button,
  Checkbox,
  Form,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from "antd";
import ImageUploading from "react-images-uploading";
import { CloseCircleOutlined } from "@ant-design/icons";
import * as actions from "../../../_redux/linkedactivities/linkedactivitiesActions";
import { text } from "d3-fetch";

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
    linkedactivityData,
    form,
    onFinish,
    handleAdd,
    handleRemove,
    textChanged,
    handleIdChange,
    inputData,
    activityListData,
    linkedName,
    nameChange,
  } = props;
  return (
    <Form
      initialValues={linkedactivityData}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ marginTop: 100 }}
    >
      <div className="form-group row">
        <div className="col-3"></div>
        <div className="col-6">
          <Form.Item label="LinkedActivity Name" rules={[{ required: true }]}>
            <Input
              style={{ width: "300px" }}
              defaultValue={linkedName}
              onChange={(e) => nameChange(e)}
            />
          </Form.Item>
        </div>
        <div className="col-3"></div>
      </div>
      <Form.Item>
        <div className="form-group row" style={{ marginTop: "50px" }}>
          <div className="col-2">
            <Button type="primary" className="mr-2" onClick={() => handleAdd()}>
              Add
            </Button>
          </div>

          <div className="col-10 form-row">
            {inputData.map((inputData, index) => (
              <Fragment key={index}>
                <div className="col-12 form-row" style={{ marginTop: 20 }}>
                  <div className="col-4">
                    <Input
                      style={{ width: "250px" }}
                      defaultValue={inputData["display_name"]}
                      onChange={(e) => textChanged(index, e)}
                    />
                  </div>
                  <div className="col-4">
                    <Select
                      style={{ width: "250px" }}
                      defaultValue={inputData["activity_id"]}
                      onChange={(e) => handleIdChange(e, index)}
                    >
                      {activityListData?.map((activity, index) => {
                        return (
                          <Option key={index} value={activity.id}>
                            {activity.activity_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-form-label">
                    <span onClick={() => handleRemove(index)}>
                      <CloseCircleOutlined />
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
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
  const { linkedactivityData, activityList, id } = props;
  const [form] = Form.useForm();
  const [load, setLoad] = useState(0);
  const onFinish = (values) => {
    let data = {};
    data["name"] = linkedName;
    data["linked_activities"] = inputData;

    let lstData = [];
    lstData.push(data);
    let value = {};
    value["linked_activties"] = JSON.stringify(lstData);
    value["id"] = id;
    editLinkedActivity(JSON.stringify(value));
  };

  useEffect(() => {
    setLoad(1);
  }, [linkedactivityData]);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

  const editLinkedActivity = (values) => {
    dispatch(actions.editLinkedActivities(values, token)).then(() =>
      gotoList()
    );
  };

  const gotoList = () => {
    // dispatch(actions.setvendorMealData());
    history.goBack();
  };

  //////
  useEffect(() => {
    if (linkedactivityData != null) {
      setLinkedName(JSON.parse(linkedactivityData.linked_activties)[0].name);

      let tblData = JSON.parse(linkedactivityData.linked_activties)[0]
        .linked_activities;
      let tblDataLst = [];
      for (var i = 0; i < tblData.length; i++) {
        let lst = {};
        lst["display_name"] = tblData[i].display_name;
        lst["activity_id"] = tblData[i].activity_id;
        tblDataLst.push(lst);
      }

      setInputData(tblDataLst);
    } else {
      setLinkedName("");
      setInputData([]);
    }
  }, [linkedactivityData]);

  const [linkedName, setLinkedName] = useState("");

  const nameChange = (event) => {
    const value = event.target.value;
    setLinkedName(value);
  };

  const [activityListData, setActivityListData] = useState([]);
  useEffect(() => {
    let lst = [];
    for (var i = 0; i < activityList.length; i++) {
      let data = {};
      data["id"] = activityList[i].id;
      data["activity_name"] = activityList[i].activity_name;
      lst.push(data);
    }
    setActivityListData(lst);
  }, [activityList]);

  const [inputData, setInputData] = useState([]);

  const handleAdd = () => {
    const values = [...inputData];
    values.push({ display_name: "", activity_id: 0 });
    setInputData(values);
  };

  const handleRemove = (index) => {
    const values = [...inputData];
    values.splice(index, 1);
    setInputData(values);
  };

  const textChanged = (index, event) => {
    const value = event.target.value;
    const list = [...inputData];
    list[index]["display_name"] = value;
    setInputData(list);
  };

  const handleIdChange = (event, index) => {
    const value = event;
    const list = [...inputData];
    list[index]["activity_id"] = value;

    setInputData(list);
  };

  return (
    <div>
      {linkedactivityData && load == 1 ? (
        <NewForm
          linkedactivityData={linkedactivityData}
          activityListData={activityListData}
          form={form}
          onFinish={onFinish}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          textChanged={textChanged}
          handleIdChange={handleIdChange}
          inputData={inputData}
          linkedName={linkedName}
          nameChange={nameChange}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

const LinkedActivityCreate = ({
  match: {
    params: { id },
  },
}) => {
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { linkedactivityData, activityList } = useSelector(
    (state) => ({
      linkedactivityData: state.linkedactivities.linkedactivityData,
      activityList: state.linkedactivities.activityList,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.getActivityList());

    if (id != null) {
      dispatch(actions.getLinkedActivityData(id, token));
      setLoad(1);
    }
    // else
    // dispatch(actions.setvendorMealData());
  }, [id]);

  const addLinkedActivity = (values) => {
    dispatch(actions.addLinkedActivities(values, token)).then(() => gotoList());
  };

  const gotoList = () => {
    history.goBack();
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["name"] = values["name"];
    data["linked_activities"] = inputData;

    let lstData = [];
    lstData.push(data);
    let value = {};
    value["linked_activties"] = JSON.stringify(lstData);

    addLinkedActivity(JSON.stringify(value));
  };

  //////

  const [activityListData, setActivityListData] = useState([]);
  useEffect(() => {
    let lst = [];
    for (var i = 0; i < activityList.length; i++) {
      let data = {};
      data["id"] = activityList[i].id;
      data["activity_name"] = activityList[i].activity_name;
      lst.push(data);
    }
    setActivityListData(lst);
  }, [activityList]);

  const [inputData, setInputData] = useState([]);

  const handleAdd = () => {
    const values = [...inputData];
    values.push({ display_name: "", activity_id: 0 });
    setInputData(values);
  };

  const handleRemove = (index) => {
    const values = [...inputData];
    values.splice(index, 1);
    setInputData(values);
  };

  const textChanged = (index, event) => {
    const value = event.target.value;
    const list = [...inputData];
    list[index]["display_name"] = value;
    setInputData(list);
  };

  const handleIdChange = (event, index) => {
    const value = event;
    const list = [...inputData];
    list[index]["activity_id"] = value;

    setInputData(list);
  };

  return (
    <Row justify="center">
      <Col span={18}>
        <Card hoverable style={{ paddingRight: "4vw", paddingLeft: "4vw" }}>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <h2>Add LinkedActivity</h2>
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
          <div>
            {id == null && (
              <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ marginTop: 100 }}
              >
                <div className="form-group row">
                  <Form.Item
                    name="name"
                    label="LinkedActivity Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <Form.Item>
                  <div className="form-group row" style={{ marginTop: "50px" }}>
                    <div className="col-2">
                      <Button
                        type="primary"
                        className="mr-2"
                        onClick={() => handleAdd()}
                      >
                        Add
                      </Button>
                    </div>

                    <div style={{ marginTop: "2vh" }}>
                      {inputData.map((inputData, index) => (
                        <Fragment key={index}>
                          <Row justify="space-between">
                            <Col span={8}>
                              <Input
                                defaultValue={inputData["display_name"]}
                                onChange={(e) => textChanged(index, e)}
                              />
                            </Col>
                            <Col span={8}>
                              <Select
                                defaultValue={inputData["activity_id"]}
                                onChange={(e) => handleIdChange(e, index)}
                              >
                                {activityListData?.map((activity, index) => {
                                  return (
                                    <Option key={index} value={activity.id}>
                                      {activity.activity_name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Col>
                            <Col span={1}>
                              <CloseCircleOutlined
                                onClick={() => handleRemove(index)}
                                style={{ marginTop: "2vh" }}
                              />
                            </Col>
                          </Row>
                          <div
                            className="col-12 form-row"
                            style={{ marginTop: 20 }}
                          >
                            <div className="col-4"></div>
                            <div className="col-4"></div>
                            <div className="col-form-label"></div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
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
            {id != 0 && linkedactivityData && load == 1 && (
              <EditForm
                linkedactivityData={linkedactivityData}
                id={id}
                activityList={activityList}
              />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LinkedActivityCreate;
