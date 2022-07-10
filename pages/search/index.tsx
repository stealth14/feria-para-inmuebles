import React from "react";
import { Row, Col, Form } from "antd";
import FeatureSelect from "@/components/properties/FeatureSelect";
import styles from "./search.module.scss";

export default function Index() {
  const [form] = Form.useForm();

  const onFinish = async (query) => {};
  return (
    <div className={styles.container}>
      <Form
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Row justify="center">
          <Col span={24}>
            <FeatureSelect name={"bathrooms"} label="Baños" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"area"} label="Area" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"livingrooms"} label="Salas" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"bedrooms"} label="Dormitorios" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"kitchens"} label="Cocinas" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"parkings"} label="Parqueaderos" />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
