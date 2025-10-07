'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const linkRefs = useRef({});

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'History', href: '/History' },  
    { label: 'Add', href: '/Add' },
    { label: 'Login', href: '/Login' },
    { label : 'COD', href: '/COD'}
    
  
  ];

  useEffect(() => {
    const activeLink = linkRefs.current[pathname];
    const containerEl = containerRef.current;
  
    if (!activeLink && bgRef.current) {
      bgRef.current.style.width = `0px`;
      return;
    }
  
    if (activeLink && bgRef.current && containerEl) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
  
      bgRef.current.style.left = `${linkRect.left - containerRect.left}px`;
      bgRef.current.style.width = `${linkRect.width}px`;
    }
  }, [pathname]);
  

  return (
    <nav className="z-50 shadow-lg relative bg-[#FFFFFC] px-4 py-6 text-black flex items-center justify-between">
      <h1 className="text-3xl whitespace-nowrap z-10">Stat Tracker</h1>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul
          ref={containerRef}
          className="relative flex gap-x-6 items-center px-2 py-2 bg-[#4f46e5] rounded-4xl"
        >
          <div
            ref={bgRef}
            className="absolute top-0  h-3/4 transform translate-y-1.5 bg-white rounded-4xl transition-all duration-300 z-0"
            style={{ left: 0, width: 0 }}
          />
          {navItems.map(({ label, href }) => (
            <li key={href} className="relative z-10">
              <Link
                href={href}
                ref={(el) => (linkRefs.current[href] = el)}
                className={`text-base block px-4 py-1 rounded-md transition-colors ${
                  pathname === href ? 'text-black' : 'text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="z-10">test</h1>
    </nav>
  );
}
