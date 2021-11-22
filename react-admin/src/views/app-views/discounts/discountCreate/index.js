/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import * as actions from "../../../_redux/discounts/discountsActions";
import { Card, Select, Input, Button, Radio, Form, InputNumber, Checkbox, DatePicker } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function NewForm(props) {

    const { discountData, form, onFinish, checkVal, checkStateChanged, selectVal, handleChange, startDate, endDate, startDatehandleChange, endDatehandleChange } = props;
    return (
        <Form  {...layout} initialValues={discountData} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="discount_code" label="Discount Code" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Type" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    defaultValue={selectVal}
                    onChange={handleChange}
                >
                    <Option value="1">percentage</Option>
                    <Option value="2">fixed_amount</Option>
                </Select>
            </Form.Item>
            <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="minimum_requirement" label="Minimum Requirement" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="minimum_req_value" label="Minimum Req_value" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="max_usage_per_user" label="Max_usage_per_user" rules={[{ required: true }]}>
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item label="Start Date" rules={[{ required: true }]}>
                <DatePicker
                    onChange={startDatehandleChange}
                    defaultValue={moment(startDate, dateFormat)}
                    format={dateFormat}
                />
            </Form.Item>
            <Form.Item label="End Date" rules={[{ required: true }]}>
                <DatePicker
                    onChange={endDatehandleChange}
                    defaultValue={moment(endDate, dateFormat)}
                    format={dateFormat}
                />
            </Form.Item>

            <Form.Item name="discount_err_msg" label="Discount_err_msg" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Enable">
                <Checkbox onChange={e => checkStateChanged(e)} checked={checkVal} ></Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

function EditForm(props) {
    const { discountData, id } = props;
    const [form] = Form.useForm();
    const [load, setLoad] = useState(0);
    const [startDate, setStartDate] = useState(moment(new Date()).format(dateFormat).toString());
    const [endDate, setEndDate] = useState(moment(new Date()).format(dateFormat).toString());
    const onFinish = values => {
        values["id"] = id;
        values["enable"] = checkVal;
        values["type"] = selectVal;
        values["start_date"] = startDate;
        values["end_date"] = endDate;
        editDiscount(JSON.stringify(values));
    };

    useEffect(() => {
        setLoad(1);
        setCheckVal(discountData?.enable)
        setSelectVal(discountData?.type)
        setStartDate(moment(discountData?.start_date).format(dateFormat).toString())
        setEndDate(moment(discountData?.end_date).format(dateFormat).toString())
    }, [discountData]);
    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch();

    const editDiscount = (values) => {
        dispatch(actions.editDiscount(values, token)).then(() => gotoList());
    };

    const gotoList = () => {
        // dispatch(actions.setdiscountData());
        history.goBack();
    }

    const [checkVal, setCheckVal] = useState(0);

    const checkStateChanged = (event) => {
        setCheckVal(event.target.checked)
    };

    const [selectVal, setSelectVal] = useState(1);
    function handleChange(value) {
        setSelectVal(value);
    }

    const startDatehandleChange = (date) => {
        setStartDate(moment(date).format(dateFormat).toString());
    };
    const endDatehandleChange = (date) => {
        setEndDate(moment(date).format(dateFormat).toString());
    };


    return (
        <div>
            {(discountData && load == 1) ? (
                <NewForm discountData={discountData} form={form} onFinish={onFinish} checkVal={checkVal} checkStateChanged={checkStateChanged} selectVal={selectVal} handleChange={handleChange} startDate={startDate} endDate={endDate} startDatehandleChange={startDatehandleChange} endDatehandleChange={endDatehandleChange} />
            ) :
                (<div></div>)}
        </div>
    )
}

const DiscountCreate = ({
    match: {
        params: { id },
    },
}) => {

    const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
    const history = useHistory();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(0);
    const { activityList, discountData } = useSelector(
        (state) => ({
            activityList: state.discounts.activityList,
            discountData: state.discounts.discountData,
        }),
        shallowEqual
    );
    useEffect(() => {
        dispatch(actions.getActivityList());

        if (id != null) {
            dispatch(actions.getDiscountData(id, token));
            setLoad(1);
        }
        // else
        // dispatch(actions.setdiscountData());
    }, [id]);

    const addDiscount = (values) => {
        dispatch(actions.addDiscount(values, token)).then(() => gotoList());
    }

    const gotoList = () => {
        history.goBack();
    }

    const [startDate, setStartDate] = useState(moment(new Date()).format(dateFormat).toString());
    const [endDate, setEndDate] = useState(moment(new Date()).format(dateFormat).toString());
    const startDatehandleChange = (date) => {
        setStartDate(moment(date).format(dateFormat).toString());
    };
    const endDatehandleChange = (date) => {
        setEndDate(moment(date).format(dateFormat).toString());
    };

    const [checkVal, setCheckVal] = useState(0);
    const checkStateChanged = (event) => {
        setCheckVal(event.target.checked);
    }

    const [form] = Form.useForm();
    const onFinish = values => {
        values["id"] = 0;
        values["enable"] = checkVal;
        values["start_date"] = startDate;
        values["end_date"] = endDate;
        addDiscount(JSON.stringify(values));
    };

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <h2>Add Discounts</h2>
                </Flex>
                <div>
                    <Button type="primary" onClick={gotoList} icon={<LeftOutlined />} block>Back</Button>
                </div>
            </Flex>
            <div style={{ width: '50%', marginLeft: '17%', marginTop: 100 }}>
                {(id == null) &&
                    <Form  {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="discount_code" label="Discount Code" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                <Option value="1">percentage</Option>
                                <Option value="2">fixed_amount</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="minimum_requirement" label="Minimum Requirement" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="minimum_req_value" label="Minimum Req_value" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item name="max_usage_per_user" label="Max_usage_per_user" rules={[{ required: true }]}>
                            <InputNumber min={0} />
                        </Form.Item>

                        <Form.Item label="Start Date" rules={[{ required: true }]}>
                            <DatePicker
                                onChange={startDatehandleChange}
                                defaultValue={moment(startDate, dateFormat)}
                                format={dateFormat}
                            />
                        </Form.Item>
                        <Form.Item label="End Date" rules={[{ required: true }]}>
                            <DatePicker
                                onChange={endDatehandleChange}
                                defaultValue={moment(endDate, dateFormat)}
                                format={dateFormat}
                            />
                        </Form.Item>

                        <Form.Item name="discount_err_msg" label="Discount_err_msg" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Enable">
                            <Checkbox onChange={e => checkStateChanged(e)} checked={checkVal} ></Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button className="mr-2" type="primary" htmlType="submit" style={{ float: 'right' }} >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                }
                {id != 0 && discountData && load == 1 && <EditForm discountData={discountData} id={id} />}
            </div>
        </Card>
    )
}

export default DiscountCreate
