/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
  Card,
  Table,
  InputNumber,
  Input,
  Button,
  Tooltip,
  Col,
  Select,
  Modal,
  Form,
  Row,
} from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import utils from "utils";

import * as actions from "../../_redux/unit/unitActions";
import * as projectActions from "../../_redux/project/projectActions";

import reactDom from "react-dom";
import { setData } from "@telerik/kendo-intl";

function ListForm(props) {
  const { unitListData } = props;
  console.log(props.unitListData);
  const history = useHistory();
  function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, "my-secret-key@123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const [visible, setVisible] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);

  const [values, setValues] = React.useState({
    id: "",
    project_code: "",
    project: "",
    unit_type: "",
    dev_name: "",
    location: "",
    unit_number: "",
    purpose: "",
    type: "",
    area_sq_ft: "",
    area_sq_m: "",
    rate_per_sqm: "",
    annual_rent: "",
    sell_price: "",
    serv_charge: "",
    f_out_depos: "",
    secu_depos: "",
    chilled_water_depos: "",
    rent_com_fee_sell_com_fee: "",
    com_type: "",
    unit_view: "",
    grace_period: "",
    vat_on_rate: "",
    vat_on_taf: "",
    location_map: "",
  });

  const dispatch = useDispatch();

  const showModal = async (record) => {
    if (record != undefined) {
      await setValues({
        id: record._id,
        project_code: record.project_code,
        project: record.project,
        unit_type: record.unit_type,
        dev_name: record.dev_name,
        location: record.location,
        unit_number: record.unit_number,
        purpose: record.purpose,
        type: record.type,
        area_sq_ft: record.area_sq_ft,
        area_sq_m: record.area_sq_m,
        rate_per_sqm: record.rate_per_sqm,
        annual_rent: record.annual_rent,
        sell_price: record.sell_price,
        serv_charge: record.serv_charge,
        f_out_depos: record.f_out_depos,
        secu_depos: record.secu_depos,
        chilled_water_depos: record.chilled_water_depos,
        rent_com_fee_sell_com_fee: record.rent_com_fee_sell_com_fee,
        com_type: record.com_type,
        unit_view: record.unit_view,
        grace_period: record.grace_period,
        vat_on_rate: record.vat_on_rate,
        vat_on_taf: record.vat_on_taf,
        location_map: record.location_map,
      });
    } else {
      setValues({
        project_code: "",
        project: "",
        unit_type: "",
        dev_name: "",
        location: "",
        unit_number: "",
        purpose: "",
        type: "",
        area_sq_ft: 0,
        area_sq_m: 0,
        rate_per_sqm: 0,
        annual_rent: 0,
        sell_price: 0,
        serv_charge: "",
        f_out_depos: 0,
        secu_depos: 0,
        chilled_water_depos: 0,
        rent_com_fee_sell_com_fee: 0,
        com_type: "",
        unit_view: "",
        grace_period: 0,
        vat_on_rate: 0,
        vat_on_taf: 0,
        location_map: "",
      });
    }
    setVisible(true);
  };

  const hideModal = async () => {
    await setValues({
      project_code: "",
      project: "",
      unit_type: "",
      dev_name: "",
      location: "",
      unit_number: "",
      purpose: "",
      type: "",
      area_sq_ft: 0,
      area_sq_m: 0,
      rate_per_sqm: 0,
      annual_rent: 0,
      sell_price: 0,
      serv_charge: "",
      f_out_depos: 0,
      secu_depos: 0,
      chilled_water_depos: 0,
      rent_com_fee_sell_com_fee: 0,
      com_type: "",
      unit_view: "",
      grace_period: 0,
      vat_on_rate: 0,
      vat_on_taf: 0,
      location_map: "",
    });

    setVisible(false);
    // dispatch(actions.up(values));
    // window.location.href = "/app/add-user/list";
  };

  const style = { padding: "0 15px" };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const tableColumns = [
    {
      title: "Project code",
      dataIndex: "project_code",
      render: (_, record) => (
        <div className="d-flex">{record.project_code}</div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
    },

    {
      title: "",
      dataIndex: "edit",
      render: (_, record) => (
        <div className="d-flex">
          <Button
            type="primary"
            onClick={(e) => {
              setIsAdd(false);
              unitEdit(e, record);
            }}
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },

    {
      title: "",
      dataIndex: "edit",
      render: (_, record) => (
        <div className="d-flex">
          <Button onClick={(e) => unitDelete(e, record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },

    {
      title: "Project",
      dataIndex: "project",
      render: (_, record) => <div className="d-flex">{record.project}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "project"),
    },

    {
      title: "Unit type",
      dataIndex: "unit_type",
      render: (_, record) => <div className="d-flex">{record.unit_type}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "unit_type"),
    },

    {
      title: "Development name",
      dataIndex: "dev_name",
      render: (_, record) => <div className="d-flex">{record.dev_name}</div>,
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (_, record) => <div className="d-flex">{record.location}</div>,
    },
    {
      title: "Unit number",
      dataIndex: "unit_number",
      render: (_, record) => <div className="d-flex">{record.unit_number}</div>,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      render: (_, record) => <div className="d-flex">{record.purpose}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, record) => <div className="d-flex">{record.type}</div>,
    },
    {
      title: "Area sq.ft",
      dataIndex: "area_sq_ft",
      render: (_, record) => <div className="d-flex">{record.area_sq_ft}</div>,
    },
    {
      title: "Area sq.m",
      dataIndex: "area_sq_m",
      render: (_, record) => <div className="d-flex">{record.area_sq_m}</div>,
    },
    {
      title: "Rate per Sqm",
      dataIndex: "rate_per_sqm",
      render: (_, record) => (
        <div className="d-flex">{record.rate_per_sqm}</div>
      ),
    },
    {
      title: "Annual rent",
      dataIndex: "annual_rent",
      render: (_, record) => <div className="d-flex">{record.annual_rent}</div>,
    },
    {
      title: "Sell price",
      dataIndex: "sell_price",
      render: (_, record) => <div className="d-flex">{record.sell_price}</div>,
    },
    {
      title: "Service charge",
      dataIndex: "serv_charge",
      render: (_, record) => <div className="d-flex">{record.serv_charge}</div>,
    },
    {
      title: "Fit out of deposit",
      dataIndex: "f_out_depos",
      render: (_, record) => <div className="d-flex">{record.f_out_depos}</div>,
    },
    {
      title: "Security deposit",
      dataIndex: "secu_depos",
      render: (_, record) => <div className="d-flex">{record.secu_depos}</div>,
    },
    {
      title: "Chilled water deposit",
      dataIndex: "chilled_water_depos",
      render: (_, record) => (
        <div className="d-flex">{record.chilled_water_depos}</div>
      ),
    },
    {
      title: "Rent Comssion Fee 5% Sell Comssion Fee 2.5%",
      dataIndex: "rent_com_fee_sell_com_fee",
      render: (_, record) => (
        <div className="d-flex">{record.rent_com_fee_sell_com_fee}</div>
      ),
    },
    {
      title: "Commission Type",
      dataIndex: "com_type",
      render: (_, record) => <div className="d-flex">{record.com_type}</div>,
    },
    {
      title: "Unit view",
      dataIndex: "unit_view",
      render: (_, record) => <div className="d-flex">{record.unit_view}</div>,
    },
    {
      title: "Grace period",
      dataIndex: "grace_period",
      render: (_, record) => (
        <div className="d-flex">{record.grace_period}</div>
      ),
    },
    {
      title: "VAT on rent",
      dataIndex: "vat_on_rate",
      render: (_, record) => <div className="d-flex">{record.vat_on_rate}</div>,
    },
    {
      title: "VAT on TAF",
      dataIndex: "vat_on_taf",
      render: (_, record) => <div className="d-flex">{record.vat_on_taf}</div>,
    },
    {
      title: "Location map",
      dataIndex: "location_map",
      render: (_, record) => (
        <div className="d-flex">
          <Tooltip title="Click to get the coordinate">
            <a
              href={record.location_map}
              target="_blank"
              rel="noopener noreferrer"
            >
              <EyeOutlined />
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  const unitDelete = (e, id) => {
    dispatch(actions.deleteUnit(id));
    window.location.href = "/app/units";
  };

  const unitEdit = (event, record) => {
    showModal(record);
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function onsubmit() {
    console.log(values);
    hideModal();
    if (isAdd) dispatch(actions.addUnit(values));
    else dispatch(actions.updateUnit(values));
    window.location.href = "/app/units";
  }

  const [list, setList] = useState(unitListData);
  useEffect(() => {
    setList(unitListData);
  }, [unitListData]);

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = unitListData;
    // const searchArray = e.currentTarget.value ? list : unitListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const projectCodeList = useSelector((state) => state.project.projectListData);
  console.log(values.project_code);

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setIsAdd(true);
              showModal();
            }}
            icon={<UserAddOutlined />}
            block
          >
            Add
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
      <Modal
        title="Edit User"
        visible={visible}
        onOk={onsubmit}
        onCancel={hideModal}
        okText="Submit"
        cancelText="Cancel"
        width={1000}
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="project_code"
                label="project code"
                rules={[{ required: true }]}
                fullwidth
              >
                <Select
                  labelInValue
                  value={{ value: values.project_code }}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      project_code: value.value,
                    }))
                  }
                  style={{ width: 120 }}
                >
                  {projectCodeList.map((it) => {
                    return <Option value={it.title}>{it.title}</Option>;
                  })}
                </Select>
                ,
                {/* <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    labelInValue
                    onChange={(value) =>
                      setValues((prevState) => ({
                        ...prevState,
                        project_code: value,
                      }))
                    }
                    // defaultValue="danger"
                    defaultValue={{ value: values.project_code }}
                  >
                    {projectCodeList.map((it) => {
                      return <Option value={it.title}>{it.title}</Option>;
                    })}
                  </Select>
                  , */}
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Project"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="project"
                  value={values.project}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Unit type"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="unit_type"
                  value={values.unit_type}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Development name"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="dev_name"
                  value={values.dev_name}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Location"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="location"
                  value={values.location}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Unit number"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="unit_number"
                  value={values.unit_number}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Purpose"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="purpose"
                  value={values.purpose}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="type"
                label="Type"
                style={style}
                rules={[{ required: true }]}
              >
                <Input name="type" value={values.type} onChange={onChange} />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Area_sq_ft"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="area_sq_ft"
                  value={values.area_sq_ft}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      area_sq_ft: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Area sq.m"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="area_sq_m"
                  value={values.area_sq_m}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      area_sq_m: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Rate per Sqm"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="rate_per_sqm"
                  value={values.rate_per_sqm}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      rate_per_sqm: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Annual rent"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="annual_rent"
                  value={values.annual_rent}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      annual_rent: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Sell price"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="sell_price"
                  value={values.sell_price}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      sell_price: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Service charge"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="serv_charge"
                  value={values.serv_charge}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Fit out of deposit"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="f_out_depos"
                  value={values.f_out_depos}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      f_out_depos: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Security deposit"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="secu_depos"
                  value={values.secu_depos}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      secu_depos: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Chilled water deposit"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="chilled_water_depos"
                  value={values.chilled_water_depos}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      chilled_water_depos: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Rent Commission Fee 5% Sell Commssion Fee 2.5%"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  name="rent_com_fee_sell_com_fee"
                  min={0}
                  value={values.rent_com_fee_sell_com_fee}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      rent_com_fee_sell_com_fee: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                label="Commission Type"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="com_type"
                  value={values.com_type}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="unit_view"
                label="Unit view"
                style={style}
                rules={[{ required: true }]}
              >
                <Input
                  name="unit_view"
                  value={values.unit_view}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="grace_period"
                label="Grace period"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="grace_period"
                  defaultValue={0}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      grace_period: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="vat_on_rate"
                label="VAT on rent"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="vat_on_rate"
                  value={values.vat_on_rate}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      vat_on_rate: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} style={{ margin: "0 auto" }}>
              <Form.Item
                name="vat_on_taf"
                label="VAT on TAF"
                style={style}
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  name="vat_on_taf"
                  value={values.vat_on_taf}
                  onChange={(value) =>
                    setValues((prevState) => ({
                      ...prevState,
                      vat_on_taf: value,
                    }))
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Col span={24} style={{ margin: "0 auto" }}>
            <Form.Item
              label="Location map"
              style={style}
              rules={[{ required: true }]}
            >
              <Input
                name="location_map"
                value={values.location_map}
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          {/* </Row> */}
        </Form>
      </Modal>
    </Card>
  );
}

const UserList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(0);
  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  useEffect(() => {
    let selectedTitle = localStorage.getItem("selectedTitle");
    if (selectedTitle) {
      dispatch(actions.getUnitListsByProjectCode(selectedTitle));
      localStorage.removeItem("selectedTitle");
    } else {
      dispatch(actions.getUnitLists()).then((res) => {
        dispatch(projectActions.getProjectLists());
      });
    }
    setLoad(1);
  }, []);

  const unitListData = useSelector((state) => state.unit.unitListData);

  return (
    <div>
      {/* {unitListData.length > 0 && load == 1 && ( */}
      <ListForm unitListData={unitListData} />
      {/* )} */}
    </div>
  );
};

export default UserList;
