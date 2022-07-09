import React, { useEffect, useState } from "react";
import Property, { drop, get } from "@/lib/property";
import styles from "./property.module.scss";
import Features from "@/components/properties/Features";
import AnchorBase from "@/components/globals/AnchorBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useLoader } from "@/hocs/withLoader";
import PhotosCarousel from "@/components/PhotosCarousel/PhotosCarousel";

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

export default function Page() {
  const [property, setProperty] = useState<Property | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const { handleLoading } = useLoader();

  const handleDelete = async () => {
    handleLoading(true);

    await drop(property);

    handleLoading(false);
  };

  useEffect(() => {
    handleLoading(!Boolean(property));
  }, [property]);

  useEffect(() => {
    (async () => {
      if (typeof id === "string") {
        const [property, error] = await get(id);

        if (error) return;

        setProperty(property);
      }
    })();
  }, [id]);

  if (!property) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      {property && (
        <>
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
                  query: { ...property } as any,
                });
              }}
            />
            <Action label="Eliminar" faIcon={faTrash} onClick={handleDelete} />
          </div>
          <PhotosCarousel photos={property.photos as string[]} />
          <Features property={property} />
          <p>{property.description}</p>
        </>
      )}
    </div>
  );
}
