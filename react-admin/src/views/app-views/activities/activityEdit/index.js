/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Flex from "components/shared-components/Flex";
import { Tabs, Form, Button, message } from "antd";

import BasicInfo from "./ActivityInfo/BasicInfo";
import Schedule from "./ActivityInfo/Schedule";
import BookingLimits from "./ActivityInfo/BookingLimits";
import Gallery from "./ActivityInfo/Gallery";
import TimeSlots from "./ActivityInfo/TimeSlots";
import Price from "./ActivityInfo/Price";
import Transport from "./ActivityInfo/Transport";
import Food from "./ActivityInfo/Food";
import Amenities from "./ActivityInfo/Amenities";
import AdditionalInfo from "./ActivityInfo/AdditionalInfo";
import Tickets from "./ActivityInfo/Tickets";
import Commissions from "./ActivityInfo/Commissions";
import Platforms from "./ActivityInfo/Platforms";
import { PageHeaderAlt } from "components/layout-components/PageHeaderAlt";

const { TabPane } = Tabs;
const ActivityEdit = ({
  match: {
    params: { id },
  },
}) => {
  const [contentName, setContentName] = useState("BasicInfo");
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        setTimeout(() => {
          setSubmitLoading(false);

          message.success(`Created ${values.name} to product list`);
        }, 1500);
      })
      .catch((info) => {
        setSubmitLoading(false);
        message.error("Please enter all required field ");
      });
  };

  return (
    // <Card>
    //   <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
    //     <Flex className="mb-1" mobileFlex={false}>
    //       <h2>Edit User</h2>
    //     </Flex>
    //     {/* <Flex className="mb-1 mr-4" mobileFlex={false}>
    //                 <Button type="primary" > Submit</Button>
    //             </Flex> */}
    //   </Flex>
    //   <div style={{ backgroundColor: "#fafafb" }}>
    //     <Tabs defaultActiveKey="1" style={{ marginTop: 30, padding: 20 }}>
    //       <TabPane
    //         tab="BasicInfo"
    //         key="1"
    //         style={{ marginRight: 10, marginLeft: 10 }}
    //       >
    //         <BasicInfo setContentName={setContentName} editId={id}></BasicInfo>
    //       </TabPane>
    //       <TabPane tab="Schedule" key="2">
    //         <Schedule setContentName={setContentName} editId={id}></Schedule>
    //       </TabPane>
    //       <TabPane tab="BookingLimits" key="3">
    //         <BookingLimits
    //           setContentName={setContentName}
    //           editId={id}
    //         ></BookingLimits>
    //       </TabPane>
    //       <TabPane tab="Gallery" key="4">
    //         <Gallery setContentName={setContentName} editId={id}></Gallery>
    //       </TabPane>
    //       <TabPane tab="Timeslots" key="5">
    //         <TimeSlots setContentName={setContentName} editId={id}></TimeSlots>
    //       </TabPane>
    //       <TabPane tab="Price" key="6">
    //         <Price setContentName={setContentName} editId={id}></Price>
    //       </TabPane>
    //       <TabPane tab="Transports" key="7">
    //         <Transport setContentName={setContentName} editId={id}></Transport>
    //       </TabPane>
    //       <TabPane tab="Food" key="8">
    //         <Food setContentName={setContentName} editId={id}></Food>
    //       </TabPane>
    //       <TabPane tab="Amenities" key="9">
    //         <Amenities setContentName={setContentName} editId={id}></Amenities>
    //       </TabPane>
    //       <TabPane tab="AdditionalInfo" key="10">
    //         <AdditionalInfo
    //           setContentName={setContentName}
    //           editId={id}
    //         ></AdditionalInfo>
    //       </TabPane>
    //       <TabPane tab="Tickets" key="11">
    //         <Tickets setContentName={setContentName} editId={id}></Tickets>
    //       </TabPane>
    //       <TabPane tab="Commissions " key="12">
    //         <Commissions
    //           setContentName={setContentName}
    //           editId={id}
    //         ></Commissions>
    //       </TabPane>
    //     </Tabs>
    //   </div>
    // </Card>
    // <Form
    //   layout="vertical"
    //   form={form}
    //   name="advanced_search"
    //   className="ant-advanced-search-form"
    //   initialValues={{
    //     heightUnit: "cm",
    //     widthUnit: "cm",
    //     weightUnit: "kg",
    //   }}
    // >
    <div>
      <PageHeaderAlt className="border-bottom" overlap>
        <div style={{ marginLeft: "3vw", marginRight: "3vw" }}>
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3"> Edit User </h2>
            <div className="mb-3">
              <Button type="primary" className="mr-2">
                Publish
              </Button>
              {/* <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={submitLoading}
              >
                Save
              </Button> */}
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
        <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
          <TabPane tab="BasicInfo" key="1">
            <BasicInfo setContentName={setContentName} editId={id}></BasicInfo>
          </TabPane>
          <TabPane tab="Schedule" key="2">
            <Schedule setContentName={setContentName} editId={id}></Schedule>
          </TabPane>
          <TabPane tab="BookingLimits" key="3">
            <BookingLimits
              setContentName={setContentName}
              editId={id}
            ></BookingLimits>
          </TabPane>
          <TabPane tab="Gallery" key="4">
            <Gallery setContentName={setContentName} editId={id}></Gallery>
          </TabPane>
          <TabPane tab="Timeslots" key="5">
            <TimeSlots setContentName={setContentName} editId={id}></TimeSlots>
          </TabPane>
          {/* <TabPane tab="Price" key="6">
            <Price setContentName={setContentName} editId={id}></Price>
          </TabPane> */}
          <TabPane tab="Transports" key="7">
            <Transport setContentName={setContentName} editId={id}></Transport>
          </TabPane>
          <TabPane tab="Food" key="8">
            <Food setContentName={setContentName} editId={id}></Food>
          </TabPane>
          <TabPane tab="Amenities" key="9">
            <Amenities setContentName={setContentName} editId={id}></Amenities>
          </TabPane>
          <TabPane tab="AdditionalInfo" key="10">
            <AdditionalInfo
              setContentName={setContentName}
              editId={id}
            ></AdditionalInfo>
          </TabPane>
          <TabPane tab="Tickets" key="11">
            <Tickets setContentName={setContentName} editId={id}></Tickets>
          </TabPane>
          <TabPane tab="Commissions " key="12">
            <Commissions
              setContentName={setContentName}
              editId={id}
            ></Commissions>
          </TabPane>
          <TabPane tab="Platforms " key="13">
            <Platforms setContentName={setContentName} editId={id}></Platforms>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivityEdit;
