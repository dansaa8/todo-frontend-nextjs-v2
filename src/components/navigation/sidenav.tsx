import Link from 'next/link';
import NavLinks from '@/components/navigation/nav-links';

export default function SideNav() {
  return (
    <header className="bg-gradient-to-r from-orange-300 to-purple-400 text-white text-xl font-bold shadow-md pb-0.5">
      {/* <h1 className="p-4">Todo-manager</h1> */}
      <nav className="flex grow flex-row justify-between space-x-2">
        <NavLinks />
      </nav>
    </header>
  );
}
