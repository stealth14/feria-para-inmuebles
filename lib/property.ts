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
}

export const save = async (property: Property) => {
  try {
    const response = await axios.post("/api/properties", property);
    const savedProperty: Property = response.data;
    return [savedProperty, null];
  } catch (error: any) {
    return [null, error];
  }
};

export function useProperties() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/properties",
    fetcher
  );

  return {
    properties: data as Property[],
    isLoading: !error && !data,
    isError: error,
  };
}
