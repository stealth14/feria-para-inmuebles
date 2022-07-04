import React, { useState } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import Property from "@/lib/property";
import { useRouter } from "next/router";
import FeatureSelect from "@/components/properties/FeatureSelect";
import PhotosPicker from "@/components/globals/PhotosPicker";
import lang from "@/constants/lang";
import styles from "./add.module.scss";
import { parseQuery } from "@/lib/utils";

export default function Add() {
  const router = useRouter();
  const { query, isReady } = router;

  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isReady) {
      // initialize uncontrolled fields
      const property = parseQuery(query) as Property;
      form.setFieldsValue(property);
      // initialize controlled field
    }
  }, [form, isReady, query]);

  const [fileList, setFileList] = useState([]);

  const onFinish = (submittedProperty: Property) => {
    console.log("submittedProperty:", submittedProperty);
    // photos validation
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

    console.log("submittedProperty", submittedProperty);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hint}>
        <p> Por favor, ingresa la información de la propiedad </p>
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
            <FeatureSelect name={"bedrooms"} label="Dormitorios" />
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
        <PhotosPicker
          maxCount={4}
          handleChange={handleChange}
          fileList={fileList}
        />
        <Row justify="center">
          <Button className={styles["submit-button"]} htmlType="submit">
            Publicar
          </Button>
        </Row>
      </Form>
    </div>
  );
}
