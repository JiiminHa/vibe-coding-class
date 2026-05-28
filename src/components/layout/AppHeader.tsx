export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b-[1.5px] border-black">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#CCFF00] flex items-center justify-center">
            <span className="text-black font-black text-xs leading-none">CF</span>
          </div>
          <span
            className="text-white font-bold text-lg tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CardFlow
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0">
          {['Templates', 'History'].map((label) => (
            <span
              key={label}
              className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#888] cursor-pointer hover:text-[#CCFF00] transition-colors px-4 py-1 border-l border-[#333]"
            >
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
