import React from "react";
import Property from "@/lib/property";
import styles from "./Features.module.scss";
import { Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faBed,
  faCar,
  faBath,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import Feature from "./Feature";

interface FeatureProps {
  property: Property;
}

export default function Features(props: FeatureProps) {
  const { property } = props;
  return (
    <div className={styles.container}>
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
}
