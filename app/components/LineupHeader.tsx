export default function Header() {
    return (
      <header className="bg-[#0f1419] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src="/assets/logo.JPG" alt="LineupBoard Logo" className="h-20 w-auto" />
              </a>
            </div>
  
            {/* Navigation links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
              <a href="#lineups" className="text-gray-300 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
                Lineups
              </a>
              <a href="#board" className="text-gray-300 hover:text-white transition-colors font-medium uppercase tracking-wider text-sm">
                Board(Coming Soon)
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  }