import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Pagination, Divider } from "antd";
import Property, { search, SearchResult } from "@/lib/property";
import FeatureSelect from "@/components/properties/FeatureSelect";
import styles from "./search.module.scss";
import { useLoader } from "@/hocs/withLoader";

interface SearchParams {
  [param: string]: string | number;
}

export default function Index() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const [form] = Form.useForm();
  const { handleLoading } = useLoader();

  useEffect(() => {
    if (!page) return;
    form.submit();
  }, [form, page]);

  const onFinish = async (data: SearchParams) => {
    const params: SearchParams = {};

    for (const param in data) {
      const value = data[param];
      if (!value) continue;
      params[param] = value;
    }

    handleLoading(true);
    const [searchResult] = await search({ ...params, page });
    handleLoading(false);

    if (!searchResult) return;

    const { data: properties, total, per_page } = searchResult as SearchResult;

    if (!properties) return;
    setProperties(properties);
    setTotal(total);
    setPageSize(per_page);
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
      <Divider orientation="right" plain />
      <Pagination
        onChange={(newPage) => {
          setPage(newPage);
        }}
        current={page}
        total={total ?? 1}
        pageSize={pageSize ?? 1}
      />
      <div className={styles.results}>
        {properties.map((property, index) => {
          return <div key={index}>{property.title}</div>;
        })}
      </div>
    </div>
  );
}
