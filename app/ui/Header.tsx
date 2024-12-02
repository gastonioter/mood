import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="col-span-3 gap-x-3 col-start-2 border-b-2 flex justify-end pr-10 items-center">
      <UserButton userProfileUrl="/profile"></UserButton>
    </header>
  );
}
