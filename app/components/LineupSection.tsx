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
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedMap, setSelectedMap] = useState('All Maps');
    const [selectedSide, setSelectedSide] = useState('All Sides');
  
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
      const matchesType = selectedType === 'All Types' || nade.type === selectedType;

      // Map filter 
      const normalizedSelectedMap = selectedMap === 'All Maps' 
        ? 'All Maps' 
        : normalizeMapName(selectedMap);
      const matchesMap = normalizedSelectedMap === 'All Maps' || nade.map === normalizedSelectedMap;
      
      // Side filter
      const matchesSide = selectedSide === 'All Sides' || nade.side === selectedSide;
      
      return matchesSearch && matchesType && matchesMap && matchesSide;
    });
  
    // Get nade positions for the selected map
    const nadePositionsForMap = selectedMap !== 'All Maps' 
      ? (mapNadePositions[selectedMap] || [])
      : [];

    return (
      <section id="lineups" className="bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-gray-400">
              Browse through our collection of utility lineups. Filter by map, type, and side.
            </p>
          </div>

          {/* Search and Filters */}
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
            {/* General Filter */}
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px] cursopointerr-"
            >
              <option>All Types</option>
              <option>Smoke</option>
              <option>Molotov</option>
              <option>Flashbang</option>
              <option>Grenade</option>
            </select>
            <select 
              value={selectedMap}
              onChange={(e) => setSelectedMap(e.target.value)}
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
  
          {/* Advanced map overview Filter Buttons */}
          <div className="mb-8">
            {/* Nade Type Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
              {nadeTypes.map(({ name, icon: Icon }) => {
                const typeName = name.charAt(0) + name.slice(1).toLowerCase(); // Convert SMOKE to Smoke
                const isSelected = selectedType === typeName;
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedType(isSelected ? 'All Types' : typeName)}
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
            
            {/* Map Filters */}
            <div className="flex flex-wrap gap-4">
              {maps.map(map => (
                <button 
                  key={map} 
                  onClick={() => setSelectedMap(selectedMap === map ? 'All Maps' : map)}
                  className={`cursor-pointer px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedMap === map
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1a2332] text-gray-300 border border-gray-700 hover:border-blue-500 hover:text-blue-400'
                  }`}
                >
                  {map}
                </button>
              ))}
            </div>
          </div>
  
          {/* Map Radar*/}
          {selectedMap !== 'All Maps' && (
            <LineupRadar mapName={selectedMap} nadePositions={nadePositionsForMap}/>
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