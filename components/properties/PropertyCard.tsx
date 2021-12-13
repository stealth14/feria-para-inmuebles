import React from "react";
import Property from "@/lib/property";
import styles from "./PropertyCard.module.scss";
import { Row, Col, Grid } from "antd";
import Feature from "./Feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faBed,
  faCar,
  faBath,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const { useBreakpoint } = Grid;
interface PropertyCardProps {
  property: Property;
  actions?: React.ReactNode;
}

export default function PropertyCard(props: PropertyCardProps) {
  const { property, actions } = props;
  const { phone, photo } = property;

  const screens = useBreakpoint();

  const Info = (props: InfoProps) => {
    const { property } = props;

    return (
      <div className={styles.Info}>
        <div className={styles.head}>
          <h2> USD {property.price}</h2>
          {actions}
        </div>
        <h3>
          {property.type ?? "Casa"} - {property.address}
        </h3>
        <p>{property.description}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Row
        className={styles.content}
        justify={screens.xs ? "center" : "space-around"}
      >
        {!screens.xs && (
          <Col className={styles.photo} span={8}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="foto de propiedad" />
          </Col>
        )}
        <Col
          className={styles.content}
          xs={24}
          sm={16}
          md={16}
          lg={16}
          xl={16}
          xxl={16}
        >
          <Info property={property} />
          {screens.xs && (
            <Col className={styles.photo} sm={24}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="foto de propiedad" />
            </Col>
          )}
          <Features property={property} />
        </Col>
      </Row>
    </div>
  );
}

interface InfoProps {
  property: Property;
}

interface FeatureProps {
  property: Property;
}

const Features = (props: FeatureProps) => {
  const { property } = props;
  return (
    <div className={styles.Features}>
      <Row>
        <Feature
          icon={<FontAwesomeIcon icon={faVectorSquare} />}
          value={property.area}
          label={"m²"}
        />
        <Feature
          icon={<FontAwesomeIcon icon={faBed} />}
          value={1}
          label={"dormitorio"}
        />
      </Row>
      <Row>
        <Feature
          icon={<FontAwesomeIcon icon={faBath} />}
          value={property.bathrooms}
          label={"baños"}
        />
        <Feature
          icon={<FontAwesomeIcon icon={faCar} />}
          value={property.parkings}
          label={"parqueaderos"}
        />
        <Feature
          icon={<FontAwesomeIcon icon={faCoffee} />}
          value={property.kitchens}
          label={"cocina"}
        />
      </Row>
    </div>
  );
};
