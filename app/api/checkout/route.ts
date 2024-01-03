import { Root } from "@/api/checkout/use-checkout";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res: Root = await request.json();
  // this just a simulation of an error
  // we can also do validation ect...
  const error = res.order.items.length === 0;
  if (error)
    return NextResponse.json(
      { error: "you need at least one product!" },
      { status: 400 }
    );

  const success = "Your payment has been succeeded";
  return NextResponse.json({ success });
}
