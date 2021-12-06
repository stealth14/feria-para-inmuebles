import React, { useEffect, useState } from "react";
import { useProperties } from "@/lib/property";
import PropertyCard from "@/components/properties/PropertyCard";

function Index() {
  const { properties, isLoading, isError } = useProperties();

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {isError && <div>Error</div>}

      <ul>
        {properties &&
          properties.map((property) => {
            return <PropertyCard key={property.id} property={property} />;
          })}
      </ul>
    </div>
  );
}

export default Index;
