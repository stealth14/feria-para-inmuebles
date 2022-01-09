import React from "react";
import Property, { getAll, get } from "@/lib/property";
import styles from "./property.module.scss";
import Features from "@/components/properties/Features";
import { Carousel } from "antd";
import AnchorBase from "@/components/globals/AnchorBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <div className={styles.info}>
          <div className={styles.head}>
            <h2> USD {property.price}</h2>
          </div>
          <h3>
            {property?.type} - {property.address}
          </h3>
        </div>
        <div className={styles.actions}>
          <AnchorBase
            className={styles.AnchorBase}
            onClick={() => {
              router.push({
                pathname: "/properties/add",
                query: { id: property.id },
              });
            }}
          >
            <FontAwesomeIcon className={styles.icon} icon={faPen} />
            <span
              style={{ textAlign: "center", fontSize: 12, fontWeight: "bold" }}
            >
              Editar publicación
            </span>
          </AnchorBase>
        </div>
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
