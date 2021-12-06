import React from "react";
import Property from "@/lib/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard(props: PropertyCardProps) {
  const { property } = props;
  return <li>{property.title}</li>;
}
