'use client';
import {
  CalendarIcon,
  PlusCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoutModal from '@/components/modal/LogoutModal';
import { useState } from 'react';
import clsx from 'clsx';

const links = [
  { name: 'Scheduled', href: '/todo/scheduled', icon: CalendarIcon },
  { name: 'Create', href: '/todo/new', icon: PlusCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [previousPathname, setPreviousPathname] = useState('');
  const router = useRouter();

  const handleLogoutClick = () => {
    // Save the current pathname
    setPreviousPathname(pathname);

    // Update the URL without navigating
    history.replaceState(null, '', '/logout');

    // Show the logout modal
    setShowLogoutModal(true);
  };

  const handleModalClose = (isLoggedOut = false) => {
    setShowLogoutModal(false);

    // Only restore the previous pathname if the user is not logged out
    if (!isLoggedOut && previousPathname) {
      history.replaceState(null, '', previousPathname);
    }

    // Clear the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to login page
    router.push('/login');
  };

  const btnStyling =
    'flex h-48px grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium';

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            passHref
            className={clsx(
              btnStyling,
              isActive
                ? 'opacity-100 border-b-4 border-white rounded-none text-white'
                : 'opacity-50'
            )}
          >
            <LinkIcon className="w-14" />
          </Link>
        );
      })}
      <button
        onClick={handleLogoutClick}
        className={clsx(
          btnStyling,
          pathname === '/logout'
            ? 'opacity-100 border-b-4 border-white rounded-none text-white'
            : 'opacity-50'
        )}
      >
        <PowerIcon className="w-14" />
      </button>
      {showLogoutModal && <LogoutModal handleModalClose={handleModalClose} />}
    </>
  );
}
