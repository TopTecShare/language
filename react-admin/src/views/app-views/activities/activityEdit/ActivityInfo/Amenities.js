import React, { useState, useEffect } from "react";
import { Form, Checkbox, Button, notification, Card, Table } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import * as actions from "../../../../_redux/activities/activitiesActions";
// import { process } from "@progress/kendo-data-query";

function Amenities(props) {
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    dispatch(actions.getAmenitiesData());
  }, []);

  const [dataState, setDataState] = React.useState(initialDataState);

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();

  const { addActivityStatusData, addActivityId, amenitiesData, activityData } =
    useSelector(
      (state) => ({
        addActivityStatusData: state.activities.addActivityStatusData,
        addActivityId: state.activities.addActivityId,
        amenitiesData: state.activities.amenitiesData,
        activityData: state.activities.activityData,
      }),
      shallowEqual
    );

  const [realData, setRealData] = React.useState([]);
  const tblData = [];
  const [enabledList, setEnabledList] = useState([]);

  useEffect(() => {
    let transData = JSON.parse(activityData?.amenities_options);
    for (var i = 0; i < amenitiesData.length; i++) {
      if (amenitiesData[i].enable == 1) {
        let data = {};
        data["key"] = amenitiesData[i].id;
        data["id"] = amenitiesData[i].id;
        data["amenity_name"] = amenitiesData[i].amenity_name;
        data["enabled"] = 0;
        if (transData != null) {
          for (var j = 0; j < transData.length; j++) {
            if (amenitiesData[i].id == transData[j]) {
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
  }, [amenitiesData]);

  useEffect(() => {
    if (activityData?.amenities == "1") setEnableMeals(true);
    else setEnableMeals(false);
  }, [activityData]);

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
    data["amenities_options"] = JSON.stringify(enabledList);
    data["amenities"] = enableMeals;

    dispatch(actions.editActivity(data, token));
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amenity Name",
      dataIndex: "amenity_name",
      key: "amenity_name",
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
          <div className="col-12">
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
              <Column field="amenity_name" title="Amenity Name" />
              <Column
                field="enable"
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

export default Amenities;
