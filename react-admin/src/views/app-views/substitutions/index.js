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

import * as actions from "../../_redux/substitution/substitutionActions";

import reactDom from "react-dom";
import { setData } from "@telerik/kendo-intl";

function ListForm(props) {
  const { substitutionListData } = props;
  // console.log(props.substitutionListData);
  const history = useHistory();
  function decryptPassword(password) {
    const bytes = CryptoJS.AES.decrypt(password, "my-secret-key@123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const [visible, setVisible] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);

  const [values, setValues] = React.useState({
    id: "",
    substitution: "",
    suggestion: "",
  });

  const dispatch = useDispatch();

  const showModal = async (record) => {
    if (record != undefined) {
      await setValues({
        id: record._id,
        substitution: record.substitution,
        suggestion: record.suggestion,
      });
    } else {
      setValues({
        substitution: "",
        suggestion: "",
      });
    }
    setVisible(true);
  };

  const hideModal = async () => {
    await setValues({
      substitution: "",
      suggestion: "",
    });

    setVisible(false);
  };

  const style = { padding: "0 15px" };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const tableColumns = [

    {
      title: "Substitution",
      dataIndex: "substitution",
      render: (_, record) => <div className="d-flex">{record.substitution}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "substitution"),
    },

    {
      title: "Suggestion",
      dataIndex: "suggestion",
      render: (_, record) => <div className="d-flex">{record.suggestion}</div>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "suggestion"),
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
              substitutionEdit(e, record);
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
          <Button onClick={(e) => substitutionDelete(e, record._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },

  ];

  const substitutionDelete = (e, id) => {
    dispatch(actions.deleteSubstitution(id));
    window.location.href = "/app/substitutions";
  };

  const substitutionEdit = (event, record) => {
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
    if (isAdd) dispatch(actions.addSubstitution(values));
    else dispatch(actions.updateSubstitution(values));
    window.location.href = "/app/substitutions";
  }

  const [list, setList] = useState(substitutionListData);
  useEffect(() => {
    setList(substitutionListData);
  }, [substitutionListData]);

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = substitutionListData;
    // const searchArray = e.currentTarget.value ? list : substitutionListData;
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
        title="Edit Substitution"
        visible={visible}
        onOk={onsubmit}
        onCancel={hideModal}
        okText="Submit"
        cancelText="Cancel"
        width={1000}
      >
        <Form layout="vertical" name="control-hooks" initialValues={values}>
          <Form.Item
            label="Substitution"
            style={style}
            rules={[{ required: true }]}
          >
            <Input
              name="substitution"
              value={values.substitution}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            label="Suggestion"
            style={style}
            rules={[{ required: true }]}
          >
            <Input
              name="suggestion"
              value={values.suggestion}
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
    dispatch(actions.getSubstitutionLists());
    setLoad(1);
  }, []);

  const substitutionListData = useSelector((state) => state.substitution.substitutionListData);

  return (
    <div>
      {/* {substitutionListData.length > 0 && load == 1 && ( */}
      <ListForm substitutionListData={substitutionListData} />
      {/* )} */}
    </div>
  );
};

export default UserList;
