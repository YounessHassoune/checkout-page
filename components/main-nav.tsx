import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  return (
    <div className="border-b  w-full">
      <div className="flex h-16 items-center  justify-end  px-4 ">
        <ModeToggle />
      </div>
    </div>
  );
}
