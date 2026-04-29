import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home',              path: '/' },
  { name: 'About',             path: '/about' },
  { name: 'Risk Assessment',   path: '/experience' },
  { name: 'Find Destinations', path: '/vacation' },
  { name: 'Contact',           path: '/contact' },
];

const Navbar = () => {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();
  const ref                     = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* ── Floating notch pill ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">

        {/* The pill */}
        <div
          ref={ref}
          className={`
            pointer-events-auto
            mt-3 mx-4
            flex flex-col
            rounded-2xl
            border border-white/10
            shadow-2xl
            transition-all duration-300 ease-out
            ${scrolled
              ? 'bg-slate-900/90 backdrop-blur-xl shadow-slate-900/40'
              : 'bg-slate-900/80 backdrop-blur-md'}
          `}
          style={{ maxWidth: 780, width: '100%' }}
        >
          {/* Main row */}
          <div className="flex items-center justify-between px-4 h-14">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src="/logo.jpg" alt="SUNRIZE" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-white font-bold text-base tracking-tight">SUNRIZE</span>
            </Link>

            {/* Desktop links — centered */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150
                      ${active
                        ? 'bg-white/15 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/8'}
                    `}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile dropdown — inside the pill */}
          {open && (
            <div className="md:hidden border-t border-white/10 px-3 py-2 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${location.pathname === item.path
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pull next section up so it sits behind the floating pill — no background gap */}
      <div className="-mb-20 h-20 pointer-events-none" />
    </>
  );
};

export default Navbar;
