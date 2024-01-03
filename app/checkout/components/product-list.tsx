import useProducts from "@/api/products/use-products";
import Item from "@/components/Item";
import { Icons } from "@/components/icons";
import { QuantityDrawer } from "@/components/quantity-drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export interface Product {
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  id: string;
}

export function ProductList() {
  const { data, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const updatedProductQuantity = (quantity: number) => {
    if (!selectedProduct) return;
    const newProduct = {
      ...selectedProduct,
      quantity,
    };
    queryClient.setQueryData(["products"], (old: Product[]) =>
      old.map((p) => (p.id === selectedProduct.id ? newProduct : p)),
    );
    setSelectedProduct(newProduct);
  };
  const removeItem = (id: string) => {
    queryClient.setQueryData(["products"], (old: Product[]) =>
      old.filter((p) => p.id !== id),
    );
  };

  return (
    <Card className="py-6  border-none shadow-none max-w-md">
      <CardHeader>
        <CardTitle>
          Total: $
          {data?.reduce((res, cur) => res + cur.price * cur.quantity, 0) ?? 0}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Icons.spinner className="w-8 h-8 animate-spin m-auto" />
        ) : data && data.length ? (
          data?.map((product) => (
            <Item
              product={product}
              key={product.id}
              onQuantityClick={() => {
                setSelectedProduct(product);
                setOpen(true);
              }}
              onDeleteItem={() => removeItem(product.id)}
            />
          ))
        ) : (
          <p>No product was selected .</p>
        )}
      </CardContent>
      {selectedProduct && (
        <QuantityDrawer
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
          onQuantityChange={updatedProductQuantity}
        />
      )}
    </Card>
  );
}
