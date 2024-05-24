'use client';

import {
  CalendarIcon,
  PlusCircleIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import path from 'path';

const links = [
  { name: 'Scheduled', href: '/dashboard/scheduled', icon: CalendarIcon },
  { name: 'Create', href: '/dashboard/create', icon: PlusCircleIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 opacity-60',
              {
                'opacity-100 border-b-4 border-white rounded-none md:border-none md:bg-pink-500': pathname == link.href,
              }
            )}
          >
            <LinkIcon className="w-14" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
