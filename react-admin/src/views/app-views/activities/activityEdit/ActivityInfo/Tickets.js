import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Button,
  Input,
  Checkbox,
  InputNumber,
  Select,
  notification,
  message,
  Col,
  Row,
  Card,
} from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { CloseCircleOutlined } from "@ant-design/icons";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const { Option } = Select;

function Tickets(props) {
  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    dispatch(actions.getPlatformData(token));
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const { addActivityId, activityData, addActivityStatusData, platformData, vendorData } =
    useSelector(
      (state) => ({
        addActivityId: state.activities.addActivityId,
        activityData: state.activities.activityData,
        addActivityStatusData: state.activities.addActivityStatusData,
        platformData: state.activities.platformData,
        vendorData: state.activities.vendorData,
      }),
      shallowEqual
    );

  const [vendorId, setVendorId] = useState(0);

  useEffect(() => {
    dispatch(actions.getVendorData(vendorId, token));
  }, [vendorId]);

  const editActivity = (values) => {
    dispatch(actions.editActivity(values, token));
  };

  const makeRandomId = () => {
    var result = addActivityId;
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const [randomId, setRandomId] = useState(makeRandomId());

  ////////////////////////////////////////////////////
  const [inputFields, setInputFields] = useState([]);

  const handleAddFields = () => {
    setRandomId(makeRandomId());
    setInputFields([
      ...inputFields,
      {
        id: randomId,
        ticket_name: "",
        ticket_name_ar: "",
        cost_price: 0,
        markup_price: 0,
        publish_price: 0,
        daily_limit: 0,
        enable: false,
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const dailyChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["daily_limit"] = value;
    setInputFields(list);
  };

  const srcPriceChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["cost_price"] = value;
    setInputFields(list);
  };

  const markupPriceChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["markup_price"] = value;
    setInputFields(list);
  };

  const publishPriceChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["publish_price"] = value;
    setInputFields(list);
  };

  const ticketNameChanged = ({ target: { value } }, index) => {
    const list = [...inputFields];
    list[index]["ticket_name"] = value;
    setInputFields(list);
  };

  const ticketNameARChanged = ({ target: { value } }, index) => {
    const list = [...inputFields];
    list[index]["ticket_name_ar"] = value;
    setInputFields(list);
  };

  const enableChanged = (event, index) => {
    const value = event.target.checked;
    const list = [...inputFields];
    list[index]["enable"] = value;
    setInputFields(list);
  };

  useEffect(() => {
    let bookingSchd = JSON.parse(activityData?.tickets);
    if (bookingSchd != null) {
      let rangList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["key"] = bookingSchd[i].id;
        rangeData["id"] = bookingSchd[i].id;
        rangeData["ticket_name"] = bookingSchd[i].ticket_name;
        rangeData["ticket_name_ar"] = bookingSchd[i].ticket_name_ar;
        rangeData["daily_limit"] = bookingSchd[i].daily_limit;
        rangeData["platforms"] = bookingSchd[i].platforms;
        rangeData["cost_price"] = bookingSchd[i].cost_price;
        rangeData["markup_price"] = bookingSchd[i].markup_price;
        rangeData["publish_price"] = bookingSchd[i].publish_price;
        rangeData["enable"] = bookingSchd[i].enable;
        rangList.push(rangeData);
      }
      setInputFields(rangList);
    }

    setRandomId(makeRandomId());

    setVendorId(activityData.vendor_id);

  }, [activityData]);

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

  useEffect(() => {
    let lst = [];
    for (var i = 0; i < platformData.length; i++) {
      let data = {};
      data["key"] = platformData[i].id;

      data["id"] = platformData[i].id;
      data["platform_name"] = platformData[i].name;
      lst.push(data);
    }
    setActivityListData(lst);
  }, [platformData]);
  const [activityListData, setActivityListData] = useState([]);
  const onActivityChange = (event, index, option) => {
    let value = [];
    option.map((item, index) => {
      value.push({
        id: item.key,
        platform_name: item.value,
      });
    });
    const list = [...inputFields];
    list[index]["platforms"] = value;
    setInputFields(list);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["tickets"] = JSON.stringify(inputFields);

    var iLength = inputFields.length;
    if (iLength != 0) {
      for (var i = 0; i < iLength; i++) {
        if (
          inputFields[i].ticket_name == "" ||
          inputFields[i].markup_price == 0
        ) {
          // notification.open({
          //     message: 'Warning',
          //     description:
          //         "Ticket English Name and Markup Price must be input. Please input",
          // });

          message.error("Please enter all required field ");

          return;
        }
      }
    }

    editActivity(JSON.stringify(data));
  };

  return (
    <Form
      form={form}
      initialValues={activityData}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "100%", marginTop: 50 }}
    >
      <Form.Item>
        <div>
          <Row>
            <Button
              className="mr-2"
              type="primary"
              style={{ float: "right", marginBottom: "3vh", marginLeft: "2vw" }}
              onClick={() => handleAddFields()}
            >
              Add
            </Button>
          </Row>

          <Row gutter={16}>
            {inputFields.map((inputDate, index) => {
              let tempData = [];
              inputDate.platforms &&
                inputDate.platforms.map((item, index) =>
                  tempData.push(item.platform_name)
                );
              return (
                <Col key={index} span={8}>
                  <Fragment key={index}>
                    <Card
                      title={`ID: ${inputDate.id}`}
                      extra={
                        <div>
                          <Checkbox
                            name="enable"
                            onChange={(e) => enableChanged(e, index)}
                            checked={inputDate.enable}
                          >
                            Enable
                          </Checkbox>
                          <CloseCircleOutlined
                            onClick={() => handleRemoveFields(index)}
                          />
                        </div>
                      }
                      hoverable
                      style={{ position: "relative" }}
                    >
                      {/* <Row justify="start">
                        <Col span={24}>

                          <Input
                            name="random"
                            readOnly
                            style={{ width: "100px", height: "40px" }}
                            value={inputDate.id}
                          />
                        </Col>
                      </Row> */}
                      <div>
                        <Row justify="center">
                          <Col span={24}>
                            <label className="col-form-label" style={{}}>
                              Ticket Name:
                            </label>
                            <Input
                              style={{ width: "100%", height: "40px" }}
                              value={inputDate.ticket_name}
                              onChange={(e) => ticketNameChanged(e, index)}
                            />
                          </Col>
                        </Row>
                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              <label className="col-form-label">
                                Ticket Name AR:
                              </label>
                              <Input
                                style={{ width: "100%", height: "40px" }}
                                value={inputDate.ticket_name_ar}
                                onChange={(e) => ticketNameARChanged(e, index)}
                              />
                            </Col>
                          </Row>
                        </div>

                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              {/* <MultiSelect
                            data={activityListData}
                            onChange={(e) => onActivityChange(e, index)}
                            value={inputDate.platforms}
                            dataItemKey="id"
                            textField="platform_name"
                          /> */}
                              <label className="col-form-label">
                                Platforms
                              </label>
                              <Select
                                mode="multiple"
                                placeholder="Inserted are removed"
                                value={tempData}
                                onChange={(e, option) =>
                                  onActivityChange(e, index, option)
                                }
                                style={{ width: "100%" }}
                              >
                                {activityListData.map((item) => (
                                  <Select.Option
                                    key={item.id}
                                    value={item.platform_name}
                                  >
                                    {item.platform_name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              <label>
                                Cost Price
                                <InputNumber
                                  style={{ width: "100%" }}
                                  min={0}
                                  onChange={(e) => srcPriceChanged(e, index)}
                                  defaultValue={inputDate.cost_price}
                                />{" "}
                              </label>
                            </Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              <label>
                                MarkUp Price
                                <InputNumber
                                  style={{ width: "100%" }}
                                  min={0}
                                  onChange={(e) => markupPriceChanged(e, index)}
                                  defaultValue={inputDate.markup_price}
                                />{" "}
                              </label>
                            </Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              <label>
                                Publish Price
                                <BsFillInfoCircleFill
                                  style={{ marginLeft: "5px" }}
                                  data-tip={
                                    "Markup Price: AED" +
                                    inputDate.markup_price +
                                    ", Sale Price: AED" +
                                    inputDate.cost_price +
                                    ", You Get: AED" +
                                    (inputDate.cost_price * (100 - vendorData)) / 100
                                  }
                                />
                                <ReactTooltip />
                                <InputNumber
                                  style={{ width: "100%" }}
                                  min={0}
                                  onChange={(e) => publishPriceChanged(e, index)}
                                  defaultValue={inputDate.publish_price}
                                />{" "}
                              </label>
                            </Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Row justify="center">
                            <Col span={24}>
                              <label>
                                Daily Limit
                                <InputNumber
                                  style={{ width: "100%" }}
                                  min={0}
                                  onChange={(e) => dailyChanged(e, index)}
                                  defaultValue={inputDate.daily_limit}
                                />{" "}
                              </label>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </Fragment>
                </Col>
              );
            })}
          </Row>
        </div>
      </Form.Item>

      <Form.Item>
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

export default Tickets;
