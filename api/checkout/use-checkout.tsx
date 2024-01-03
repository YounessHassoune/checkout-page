import { useMutation } from "@tanstack/react-query";
import { client } from "../common/client";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

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

const checkout = async (bodyData: Root): Promise<any> => {
  const { data } = (await client.post("/checkout", bodyData)) as AxiosResponse<{
    success: string;
  }>;
  return data;
};

export default function useCheckout() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: Root) => checkout(data),
    onSuccess: (data) => {
      toast({
        title: `${data.success}`,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error.response?.data.error || error.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${message}`,
      });
    },
  });
}
