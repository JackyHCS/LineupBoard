"use client"
import {useState } from 'react';
import {Search} from 'lucide-react';
import {nades, maps} from '../data/nades';
import LineupNadeCard from './LineupNadeCard';
import {nadeTypes} from '../constants/nadeTypes';
import LineupRadar from './LineupRadar';
import {mapNadePositions} from '../data/nadePositions';

export default function LineupSection() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // General filter states
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedMap, setSelectedMap] = useState('All Maps');
    const [selectedSide, setSelectedSide] = useState('All Sides');
    
    // Map overview states
    const [overviewType, setOverviewType] = useState('All Types');
    const [overviewMap, setOverviewMap] = useState('All Maps');
    const [selectedNadeTitle, setSelectedNadeTitle] = useState<string | null>(null);
  
    // Function to normalize map
    const normalizeMapName = (mapName: string): string => {
      return mapName.charAt(0) + mapName.slice(1).toLowerCase();
    };

    // Filter nades based on selected filters 
    const filteredNades = nades.filter(nade => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        nade.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter 
      const effectiveType = overviewType !== 'All Types' ? overviewType : selectedType;
      const matchesType = effectiveType === 'All Types' || nade.type === effectiveType;

      // Map filter 
      const effectiveMap = overviewMap !== 'All Maps' ? overviewMap : selectedMap;
      const normalizedEffectiveMap = effectiveMap === 'All Maps' 
        ? 'All Maps' 
        : normalizeMapName(effectiveMap);
      const matchesMap = normalizedEffectiveMap === 'All Maps' || nade.map === normalizedEffectiveMap;
      
      // Side filter 
      const matchesSide = selectedSide === 'All Sides' || nade.side === selectedSide;
      
      // Selected nade title filter (from map icon click)
      const matchesNadeTitle = selectedNadeTitle === null || 
        nade.title.toLowerCase().includes(selectedNadeTitle.toLowerCase());
      
      return matchesSearch && matchesType && matchesMap && matchesSide && matchesNadeTitle;
    });
  
    // Nade positions 
    const nadePositionsForMap = overviewMap !== 'All Maps' 
      ? (mapNadePositions[overviewMap] || [])
      : [];

    return (
      <section id="lineups" className="bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-gray-400">
              Explore our utility lineups and narrow your search by map, type, and side—or use advanced map filters for more precision.
            </p>
          </div>

          {/* Search and General Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search lineups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a2332] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <select 
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                // Reset overview type when changing general type
                if (e.target.value !== 'All Types') {
                  setOverviewType('All Types');
                }
              }}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px] cursor-pointer"
            >
              <option>All Types</option>
              <option>Smoke</option>
              <option>Molotov</option>
              <option>Flashbang</option>
              <option>Grenade</option>
            </select>
            <select 
              value={selectedMap}
              onChange={(e) => {
                setSelectedMap(e.target.value);
                // Reset overview map when changing general map
                if (e.target.value !== 'All Maps') {
                  setOverviewMap('All Maps');
                }
              }}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px] cursor-pointer"
            >
              <option>All Maps</option>
              {maps.map(map => <option key={map}>{map}</option>)}
            </select>
            <select 
              value={selectedSide}
              onChange={(e) => setSelectedSide(e.target.value)}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px] cursor-pointer"
            >
              <option>All Sides</option>
              <option>T-Side</option>
              <option>CT-Side</option>
            </select>
          </div>
  
          {/* Advanced Map Overview Filters */}
          <div className="mb-8">
            <p className="mb-6 text-gray-400">
              Map Overview Filters
            </p>
            {/* Nade Type Filters - For Overview and Grid */}
            <div className="flex flex-wrap gap-4 mb-4">
              {nadeTypes.map(({ name, icon: Icon }) => {
                const typeName = name.charAt(0) + name.slice(1).toLowerCase(); 
                const isSelected = overviewType === typeName;
                return (
                  <button
                    key={name}
                    onClick={() => {
                      const newType = isSelected ? 'All Types' : typeName;
                      setOverviewType(newType);
                      // Reset general type when using overview filter
                      if (newType !== 'All Types') {
                        setSelectedType('All Types');
                      }
                      setSelectedNadeTitle(null); // Reset selected nade title when type changes
                    }}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isSelected
                        ? 'bg-blue-500 text-white border border-blue-500'
                        : 'bg-[#1a2332] text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-blue-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </button>
                );
              })}
            </div>
            
            {/* Map Filters - For Overview and Grid */}
            <div className="flex flex-wrap gap-4">
              {maps.map(map => (
                <button 
                  key={map} 
                  onClick={() => {
                    const newMap = overviewMap === map ? 'All Maps' : map;
                    setOverviewMap(newMap);
                    // Reset general map when using overview filter
                    if (newMap !== 'All Maps') {
                      setSelectedMap('All Maps');
                    }
                    setSelectedNadeTitle(null); // Reset nade title when changed
                  }}
                  className={`cursor-pointer px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    overviewMap === map
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1a2332] text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-blue-400'
                  }`}
                >
                  {map}
                </button>
              ))}
            </div>
          </div>
  
          {/* Map Radar */}
          {overviewMap !== 'All Maps' && (
            <LineupRadar 
              mapName={overviewMap} 
              nadePositions={nadePositionsForMap}
              selectedType={overviewType}
              onNadeSelect={setSelectedNadeTitle}
            />
          )}
  
          {/* Results Count */}
          <div className="text-lg font-bold text-gray-300 mb-6">
            {filteredNades.length} LINEUPS 
          </div>
          
          {/* Nade Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNades.map(nade => (
              <LineupNadeCard key={nade.id} nade={nade} />
            ))}
          </div>
        </div>
      </section>
    );
  }