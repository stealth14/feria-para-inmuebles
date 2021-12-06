import useSWR from "swr";
import axios from "axios";

export default interface Property {
  id: string;
  title: string;
}

export const save = async (property: Property, merge: boolean = false) => {};

export function useProperties() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    "https://6160ddabfaa03600179fbbb1.mockapi.io/properties",
    fetcher
  );

  return {
    properties: data,
    isLoading: !error && !data,
    isError: error,
  };
}
