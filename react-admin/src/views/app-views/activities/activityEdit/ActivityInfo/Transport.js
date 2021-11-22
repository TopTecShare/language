import React, { useState, useEffect } from "react";
import { Form, Button, Checkbox, notification, Card, Table } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-daterangepicker/daterangepicker.css";
// import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as actions from "../../../../_redux/activities/activitiesActions";
// import { process } from "@progress/kendo-data-query";
// import "@progress/kendo-theme-default/dist/all.css";

function Transport(props) {
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

  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
  }, []);

  const [dataState, setDataState] = React.useState(initialDataState);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();

  const { addActivityId, transportData, addActivityStatusData, activityData } =
    useSelector(
      (state) => ({
        addActivityId: state.activities.addActivityId,
        transportData: state.activities.transportData,
        addActivityStatusData: state.activities.addActivityStatusData,
        activityData: state.activities.activityData,
      }),
      shallowEqual
    );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getTransportData());
  }, []);
  const [realData, setRealData] = React.useState([]);
  const tblData = [];
  const [enabledList, setEnabledList] = useState([]);

  useEffect(() => {
    let transData = JSON.parse(activityData?.transport_options);
    for (var i = 0; i < transportData.length; i++) {
      if (transportData[i].enable == 1) {
        let data = {};
        data["key"] = transportData[i].id;
        data["id"] = transportData[i].id;
        data["transport_name"] = transportData[i].transport_name;
        data["oneway_price"] = transportData[i].oneway_price;
        data["twoway_price"] = transportData[i].twoway_price;
        data["enabled"] = 0;
        if (transData != null) {
          for (var j = 0; j < transData.length; j++) {
            if (transportData[i].id == transData[j]) {
              data["enabled"] = true;
            }
          }
        }
        tblData.push(data);
      }
    }
    setRealData(tblData);

    if (transData != null) {
      const lst = [];
      for (var j = 0; j < transData.length; j++) {
        lst.push(transData[j]);
      }
      setEnabledList(lst);
    }
  }, [transportData]);

  const enableChanged = (props, event) => {
    const value = event.target.checked;
    const list = [...enabledList];
    if (value) {
      list.push(props.id);
    } else {
      for (var i = 0; i < list.length; i++) {
        if (list[i] == props.id) list.splice(i, 1);
      }
    }
    setEnabledList(list);

    const lstR = [...realData];
    for (var i = 0; i < lstR.length; i++) {
      if (lstR[i].id == props.id) {
        lstR[i].enabled = value;
      }
    }
    setRealData(lstR);
  };

  const [enableMeals, setEnableMeals] = React.useState(0);

  const enableMealsChanged = (event) => {
    const value = event.target.checked;
    setEnableMeals(value);
  };

  useEffect(() => {
    if (activityData?.transport == "1") setEnableMeals(true);
    else setEnableMeals(false);
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
    data["transport_options"] = JSON.stringify(enabledList);
    data["transport"] = enableMeals;

    dispatch(actions.editActivity(data, token));
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transport Name",
      dataIndex: "transport_name",
      key: "transport_name",
    },
    {
      title: "One Way Price",
      dataIndex: "oneway_price",
      key: "oneway_price",
    },
    {
      title: "Two Way Price",
      dataIndex: "twoway_price",
      key: "twoway_price",
    },
    {
      title: "Eneabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (text, record) => (
        <Checkbox
          checked={record.enabled}
          onChange={(e) => enableChanged(record, e)}
        >
          {}
        </Checkbox>
      ),
    },
  ];

  // let tableData = [];
  // transportData.map((item, index) =>
  //   tableData.push({
  //     key: index + 1,
  //     id: item.id,
  //     transport_name: item.transport_name,
  //     oneway_price: item.oneway_price,
  //     twoway_price: item.twoway_price,
  //     enabled: item.enable,
  //   })
  // );

  return (
    <Card hoverable style={{ margin: 40, paddingRight: 20, paddingLeft: 20 }}>
      <Form
        form={form}
        initialValues={activityData}
        name="control-hooks"
        onFinish={onFinish}
        style={{ marginTop: 50 }}
      >
        <Form.Item>
          <div className="form-group row">
            <div className="col-2"></div>
            <Checkbox
              name="enableMeals"
              checked={enableMeals}
              onChange={(e) => enableMealsChanged(e)}
            >
              Enable Transports
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item>
          {/* <div className="form-group row"> */}
          {/* <div className="col-12"> */}
          <Table columns={columns} dataSource={realData} />
          {/* <Grid
                pageable={true}
                sortable={true}
                // filterable={true}
                style={{
                  height: "auto",
                }}
                data={process(realData || [], dataState)}
                {...dataState}
                onDataStateChange={(e) => {
                  setDataState(e.dataState);
                }}
              >
                <Column field="id" title="Id" width="80px" filterable={false} />
                <Column field="transport_name" title="Transport Name" />
                <Column field="oneway_price" title="OneWay Price" />
                <Column field="twoway_price" title="TwoWay Price" />
                <Column
                  field="enabled"
                  title="Enabled"
                  cell={(props) => (
                    <td>
                      <Checkbox
                        checked={props.dataItem.enabled}
                        onChange={(e) => enableChanged(props, e)}
                      ></Checkbox>
                    </td>
                  )}
                />
              </Grid> */}
          {/* </div> */}
          {/* </div> */}
        </Form.Item>

        <Form.Item>
          <div className="form-group row">
            <div className="col-10">
              <Button
                className="mr-2"
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Transport;
