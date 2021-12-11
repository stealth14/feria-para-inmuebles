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
  actions?: React.ReactNode;
}

export default function PropertyCard(props: PropertyCardProps) {
  const { property, actions } = props;
  const { phone, photo } = property;
  return (
    <div className={styles.container}>
      <Row justify="start">
        <Col className={styles.photo} span={8}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="foto de propiedad" />
        </Col>
        <Col className={styles.content} span={11}>
          <Info property={property} />
          <Features property={property} />
        </Col>
        {actions && <Col span={5}>{actions}</Col>}
      </Row>
    </div>
  );
}

interface InfoProps {
  property: Property;
}

const Info = (props: InfoProps) => {
  const { property } = props;

  return (
    <div className={styles.Info}>
      <h2> USD {property.price}</h2>
      <h3>
        {property.type ?? "Casa"} - {property.address}
      </h3>
      <p>{property.description}</p>
    </div>
  );
};
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
