import React from "react";
import Property, { getAll, get } from "@/lib/property";

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

interface ItemProps {
  property: Property;
}

export default function Item(props: ItemProps) {
  const { property } = props;
  return (
    <div>
      <h1>título: {property.title}</h1>
      <h1>precio: {property.price}</h1>
    </div>
  );
}
