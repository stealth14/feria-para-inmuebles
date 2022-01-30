import React from "react";
import styles from "./login.module.scss";
import { Form, Input, Button, Col, Row } from "antd";
import User from "@/lib/auth";

export default function Login() {
  const [form] = Form.useForm();

  const onFinish = (user: User) => {
    console.log("user:", user);
  };

  return (
    <div className={styles.container}>
      <h2>Iniciar Sesión</h2>
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
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Contraseña obligatoria" }]}
            >
              <Input.Password />
            </Form.Item>
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
