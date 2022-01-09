import React from "react";
import { Form, Input, Button, Checkbox, Col, Row, Grid } from "antd";
import Property, { useProperty, save } from "@/lib/property";
import { useRouter } from "next/router";
import styles from "./add.module.scss";

export async function getServerSideProps({ query }) {
  const { id } = query;
  return { props: { id } };
}

export default function Add() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  const { property, isLoading, isError } = useProperty(id as string);

  const onFinish = (newProperty: Property) => {};

  return (
    <div className={styles.container}>
      <h2>Publicar</h2>
      <h3>Características</h3>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row justify="center">
          <Col span={24}>
            <div>
              <Form.Item
                label="Título"
                name="title"
                rules={[{ required: true, message: "Título obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row justify="center"></Row>
      </Form>
    </div>
  );
}
