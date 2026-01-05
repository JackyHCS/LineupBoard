export default function LineupHero() {
    return (
      <div className="relative bg-[#0f1419] text-white">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 pt-5 pb-16">
          <div className="text-center mb-6">
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              LINEUP{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
                BOARD
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Master every map with  utility lineups and strategic planning.
              <br />
              Browse smokes, flashes, molotovs, and create tactical board strategies.
            </p>
          </div>
  
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mt-6 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                100+
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Lineups
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                8
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Maps
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }