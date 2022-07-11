import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, Pagination, Divider } from "antd";
import Property, { search, SearchResult } from "@/lib/property";
import FeatureSelect from "@/components/properties/FeatureSelect";
import styles from "./search.module.scss";
import { useLoader } from "@/hocs/withLoader";

import PropertyCard from "@/components/properties/PropertyCard";
import ButtonBase from "@/components/globals/ButtonBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "@/components/globals/Button";
import { useRouter } from "next/router";
import { UndoOutlined } from "@ant-design/icons";

interface SearchParams {
  [param: string]: string | number;
}

export default function Index() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const router = useRouter();
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

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <Form layout={"vertical"} form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col span={20}>
            <Input.Group style={{ margin: "30px auto" }} compact>
              <Form.Item
                tooltip={"Coincidencias en título de publicación"}
                noStyle
                label="Título"
                name="title"
              >
                <Input
                  placeholder="Buscar por título.."
                  style={{ width: "calc(100% - 130px)" }}
                />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Buscar
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={onReset}
                type="dashed"
                icon={<UndoOutlined />}
              />
            </Input.Group>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <Form.Item
              tooltip={"Area en metros cuadrados"}
              style={{ marginLeft: 10 }}
              label="Area"
              name="area"
            >
              <Input type={"number"} />
            </Form.Item>
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
        <div className={styles.list}>
          {properties.map((property) => {
            return (
              <PropertyCard
                key={property.id}
                property={property}
                actions={
                  <div className={styles.actions}>
                    <div className={styles.action}>
                      <ButtonBase
                        onClick={() => {
                          window.open("https://wa.me/593992825956", "_blank");
                        }}
                      >
                        <FontAwesomeIcon
                          className={styles.ellipsis}
                          icon={faPhone}
                        />
                      </ButtonBase>
                    </div>
                  </div>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
