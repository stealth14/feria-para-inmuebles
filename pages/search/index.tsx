import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import FeatureSelect from "@/components/properties/FeatureSelect";
import styles from "./search.module.scss";

interface Query {
  [param: string]: string | number;
}

export default function Index() {
  const [form] = Form.useForm();

  const onFinish = async (query: Query) => {
    console.log("query:", query);
  };

  return (
    <div className={styles.container}>
      <Form layout={"vertical"} form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col span={20}>
            <Input.Group style={{ margin: "30px auto" }} compact>
              <Form.Item noStyle label="Título" name="title">
                <Input style={{ width: "calc(100% - 76px)" }} />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Buscar
              </Button>
            </Input.Group>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"bathrooms"}
              label="Baños"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"area"}
              label="Area"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"livingrooms"}
              label="Salas"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"bedrooms"}
              label="Dormitorios"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"kitchens"}
              label="Cocinas"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <FeatureSelect
              required={false}
              align="center"
              name={"parkings"}
              label="Parqueaderos"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
