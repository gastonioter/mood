import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="col-span-3 col-start-1  shadow flex justify-between px-10 items-center">
      <Link href={"/journal"} className="flex items-center font-bold ">
        <Image
          alt="mood logo"
          width={60}
          height={100}
          src={"/mood-logo.png"}
          className=""
        ></Image>
      </Link>
      <UserButton userProfileUrl="/profile"></UserButton>
    </header>
  );
}
