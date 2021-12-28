import React from "react";
import Property, { getAll, get, useProperties } from "@/lib/property";
import styles from "./property.module.scss";
import Features from "@/components/properties/Features";
import { Carousel } from "antd";

export async function getStaticPaths() {
  const [properties] = await getAll();

  const paths = properties.map((property) => ({
    params: { id: property.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const [property] = await get(params.id);

  return { props: { property } };
}

export default function Page(props: { property: Property }) {
  const { property } = props;
  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <div className={styles.head}>
          <h2> USD {property.price}</h2>
        </div>
        <h3>
          {property?.type} - {property.address}
        </h3>
      </div>
      <PropertyCarousel property={property} />
      <Features property={property} />
      <p>{property.description}</p>
    </div>
  );
}

const PropertyCarousel = (props: { property: Property }) => {
  const { property } = props;
  const { photo } = property;

  return (
    <Carousel className={styles.PropertyCarousel}>
      <div className={styles.wrapper}>
        <img src={photo} className={styles.photo} />
      </div>
    </Carousel>
  );
};
