import { useMutation } from "@tanstack/react-query";
import { client } from "../common/client";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface Root {
  order: Order;
  customer: Customer;
  paymentMethod: PaymentMethod;
}

export interface Order {
  items: Item[];
  totalPrice: number;
}

export interface Item {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
}

export interface PaymentMethod {
  type: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

const checkout = async (bodyData: Root): Promise<{ success: string }> => {
  try {
    const { data } = (await client.post(
      "/checkout",
      bodyData
    )) as AxiosResponse<{
      success: string;
    }>;
    return data;
  } catch (error) {
    return error.response.data;

  }
};

export default function useCheckout() {
  return useMutation({
    mutationFn: (data: Root) => checkout(data),
  });
}
