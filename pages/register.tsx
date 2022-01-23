import React, { useState } from "react";
import styles from "./register.module.scss";
import { Form, Input, Button, Col, Row } from "antd";
import User from "@/lib/user";
import PhotosPicker from "@/components/globals/PhotosPicker";

export default function Register() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (user: User) => {
    // photos validation
    if (fileList.length < 1) {
      alert("Please select at least one photo");
      return;
    }

    console.log("user:", user);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className={styles.container}>
      <h2>Registrarse</h2>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col span={24}>
            <Form.Item
              label="Correo"
              name="email"
              rules={[{ required: true, message: "Correo obligatorio" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Nombre obligatorio" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Apellido"
              name="surname"
              rules={[{ required: true, message: "Apellido obligatorio" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Contraseña obligatoria" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <PhotosPicker
              maxCount={1}
              handleChange={handleChange}
              fileList={fileList}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Button className={styles["submit-button"]} htmlType="submit">
            Registrarse
          </Button>
        </Row>
      </Form>
    </div>
  );
}
