import useSWR from "swr";
import { api } from "./api";
import type { UploadFile } from "antd/es/upload/interface";

export default interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  type: string;
  bathrooms: number;
  area: number;
  bedrooms: number;
  livingrooms: number;
  dormitories: number;
  kitchens: number;
  parkings: number;
  photos: string[] | UploadFile[];
  phone: string;
}

const formatProperty = (property: Property) => {
  const formData = new FormData();

  for (const field in property) {
    if (field === "photos") continue;
    formData.append(field, property[field]);
  }

  for (const photo of property.photos) {
    formData.append("photos[]", (photo as UploadFile).originFileObj);
  }

  return formData;
};

export const create = async (property: Property) => {
  try {
    const url = "/properties";
    const formData = formatProperty(property);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await api.post(url, formData, config);

    const createdProperty: Property = response.data;

    return [createdProperty, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const update = async (property: Property) => {
  try {
    const url = "/user/properties";
    const formData = formatProperty(property);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const response = await api.post(url, formData, config);

    const savedProperty: Property = response.data;
    return [savedProperty, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const get = async (id: string) => {
  const path = `properties/${id}`;

  try {
    const response = await api.get(
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
    const response = await api.get(
      "https://api-feria-inmuebles.herokuapp.com/api/properties"
    );

    const properties: Property[] = response.data;

    return [properties, null];
  } catch (error: any) {
    return [null, error];
  }
};

export const drop = async (property: Property) => {
  const path = `properties/${property.id}`;

  try {
    const response = await api.delete(
      process.env.NEXT_PUBLIC_API_BASE_URL + String(path)
    );

    const property: Property = response.data;

    return [property, null];
  } catch (error: any) {
    return [null, error];
  }
};

export function useProperties() {
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

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
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

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

export interface SearchResult {
  current_page: number;
  data: Property[];
  total: number;
  per_page: number;
}

export async function search(params) {
  try {
    const url = "/search";

    const response = await api.get(url, {
      params,
    });

    const searchResult: SearchResult = response.data;

    return [searchResult, null];
  } catch (error: any) {
    return [null, error];
  }
}
