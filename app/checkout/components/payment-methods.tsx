"use client";

import { Icons } from "@/components/icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { CHECKOUT } from "./checkout-form";

interface paymentProps {
  form: UseFormReturn<CHECKOUT>;
}
export function PaymentMethods({ form }: paymentProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormControl className="grid grid-cols-3 gap-4 border-b border-spacing-y-6 pb-2">
              <RadioGroup defaultValue="paymentMethod">
                {/* credit card */}
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="credit_card" hidden />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mb-3 h-6 w-6"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                    Card
                  </FormLabel>
                </FormItem>
                {/* paypal */}
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="paypal" hidden />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <Icons.paypal className="mb-3 h-6 w-6" />
                    Paypal
                  </FormLabel>
                </FormItem>
                {/* apple */}
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="apple" hidden disabled />
                  </FormControl>
                  <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <Icons.apple className="mb-3 h-6 w-6" />
                    Apple
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="name@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card number</FormLabel>
            <FormControl>
              <Input
                placeholder="1234 1234 1234 1234"
                {...field}
                type="string"
                maxLength={19}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value
                    .replace(/[^\d]/g, "")
                    .split("")
                    .map((e: string, i: number) =>
                      i && i % 4 === 0 ? ` ${e}` : e
                    )
                    .join("");
                }}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expires In</FormLabel>
              <FormControl>
                <Input
                  placeholder="MM/YY"
                  {...field}
                  type="string"
                  maxLength={5}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value
                      .replace(/[^\d]/g, "")
                      .split("")
                      .map((e: string, i: number) =>
                        i && i % 2 === 0 ? `/${e}` : e
                      )
                      .join("");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVC</FormLabel>
              <FormControl>
                <Input
                  placeholder="CVC"
                  {...field}
                  type="string"
                  maxLength={4}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^\d]/g, "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cardholder name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, Cityville, USA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
