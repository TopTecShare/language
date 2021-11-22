import React, { useState, useEffect, useRef, Fragment } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../../_redux/activities/activitiesActions";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import {
  Input,
  Select,
  Button,
  Checkbox,
  DatePicker,
  Form,
  notification,
  Table,
  InputNumber,
  Card,
  Row,
  Col,
} from "antd";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { NumericTextBox } from "@progress/kendo-react-inputs";
// import "@progress/kendo-theme-default/dist/all.css";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import { FormItemContext } from "antd/lib/form/context";

const { Option } = Select;
let customIndex = 0;
const dateFormat = "YYYY-MM-DD";

function Price(props) {
  const initialDataState = {
    sort: [
      {
        field: "code",
        dir: "asc",
      },
    ],
    take: 10,
    skip: 0,
  };

  const dispatch = useDispatch();
  const { editId } = props;
  const [vendorId, setVendorId] = useState(0);

  useEffect(() => {
    dispatch(actions.getPlatformData());
    dispatch(actions.getIdData(editId, token));
  }, []);

  useEffect(() => {
    dispatch(actions.getVendorData(vendorId, token));
  }, [vendorId]);

  const [dataState, setDataState] = useState(initialDataState);
  const [platList, setPlatList] = useState([]);

  const {
    activityData,
    addActivityId,
    platformData,
    addActivityStatusData,
    vendorData,
  } = useSelector(
    (state) => ({
      activityData: state.activities.activityData,
      addActivityId: state.activities.addActivityId,
      platformData: state.activities.platformData,
      addActivityStatusData: state.activities.addActivityStatusData,
      vendorData: state.activities.vendorData,
    }),
    shallowEqual
  );

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);

  const [inputDate, setInputDate] = useState([]);
  const [inputDay, setInputDay] = useState([]);

  const [listData, setListData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    let platPriceData = JSON.parse(activityData?.platforms_pricing_options);
    if (platPriceData != null) setPlatList(platPriceData);

    const list = [...inputDate];
    let inputDateData = JSON.parse(
      activityData?.datewise_platform_pricing_options
    );
    if (inputDateData != null) {
      let sltList = [];
      for (var i = 0; i < inputDateData.length; i++) {
        var rangeData = {};
        rangeData["start_date"] = inputDateData[i].start_date;
        rangeData["end_date"] = inputDateData[i].end_date;
        rangeData["pricing"] = [];

        for (var j = 0; j < inputDateData[i].pricing.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["platform_id"] =
            inputDateData[i].pricing[j].platform_id;
          rangeChildDate["platform_name"] =
            inputDateData[i].pricing[j].platform_name;
          rangeChildDate["published_price"] =
            inputDateData[i].pricing[j].published_price;
          rangeChildDate["sale_percent"] =
            inputDateData[i].pricing[j].sale_percent;

          rangeData["pricing"].push(rangeChildDate);
        }
        sltList.push(rangeData);
        list[i] = rangeData;
      }
      setInputDate(list);
    }

    const dayList = [...inputDay];
    let inputDayData = JSON.parse(
      activityData?.daywise_platform_pricing_options
    );
    if (inputDayData != null) {
      let sltList = [];
      for (var i = 0; i < inputDayData.length; i++) {
        var rangeData = {};
        rangeData["day"] = inputDayData[i].day;
        rangeData["pricing"] = [];

        for (var j = 0; j < inputDayData[i].pricing.length; j++) {
          var rangeChildDate = {};
          rangeChildDate["platform_id"] =
            inputDayData[i].pricing[j].platform_id;
          rangeChildDate["platform_name"] =
            inputDayData[i].pricing[j].platform_name;
          rangeChildDate["published_price"] =
            inputDayData[i].pricing[j].published_price;
          rangeChildDate["sale_percent"] =
            inputDayData[i].pricing[j].sale_percent;

          rangeData["pricing"].push(rangeChildDate);
        }
        sltList.push(rangeData);
        dayList[i] = rangeData;
      }
      setInputDay(dayList);
    }

    let ticketData = JSON.parse(activityData?.tickets);
    if (ticketData != null) {
      let ticketList = [];
      for (var k = 0; k < ticketData.length; k++) {
        if (ticketData[k].enable) {
          ticketList.push(ticketData[k]);
        }
      }
      setTicketData(ticketList);
    }

    setVendorId(activityData.vendor_id);
  }, [activityData]);

  ///////////////////////////
  useEffect(() => {
    const listD = [];
    for (var i = 0; i < platformData.length; i++) {
      let ticData = JSON.parse(activityData?.tickets);
      let ticDataList = [];
      if (ticData != null) {
        for (var k = 0; k < ticData.length; k++) {
          if (ticData[k].enable) {
            let data = {};
            data["ticket_id"] = ticData[k].id;
            data["price"] = ticData[k].markup_price;
            data["markup_price"] = ticData[k].markup_price;
            data["publish_price"] = ticData[k].publish_price;
            ticDataList.push(data);
          }
        }
      }

      let data = {};
      data["id"] = platformData[i].id - 1;
      data["platform_id"] = platformData[i].id;
      data["platform_name"] = platformData[i].name;
      data["published_price"] = ticDataList;
      data["sale_percent"] = 0;
      listD.push(data);
    }
    setListData(listD);

    ///////////////////////

    if (!activityData?.platforms_pricing_options) {
      const list = [];
      for (var i = 0; i < platformData.length; i++) {
        let ticketData = JSON.parse(activityData?.tickets);
        let ticketDataList = [];
        if (ticketData != null) {
          for (var k = 0; k < ticketData.length; k++) {
            if (ticketData[k].enable) {
              let data = {};
              data["ticket_id"] = ticketData[k].id;
              data["price"] = ticketData[k].markup_price;
              data["markup_price"] = ticketData[k].markup_price;
              data["publish_price"] = ticketData[k].publish_price;
              ticketDataList.push(data);
            }
          }
        }
        console.log("ticketData===", ticketDataList);

        let data = {};
        data["Platform_id"] = platformData[i].id;
        data["Platform_name"] = platformData[i].name;
        data["Published_price"] = ticketDataList;
        data["Sale_percent"] = 0;
        list.push(data);
      }
      setPlatList(list);
    }
  }, [platformData]);

  /////////////////////////////////////////////////////
  const handleAddFieldsDate = () => {
    setInputDate([
      ...inputDate,
      {
        start_date: new Date(),
        end_date: new Date(),
        pricing: listData,
      },
    ]);
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

  const handleRemoveFieldsDate = (index) => {
    const values = [...inputDate];
    values.splice(index, 1);
    setInputDate(values);
  };

  const percentChanged = (val, record, index) => {
    console.log("props=", record);
    const { value } = val;
    const list1 = [...inputDate];
    for (var k = 0; k < list1[index]["pricing"].length; k++) {
      list1[index]["pricing"][record.id]["sale_percent"] = value;
      for (
        var j = 0;
        j < list1[index]["pricing"][record.id].published_price.length;
        j++
      ) {
        list1[index]["pricing"][record.id].published_price[j].price =
          (value + 1) *
          list1[index]["pricing"][record.id].published_price[j].markup_price;
      }
    }
    setInputDate(list1);
  };

  ///////////////////////////////////////////////////////////////////////
  const handleAddFieldsDay = () => {
    setInputDay([
      ...inputDay,
      {
        day: "Monday",
        pricing: listData,
      },
    ]);
  };

  const handleRemoveFieldsDay = (index) => {
    const values = [...inputDay];
    values.splice(index, 1);
    setInputDay(values);
  };

  const percentDayChanged = (val, record, index) => {
    console.log("record=", record);
    const value = val;
    const list1 = [...inputDay];
    for (var k = 0; k < list1[index]["pricing"].length; k++) {
      list1[index]["pricing"][record.id]["sale_percent"] = value;
      for (
        var j = 0;
        j < list1[index]["pricing"][record.id].published_price.length;
        j++
      ) {
        list1[index]["pricing"][record.id].published_price[j].price =
          (value + 1) *
          list1[index]["pricing"][record.id].published_price[j].markup_price;
      }
    }
    setInputDay(list1);
  };

  const handleDayChanged = (value, index) => {
    const list = [...inputDay];
    list[index]["day"] = value;
    setInputDay(list);
  };

  const percentChangedF = (props, event) => {
    console.log("hello===", props, event);
    const list = [...platList];
    for (var i = 0; i < list.length; i++) {
      if (list[i].Platform_id == event.Platform_id) {
        list[i].Sale_percent = props;
        for (var j = 0; j < list[i].Published_price.length; j++) {
          list[i].Published_price[j].price =
            (props + 1) * list[i].Published_price[j].markup_price;
        }
      }
    }
    setPlatList(list);
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

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["platforms_pricing_options"] = JSON.stringify(platList);

    data["datewise_platform_pricing_options"] = JSON.stringify(inputDate);
    data["daywise_platform_pricing_options"] = JSON.stringify(inputDay);

    dispatch(actions.editActivity(data, token));
  };

  const columns1 = [
    {
      title: "id",
      dataIndex: "Platform_id",
      key: "Platform_id",
    },
    {
      title: "Platform Name",
      dataIndex: "Platform_name",
      key: "Platform_name",
    },
    {
      title: "Published Price",
      dataIndex: "Published_price",
      key: "Published_price",
      render: (text, record) =>
        text.map((item, index) => (
          <td key={index}>
            <Input readOnly value={item.price} style={{ width: "80px" }} />
            <BsFillInfoCircleFill
              style={{ marginLeft: "5px" }}
              data-tip={
                "Markup Price: AED" +
                item.markup_price +
                ", Sale Price: AED" +
                item.price +
                ", Publish Price: AED" +
                item.publish_price +
                ", You Get: AED" +
                (item.price * (100 - vendorData)) / 100
              }
            />
            <ReactTooltip />
          </td>
        )),
    },

    {
      title: "Sale Percent",
      dataIndex: "Sale_percent",
      key: "Sale_percent",
      render: (text, record) => (
        <InputNumber
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          value={text}
          onChange={(e) => percentChangedF(e, record)}
        />
      ),
    },
  ];
  const columns2 = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Platform Name",
      dataIndex: "platform_name",
      key: "Platform_name",
    },
    {
      title: "publish_price",
      dataIndex: "published_price",
      key: "Published_price",
      render: (text, record) =>
        text.map((item, index) => (
          <td key={index}>
            <Input
              formatter={(value) => `${value}%`}
              readOnly
              parser={(value) => value.replace("%", "")}
              value={item.price}
              style={{ width: "80px" }}
            />
          </td>
        )),
    },
    {
      title: "Sale Percentage",
      dataIndex: "sale_percent",
      key: "sale_percent",
      render: (item, record) => (
        <InputNumber
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          value={item}
          onChange={(e) => percentChanged(e, record, customIndex, record.id)}
        />
      ),
    },
  ];

  const columns3 = [
    {
      title: "Id",
      dataIndex: "platform_id",
      key: "id",
    },

    {
      title: "Platform Name",
      dataIndex: "platform_name",
      key: "Platform_name",
    },
    {
      title: "publish_price",
      dataIndex: "published_price",
      key: "Published_price",
      render: (text, record) =>
        text.map((item, index) => (
          <td key={index}>
            <Input
              formatter={(value) => `${value}%`}
              readOnly
              parser={(value) => value.replace("%", "")}
              value={item.price}
              style={{ width: "80px" }}
            />
          </td>
        )),
    },
    {
      title: "Sale Percentage",
      dataIndex: "sale_percentage",
      key: "sale_percentage",
      render: (item, record) => (
        <InputNumber
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          value={item}
          onChange={(e) => percentDayChanged(e, record, customIndex, record.id)}
        />
      ),
    },
  ];
  return (
    <Form
      form={form}
      initialValues={activityData}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "100%", marginTop: 100 }}
    >
      {/* <div className="form-group row">
        <div className="col-2"></div>
        <div className="col-8">
          <Grid
            pageable={true}
            sortable={true}
            // filterable={true}
            style={{
              height: "auto",
            }}
            data={process(platList || [], dataState)}
            {...dataState}
            onDataStateChange={(e) => {
              setDataState(e.dataState);
            }}
          >
            <Column field="Platform_id" title="Id" width="80px" hidden={true} />
            <Column field="Platform_name" title="Platform Name" />
            {ticketData.map((ticketData, index) => (
              <Column
                field="Published_price"
                title={ticketData.ticket_name}
                key={index}
                cell={(props) => (
                  <td>
                    <Input
                      readOnly
                      value={props.dataItem.Published_price[index].price}
                      style={{ width: "80px" }}
                    />
                    <BsFillInfoCircleFill
                      style={{ marginLeft: "5px" }}
                      data-tip={
                        "Markup Price: AED" +
                        props.dataItem.Published_price[index].markup_price +
                        ", Sale Price: AED" +
                        props.dataItem.Published_price[index].price +
                        ", You Get: AED" +
                        (props.dataItem.Published_price[index].price *
                          (100 - vendorData)) /
                          100
                      }
                    />
                    <ReactTooltip />
                  </td>
                )}
              />
            ))}

            <Column
              field="Sale_percentage"
              title="Sale Percentage"
              cell={(props) => (
                <td>
                  <NumericTextBox
                    format="p"
                    max={1}
                    min={0}
                    step={0.01}
                    value={props.dataItem.Sale_percent}
                    onChange={(e) => percentChangedF(props, e)}
                  /> */}
      {/* <InputNumber
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    defalutvalue={props.dataItem.Sale_percent}
                    onChange={e => percentChangedF(e, props)}
                  /> */}
      {/* </td>
              )}
            />
          </Grid>
        </div>
        <div className="col-2"></div>
      </div> */}
      <Card hoverable>
        <Table columns={columns1} dataSource={platList}></Table>
      </Card>
      <div style={{ marginTop: "100px" }}>
        <Card>
          <Row>
            <Button
              className="mr-2"
              type="primary"
              style={{ float: "right" }}
              onClick={() => handleAddFieldsDate()}
            >
              Add Datewise Data
            </Button>
          </Row>

          {inputDate.map((inputDate1, index) => {
            customIndex = index;
            return (
              <Fragment key={index}>
                <Row gutter={10}>
                  <Col span={4}></Col>
                  <Col span={8}>
                    <label
                      className=" col-form-label activity-title"
                      style={{ marginRight: 20 }}
                    >
                      Start Date
                    </label>

                    <DatePicker
                      onChange={(e) => startDateChanged(e, index)}
                      defaultValue={moment(inputDate1.start_date, dateFormat)}
                      format={dateFormat}
                    />
                  </Col>
                  <Col span={8}>
                    <label
                      className="col-form-label activity-title"
                      style={{ marginRight: 20 }}
                    >
                      End Date
                    </label>

                    <DatePicker
                      onChange={(e) => endDateChanged(e, index)}
                      defaultValue={moment(inputDate1.end_date, dateFormat)}
                      format={dateFormat}
                    />
                  </Col>
                  <Col span={4}>
                    <CloseCircleOutlined
                      onClick={() => handleRemoveFieldsDate(index)}
                    />
                  </Col>
                </Row>

                <Table columns={columns2} dataSource={inputDate1["pricing"]} />
                {/* <Grid
                      pageable={true}
                      sortable={true}
                      // filterable={true}
                      style={{
                        height: "auto",
                      }}
                      data={process(inputDate1["pricing"] || [], dataState)}
                      {...dataState}
                      onDataStateChange={(e) => {
                        setDataState(e.dataState);
                      }}
                    >
                      <Column
                        field="platform_id"
                        title="Id"
                        width="80px"
                        hidden={true}
                      />
                      <Column field="platform_name" title="Platform Name" />
                      {ticketData.map((ticketData, index1) => (
                        <Column
                          field="published_price"
                          title={ticketData.ticket_name}
                          key={index1}
                          cell={(props) => (
                            <td>
                              <Input
                                formatter={(value) => `${value}%`}
                                readOnly
                                parser={(value) => value.replace("%", "")}
                                defaultValue={
                                  props.dataItem.published_price[index1].price
                                }
                                style={{ width: "80px" }}
                              />
                            </td>
                          )}
                        />
                      ))}
                      <Column
                        field="sale_percentage"
                        title="Sale Percentage"
                        cell={(props) => (
                          <td>
                            <NumericTextBox
                              format="p"
                              max={1}
                              min={0}
                              step={0.01}
                              defa={
                                inputDate1["pricing"][props.dataIndex]
                                  ?.sale_percent
                              }
                              onChange={(e) => percentChanged(props, e, index)}
                            />
                          </td>
                        )}
                      />
                    </Grid> */}
              </Fragment>
            );
          })}
        </Card>
      </div>

      <div style={{ marginTop: "100px" }}>
        <Card>
          <Row>
            <Button
              className="mr-2"
              type="primary"
              style={{ float: "right" }}
              onClick={() => handleAddFieldsDay()}
            >
              Add Daywise Data
            </Button>
          </Row>

          {inputDay.map((inputDay, index) => {
            customIndex = index;
            return (
              <Fragment key={index}>
                <Row>
                  <Col span={4}></Col>
                  <Col span={8}>
                    <Select
                      name="enable"
                      style={{ width: "auto" }}
                      defaultValue={inputDay["day"]}
                      onChange={(e) => handleDayChanged(e, index)}
                      allowClear
                    >
                      <Option value="Monday">Monday</Option>
                      <Option value="Tuesday">Tuesday</Option>
                      <Option value="Wednesday">Wednesday</Option>
                      <Option value="Thursday">Thursday</Option>
                      <Option value="Friday">Friday</Option>
                      <Option value="Saturday">Saturday</Option>
                      <Option value="Sunday">Sunday</Option>
                    </Select>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={4}>
                    <CloseCircleOutlined
                      onClick={() => handleRemoveFieldsDay(index)}
                    />
                  </Col>
                </Row>
                <div className="form-row" style={{ marginTop: "15px" }}>
                  <div className="col-3"></div>
                  <div className="col-1"></div>
                  <div className="form-label">
                    <span></span>
                  </div>
                  <div className="col-2"></div>
                </div>
                <div className="form-group row" style={{ marginTop: "10px" }}>
                  <div className="col-2"></div>
                  <div className="col-8">
                    <Table
                      columns={columns3}
                      dataSource={inputDay["pricing"]}
                    ></Table>
                    {/* <Grid
                      pageable={true}
                      sortable={true}
                      // filterable={true}
                      style={{
                        height: "auto",
                      }}
                      data={process(inputDay["pricing"] || [], dataState)}
                      {...dataState}
                      onDataStateChange={(e) => {
                        setDataState(e.dataState);
                      }}
                    >
                      <Column
                        field="platform_id"
                        title="Id"
                        width="80px"
                        hidden={true}
                      />
                      <Column field="platform_name" title="Platform Name" />
                      {ticketData.map((ticketData, index1) => (
                        <Column
                          field="published_price"
                          title={ticketData.ticket_name}
                          key={index1}
                          cell={(props) => (
                            <td>
                              <Input
                                formatter={(value) => `${value}%`}
                                readOnly
                                parser={(value) => value.replace("%", "")}
                                defaultValue={
                                  props.dataItem.published_price[index1].price
                                }
                                style={{ width: "80px" }}
                              />
                            </td>
                          )}
                        />
                      ))}
                      <Column
                        field="sale_percentage"
                        title="Sale Percentage"
                        cell={(props) => (
                          <td>
                            <NumericTextBox
                              format="p"
                              max={1}
                              min={0}
                              step={0.01}
                              value={
                                inputDay["pricing"][props.dataIndex]
                                  ?.sale_percent
                              }
                              onChange={(e) =>
                                percentDayChanged(props, e, index)
                              }
                            /> */}
                    {/* <InputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        defalutvalue={inputDay["pricing"][props.dataIndex].sale_percent}
                        onChange={e => percentDayChanged(e, props, index)}
                      /> */}
                    {/* </td>
                        )}
                      />
                    </Grid> */}
                  </div>
                  <div className="col-2"></div>
                </div>
              </Fragment>
            );
          })}
        </Card>
      </div>
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

export default Price;
