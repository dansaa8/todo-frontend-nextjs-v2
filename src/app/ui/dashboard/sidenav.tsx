import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function SideNav() {
  return (
    <div className='bg-emerald-400 text-white text-xl font-bold shadow-md pb-0.5'>
        <h1 className='p-4'>Todo-manager</h1>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
