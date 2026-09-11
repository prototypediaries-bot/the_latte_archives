import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BlogLayout() {
  return (
    <div className="min-h-screen bg-[#FFF0F6]">
      {/* This renders your Home.jsx exactly as it is without duplication */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
