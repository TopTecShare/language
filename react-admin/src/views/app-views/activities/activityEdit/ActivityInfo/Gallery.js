import React, { useEffect, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import ImageUploading from "react-images-uploading";
import * as actions from "../../../../_redux/activities/activitiesActions";
import {
  Button,
  Form,
  notification,
  Card,
  Upload,
  message,
  Modal,
  Row,
  Col,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";

const CustomIcon = React.forwardRef((props, _) => (
  <Icon component={props.svg} className={props.className} />
));
const ImageSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <g>
      <g>
        <path
          fill="#E5E1E5"
          d="M163.033,1011.756L2.746,191.353c-4.863-24.879,11.365-48.991,36.245-53.852l124.042-24.234l194.642-42.82
          l279.663,941.308H163.033V1011.756z"
        />
      </g>
      <path
        fill="#99E6FC"
        d="M163.033,680.979L68.355,196.393l94.678-18.501l143.802-23.615l62.994,584.599L163.033,680.979z"
      />
      <g id="XMLID_159_">
        <g>
          <path
            fill="#F9F7F8"
            d="M1014.357,64.9v957.461c0,25.351-20.549,45.899-45.899,45.899H208.93
            c-25.351,0-45.901-20.549-45.901-45.899V64.9c0-25.35,20.551-45.9,45.901-45.9h759.528C993.809,19,1014.357,39.551,1014.357,64.9
            z"
          />
        </g>
        <path
          fill="#EFEDEF"
          d="M574.473,971.206c-90.848,0-164.495-73.646-164.495-164.493V19H208.93
          c-25.351,0-45.901,20.551-45.901,45.9v957.461c0,25.351,20.551,45.899,45.901,45.899h759.528
          c25.351,0,45.899-20.549,45.899-45.899v-51.155H574.473z"
        />
        <path
          fill="#FEC165"
          d="M950.933,737.554V234.861c0-7.122-5.774-12.896-12.897-12.896H239.354c-7.12,0-12.896,5.774-12.896,12.896
          v502.692H950.933z"
        />
        <path
          fill="#FDB441"
          d="M409.978,221.965H239.354c-7.12,0-12.896,5.774-12.896,12.896v502.692h183.52V221.965z"
        />
        <circle fill="#FEE903" cx="588.693" cy="600.309" r="246.948" />
        <path
          fill="#F4D902"
          d="M409.978,770.729V429.889c-42.274,44.316-68.229,104.339-68.229,170.419
          C341.748,666.391,367.703,726.41,409.978,770.729z"
        />
        <g>
          <path
            fill="#99E6FC"
            d="M902.813,668.316c-57.591-25.393-122.604-28.267-182.203-8.034l-51.163,17.336
            c-52.369,17.759-109.135,17.759-161.505,0l-51.163-17.336c-59.602-20.232-124.611-17.358-182.182,8.034l-48.142,21.226v105.269
            l80.12,33.354h599.658l44.699-33.354V689.542L902.813,668.316z"
          />
          <path
            fill="#62DBFB"
            d="M409.978,828.165V649.264c-45.72-6.239-92.605,0.184-135.379,19.053l-48.141,21.226v105.269
            l80.119,33.354H409.978z"
          />
          <path
            fill="#62DBFB"
            d="M950.933,794.811v61.709c0,5.452-4.424,9.878-9.879,9.878H236.332c-5.453,0-9.877-4.426-9.877-9.878
            v-61.709l48.142-21.229c57.57-25.39,122.58-28.268,182.182-8.055l51.163,17.358c52.37,17.759,109.136,17.759,161.505,0
            l51.163-17.358c59.6-20.213,124.612-17.335,182.203,8.055L950.933,794.811z"
          />
          <path
            fill="#01D0FB"
            d="M236.332,866.397h184.86c-7.214-18.51-11.215-38.625-11.215-59.685v-52.188
            c-45.72-6.231-92.605,0.192-135.379,19.061l-48.141,21.226v61.71c-0.003,5.451,4.421,9.875,9.874,9.875V866.397z"
          />
        </g>
      </g>
    </g>
  </svg>
);
const { Dragger } = Upload;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Gallary() {
  const { addActivityId, gallaryData, addActivityStatusData, delMsgStatus } =
    useSelector(
      (state) => ({
        addActivityId: state.activities.addActivityId,
        gallaryData: state.activities.gallaryData,
        addActivityStatusData: state.activities.addActivityStatusData,
        delMsgStatus: state.activities.delMsgStatus,
      }),
      shallowEqual
    );

  const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const dispatch = useDispatch();

  const [images, setImages] = React.useState([]);
  const [imageData, setImageData] = React.useState([]);
  const maxNumber = 50;

  const onChange = (imageList) => {
    setImages(imageList);

    var data = [];
    for (var i = 0; i < imageList.length; i++) {
      var list = {};
      list["url"] = imageList[i].data_url;
      data.push(list);
    }
    setImageData(data);
  };

  useEffect(() => {
    dispatch(actions.getGallery(addActivityId, token));
  }, []);

  const uploadGallery = (values) => {
    dispatch(actions.uploadGallery(values, token));
  };
  //////////////////////////////////
  const deleteImage = (value) => {
    let delData = {};
    delData["image"] = value;
    dispatch(actions.deleteImage(addActivityId, delData, token));
  };

  ////////dialog///////
  useEffect(() => {
    if (addActivityStatusData != null) {
      openNotification();
      dispatch(actions.getGallery(addActivityId, token));
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
    const data = new FormData();
    const imageArry = [];
    data.append("id", addActivityId);
    var iLength = images.length;
    if (iLength == 0) {
      message.error("Can not upload empty gallery");
      return;
    }
    for (let i = 0; i < images.length; i++) {
      data.append("gallary", images[i]["file"]);
    }
    uploadGallery(data);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const [previewImage, setPreviewImage] = React.useState("");
  const [previewVisible, setPreviewVisible] = React.useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setImageData(fileList);
  };
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ marginTop: 50 }}
    >
      <Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Card title="Uploaded Images" >
              {gallaryData != "" &&
                gallaryData.map((imgData, index) => (
                  <Fragment key={index}>
                    <div
                      className="image-input image-item__btn-wrapper image-input-wrapper"
                      id="kt_image_3"
                      style={{ marginLeft: 20 }}
                    >
                      <span
                        style={{ marginLeft: "70%" }}
                        onClick={() => deleteImage(imgData)}
                      >
                        <CloseCircleOutlined />
                      </span>
                      <div className="image-input-wrapper">
                        <img
                          src={imgData}
                          alt=""
                          width="80%"
                          height="80%"
                          style={{ borderRadius: "20%" }}
                        />
                      </div>
                    </div>
                  </Fragment>
                ))}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Image Upload" >
              <div className="form-group">
                <div className="App">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    name="image"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageRemove,
                      dragProps,
                    }) => (
                      <div>
                        <div
                          className="dropzone dropzone-default dropzone-success dz-clickable dz-clickable dz-started dz-max-files-reached"
                          id="kt_dropzone_3"
                        >
                          <span
                            onClick={onImageRemoveAll}
                            style={{ float: "right" }}
                          >
                            <CloseCircleOutlined
                              style={{ width: "100%", height: "100%" }}
                            />
                          </span>
                          <div
                            className="dropzone-msg dz-message needsclick"
                            {...dragProps}
                          >
                            <div className="upload__image-wrapper">
                              <div onClick={onImageUpload}>
                                <CustomIcon
                                  className="display-3"
                                  svg={ImageSvg}
                                />
                                <p>Click or drag file to upload</p>
                              </div>
                              &nbsp;
                            </div>
                          </div>
                        </div>

                        <div
                          className="row"
                          style={{ justifyContent: "center", marginTop: 20 }}
                        >
                          <Upload
                            listType="picture-card"
                            fileList={imageData}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          ></Upload>
                          <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                          {/* {imageList.map((image, index) => (
                          <div key={index} className="image-input" style={{ marginLeft: 10 }} >
                            <span style={{ marginLeft: '50%' }} onClick={() => onImageRemove(index)}>
                              <CloseCircleOutlined />
                            </span>
                            <div className="image-input-wrapper">
                              <img src={image['data_url']} alt="" width="50%" height="50%" style={{ borderRadius: "20%" }} />
                            </div>
                          </div>
                        ))} */}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <div className="form-group row">
          <div className="col-9">
            <Button
              className="mr-2"
              type="primary"
              htmlType="submit"
              style={{ float: "right" }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Gallary;
