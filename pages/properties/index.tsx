import React from "react";
import { useProperties } from "@/lib/property";
import { Col, Row, Grid } from "antd";

import PropertyCard from "@/components/properties/PropertyCard";
import styles from "@/pages/properties/properties.module.scss";
import ButtonBase from "@/components/globals/ButtonBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "@/components/globals/Button";
import Button from "@/components/globals/Button";

function Index() {
  const { properties, isLoading, isError } = useProperties();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div className={styles.container}>
      {isLoading && <div>Loading...</div>}

      {isError && <div>Error</div>}
      <div className={styles.header}>
        <h1>Mis publicaciones</h1>
      </div>
      <div className={styles.content}>
        <Row justify={screens.xs ? "center" : "end"}>
          <Col xs={20} sm={3} md={3} lg={3} xl={3} xxl={3}>
            <Button>PUBLICAR</Button>
          </Col>
        </Row>
      </div>

      <div className={styles.content}>
        <Row justify={"center"}>
          <span>4.769 Departamentos quito en alquiler en Ecuador</span>
        </Row>
      </div>

      <div className={styles.list}>
        {properties &&
          properties.map((property) => {
            return (
              <PropertyCard
                key={property.id}
                property={property}
                actions={
                  <div className={styles.actions}>
                    <div className={styles.action}>
                      <ButtonBase
                        onClick={() => {
                          console.log("hola amigos");
                        }}
                      >
                        <FontAwesomeIcon
                          className={styles.ellipsis}
                          icon={faArrowRight}
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
  );
}

export default Index;
