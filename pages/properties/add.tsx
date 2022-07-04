import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import Property from "@/lib/property";
import { useRouter } from "next/router";
import FeatureSelect from "@/components/properties/FeatureSelect";
import PhotosPicker from "@/components/globals/PhotosPicker";
import lang from "@/constants/lang";
import styles from "./add.module.scss";
import { parseQuery } from "@/lib/utils";
import type { UploadFile } from "antd/es/upload/interface";

enum AddMode {
  CREATE,
  EDIT,
  UNKNOW,
}

const urlToObject = async (url: string) => {
  const response = await fetch(url);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], url, { type: blob.type });
  return file;
};

export default function Add() {
  const router = useRouter();
  const { query, isReady } = router;
  const [mode, setMode] = useState<AddMode | null>(AddMode.UNKNOW);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isReady) {
      if (query === {}) {
        setMode(AddMode.CREATE);
        setFileList([]);
        return;
      }
      setMode(AddMode.EDIT);
      // initialize uncontrolled fields
      const property = parseQuery(query) as Property;
      form.setFieldsValue(property);
      // initialize controlled fields
      setMode(AddMode.EDIT);
      const fileList = property.photos.map((photo: string, index) => {
        return {
          uid: `${index}`,
          name: `image${1}.png`,
          status: "done",
          url: photo,
        } as UploadFile;
      });

      setFileList(fileList);
    }
  }, [form, isReady, query]);

  const onFinish = (newProperty: Property) => {
    console.log("newProperty:", newProperty);
    // photos validation
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

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
          <Button
            loading={mode === AddMode.UNKNOW}
            disabled={mode === AddMode.UNKNOW}
            className={styles["submit-button"]}
            htmlType="submit"
          >
            Publicar
          </Button>
        </Row>
      </Form>
    </div>
  );
}
