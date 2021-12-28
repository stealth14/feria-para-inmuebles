import React from "react";
import Property from "@/lib/property";
import styles from "./Info.module.scss";

interface InfoProps {
  property: Property;
  actions?: React.ReactNode;
}

export default function Info(props: InfoProps) {
  const { property, actions } = props;

  return (
    <div className={styles.Info}>
      <div className={styles.head}>
        <h2> USD {property.price}</h2>
        {actions}
      </div>
      <h3>
        {property?.type} - {property.address}
      </h3>
    </div>
  );
}
