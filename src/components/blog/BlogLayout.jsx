import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-[#FFF0F6] flex flex-col justify-between antialiased select-none">
      
      {/* 1. Main Page Body (Your beautiful anthology layout) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 2. Your Exact Custom Footer Setup */}
      <footer className="w-full bg-[#FFF0F6] border-t border-[#8A4A6E]/10 px-6 md:px-12 pt-16 pb-8 mt-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Three-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-12">
            
            {/* Column 1: Identity & Description */}
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center text-[10px] tracking-[0.25em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 font-bold">
                The Archives
              </span>
              <p className="text-sm font-medium text-[#2A0A1F]/80 leading-relaxed max-w-xs">
                A lively anthology of modern living — coffee, movement, wellness, and the slow art of travel, served fresh!
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A4A6E] font-bold">
                Explore The Archives
              </span>
              <ul className="flex flex-col gap-2.5 text-sm font-bold text-[#2A0A1F] hover:text-[#D65A8A] transition-colors">
                <li><Link to="/?category=coffee" className="hover:text-[#D65A8A]">Coffee</Link></li>
                <li><Link to="/?category=cafes" className="hover:text-[#D65A8A]">Cafés</Link></li>
                <li><Link to="/?category=pilates" className="hover:text-[#D65A8A]">Pilates</Link></li>
                <li><Link to="/?category=wellness" className="hover:text-[#D65A8A]">Wellness</Link></li>
                <li><Link to="/?category=travel" className="hover:text-[#D65A8A]">Travel</Link></li>
              </ul>
            </div>

            {/* Column 3: Custom Substack Signup Box */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A4A6E] font-bold">
                Stay In Touch!
              </span>
              <p className="text-sm font-medium text-[#2A0A1F]/80 leading-relaxed max-w-xs">
                Bubbly notes delivered straight to your inbox — and follow along on Pinterest for the visual archive!
              </p>
              
              {/* Form redirecting reader to your Substack network */}
              <form 
                action="https://substack.com" 
                method="GET" 
                target="_blank" 
                className="flex items-center gap-2 mt-2 w-full max-w-sm"
              >
                <input 
                  type="email" 
                  name="email"
                  placeholder="you@email.com" 
                  required
                  className="w-full bg-white border border-[#8A4A6E]/15 rounded-full px-5 py-3 text-sm text-[#2A0A1F] placeholder-[#8A4A6E]/40 focus:outline-none focus:border-[#D65A8A] font-medium shadow-inner"
                />
                <button 
                  type="submit"
                  className="bg-[#D65A8A] hover:bg-[#2A0A1F] text-white text-[10px] tracking-[0.25em] uppercase font-bold rounded-full px-6 py-3.5 transition-colors shadow-sm"
                >
                  Join
                </button>
              </form>

              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-bold text-[#2A0A1F] hover:text-[#D65A8A] transition-colors mt-2 inline-flex items-center gap-1.5"
              >
                Follow along on Pinterest <span className="text-sm">→</span>
              </a>
            </div>

          </div>

          {/* Large Stylized Branding Header Row */}
          <div className="w-full border-t border-[#8A4A6E]/5 pt-8 select-none">
            <h2 className="text-[#D65A8A]/15 font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-[-0.04em] leading-none lowercase mb-10">
              the latte archives!
            </h2>
          </div>

          {/* Metadata Fine Print Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] tracking-[0.25em] uppercase font-bold text-[#8A4A6E]/50 border-t border-[#8A4A6E]/5 pt-6">
            <span>© {new Date().getFullYear()} The Latte Archives</span>
            <span>Crafted with Intention</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
