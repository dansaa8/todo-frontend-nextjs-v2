'use client';
import {
  CalendarIcon,
  PlusCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutModal from '@/components/modal/LogoutModal';


const links = [
  { name: 'Scheduled', href: '/todo/scheduled', icon: CalendarIcon },
  { name: 'Create', href: '/todo/new', icon: PlusCircleIcon },
];

const logoutButton = { name: 'Logout', href: '/logout', icon: PowerIcon };

export default function NavLinks() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLinkClick = (href : string) => {
    setActiveLink(href);
  };

  const handleLogoutClick = () => {
    const currentLink = activeLink;
    setActiveLink('/logout');
    setShowLogoutModal(true);
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
    setActiveLink(usePathname);
  };

  const btnStyling =
    'flex h-48px grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600' +
    'md:flex-none md:justify-start md:p-2 md:px-3';

  const highlighted =
    'opacity-100 border-b-4 border-white rounded-none text-white';
  const unselected = 'opacity-50';

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = activeLink === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            passHref
            className={`${btnStyling}
                          ${isActive ? highlighted : unselected}`}
            onClick={() => handleLinkClick(link.href)}
          >
            <LinkIcon className="w-14" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <button
        onClick={handleLogoutClick}
        className={`${btnStyling}
                          ${
                            activeLink === '/logout' ? highlighted : unselected
                          }`}
      >
        <PowerIcon className="w-14" />
      </button>
      {showLogoutModal && <LogoutModal handleModalClose={handleModalClose} />}
    </>
  );
}
