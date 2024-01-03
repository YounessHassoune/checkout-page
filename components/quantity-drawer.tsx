"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Product } from "@/app/checkout/components/product-list";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface QuantityDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Product;
  onQuantityChange: (quantity: number) => void;
}
export function QuantityDrawer({
  open,
  setOpen,
  selectedProduct,
  onQuantityChange,
}: QuantityDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex flex-row gap-4">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.image}
                width={50}
                height={50}
                className="object-cover object-center rounded-md"
              />
              <div className="flex flex-col">
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.color}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onQuantityChange(selectedProduct?.quantity - 1)}
                disabled={selectedProduct?.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {selectedProduct?.quantity}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Quantity
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onQuantityChange(selectedProduct?.quantity + 1)}
                disabled={selectedProduct?.quantity >= 10}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex flex-row gap-4">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.image}
              width={50}
              height={50}
              className="object-cover object-center rounded-md"
            />
            <div className="flex flex-col">
              <DrawerTitle>{selectedProduct.name}</DrawerTitle>
              <DrawerDescription>{selectedProduct.color}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onQuantityChange(selectedProduct?.quantity - 1)}
              disabled={selectedProduct?.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {selectedProduct?.quantity}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Quantity
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onQuantityChange(selectedProduct?.quantity + 1)}
              disabled={selectedProduct?.quantity >= 10}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
