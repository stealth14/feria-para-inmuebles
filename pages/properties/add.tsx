import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, Select } from "antd";
import Property, { update, create } from "@/lib/property";
import { useRouter } from "next/router";
import FeatureSelect from "@/components/properties/FeatureSelect";
import PhotosPicker from "@/components/globals/PhotosPicker";
import lang from "@/constants/lang";
import styles from "./add.module.scss";
import { parseQuery } from "@/lib/utils";
import type { UploadFile } from "antd/es/upload/interface";

const { Option } = Select;

export default function Add() {
  const router = useRouter();
  const { query, isReady } = router;
  const [property, setProperty] = useState<Property | null | undefined>(
    undefined
  );
  const [fileList, setFileList] = useState<UploadFile[]>(
    new Array<UploadFile>()
  );

  const [form] = Form.useForm();

  /** Initialize uncontrolled fields*/
  useEffect(() => {
    if (isReady) {
      if (Object.keys(query).length === 0) {
        setProperty(null);
        return;
      }
      // initialize uncontrolled fields
      const property = parseQuery(query) as Property;

      setProperty(property);
      form.setFieldsValue(property);
    }
  }, [form, isReady, query]);

  /** Load current property photos */
  useEffect(() => {
    if (!property) return;
    const list = property.photos.map((photo, index) => {
      return {
        uid: `${index}`,
        name: `image${index}`,
        status: "done",
        url: photo,
      } as UploadFile;
    });

    setFileList(list);
  }, [property]);

  const onFinish = async (newProperty: Property) => {
    console.log("newProperty:", newProperty);
    // photos validation
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

    if (!property) {
      console.log("creating");
      await create({ ...newProperty, photos: fileList } as Property);
    }

    if (property) {
      // console.log("updating");
      // await update(newProperty);
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div className={styles.container}>
      {(property === null || property) && (
        <>
          <div className={styles.hint}>
            <p> Por favor, ingresa la información de la propiedad </p>
          </div>
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
                <Form.Item
                  label="Título"
                  name="title"
                  rules={[{ required: true, message: "Título obligatorio" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Descripción"
                  name="description"
                  rules={[
                    { required: true, message: "Descripción obligatoria" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Dirección"
                  name="address"
                  rules={[{ required: true, message: "Dirección obligatoria" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Precio"
                  name="price"
                  rules={[{ required: true, message: "Precio obligatorio" }]}
                >
                  <Input type={"number"} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Tipo de propiedad"
                  name="type"
                  rules={[{ required: true, message: "Obligatorio" }]}
                >
                  <Select defaultValue="Casa" style={{ width: 120 }}>
                    <Option value="Terreno">Terreno</Option>
                    <Option value="Casa">Casa</Option>
                    <Option value="Departamento">Departamento</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
        </>
      )}
      {property === undefined && <>unresolved mode</>}
    </div>
  );
}
