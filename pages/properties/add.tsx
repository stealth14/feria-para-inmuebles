import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, Select } from "antd";
import Property, { update, create } from "@/lib/property";
import { useRouter } from "next/router";
import FeatureSelect from "@/components/properties/FeatureSelect";
import PhotoPicker from "@/components/globals/PhotoPicker";
import lang from "@/constants/lang";
import styles from "./add.module.scss";
import { parseQuery } from "@/lib/utils";
import type { UploadFile } from "antd/es/upload/interface";
import { useLoader } from "@/hocs/withLoader";

const { Option } = Select;

export default function Add() {
  const router = useRouter();
  const { query, isReady } = router;

  const { handleLoading } = useLoader();

  const [property, setProperty] = useState<Property | null | undefined>(
    undefined
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const handleFileList = (fileList: UploadFile[]) => {
    setFileList([...fileList]);
  };

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
    if (fileList.length < 1) {
      alert(lang("photo_required"));
      return;
    }

    handleLoading(true);

    if (property) {
      await update({
        ...property,
        ...newProperty,
        photos: fileList,
      } as Property);
    } else {
      await create({ ...newProperty, photos: fileList } as Property);
    }

    handleLoading(false);
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
                  <Select style={{ width: 120 }}>
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
            <PhotoPicker
              multiple={true}
              maxCount={4}
              handleFileList={handleFileList}
              fileList={fileList}
            />
            <Row justify="center">
              <Button
                loading={property === undefined}
                disabled={property === undefined}
                className={styles["submit-button"]}
                htmlType="submit"
              >
                {property === undefined && "Cargando"}
                {property === null && "Publicar"}
                {property && "Guardar cambios"}
              </Button>
            </Row>
          </Form>
        </>
      )}
      {property === undefined && <>unresolved mode</>}
    </div>
  );
}
