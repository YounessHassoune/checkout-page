"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { PaymentMethods } from "./payment-methods";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product, ProductList } from "./product-list";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useQueryClient } from "@tanstack/react-query";
import useCheckout from "@/api/checkout/use-checkout";
import { useToast } from "@/components/ui/use-toast";

const checkoutSchema = z.object({
  email: z.string().email(),
  cardNumber: z.string().max(19).min(19),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/(2[2-9]|2[3-9]|3[0-9])$/),
  cvc: z.string().regex(/^\d{3,4}$/),
  name: z.string().min(3),
  address: z.string().min(5),
  type: z.enum(["credit_card", "paypal", "apple"]),
});
export type CHECKOUT = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const form = useForm<CHECKOUT>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
      name: "",
      address: "",
      type: "credit_card",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: checkout } = useCheckout();

  const { toast } = useToast();

  const onSubmit = async (values: CHECKOUT) => {
    const items = queryClient.getQueryData(["products"]) as Product[];
    const order = {
      items: items.map((p) => ({
        productId: p.id,
        name: p.name,
        quantity: p.quantity,
        price: p.price,
      })),
      totalPrice:
        items?.reduce((res, cur) => res + cur.price * cur.quantity, 0) ?? 0,
    };
    const customer = {
      name: values.name,
      email: values.email,
      address: values.address,
    };
    const paymentMethod = {
      type: values.type,
      cardNumber: values.cardNumber,
      expirationDate: values.expirationDate,
      cvc: values.cvc,
    };
    await checkout(
      {
        order,
        customer,
        paymentMethod,
      },
      {
        onSuccess: (data) => {
          return toast({
            title: `${data.success}`,
          });
        },
        onError: (data) => {
          console.log({data});
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `${data.error}`,
          });
        },
      }
    );
  };

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 ">
      <ProductList />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="py-6 border-none shadow-none max-w-md">
            <CardContent className="grid gap-6">
              <PaymentMethods form={form} />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Pay
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
