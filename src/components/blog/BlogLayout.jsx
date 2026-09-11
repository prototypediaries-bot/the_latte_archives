import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-[#FFF0F6] flex flex-col justify-between selection:bg-[#D65A8A]/10 select-none">
      
      {/* 1. Main Page Content (Your beautiful Home layout) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 2. Your Restored Editorial Footer */}
      <footer className="bg-[#F2E0D4] border-t border-[#C98A6B]/15 px-6 md:px-12 py-16 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Identity column */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.35em] uppercase font-bold text-[#2A0A1F]">
              The Latte Archives
            </span>
            <p className="text-xs text-[#8A4A6E]/70 max-w-sm leading-relaxed font-medium">
              A curated anthology exploring quiet café corners, morning movement rituals, wellness, and travel.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] tracking-[0.25em] uppercase font-bold text-[#C98A6B]">
            <Link to="/" className="hover:text-[#D65A8A] transition-colors">Home</Link>
            <a href="https://substack.com" target="_blank" rel="noreferrer" className="hover:text-[#D65A8A] transition-colors">Substack</a>
            <span className="text-[#8A4A6E]/40">© {new Date().getFullYear()}</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
