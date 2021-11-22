import React, { useState, useEffect, Fragment } from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  notification,
  message,
  Card,
  Row,
  Col,
  Popover,
  Badge,
} from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import moment from "moment";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { isLength } from "lodash-es";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function BookingLimits(props) {
  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const { addActivityId, activityData, addActivityStatusData } = useSelector(
    (state) => ({
      addActivityId: state.activities.addActivityId,
      activityData: state.activities.activityData,
      addActivityStatusData: state.activities.addActivityStatusData,
    }),
    shallowEqual
  );

  const editActivity = (values) => {
    dispatch(actions.editActivity(values, token));
  };

  ////////////////////////////////////////////////////
  const [inputFields, setInputFields] = useState([]);
  const [daySet, setDaySet] = useState([]);

  const setSelectDay = (index, data, spliceNum) => {
    const values = [...daySet];
    for (var i = 0; i < data[index].days.length; i++) {
      if (data[index].days[i] == 1) values[index].mon = true;
      if (data[index].days[i] == 2) values[index].tues = true;
      if (data[index].days[i] == 3) values[index].wed = true;
      if (data[index].days[i] == 4) values[index].thur = true;
      if (data[index].days[i] == 5) values[index].fri = true;
      if (data[index].days[i] == 6) values[index].sat = true;
      if (data[index].days[i] == 0) values[index].sun = true;
    }

    if (spliceNum == 1) values[index].mon = false;
    if (spliceNum == 2) values[index].tues = false;
    if (spliceNum == 3) values[index].wed = false;
    if (spliceNum == 4) values[index].thur = false;
    if (spliceNum == 5) values[index].fri = false;
    if (spliceNum == 6) values[index].sat = false;
    if (spliceNum == 0) values[index].sun = false;
    setDaySet(values);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        start_date: moment(new Date()).format(dateFormat),
        end_date: moment(new Date()).format(dateFormat),
        daily_limit: 0,
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const startDateChanged = (date, index) => {
    const list = [...inputFields];
    list[index]["start_date"] = moment(date.toString()).format(dateFormat);
    setInputFields(list);
  };

  const endDateChanged = (date, index) => {
    const list = [...inputFields];
    list[index]["end_date"] = moment(date.toString()).format(dateFormat);
    setInputFields(list);
  };

  const adultChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["daily_limit"] = value;
    setInputFields(list);
  };

  ////////////////////////////////////////////////////
  const [inputDay, setInputDay] = useState([]);

  const handleAddDay = () => {
    setInputDay([
      ...inputDay,
      {
        start_date: moment(new Date()).format(dateFormat),
        end_date: moment(new Date()).format(dateFormat),
        days: [],
        daily_limit: 0,
      },
    ]);
    setDaySet([
      ...daySet,
      {
        mon: false,
        tues: false,
        wed: false,
        thur: false,
        fri: false,
        sat: false,
        sun: false,
      },
    ]);

    const values1 = [...dayDateRange];
    values1.push({
      start: moment(new Date()).format(dateFormat),
      end: moment(new Date()).format(dateFormat),
    });
    setDayDateRange(values1);
  };

  const handleRemoveDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);

    const values2 = [...dayDateRange];
    values2.splice(index, 1);
    setDayDateRange(values2);
  };

  const adultDayChanged = (value, index) => {
    const list = [...inputDay];
    list[index]["daily_limit"] = value;
    setInputDay(list);
  };

  const selectDay = (event, index) => {
    const list = [...inputDay];
    const value = event.target.checked;
    let spliceNum = -1;
    if (value) {
      list[index]["days"].push(Number(event.target.name));
    } else {
      for (var i = 0; i < list[index]["days"].length; i++) {
        if (list[index]["days"][i] == event.target.name) {
          list[index]["days"].splice(i, 1);
          spliceNum = event.target.name;
        }
      }
    }
    setInputDay(list);

    setSelectDay(index, list, spliceNum);
  };

  useEffect(() => {
    let bookingSchd = JSON.parse(activityData?.datewise_booking_limits);
    if (bookingSchd != null) {
      let rangList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = bookingSchd[i].start_date;
        rangeData["end_date"] = bookingSchd[i].end_date;
        rangeData["daily_limit"] = bookingSchd[i].daily_limit;
        rangList.push(rangeData);
      }
      setInputFields(rangList);
    }

    let dayData = JSON.parse(activityData?.daywise_bookinglimit_options);
    if (dayData != null) {
      setInputDay(dayData);

      const list = [];
      for (var index = 0; index < dayData.length; index++) {
        let values = {};
        values["mon"] = false;
        values["tues"] = false;
        values["wed"] = false;
        values["thur"] = false;
        values["fri"] = false;
        values["sat"] = false;
        values["sun"] = false;

        for (var i = 0; i < dayData[index].days.length; i++) {
          if (dayData[index].days[i] == 1) values.mon = true;
          if (dayData[index].days[i] == 2) values.tues = true;
          if (dayData[index].days[i] == 3) values.wed = true;
          if (dayData[index].days[i] == 4) values.thur = true;
          if (dayData[index].days[i] == 5) values.fri = true;
          if (dayData[index].days[i] == 6) values.sat = true;
          if (dayData[index].days[i] == 0) values.sun = true;
        }
        list.push(values);
      }
      setDaySet(list);

      let rangList = [];
      for (var i = 0; i < dayData.length; i++) {
        var rangeData = {};
        rangeData["start"] = dayData[i].start_date;
        rangeData["end"] = dayData[i].end_date;
        rangList.push(rangeData);
      }
      setDayDateRange(rangList);
    }
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

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["daily_limit"] = values.daily_limit;
    data["overall_bookings_limit"] = values.overall_bookings_limit;
    data["datewise_booking_limits"] = JSON.stringify(inputFields);
    data["daywise_bookinglimit_options"] = JSON.stringify(inputDay);

    var iLength = inputDay.length;
    if (iLength != 0) {
      for (var i = 0; i < iLength; i++) {
        var daysData = inputDay[i].days;
        if (daysData.length == 0) {
          // notification.open({
          //   message: 'Warning',
          //   description:
          //     "Checkbox must be selected. Please select.",
          // });

          message.error("Checkbox must be selected");

          return;
        }
      }
    }

    editActivity(JSON.stringify(data));
  };

  /////////////////////////
  const [dayDateRange, setDayDateRange] = useState([
    {
      start: moment(new Date()).format(dateFormat),
      end: moment(new Date()).format(dateFormat),
    },
  ]);

  const dayDateRangehandleChange = (date, index, event) => {
    const list = [...inputDay];
    list[index]["start_date"] = moment(date[0].toString()).format(dateFormat);
    list[index]["end_date"] = moment(date[1].toString()).format(dateFormat);
    setInputDay(list);
  };

  return (
    <Form
      form={form}
      initialValues={activityData}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "100%", marginTop: 50 }}
    >
      <Card hoverable>
        <Row>
          <Col span={6}></Col>
          <Col span={6}>
            <Form.Item
              name="daily_limit"
              label="Daily Limit"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="overall_bookings_limit"
              label="Overall Limit"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card hoverable>
            <Form.Item>
              <Col>
                <Row>
                  <Button
                    type="primary"
                    className="mr-2"
                    style={{ float: "right", marginBottom: 10 }}
                    onClick={() => handleAddFields()}
                  >
                    Add Datewise Data
                  </Button>
                </Row>
                <Row>
                  {inputFields.map((inputDate, index) => (
                    <Card
                      key={index}
                      style={{ position: "relative", marginLeft: 20 }}
                      hoverable
                    >
                      <Fragment key={index}>
                        <Row>
                          <Col span={16}>
                            <label className=" col-form-label activity-title">
                              Start Date
                            </label>
                            <div>
                              <DatePicker
                                onChange={(e) => startDateChanged(e, index)}
                                defaultValue={moment(
                                  inputDate.start_date,
                                  dateFormat
                                )}
                                format={dateFormat}
                              />
                            </div>

                            <label className="col-form-label activity-title">
                              End Date
                            </label>
                            <div>
                              <DatePicker
                                onChange={(e) => endDateChanged(e, index)}
                                defaultValue={moment(
                                  inputDate.end_date,
                                  dateFormat
                                )}
                                format={dateFormat}
                              />
                            </div>
                          </Col>
                          <Col span={8}>
                            <div style={{ marginTop: 20 }}>
                              <label>
                                Daily Adult Limit
                                <InputNumber
                                  min={0}
                                  defaultValue={inputDate.daily_limit}
                                  onChange={(e) => adultChanged(e, index)}
                                />
                              </label>
                            </div>
                            <div className="col-form-label">
                              <span
                                style={{
                                  position: "absolute",
                                  top: 0.1,
                                  right: 0.1,
                                }}
                                onClick={() => handleRemoveFields(index)}
                              >
                                <CloseCircleOutlined size={10} />
                              </span>
                            </div>
                          </Col>
                        </Row>

                        <div className="col-1"></div>
                      </Fragment>
                    </Card>
                  ))}
                </Row>
              </Col>
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Form.Item>
              <Col>
                <Row>
                  <Button
                    type="primary"
                    className="mr-2"
                    style={{ float: "right", marginBottom: 10 }}
                    onClick={() => handleAddDay()}
                  >
                    Add Daywise Data
                  </Button>
                </Row>
                <Row>
                  {inputDay.map((inputDay, index) => (
                    <Card
                      hoverable
                      style={{ position: "relative" }}
                      key={index}
                    >
                      <Fragment key={index}>
                        <Row gutter={8}>
                          <Col span={16}>
                            <RangePicker
                              defaultValue={[
                                moment(dayDateRange[index].start, dateFormat),
                                moment(dayDateRange[index].end, dateFormat),
                              ]}
                              format={dateFormat}
                              onChange={(e) =>
                                dayDateRangehandleChange(e, index)
                              }
                            />
                          </Col>
                          <Col span={8}>
                            <Popover
                              content={
                                <div>
                                  <Checkbox
                                    name="1"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].mon}
                                  >
                                    Monday
                                  </Checkbox>
                                  <Checkbox
                                    name="2"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].tues}
                                  >
                                    Tuseday
                                  </Checkbox>
                                  <Checkbox
                                    name="3"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].wed}
                                  >
                                    Wednesday
                                  </Checkbox>
                                  <Checkbox
                                    name="4"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].thur}
                                  >
                                    Thursday
                                  </Checkbox>
                                  <Checkbox
                                    name="5"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].fri}
                                  >
                                    Friday
                                  </Checkbox>
                                  <Checkbox
                                    name="6"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].sat}
                                  >
                                    Saturday
                                  </Checkbox>
                                  <Checkbox
                                    name="0"
                                    onChange={(e) => selectDay(e, index)}
                                    checked={daySet[index].sun}
                                  >
                                    Sunday
                                  </Checkbox>
                                </div>
                              }
                              title="Please select date"
                              trigger="hover"
                            >
                              <Button type="primary" ghost shape="round">
                                Select Date
                              </Button>
                            </Popover>
                          </Col>
                        </Row>
                        <div style={{ marginTop: 4, marginBottom: 6 }}>
                          <Row gutter={8}>
                            <Col>
                              {daySet[index].mon && (
                                <Badge status="pink" text="Monday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].tues && (
                                <Badge status="red" text="Thuesday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].wed && (
                                <Badge status="yellow" text="Wednesday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].thur && (
                                <Badge status="orange" text="Thursday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].fri && (
                                <Badge status="cyan" text="Friday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].sat && (
                                <Badge status="magenta" text="Saturday" />
                              )}
                            </Col>
                            <Col>
                              {daySet[index].sun && (
                                <Badge status="blue" text="Sunday" />
                              )}
                            </Col>
                          </Row>
                        </div>
                        <Row>
                          <Col span={16}>
                            <label style={{ marginLeft: 4, marginTop: 10 }}>
                              Daily Adult Limit:
                              <InputNumber
                                style={{ marginLeft: 4 }}
                                min={0}
                                defaultValue={inputDay.daily_limit}
                                onChange={(e) => adultDayChanged(e, index)}
                              />
                            </label>
                          </Col>
                          <Col span={8}>
                            <div
                              className="col-form-label"
                              style={{ marginLeft: 36, marginTop: 4 }}
                            >
                              <Button
                                type="ghost"
                                danger
                                onClick={() => handleRemoveDay(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Fragment>
                    </Card>
                  ))}
                </Row>
              </Col>
            </Form.Item>
          </Card>
        </Col>
      </Row>

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

export default BookingLimits;
