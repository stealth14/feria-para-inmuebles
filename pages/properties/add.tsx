import React from "react";
import { Form, Input, Button, Col, Row } from "antd";
import Property, { useProperty, save } from "@/lib/property";
import { useRouter } from "next/router";
import FeatureSelect from "@/components/properties/FeatureSelect";
import PhotosPicker from "@/components/globals/PhotosPicker";

import styles from "./add.module.scss";

export async function getServerSideProps({ query }) {
  const { id } = query;
  return { props: { id } };
}

export default function Add() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { property, isLoading, isError } = useProperty(id as string);

  const onFinish = (submittedProperty: Property) => {
    console.log("submittedProperty", submittedProperty);
  };

  return (
    <div className={styles.container}>
      <h2>Publicar</h2>
      <div className={styles.subtitle}>
        <h3>Características</h3>
      </div>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col span={24}>
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Título obligatorio" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <FeatureSelect name={"bathrooms"} label="Baños" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"dormitories"} label="Dormitorios" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"kitchens"} label="Cocinas" />
          </Col>
          <Col span={24}>
            <FeatureSelect name={"parkings"} label="Parqueaderos" />
          </Col>
        </Row>
        <div className={styles.subtitle}>
          <h3>Fotos</h3>
        </div>
        <PhotosPicker />
        <Row justify="center">
          <Button htmlType="submit">Publicar</Button>
        </Row>
      </Form>
    </div>
  );
}
