'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({navItems}) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const linkRefs = useRef({});
  const [menuOpen, setMenuOpen] = useState(false);

 
  useEffect(() => {
    const activeLink = linkRefs.current[pathname];
    const containerEl = containerRef.current;

    if (!activeLink || !bgRef.current || !containerEl) {
      if (bgRef.current) bgRef.current.style.width = '0px';
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    bgRef.current.style.left = `${linkRect.left - containerRect.left}px`;
    bgRef.current.style.width = `${linkRect.width}px`;
  }, [pathname]);

  return (
    <nav className=" w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-blue-700 tracking-tight">
          StatCore
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block relative">
          <ul
            ref={containerRef}
            className="relative flex gap-x-8 items-center bg-blue-700 rounded-full px-4 py-2"
          >
            <div
              ref={bgRef}
              className="absolute top-0 h-3/4 translate-y-1.5 bg-white rounded-full transition-all duration-300 z-0"
              style={{ left: 0, width: 0 }}
            />
            {navItems.map(({ label, href }) => (
              <li key={href} className="relative z-10">
                <Link
                  href={href}
                  ref={(el) => (linkRefs.current[href] = el)}
                  className={`capitalize text-base block px-4 py-1 font-medium transition-colors ${
                    pathname === href ? 'text-black' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md text-blue-700 hover:bg-blue-100 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 text-white shadow-lg">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg px-4 py-2 rounded-md transition-colors ${
                    pathname === href ? 'bg-white text-black' : 'hover:bg-blue-600'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
