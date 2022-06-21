import useSWR from "swr";
import axios from "axios";

export default interface Property {
  id: string;
  title: string;
  area: number;
  bathrooms: number;
  bedrooms: number;
  kitchens: number;
  parkings: number;
  photo: string;
  price: number;
  type: string;
  address: string;
  description: string;
  phone: string;
}

export const save = async (property: Property) => {
  try {
    const response = await axios.post("/properties", property);
    const savedProperty: Property = response.data;
    return [savedProperty, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const get = async (id: string) => {
  const path = `/properties/${id}`;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + String(path)
    );

    const property: Property = response.data;

    return [property, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const getAll = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/properties"
    );

    const properties: Property[] = response.data;

    return [properties, null];
  } catch (error: any) {
    return [null, error];
  }
};

export function useProperties() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "properties",
    fetcher
  );

  return {
    properties: data as Property[],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProperty(id: string) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}properties/${id}`,
    fetcher
  );

  return {
    property: data as Property,
    isLoading: !error && !data,
    isError: error,
  };
}
