import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import SlidingMenu from "./SlidingMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFF0F6]/80 backdrop-blur-xl border-b border-[#D65A8A]/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link to="/" className="text-[11px] tracking-[0.32em] uppercase text-[#D65A8A] font-extrabold">
            The Latte Archives
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-white bg-[#C98A6B] hover:bg-[#D65A8A] rounded-full px-4 py-2 transition-colors font-semibold"
            aria-label="Open menu"
          >
            <span className="hidden sm:inline">Index</span>
            <Menu size={18} />
          </button>
        </div>
      </header>
      <SlidingMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}