import React, { useState, Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Radio,
  Col,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export class EditProfile extends Component {
  avatarEndpoint = "https://www.mocky.io/v2/5cc8019d300000980a055e76";

  state = {
    avatarUrl: "/img/avatars/thumb-6.jpg",
    name: "Charlie Howard",
    email: "charlie.howard@themenate.com",
    userName: "Charlie",
    dateOfBirth: null,
    phoneNumber: "+44 (1532) 135 7921",
    website: "",
    address: "",
    city: "",
    postcode: "",
  };

  getBase64(file, img, callback) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    });
  }

  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const onFinish = (values) => {
      const key = "updatable";
      message.loading({ content: "Updating...", key });
      setTimeout(() => {
        this.setState({
          name: values.name,
          email: values.email,
          userName: values.userName,
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values.phoneNumber,
          website: values.website,
          address: values.address,
          city: values.city,
          postcode: values.postcode,
        });
        message.success({ content: "Done!", key, duration: 2 });
      }, 1000);
    };
    const { TextArea } = Input;

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // const onChange = (e) => {
    // 	setValue(e.target.value);
    //   };

    // const [value, setValue] = React.useState(1);

    const onUploadAavater = (info) => {
      const key = "updatable";
      if (info.file.status === "uploading") {
        message.loading({ content: "Uploading...", key, duration: 1000 });
        return;
      }
      if (info.file.status === "done") {
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            avatarUrl: imageUrl,
          })
        );
        message.success({ content: "Uploaded!", key, duration: 1.5 });
      }
    };

    const onRemoveAvater = () => {
      this.setState({
        avatarUrl: "",
      });
    };

    const {
      name,
      email,
      userName,
      dateOfBirth,
      phoneNumber,
      website,
      address,
      city,
      postcode,
      avatarUrl,
    } = this.state;

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <>
        <Flex
          alignItems="center"
          mobileFlex={false}
          className="text-center text-md-left"
        >
          <Avatar
            size={90}
            src={"/img/avatars/thumb-6.jpg"}
            icon={<UserOutlined />}
          />
          <div className="ml-3 mt-md-0 mt-3">
            <Upload
              onChange={onUploadAavater}
              showUploadList={false}
              action={this.avatarEndpoint}
            >
              <Button>Change Avatar</Button>
            </Upload>
            <Button
              className="ml-2 mr-4 remove-button"
              onClick={onRemoveAvater}
            >
              Delete
            </Button>
          </div>
          <div className="mt-4 ml-4">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Paid</Radio>
              <Radio value={2}>Free</Radio>
              <Radio value={3}>Closed</Radio>
            </Radio.Group>
          </div>
        </Flex>
        <div className="mt-4">
          <Form
            name="basicInformation"
            layout="vertical"
            initialValues={{
              name: name,
              email: email,
              username: userName,
              dateOfBirth: dateOfBirth,
              phoneNumber: phoneNumber,
              website: website,
              address: address,
              city: city,
              postcode: postcode,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={22}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Business name"
                      name="businessname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input placeholder="Your business name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Full name"
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="First name and Last name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Street"
                      name="street"
                      rules={[
                        {
                          required: false,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input placeholder="Business address" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6}>
                    <Form.Item
                      label="Zip"
                      name="zip"
                      rules={[
                        {
                          required: false,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="1234" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        {
                          required: false,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Copenhagen" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Phone" name="phone">
                      <Input placeholder="12345678" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input placeholder="yourname@yourdomain.com" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item label="Website" name="website">
                      <Input placeholder="business.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Social" name="social1">
                      <Input placeholder="facebook.com/" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label=" " name="social2">
                      <Input placeholder="instagram.com/" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="About your business" name="description">
                      <TextArea
                        rows={4}
                        placeholder="Short business description"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Registered RAB"
                      name="rab"
                      rules={[{ required: false }]}
                    >
                      <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>No</Radio>
                        <Radio value={2}>Yes</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Organisation"
                      name="organisation"
                      rules={[{ required: false }]}
                    >
                      <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>No</Radio>
                        <Radio value={2}>Yes</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <Form.Item
                      label="Insurance"
                      name="insurance"
                      rules={[{ required: false }]}
                    >
                      <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>No</Radio>
                        <Radio value={2}>Yes</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      label="Picture"
                      name="picture"
                      rules={[{ required: false }]}
                    >
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="ml-2" htmlType="submit">
                  Save
                </Button>
                <Button className="delete-button" type="ml-2" htmlType="delete">
                  Delete account
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default EditProfile;
