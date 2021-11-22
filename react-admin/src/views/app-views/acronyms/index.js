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

import * as actions from "../../_redux/acronyms/acronymActions";

import reactDom from "react-dom";
import { setData } from "@telerik/kendo-intl";

function ListForm(props) {
  const { acronymListData } = props;
  // console.log(props.acronymListData);
  const history = useHistory();
  function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, "my-secret-key@123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const [visible, setVisible] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);

  const [values, setValues] = React.useState({
    id: "",
    acronym: "",
    spellout: "",
  });

  const dispatch = useDispatch();

  const showModal = async (record) => {
    if (record != undefined) {
      await setValues({
        id: record._id,
        acronym: record.acronym,
        spellout: record.spellout,
      });
    } else {
      setValues({
        acronym: "",
        spellout: "",
      });
    }
    setVisible(true);
  };

  const hideModal = async () => {
    await setValues({
      acronym: "",
      spellout: "",
    });

    setVisible(false);
  };

  const style = { padding: "0 15px" };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const tableColumns = [

    {
      title: "Acronym",
      dataIndex: "acronym",
      render: (_, record) => <div className="d-flex">{record.acronym}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "acronym"),
    },

    {
      title: "Spellout",
      dataIndex: "spellout",
      render: (_, record) => <div className="d-flex">{record.spellout}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "spellout"),
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
              acronymEdit(e, record);
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
          <Button onClick={(e) => acronymDelete(e, record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },

  ];

  const acronymDelete = (e, id) => {
    dispatch(actions.deleteAcronym(id));
    window.location.href = "/app/acronyms";
  };

  const acronymEdit = (event, record) => {
    showModal(record);
  };

  const onChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function onsubmit() {
    // console.log(values);
    hideModal();
    if (isAdd) dispatch(actions.addAcronym(values));
    else dispatch(actions.updateAcronym(values));
    window.location.href = "/app/acronyms";
  }

  const [list, setList] = useState(acronymListData);
  useEffect(() => {
    setList(acronymListData);
  }, [acronymListData]);

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = acronymListData;
    // const searchArray = e.currentTarget.value ? list : acronymListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  // console.log(values.project_code);

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
        title="Edit Acronym"
        visible={visible}
        onOk={onsubmit}
        onCancel={hideModal}
        okText="Submit"
        cancelText="Cancel"
        width={1000}
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Form.Item
            label="Acronym"
            style={style}
            rules={[{ required: true }]}
          >
            <Input
              name="acronym"
              value={values.acronym}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="spellout"
            style={style}
            rules={[{ required: true }]}
          >
            <Input
              name="spellout"
              value={values.spellout}
              onChange={onChange}
            />
          </Form.Item>
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
    dispatch(actions.getAcronymLists());
    setLoad(1);
  }, []);

  const acronymListData = useSelector((state) => state.acronym.acronymListData);

  return (
    <div>
      {/* {acronymListData.length > 0 && load == 1 && ( */}
      <ListForm acronymListData={acronymListData} />
      {/* )} */}
    </div>
  );
};

export default UserList;
