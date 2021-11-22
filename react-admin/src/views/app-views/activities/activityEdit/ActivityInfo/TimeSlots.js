import React, { useState, Fragment, useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Checkbox,
  DatePicker,
  TimePicker,
  InputNumber,
  notification,
  Card,
  Row,
  Col,
  Space,
  Divider,
  Popover,
  Badge,
} from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import moment from "moment";
import { CloseCircleOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const timeFormat = "HH:mm";
const dateFormat = "YYYY-MM-DD";

const TimeSlots = (props) => {
  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const { activityData, addActivityId, addActivityStatusData } = useSelector(
    (state) => ({
      activityData: state.activities.activityData,
      addActivityId: state.activities.addActivityId,
      addActivityStatusData: state.activities.addActivityStatusData,
    }),
    shallowEqual
  );

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

  const makeRandomIdT = () => {
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
  const [randomIdT, setRandomIdT] = useState(makeRandomIdT());

  const [inputFields, setInputFields] = useState([]);
  const [addTimeSlotData, setAddTimeSlotData] = useState([]);
  const [daySet, setDaySet] = useState([]);

  const setSelectDay = (index, data, spliceNum) => {
    const values = [...daySet];
    for (var i = 0; i < data[index].days.length; i++) {
      if (data[index].days[i] === 1) values[index].mon = true;
      if (data[index].days[i] === 2) values[index].tues = true;
      if (data[index].days[i] === 3) values[index].wed = true;
      if (data[index].days[i] === 4) values[index].thur = true;
      if (data[index].days[i] === 5) values[index].fri = true;
      if (data[index].days[i] === 6) values[index].sat = true;
      if (data[index].days[i] === 0) values[index].sun = true;
    }

    if (spliceNum === 1) values[index].mon = false;
    if (spliceNum === 2) values[index].tues = false;
    if (spliceNum === 3) values[index].wed = false;
    if (spliceNum === 4) values[index].thur = false;
    if (spliceNum === 5) values[index].fri = false;
    if (spliceNum === 6) values[index].sat = false;
    if (spliceNum === 0) values[index].sun = false;
    setDaySet(values);
  };

  const handleAddFields = () => {
    setRandomIdT(makeRandomIdT());
    setInputFields([
      ...inputFields,
      {
        id: randomIdT,
        start_time: moment(new Date()).format(dateFormat),
        end_time: moment(new Date()).format(dateFormat),
        enable: false,
        daliy_limit: 0,
      },
    ]);
    setAddTimeSlotData([
      ...inputFields,
      {
        id: randomIdT,
        start_time: moment(new Date()).format(dateFormat),
        end_time: moment(new Date()).format(dateFormat),
        enable: false,
        daliy_limit: 0,
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setAddTimeSlotData(values);
  };

  const startTimeChanged = (time, index) => {
    const list = [...inputFields];
    list[index]["start_time"] = moment(time.toString()).format(timeFormat);
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const endTimeChanged = (time, index) => {
    const list = [...inputFields];
    list[index]["end_time"] = moment(time.toString()).format(timeFormat);
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const adultChanged = (value, index) => {
    const list = [...inputFields];
    list[index]["daliy_limit"] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  const [enableTimeslots, setEnableTimeSlots] = React.useState(false);
  const enableChanged = (event, index) => {
    const value = event.target.checked;
    const list = [...inputFields];
    list[index]["enable"] = value;
    setInputFields(list);
    setAddTimeSlotData(list);
  };

  /////////////////////////////////////////////////////
  const [inputDate, setInputDate] = useState([]);

  const handleAddFieldsDateTimeslots = (index) => {
    let startDate = inputDate[index]["start_date"];
    let endDate = inputDate[index]["end_date"];
    let timeSlts = inputDate[index]["timeslots"];
    let timeData = {
      id: randomId,
      start_time: moment(new Date()).format(dateFormat),
      end_time: moment(new Date()).format(dateFormat),
      daliy_limit: 0,
      enable: false,
    };
    timeSlts.push(timeData);

    let newArr = [...inputDate];
    newArr[index] = {
      start_date: startDate,
      end_date: endDate,
      timeslots: timeSlts,
    };

    setRandomId(makeRandomId());
    setInputDate(newArr);
  };

  const startDateChanged = (date, index) => {
    const list = [...inputDate];
    list[index]["start_date"] = moment(date.toString()).format(dateFormat);
    setInputDate(list);
  };

  const endDateChanged = (date, index) => {
    const list = [...inputDate];
    list[index]["end_date"] = moment(date.toString()).format(dateFormat);
    setInputDate(list);
  };

  const handleAddFieldsDate = () => {
    setInputDate([
      ...inputDate,
      {
        start_date: moment(new Date()).format(dateFormat),
        end_date: moment(new Date()).format(dateFormat),
        timeslots: [...addTimeSlotData],
      },
    ]);
    setRandomId(makeRandomId());
  };

  const handleRemoveFieldsDate = (index) => {
    const values = [...inputDate];
    values.splice(index, 1);
    setInputDate(values);
  };

  const handleRemoveFieldsDateTimeslot = (index, i) => {
    let newArr = [...inputDate];
    newArr[index]["timeslots"].splice(i, 1);
    setInputDate(newArr);
  };

  const enableTimeSlotsChanged = (event) => {
    const value = event.target.checked;
    setEnableTimeSlots(value);
  };

  const startTimeSlotChanged = (time, i, index) => {
    const list = [...inputDate];
    list[i]["timeslots"][index]["start_time"] = moment(time.toString()).format(
      timeFormat
    );
    setInputDate(list);
  };

  const endTimeSlotChanged = (time, i, index) => {
    const list = [...inputDate];
    list[i]["timeslots"][index]["end_time"] = moment(time.toString()).format(
      timeFormat
    );
    setInputDate(list);
  };

  const adultSlotChanged = (value, i, index) => {
    const list = [...inputDate];
    list[i]["timeslots"][index]["daliy_limit"] = value;
    setInputDate(list);
  };

  const enableSlotChanged = (event, i, index) => {
    const value = event.target.checked;
    const list = [...inputDate];
    list[i]["timeslots"][index]["enable"] = value;
    setInputDate(list);
  };

  /////////////////////////////////////////////////////
  const [inputDay, setInputDay] = useState([]);

  const handleAddFieldsDayTimeslots = (index) => {
    let days = inputDay[index]["days"];
    let timeSlts = inputDay[index]["timeslots"];
    let startRDate = inputDay[index]["start_date"];
    let endRDate = inputDay[index]["end_date"];
    let timeData = {
      id: randomId,
      start_time: moment(new Date()).format(dateFormat),
      end_time: moment(new Date()).format(dateFormat),
      daliy_limit: 0,
      enable: false,
    };
    timeSlts.push(timeData);

    let newArr = [...inputDay];
    newArr[index] = {
      days: days,
      timeslots: timeSlts,
      start_date: startRDate,
      end_date: endRDate,
    };

    setRandomId(makeRandomId());
    setInputDay(newArr);
  };

  const handleAddFieldsDay = () => {
    setInputDay([
      ...inputDay,
      {
        start_date: moment(new Date()).format(dateFormat),
        end_date: moment(new Date()).format(dateFormat),
        days: [],
        timeslots: [...addTimeSlotData],
      },
    ]);
    setRandomId(makeRandomId());

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

  const handleRemoveFieldsDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);

    const values2 = [...dayDateRange];
    values2.splice(index, 1);
    setDayDateRange(values2);
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

  const handleRemoveFieldsDayTimeslot = (index, i) => {
    let newArr = [...inputDay];
    newArr[index]["timeslots"].splice(i, 1);
    setInputDay(newArr);
  };

  const startDayTimeSlotChanged = (time, i, index) => {
    const list = [...inputDay];
    list[i]["timeslots"][index]["start_time"] = moment(time.toString()).format(
      timeFormat
    );
    setInputDay(list);
  };

  const endDayTimeSlotChanged = (time, i, index) => {
    const list = [...inputDay];
    list[i]["timeslots"][index]["end_time"] = moment(time.toString()).format(
      timeFormat
    );
    setInputDay(list);
  };

  const adultDaySlotChanged = (value, i, index) => {
    const list = [...inputDay];
    list[i]["timeslots"][index]["daliy_limit"] = value;
    setInputDay(list);
  };

  const enableDaySlotChanged = (event, i, index) => {
    const value = event.target.checked;
    const list = [...inputDay];
    list[i]["timeslots"][index]["enable"] = value;
    setInputDay(list);
  };

  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (activityData?.timeslots === "1") setEnableTimeSlots(true);
    else setEnableTimeSlots(false);

    let bookingSchd = JSON.parse(activityData?.timeslot_options);
    if (bookingSchd != null) {
      let rangList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["id"] = bookingSchd[i].id;
        rangeData["start_time"] = bookingSchd[i].start_time;
        rangeData["end_time"] = bookingSchd[i].end_time;
        rangeData["enable"] = bookingSchd[i].enable;
        rangeData["daliy_limit"] = bookingSchd[i].daliy_limit;
        rangList.push(rangeData);
      }
      setInputFields(rangList);
      setAddTimeSlotData(rangList);
    }

    let inputDateData = JSON.parse(activityData?.datewise_timeslot_options);
    if (inputDateData != null) {
      let sltList = [];
      for (var i = 0; i < inputDateData.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = inputDateData[i].start_date;
        rangeData["end_date"] = inputDateData[i].end_date;
        rangeData["timeslots"] = [];

        for (var j = 0; j < inputDateData[i].timeslots.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["id"] = inputDateData[i].timeslots[j].id;
          rangeChildDate["start_time"] =
            inputDateData[i].timeslots[j].start_time;
          rangeChildDate["end_time"] = inputDateData[i].timeslots[j].end_time;
          rangeChildDate["enable"] = inputDateData[i].timeslots[j].enable;
          rangeChildDate["daliy_limit"] =
            inputDateData[i].timeslots[j].daliy_limit;

          rangeData["timeslots"].push(rangeChildDate);
        }
        sltList.push(rangeData);
      }

      setInputDate(sltList);
    }

    let dayData = JSON.parse(activityData?.daywise_timeslot_options);
    if (dayData != null) {
      let sltList = [];
      for (var i = 0; i < dayData.length; i++) {
        var rangeData1 = {};
        rangeData1["days"] = dayData[i].days;
        rangeData1["timeslots"] = [];

        for (var j = 0; j < dayData[i].timeslots.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["id"] = dayData[i].timeslots[j].id;
          rangeChildDate["start_time"] = dayData[i].timeslots[j].start_time;
          rangeChildDate["end_time"] = dayData[i].timeslots[j].end_time;
          rangeChildDate["enable"] = dayData[i].timeslots[j].enable;
          rangeChildDate["daliy_limit"] = dayData[i].timeslots[j].daliy_limit;

          rangeData1["timeslots"].push(rangeChildDate);
        }
        sltList.push(rangeData1);
      }

      setInputDay(sltList);

      /////////////
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

        for (var i = 0; i < dayData[index].days?.length; i++) {
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

    setRandomId(makeRandomId());
    setRandomIdT(makeRandomIdT());
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

  ////////////
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["timeslot_options"] = JSON.stringify(inputFields);
    data["timeslots"] = enableTimeslots;
    data["datewise_timeslot_options"] = JSON.stringify(inputDate);
    data["daywise_timeslot_options"] = JSON.stringify(inputDay);

    dispatch(actions.editActivity(data, token));
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
          <Checkbox
            style={{ float: "right" }}
            name="enableTimeSlots"
            checked={enableTimeslots}
            onChange={(e) => enableTimeSlotsChanged(e)}
          >
            Enable TimeSlots
          </Checkbox>

          <Button
            className="mr-2"
            type="primary"
            style={{ float: "right" }}
            onClick={() => handleAddFields()}
          >
            Add
          </Button>
        </Row>

        <div style={{ marginTop: "10px" }}>
          {inputFields.map((inputField, index) => (
            <Fragment key={index}>
              <Row key={index} gutter={20}>
                <Col span={4}>
                  <Input
                    name="random"
                    readOnly
                    style={{ width: "100px", height: "40px", marginLeft: 30 }}
                    value={inputField.id}
                  />
                </Col>
                <Col span={4}>
                  <TimePicker
                    onChange={(e) => startTimeChanged(e, index)}
                    defaultValue={moment(inputField.start_time, timeFormat)}
                    format={timeFormat}
                  />
                </Col>
                <Col span={4}>
                  <TimePicker
                    onChange={(e) => endTimeChanged(e, index)}
                    defaultValue={moment(inputField.end_time, timeFormat)}
                    style={{}}
                    format={timeFormat}
                  />
                </Col>
                <Col span={6}>
                  <label>
                    <InputNumber
                      onChange={(e) => adultChanged(e, index)}
                      defaultValue={inputField.daliy_limit}
                      min={0}
                    />{" "}
                    Daliy Limit
                  </label>
                </Col>
                <Col span={4}>
                  <Checkbox
                    name="enable"
                    onChange={(e) => enableChanged(e, index)}
                    checked={inputField.enable}
                    style={{ marginTop: 6 }}
                  >
                    {" "}
                    Enable{" "}
                  </Checkbox>
                </Col>
                <Col span={2}>
                  <Space align="center">
                    <CloseCircleOutlined
                      style={{ marginTop: 13 }}
                      onClick={() => handleRemoveFields(index)}
                    />
                  </Space>
                </Col>
              </Row>
            </Fragment>
          ))}
        </div>
      </Card>
      <Row gutter={8}>
        <Col span={12}>
          <Card hoverable>
            <Row>
              <Button
                className="mr-2"
                type="primary"
                style={{ float: "right", marginBottom: 20 }}
                onClick={() => handleAddFieldsDate()}
              >
                Add Datewise Data
              </Button>
            </Row>
            <Row gutter={8}>
              {inputDate.map((inputDate, index) => (
                <Card hoverable>
                  <Fragment key={index}>
                    <Row gutter={6}>
                      <Col span={11}>
                        <DatePicker
                          onChange={(e) => startDateChanged(e, index)}
                          defaultValue={moment(
                            inputDate.start_date,
                            dateFormat
                          )}
                          format={dateFormat}
                        />
                      </Col>
                      <Col span={11}>
                        <DatePicker
                          onChange={(e) => endDateChanged(e, index)}
                          defaultValue={moment(inputDate.end_date, dateFormat)}
                          format={dateFormat}
                        />
                      </Col>
                      <Col span={2}>
                        <CloseCircleOutlined
                          onClick={() => handleRemoveFieldsDate(index)}
                        />
                      </Col>
                    </Row>
                    <div style={{ marginTop: 20 }}>
                      <Button
                        className="mr-2"
                        type="primary"
                        style={{ float: "right", marginBottom: 10 }}
                        onClick={() => handleAddFieldsDateTimeslots(index)}
                      >
                        Add TimeSlots
                      </Button>
                      <Divider />
                      {inputDate["timeslots"].map((dateTimeSlot, i) => (
                        <Fragment key={i}>
                          <div>
                            <Row gutter={10}>
                              <Col span={10}>
                                <TimePicker
                                  onChange={(e) =>
                                    startTimeSlotChanged(e, index, i)
                                  }
                                  defaultValue={moment(
                                    dateTimeSlot.start_time,
                                    timeFormat
                                  )}
                                  format={timeFormat}
                                />
                              </Col>
                              <Col span={4}></Col>
                              <Col span={10}>
                                <TimePicker
                                  onChange={(e) =>
                                    endTimeSlotChanged(e, index, i)
                                  }
                                  defaultValue={moment(
                                    dateTimeSlot.end_time,
                                    timeFormat
                                  )}
                                  format={timeFormat}
                                />
                              </Col>
                            </Row>
                            <div style={{ marginTop: 10 }}>
                              <Row gutter={4}>
                                <Col span={6}>
                                  <Input
                                    name="random"
                                    readOnly
                                    style={{ width: "100px", height: "40px" }}
                                    value={dateTimeSlot.id}
                                  />
                                </Col>
                                <Col span={10}>
                                  <label>
                                    <InputNumber
                                      onChange={(e) =>
                                        adultSlotChanged(e, index, i)
                                      }
                                      defaultValue={dateTimeSlot.daliy_limit}
                                      min={0}
                                    />{" "}
                                    Daliy Limit
                                  </label>
                                </Col>
                                <Col span={6}>
                                  <Checkbox
                                    name="enable"
                                    onChange={(e) =>
                                      enableSlotChanged(e, index, i)
                                    }
                                    checked={dateTimeSlot.enable}
                                    style={{ marginTop: 6 }}
                                  >
                                    Enable
                                  </Checkbox>
                                </Col>
                                <Col span={2}>
                                  <CloseCircleOutlined
                                    onClick={() =>
                                      handleRemoveFieldsDateTimeslot(index, i)
                                    }
                                    style={{ marginTop: 12 }}
                                  />
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <Divider></Divider>
                        </Fragment>
                      ))}
                    </div>
                  </Fragment>
                </Card>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Row>
              <Button
                className="mr-2"
                type="primary"
                style={{ float: "right", marginBottom: 20 }}
                onClick={() => handleAddFieldsDay()}
              >
                Add Daywise Data
              </Button>
            </Row>
            <Row gutter={8}>
              {inputDay.map((inputDay, index) => (
                <Card>
                  <Fragment key={index}>
                    <Row gutter={8}>
                      <Col span={14}>
                        <RangePicker
                          defaultValue={[
                            moment(dayDateRange[index].start, dateFormat),
                            moment(dayDateRange[index].end, dateFormat),
                          ]}
                          format={dateFormat}
                          onChange={(e) => dayDateRangehandleChange(e, index)}
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
                          trigger="hover"
                          title="Please select date"
                        >
                          <Button type="ghost">Select Week</Button>
                        </Popover>
                      </Col>
                      <Col span={2}>
                        <CloseCircleOutlined
                          style={{ marginTop: 10 }}
                          onClick={() => handleRemoveFieldsDay(index)}
                        />
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
                    <div style={{ marginTop: "20px" }}>
                      <Button
                        className="mr-2"
                        type="primary"
                        style={{
                          float: "right",
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                        onClick={() => handleAddFieldsDayTimeslots(index)}
                      >
                        Add TimeSlots
                      </Button>
                      <Divider />

                      {inputDay["timeslots"].map((dateTimeSlot, i) => (
                        <Fragment key={i}>
                          <div>
                            <Row gutter={10}>
                              <Col span={10}>
                                <TimePicker
                                  onChange={(e) =>
                                    startDayTimeSlotChanged(e, index, i)
                                  }
                                  defaultValue={moment(
                                    dateTimeSlot.start_time,
                                    timeFormat
                                  )}
                                />
                              </Col>
                              <Col span={4}></Col>
                              <Col span={10}>
                                <TimePicker
                                  onChange={(e) =>
                                    endDayTimeSlotChanged(e, index, i)
                                  }
                                  defaultValue={moment(
                                    dateTimeSlot.end_time,
                                    timeFormat
                                  )}
                                />
                              </Col>
                            </Row>
                            <div style={{ marginTop: 10 }}>
                              <Row gutter={4}>
                                <Col span={6}>
                                  <Input
                                    name="random"
                                    readOnly
                                    style={{ width: "100px", height: "40px" }}
                                    value={dateTimeSlot.id}
                                  />
                                </Col>
                                <Col span={10}>
                                  <label>
                                    <InputNumber
                                      onChange={(e) =>
                                        adultDaySlotChanged(e, index, i)
                                      }
                                      defaultValue={dateTimeSlot.daliy_limit}
                                    />{" "}
                                    Daliy Limit
                                  </label>
                                </Col>
                                <Col span={6}>
                                  <Checkbox
                                    name="enable"
                                    onChange={(e) =>
                                      enableDaySlotChanged(e, index, i)
                                    }
                                    checked={dateTimeSlot.enable}
                                    style={{ marginTop: 8 }}
                                  >
                                    Enable
                                  </Checkbox>
                                </Col>
                                <Col span={2}>
                                  <CloseCircleOutlined
                                    style={{ marginTop: 14 }}
                                    onClick={() =>
                                      handleRemoveFieldsDayTimeslot(index, i)
                                    }
                                  />
                                </Col>
                              </Row>
                              <Divider></Divider>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </Fragment>
                </Card>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
      {/* <div className="form-group row" style={{ marginTop: "50px" }}>
        <div className="col-2"></div>
        <div className="col-10 form-row"></div>
      </div> */}

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
};

export default TimeSlots;
