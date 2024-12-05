"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/journal",
    name: "Journal",
  },
  {
    href: "/profile",
    name: "Profile",
  },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="row-span-4 col-start-1 row-start-2 px-2 border-r-2">
      <nav className="px-1">
        <ul>
          {links.map((link) => {
            return (
              <Link href={link.href} key={link.href}>
                <li
                  className={clsx(
                    "bg-zinc-500/10 text-sm rounded-md mt-4 py-4 px-3",
                    {
                      "bg-sky-100 text-blue-600": pathname === link.href,
                    }
                  )}
                >
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
