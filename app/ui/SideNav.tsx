"use client";

import clsx from "clsx";
import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  NewspaperIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
const links = [
  {
    href: "/journal",
    name: "Journal",
    icon: NewspaperIcon,
  },

  {
    href: "/history",
    name: "History",
    icon: ChartBarIcon,
  },

  {
    href: "/settings",
    name: "Settings",
    icon: Cog6ToothIcon,
  },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <aside>
      <nav>
        <ul className="grid grid-flow-col">
          {links.map((link) => {
            const LinkIcon = link.icon;

            return (
              <Link href={link.href} key={link.href}>
                <li
                  className={clsx(
                    "bg-zinc-500/10 text-sm rounded-md text-center py-4 px-3",
                    {
                      "bg-sky-100 text-blue-600": pathname === link.href,
                    }
                  )}
                >
                  <LinkIcon className="size-7 mx-auto" />
                  <p className="hidden md:block">{link.name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
