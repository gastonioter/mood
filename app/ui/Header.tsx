import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="col-span-3 col-start-1  shadow-md flex justify-between px-10 items-center">
      <Link href={"/journal"} className="flex items-center font-bold ">
        <h1 className="text-lg text-center mt-2 font-bold ">Mood App</h1>
      </Link>
      <UserButton showName userProfileUrl="/profile"></UserButton>
    </header>
  );
}
