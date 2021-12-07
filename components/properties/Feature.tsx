import React from "react";
import styles from "./Feature.module.scss";

interface FeatureProps {
  value: number;
  label: string;
  icon: JSX.Element;
}

const Feature = (props: FeatureProps) => {
  const { value, label, icon } = props;
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div>{value}</div>
      <div>{label}</div>
    </div>
  );
};

export default Feature;
