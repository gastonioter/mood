import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow-md flex justify-between px-4 py-4 items-center">
      <Link href={"/journal"} className="flex items-center font-bold ">
        <h1 className="text-lg text-center mt-2 font-bold ">Mood App</h1>
      </Link>
      <UserButton showName></UserButton>
    </header>
  );
}
