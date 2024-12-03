import Image from "next/image";
import Link from "next/link";

const links = ["journal", "profile"];

export default function SideNav() {
  return (
    <aside className="row-span-4 col-start-1 row-start-1 px-2 border-r-2">
      <h1 className="text-lg text-center mt-2 font-bold ">Mood</h1>
      <Link href={"/journal"}>
        <Image
          alt="mood logo"
          width={512}
          height={512}
          src={"/mood-logo.png"}
          className="mb-4"
        ></Image>
      </Link>
      <nav className="px-1">
        <ul>
          {links.map((link, index) => {
            return (
              <Link href={`/${link}`} key={index}>
                <li className="bg-zinc-500/10 text-sm rounded-md mt-4 py-2 px-3">
                  {link.at(0)?.toUpperCase() + link.slice(1)}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
