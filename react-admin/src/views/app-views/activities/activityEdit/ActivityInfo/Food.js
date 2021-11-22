import React, { useState, useEffect } from "react";
import { Form, Checkbox, Button, notification, Card, Table } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-daterangepicker/daterangepicker.css";
// import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as actions from "../../../../_redux/activities/activitiesActions";
// import { process } from "@progress/kendo-data-query";

function Food(props) {
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

  const { activityData, addActivityId, foodData, addActivityStatusData } =
    useSelector(
      (state) => ({
        activityData: state.activities.activityData,
        addActivityId: state.activities.addActivityId,
        foodData: state.activities.foodData,
        addActivityStatusData: state.activities.addActivityStatusData,
      }),
      shallowEqual
    );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getFoodData());
  }, []);

  const [realData, setRealData] = React.useState([]);
  const tblData = [];
  const [enabledList, setEnabledList] = useState([]);

  useEffect(() => {
    let transData = JSON.parse(activityData?.meals_options);
    for (var i = 0; i < foodData.length; i++) {
      if (foodData[i].enable == 1) {
        let data = {};
        data["key"] = foodData[i].id;
        data["id"] = foodData[i].id;
        data["meal_name"] = foodData[i].meal_name;
        data["price"] = foodData[i].price;
        data["enabled"] = 0;
        if (transData != null) {
          for (var j = 0; j < transData.length; j++) {
            if (foodData[i].id == transData[j]) {
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
  }, [foodData]);

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
    if (activityData?.meals == "1") setEnableMeals(true);
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
    data["meals_options"] = JSON.stringify(enabledList);
    data["meals"] = enableMeals;

    dispatch(actions.editActivity(data, token));
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Meal Name",
      dataIndex: "meal_name",
      key: "meal_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Enabled",
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

  return (
    <Card hoverable style={{ margin: 40, paddingLeft: 20, paddingRight: 20 }}>
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
          <div className="col-12">
            <Table columns={columns} dataSource={realData}></Table>
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
              <Column field="meal_name" title="Meal Name" />
              <Column field="price" title="Price" />
              <Column
                field="enabled"
                title="Enabled"
                cell={(props) => (
                  <td>
                    <Checkbox
                      checked={props.dataItem.enabled}
                      onChange={(e) => enableChanged(props, e)}
                    />
                  </td>
                )}
              />
            </Grid> */}
          </div>
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

export default Food;
