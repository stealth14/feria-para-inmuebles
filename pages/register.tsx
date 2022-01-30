import React, { useState } from "react";
import styles from "./register.module.scss";
import { Form, Input, Button, Col, Row } from "antd";
import User from "@/lib/auth";
import PhotosPicker from "@/components/globals/PhotosPicker";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import lang from "@/constants/lang";

export default function Register() {
  const { register } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const router = useRouter();

  const onFinish = async (user: User) => {
    // photos validation
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

    const [savedUser, error] = await register({
      ...user,
      avatar: fileList[0].originFileObj,
    });

    if (savedUser) router.push("/properties");

    if (error) {
      if (error.response) {
        //handle exceptions
        const exceptions = JSON.parse(error.response.data);

        var alertMessage = "" as string;

        for (const exception in exceptions) {
          alertMessage = `${exceptions[exception]}` + "\n";
        }

        alert(alertMessage);
      }
    }
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
              name="last_name"
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
          <Col span={24}>
            <Form.Item
              label="Contraseña"
              name="password_confirmation"
              rules={[{ required: true, message: "Confirma tu contraseña" }]}
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
