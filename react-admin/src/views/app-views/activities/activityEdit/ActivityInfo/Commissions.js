import React, { useState, Component, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Input, Select, notification, Card, Table } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../_redux/activities/activitiesActions";
// import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
// import { process } from "@progress/kendo-data-query";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AddInfoForm(props) {
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
  const [dataState, setDataState] = React.useState(initialDataState);

  const {
    activityData,
    addActivityStatusData,
    addActivityId,
    realData,
    inputChanged,
  } = props;
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();

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
  //////////////////////////////////////

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let data = {};
    data["id"] = addActivityId;
    data["vendor_commissions"] = JSON.stringify(realData);

    dispatch(actions.editActivity(JSON.stringify(data), token));
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Slab Name",
      dataIndex: "slab_name",
      key: "slab_name",
    },

    {
      title: "Commision",
      dataIndex: "commision",
      key: "commision",
      render: (text, record) => (
        <Input
          value={record.commission}
          onChange={(e) => inputChanged(record, e)}
        >
          {}
        </Input>
      ),
    },
  ];

  // const selectValue = activityData?.vendor_commissions;

  return (
    <Form
      form={form}
      initialValues={activityData}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "80%", marginLeft: "10%", marginTop: 50 }}
    >
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
            <Column field="slab_name" title="Slab Name" />
            <Column
              field="commission"
              title="Commission"
              cell={(props) => (
                <td>
                  <Input
                    value={props.dataItem.commission}
                    onChange={(e) => inputChanged(props, e)}
                  />
                </td>
              )}
            />
          </Grid> */}
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

function Commissions(props) {
  const [load, setLoad] = useState(0);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const history = useHistory();
  const {
    addActivityId,
    activityData,
    addActivityStatusData,
    vendorsSlabData,
  } = useSelector(
    (state) => ({
      addActivityId: state.activities.addActivityId,
      activityData: state.activities.activityData,
      addActivityStatusData: state.activities.addActivityStatusData,
      vendorsSlabData: state.activities.vendorsSlabData,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const { editId } = props;

  useEffect(() => {
    dispatch(actions.getIdData(editId, token));
    dispatch(actions.getVendorsSlabData(editId, token));
    setLoad(1);
  }, []);

  const [realData, setRealData] = useState([]);
  const [real, setReal] = useState(0);

  useEffect(() => {
    if (real == 1) return;
    const tblData = [];
    for (var i = 0; i < vendorsSlabData.length; i++) {
      let data = {};
      data["key"] = vendorsSlabData[i].id;
      data["id"] = vendorsSlabData[i].id;
      data["slab_name"] = vendorsSlabData[i].slab_name;
      data["commission"] = "";

      tblData.push(data);
    }
    setRealData(tblData);
  }, [vendorsSlabData]);

  useEffect(() => {
    const tblData = [];
    let transData = JSON.parse(activityData?.vendor_commissions);
    if (transData == null) return;
    for (var i = 0; i < transData.length; i++) {
      let data = {};
      data["id"] = transData[i].id;
      data["slab_name"] = transData[i].slab_name;
      data["commission"] = transData[i].commission;
      tblData.push(data);
    }
    setRealData(tblData);
    setReal(1);
  }, [activityData]);

  const inputChanged = (props, { target: { value } }) => {
    const lstR = [...realData];
    for (var i = 0; i < lstR.length; i++) {
      if (lstR[i].id == props.id) {
        lstR[i].commission = value;
      }
    }
    setRealData(lstR);
  };

  return (
    <div>
      {activityData && load == 1 && realData != [] ? (
        <Card hoverable style={{ margin: 40 }}>
          <AddInfoForm
            activityData={activityData}
            addActivityStatusData={addActivityStatusData}
            addActivityId={addActivityId}
            realData={realData}
            inputChanged={inputChanged}
          />
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Commissions;
