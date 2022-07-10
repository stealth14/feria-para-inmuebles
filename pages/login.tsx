import React, { useEffect } from "react";
import styles from "./login.module.scss";
import { Form, Input, Button, Col, Row } from "antd";
import User from "@/lib/auth";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import lang from "@/constants/lang";
import { useLoader } from "@/hocs/withLoader";

export default function Login() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const router = useRouter();
  const { handleLoading } = useLoader();

  const onFinish = async (submittedUser: User) => {
    handleLoading(true);

    const [user, error] = await login(submittedUser);

    handleLoading(false);

    if (user) {
      router.push("/properties");
    }

    if (error) {
      alert(lang("generic_error"));
    }
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
            Entrar a mi cuenta
          </Button>
        </Row>
      </Form>
    </div>
  );
}
