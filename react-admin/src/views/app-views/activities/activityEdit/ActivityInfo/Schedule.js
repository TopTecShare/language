import React, { useState, Fragment, useEffect } from "react";
import * as Yup from "yup";
import {
  Select,
  Form,
  Button,
  Checkbox,
  notification,
  Card,
  Row,
  Col,
  Popover,
  Badge,
} from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { DatePicker } from "antd";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { Prompt } from "react-router";
import moment from "moment";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const { Option } = Select;

function ScheduleForm(props) {
  const {
    activityData,
    addActivityStatusData,
    addActivityId,
    selectDay,
    daySet,
    handleEnableChanged,
    handleRemoveDay,
    form,
    onFinish,
    changeData,
    inputDay,
    handleAddDay,
    handleRemoveFields,
    handleSelectChanged,
    dateRange,
    dateRangehandleChange,
    inputFields,
    handleAddFields,
    endDate,
    startDate,
    startDatehandleChange,
    endDatehandleChange,
    dayDateRangehandleChange,
    dayDateRange,
  } = props;

  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);

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

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "100%", marginTop: 50 }}
    >
      <Prompt
        when={changeData}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Card hoverable>
        <Form.Item>
          <Row gutter={20}>
            <Col span={6}></Col>
            <Col span={6}>
              <label
                className=" col-form-label activity-title"
                style={{ marginRight: 20 }}
              >
                Start Date
              </label>

              <DatePicker
                onChange={startDatehandleChange}
                defaultValue={moment(startDate, dateFormat)}
                format={dateFormat}
              />
            </Col>
            <Col span={6}>
              <label
                className="col-form-label activity-title"
                style={{ marginRight: 20 }}
              >
                End Date
              </label>

              <DatePicker
                onChange={endDatehandleChange}
                defaultValue={moment(endDate, dateFormat)}
                format={dateFormat}
              />
              <Col span={6}></Col>
            </Col>
          </Row>
        </Form.Item>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card hoverable style={{ position: 'relative' }}>
            <Form.Item>

              <Row>
                {/* <div className="col"> */}
                <Button
                  className="mr-2"
                  type="primary"
                  style={{ float: "right" }}
                  onClick={() => handleAddFields()}
                >
                  Add Datewise Data
                </Button>
                {/* </div> */}
              </Row>
              <Row>
                {inputFields.map((inputField, index) => (
                  <Card hoverable style={{ position: 'relative', marginTop: '2vh' }}>

                    <Fragment key={index}>
                      <div
                        style={{ marginTop: 20 }}
                      >
                        <Row>

                          <RangePicker
                            defaultValue={[
                              moment(dateRange[index].start, dateFormat),
                              moment(dateRange[index].end, dateFormat),
                            ]}
                            format={dateFormat}
                            onChange={(e) => dateRangehandleChange(e, index)}
                          />
                        </Row>


                        <div style={{ marginTop: '5vh' }}>
                          <Row gutter={8}>
                            <Col span={20}>

                              <Select
                                name="enable"
                                style={{ width: "100%" }}
                                defaultValue={inputField["enable"]}
                                onChange={(e) => handleSelectChanged(e, index)}
                              >
                                <Option value="0">Disable</Option>
                              </Select>
                            </Col>
                            <Col span={3}></Col>
                            <Col span={1}>

                              <CloseCircleOutlined
                                onClick={() => handleRemoveFields(index)}
                                style={{ position: 'absolute', top: 1, right: 1 }}
                              />



                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Fragment>
                  </Card>
                ))}
              </Row>
              {/* <div className="col-10 form-col"> */}
              {/* </div> */}

              {/* <div className="form-group col"> */}

              {/* </div> */}
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Form.Item>
              <Row>
                <Col>
                  <Button
                    type="primary"
                    className="mr-2"
                    style={{ float: "right", marginBottom: 20 }}
                    onClick={() => handleAddDay()}
                  >
                    Add Daywise Data
                  </Button>
                </Col>
                <Col>
                  {inputDay.map((inputDay, index) => (
                    <Card
                      key={index}
                      hoverable
                      style={{ position: "relative" }}
                    >
                      <Fragment key={index}>
                        <Row gutter={8}>
                          <Col span={16}>
                            <RangePicker
                              style={{ marginBottom: 10 }}
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
                                    style={{ marginLeft: 10 }}
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
                              title="Select week"
                            >
                              <Button type="ghost" shape="round">
                                Select Week
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
                        <Row gutter={8}>
                          <Col span={18}>
                            <Select
                              name="enable"
                              style={{ width: "100%" }}
                              defaultValue={inputDay["enable"]}
                              onChange={(e) => handleEnableChanged(e, index)}
                            >
                              <Option value="0">Disable</Option>
                            </Select>
                          </Col>
                          <Col span={6}>
                            <div
                              className="ml-4 form-label "
                              style={{ marginLeft: 10 }}
                            >
                              <span onClick={() => handleRemoveDay(index)}>
                                <CloseCircleOutlined />
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Fragment>
                    </Card>
                  ))}
                </Col>
              </Row>
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

export default function Schedule(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(0);
  const { editId } = props;
  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    setLoad(1);
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

  let [changeData, setChangeData] = useState(false);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format(dateFormat)
  );
  const [endDate, setEndDate] = useState(moment(new Date()).format(dateFormat));
  const [dateRange, setDateRange] = useState([
    {
      start: moment(new Date()).format(dateFormat),
      end: moment(new Date()).format(dateFormat),
    },
  ]);

  const [dayDateRange, setDayDateRange] = useState([
    {
      start: moment(new Date()).format(dateFormat),
      end: moment(new Date()).format(dateFormat),
    },
  ]);

  useEffect(() => {
    if (activityData?.booking_start_datetime != null)
      setStartDate(activityData?.booking_start_datetime);
    else setStartDate(moment(startDate.toString()).format(dateFormat));
    if (activityData?.booking_end_datetime != null)
      setEndDate(activityData?.booking_end_datetime);
    else setEndDate(moment(endDate.toString()).format(dateFormat));

    let bookingSchd = JSON.parse(activityData?.datewise_booking_schedule);
    if (bookingSchd != null) {
      setInputFields(JSON.parse(activityData?.datewise_booking_schedule));
      let rangList = [],
        enableList = [];
      for (var i = 0; i < bookingSchd.length; i++) {
        var rangeData = {};
        rangeData["start"] = bookingSchd[i].start_date;
        rangeData["end"] = bookingSchd[i].end_date;
        rangList.push(rangeData);

        var enableData = {};
        enableData["enable"] = bookingSchd[i].enable;
        enableList.push(enableData);
      }
      setDateRange(rangList);
    }

    let dayData = JSON.parse(activityData?.daywise_booking_schedule);
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
  ////////////////////////////////////
  const [inputFields, setInputFields] = useState([]);

  const handleAddFields = () => {
    setChangeData(true);
    const values = [...inputFields];
    values.push({
      start_date: moment(new Date()).format(dateFormat),
      end_date: moment(new Date()).format(dateFormat),
      enable: "0",
    });
    setInputFields(values);

    const values1 = [...dateRange];
    values1.push({
      start: moment(new Date()).format(dateFormat),
      end: moment(new Date()).format(dateFormat),
    });
    setDateRange(values1);
  };

  const handleRemoveFields = (index) => {
    setChangeData(true);
    const values = [...inputFields];
    values.splice(index, 1);

    setInputFields(values);

    const values1 = [...dateRange];
    values1.splice(index, 1);
    setDateRange(values1);
  };
  ///////////////////////////////////
  const [inputDay, setInputDay] = useState([]);

  const handleAddDay = () => {
    setChangeData(true);
    setInputDay([
      ...inputDay,
      {
        start_date: moment(new Date()).format(dateFormat),
        end_date: moment(new Date()).format(dateFormat),
        days: [],
        enable: "0",
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
    setChangeData(true);
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);

    const values1 = [...daySet];
    values1.splice(index, 1);
    setDaySet(values1);

    const values2 = [...dayDateRange];
    values2.splice(index, 1);
    setDayDateRange(values2);
  };

  const handleEnableChanged = (event, index) => {
    setChangeData(true);
    const { value } = event.target;
    const list = [...inputDay];
    list[index]["enable"] = value;
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

  /////////////////////////////////////

  const startDatehandleChange = (date, dateString) => {
    setChangeData(true);
    setStartDate(moment(date.toString()).format(dateFormat));
  };
  const endDatehandleChange = (date, dateString) => {
    setChangeData(true);
    setEndDate(moment(date.toString()).format(dateFormat));
  };

  const dateRangehandleChange = (date, index, event) => {
    setChangeData(true);
    // const { value } = event.target;

    const list = [...inputFields];
    list[index]["start_date"] = moment(date[0].toString()).format(dateFormat);
    list[index]["end_date"] = moment(date[1].toString()).format(dateFormat);
    setInputFields(list);

    // setDateRange(event.value);
  };

  const dayDateRangehandleChange = (date, index, event) => {
    const list = [...inputDay];
    list[index]["start_date"] = moment(date[0].toString()).format(dateFormat);
    list[index]["end_date"] = moment(date[1].toString()).format(dateFormat);
    setInputDay(list);

    // setDateRange(event.value);
  };

  const handleSelectChanged = (event, index) => {
    setChangeData(true);
    const list = [...inputFields];
    list[index]["enable"] = event;
    setInputFields(list);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["booking_start_datetime"] = startDate;
    data["booking_end_datetime"] = endDate;
    data["datewise_booking_schedule"] = JSON.stringify(inputFields);
    data["daywise_booking_schedule"] = JSON.stringify(inputDay);

    dispatch(actions.editActivity(data, token));
  };

  return (
    <div>
      {activityData &&
        load == 1 &&
        startDate &&
        endDate &&
        dateRange &&
        inputFields ? (
        <ScheduleForm
          activityData={activityData}
          addActivityStatusData={addActivityStatusData}
          addActivityId={addActivityId}
          selectDay={selectDay}
          daySet={daySet}
          handleEnableChanged={handleEnableChanged}
          handleRemoveDay={handleRemoveDay}
          dateRange={dateRange}
          dateRangehandleChange={dateRangehandleChange}
          handleSelectChanged={handleSelectChanged}
          handleRemoveFields={handleRemoveFields}
          handleAddDay={handleAddDay}
          inputDay={inputDay}
          form={form}
          onFinish={onFinish}
          changeData={changeData}
          inputFields={inputFields}
          handleAddFields={handleAddFields}
          endDate={endDate}
          endDatehandleChange={endDatehandleChange}
          startDate={startDate}
          startDatehandleChange={startDatehandleChange}
          dayDateRangehandleChange={dayDateRangehandleChange}
          dayDateRange={dayDateRange}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

// export default Schedule;
