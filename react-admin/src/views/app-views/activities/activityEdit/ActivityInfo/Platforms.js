import React, { useState, Component, Fragment, useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Input, Select, notification, Card, Table, Transfer } from "antd";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../_redux/activities/activitiesActions";

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function AddInfoForm(props) {

    const {
        platformData,
        addActivityStatusData,
        addActivityId,
        activityData
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

    useEffect(() => {
        if (activityData?.platforms_pricing_options)
            setTargetKeysData(JSON.parse(activityData?.platforms_pricing_options));
        
    }, [activityData])

    const openNotification = () => {
        notification.open({
            message: "Success",
            description: addActivityStatusData,
        });
    };
    //////////////////////////////////////

    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeysData] = useState([]);

    useEffect(() => {
        if (!activityData?.platforms_pricing_options)
            getMock();
    }, [])

    const getMock = () => {
        const targetKeys = [];
        const mockData = [];

        for (var j = 0; j < platformData.length; j++) {
            const data = {
                key: platformData[j]?.id?.toString(),
                title: platformData[j]?.name,
                chosen: '',
            };

            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }


        setMockData(mockData);
        setTargetKeysData(targetKeys);
    };

    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    const handleChange = targetKeys => {
        setTargetKeysData(targetKeys);
    };

    const handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    //////////////////
    const [form] = Form.useForm();
    const onFinish = (values) => {

        // console.log(targetKeys)
        let data = {};
        data["id"] = addActivityId;
        data["platforms_pricing_options"] = JSON.stringify(targetKeys);


        editActivity(JSON.stringify(data));
    };

    const editActivity = (values) => {
        dispatch(actions.editActivity(values, token));
    };

    console.log(mockData)
    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "100%", marginTop: 50 }}
        >
            <Form.Item>
                <Transfer
                    dataSource={mockData}
                    showSearch
                    // filterOption={filterOption}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    render={item => item.title}
                />
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

function Platforms(props) {
    const [load, setLoad] = useState(0);
    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();

    const dispatch = useDispatch();
    const { editId } = props;

    useEffect(() => {
        dispatch(actions.getIdData(editId, token));
        dispatch(actions.getPlatformData());

        setLoad(1);
    }, []);

    const {
        addActivityId,
        activityData,
        addActivityStatusData,
        platformData,
    } = useSelector(
        (state) => ({
            addActivityId: state.activities.addActivityId,
            activityData: state.activities.activityData,
            addActivityStatusData: state.activities.addActivityStatusData,
            platformData: state.activities.platformData,
        }),
        shallowEqual
    );

    return (
        <div>
            {platformData && activityData && load == 1 ? (
                <Card hoverable style={{ margin: 40 }}>
                    <AddInfoForm
                        activityData={activityData}
                        addActivityStatusData={addActivityStatusData}
                        addActivityId={addActivityId}
                        platformData={platformData}
                    />
                </Card>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Platforms;
