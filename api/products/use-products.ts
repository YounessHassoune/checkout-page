import { useQuery } from "@tanstack/react-query";
import { client } from "../common/client";
import { Product } from "@/app/checkout/components/product-list";
import { AxiosResponse } from "axios";

const getProducts = async (): Promise<Product[]> => {
  const { data } = (await client.get("/products")) as AxiosResponse<Product[]>;
  return data;
};

export default function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
