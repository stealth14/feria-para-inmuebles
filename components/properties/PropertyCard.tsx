import React from "react";
import Property from "@/lib/property";
import styles from "./PropertyCard.module.scss";
import { Row, Col } from "antd";
import Feature from "./Feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faBed,
  faCar,
  faBath,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard(props: PropertyCardProps) {
  const { property } = props;
  return (
    <div className={styles.container}>
      <Row justify="start">
        <Col className={styles.photo} span={8}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={property.photo} alt="foto de propiedad" />
        </Col>
        <Col className={styles.content} span={16}>
          <Features property={property} />
        </Col>
      </Row>
    </div>
  );
}

interface FeatureProps {
  property: Property;
}

const Features = (props: FeatureProps) => {
  const { property } = props;
  return (
    <div className={styles.Features}>
      <div className={styles.row}>
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
      </div>
      <div className={styles.row}>
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
      </div>
    </div>
  );
};
