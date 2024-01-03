import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //    static products.
  //    in a real word scenario we would make an an call to the database.
  const products = [
    {
      name: "Throwback Hip Bag",
      color: "Salmon",
      price: "99",
      quantity: 1,
      image: "/products/product-01.jpg",
      id: "1111",
    },
    {
      name: "back pack",
      color: "navy blue",
      price: "45",
      quantity: 1,
      image: "/products/product-02.jpg",
      id: "2222",
    },
  ];
  return NextResponse.json(products);
}
