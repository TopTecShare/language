import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import md5 from "md5";
import { AUTH_TOKEN } from "redux/constants/Auth";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/",
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];

export const NavProfile = ({ signOut }) => {
  const authData = JSON.parse(localStorage.getItem("auth_token"));
  const hash = md5(String(authData.email).trim().toLowerCase());

  const profileImg = `https://www.gravatar.com/avatar/${hash}`;
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <Menu>
        <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
          <span>
            <LogoutOutlined className="mr-3" />
            <span className="font-weight-normal">Sign Out</span>
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
