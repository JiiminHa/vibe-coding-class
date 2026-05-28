export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-canvas/80 backdrop-blur-md border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">C</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-primary">CardFlow</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-muted cursor-pointer hover:text-ink transition-colors">Templates</span>
          <span className="text-sm font-medium text-muted cursor-pointer hover:text-ink transition-colors">History</span>
        </nav>
      </div>
    </header>
  );
}
