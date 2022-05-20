import React from "react";
import Property, { getAll, get } from "@/lib/property";
import styles from "./property.module.scss";
import Features from "@/components/properties/Features";
import { Carousel } from "antd";
import AnchorBase from "@/components/globals/AnchorBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface ActionProps {
  label: string;
  onClick: () => void;
  faIcon: IconDefinition;
}

const Action = (props: ActionProps) => {
  const { label, faIcon, onClick } = props;

  return (
    <div>
      <AnchorBase
        className={styles.AnchorBase}
        style={{
          width: 100,
          height: 100,
        }}
        onClick={onClick}
      >
        <FontAwesomeIcon className={styles.icon} icon={faIcon} />
        <span style={{ textAlign: "center", fontSize: 12, fontWeight: "bold" }}>
          {label}
        </span>
      </AnchorBase>
    </div>
  );
};

export async function getStaticPaths() {
  const [properties] = await getAll();

  const paths = properties.map((property : Property) => ({
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
      </div>
      <div className={styles.actions}>
        <Action
          label="Editar"
          faIcon={faPen}
          onClick={() => {
            router.push({
              pathname: "/properties/add",
              query: { id: property.id },
            });
          }}
        />
        <Action
          label="Eliminar"
          faIcon={faTrash}
          onClick={() => {
            alert("Eliminando");
          }}
        />
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
