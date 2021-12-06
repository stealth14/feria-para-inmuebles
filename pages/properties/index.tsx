import React, { useEffect, useState } from "react";
import { useProperties } from "@/lib/property";

function Index() {
  const { properties, isLoading, isError } = useProperties();

  useEffect(() => {
    console.log("properties", properties);
  }, [properties]);

  return (
    <ul>
      {properties.map((property) => {
        return <li>{property.title}</li>;
      })}
    </ul>
  );
}

export default Index;
