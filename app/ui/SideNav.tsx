import Image from 'next/image';
import Link from 'next/link';

export default function SideNav() {
  return (
    <aside className="row-span-4 col-start-1 row-start-1 px-3 border-r-2">
      <Link href={'/journal'}>
        <Image
          alt="mood logo"
          width={512}
          height={512}
          src={'/mood-logo.png'}
          className="my-4"
        ></Image>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={'/journal'}>Home</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
