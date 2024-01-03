import CheckoutForm from "./components/checkout-form";

export default async function Checkout() {
  return (
    <div>
      <div className="flex justify-center m-4">
        <CheckoutForm />
      </div>
    </div>
  );
}
