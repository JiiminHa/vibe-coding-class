'use client';

import { useState } from 'react';

export default function AppHeader() {
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b-[1.5px] border-black">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#CCFF00] flex items-center justify-center">
            <span className="text-black font-black text-xs leading-none">CF</span>
          </div>
          <span
            data-testid="header-logo"
            className="text-white font-bold text-lg tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CardFlow
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0">
          {[
            { label: 'Templates', msg: '템플릿 관리 페이지는 준비 중입니다.' },
            { label: 'History', msg: '히스토리 기능은 준비 중입니다.' },
          ].map(({ label, msg }) => (
            <button
              key={label}
              data-testid={`nav-${label.toLowerCase()}`}
              onClick={() => showToast(msg)}
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#888] cursor-pointer hover:text-[#CCFF00] transition-colors px-4 py-1 border-l border-[#333]"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {toast && (
        <div
          data-testid="nav-toast"
          className="fixed top-16 left-1/2 -translate-x-1/2 bg-[#222] text-white text-xs font-medium px-4 py-2 border border-[#444] z-50"
        >
          {toast}
        </div>
      )}
    </header>
  );
}
