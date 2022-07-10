import React, { useState } from "react";
import styles from "./register.module.scss";
import { Form, Input, Button, Col, Row } from "antd";
import User from "@/lib/auth";
import PhotoPicker from "@/components/globals/PhotoPicker";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import lang from "@/constants/lang";
import { useLoader } from "@/hocs/withLoader";
import type { UploadFile } from "antd/es/upload/interface";

export default function Register() {
  const { register } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const router = useRouter();
  const { handleLoading } = useLoader();

  const onFinish = async (user: User) => {
    // photos validation
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

    handleLoading(true);
    const [savedUser] = await register({
      ...user,
      avatar: fileList[0].originFileObj,
    });

    handleLoading(false);

    if (savedUser) router.push("/login");
  };

  const handleFileList = (fileList: UploadFile[]) => {
    setFileList([...fileList]);
  };

  return (
    <div className={styles.container}>
      <h2>Registrarse</h2>
      <Form labelAlign="left" layout="vertical" form={form} onFinish={onFinish}>
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
              label="Número celular"
              name="cel"
              rules={[
                {
                  required: true,
                  message: "Celular obligatorio",
                },
                {
                  max: 10,
                  message: "Maximo 10 caracteres",
                },
                {
                  min: 10,
                  message: "Mínimo 10 caracteres",
                },
                {
                  validator(_, value) {
                    // only 0-9
                    if (/^[0-9]*$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Solo números"));
                  },
                },
              ]}
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
              label="Confirmar contraseña"
              name="password_confirmation"
              rules={[{ required: true, message: "Confirma tu contraseña" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <PhotoPicker
              multiple={false}
              maxCount={1}
              handleFileList={handleFileList}
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
