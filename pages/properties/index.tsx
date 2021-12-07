import React, { useEffect, useState } from "react";
import { useProperties } from "@/lib/property";
import PropertyCard from "@/components/properties/PropertyCard";
import styles from "./../properties/properties.module.scss";

function Index() {
  const { properties, isLoading, isError } = useProperties();

  return (
    <div className={styles.container}>
      {isLoading && <div>Loading...</div>}

      {isError && <div>Error</div>}
      <div className={styles.header}>
        <h1>Mis publicaciones</h1>
      </div>

      <div className={styles.list}>
        {properties &&
          properties.map((property) => {
            return <PropertyCard key={property.id} property={property} />;
          })}
      </div>
    </div>
  );
}

export default Index;
