import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

interface Product {
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  id: string;
}
interface ItemProps {
  product: Product;
  onQuantityClick: () => void;
  onDeleteItem: () => void;
}
export default function Item({
  product: { name, color, price, quantity, image, id },
  onQuantityClick,
  onDeleteItem,
}: ItemProps) {
  return (
    <div className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between ">
            <h3>{name}</h3>
            <p className="ml-4">${price * quantity}</p>
          </div>
          <div className="flex justify-between ">
            <p className="mt-1 text-sm text-gray-500">{color}</p>
            <p className="mt-1 text-xs text-gray-500">${price} each</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <Button
            variant="ghost"
            className="text-gray-500"
            onClick={onQuantityClick}
          >
            Qty {quantity}
            <ChevronDownIcon className="h-4 w-4 align-bottom" />
          </Button>
          <div className="flex">
            <Button
              onClick={onDeleteItem}
              variant="ghost"
              className="p-0 text-indigo-600 hover:bg-background hover:text-indigo-600 "
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
