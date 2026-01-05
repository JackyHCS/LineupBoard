"use client"
import {useState } from 'react';
import {Search} from 'lucide-react';
import {nades, maps} from '../data/nades';
import LineupNadeCard from './LineupNadeCard';
import {nadeTypes} from '../constants/nadeTypes';

export default function LineupSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedMap, setSelectedMap] = useState('All Maps');
    const [selectedSide, setSelectedSide] = useState('All Sides');
  
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
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px]"
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
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px]"
            >
              <option>All Maps</option>
              {maps.map(map => <option key={map}>{map}</option>)}
            </select>
            <select 
              value={selectedSide}
              onChange={(e) => setSelectedSide(e.target.value)}
              className="bg-[#1a2332] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 lg:min-w-[150px]"
            >
              <option>All Sides</option>
              <option>T-Side</option>
              <option>CT-Side</option>
            </select>
          </div>
  
          {/* Nade Type Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {nadeTypes.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-blue-500 hover:text-blue-400 transition"
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}
          </div>
  
          {/* Map Pills */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {maps.map(map => (
              <button key={map} onClick={() => setSelectedMap(map)}
                className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedMap === map
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041]'
                }`}
              >
                {map}
              </button>
            ))}
          </div>
  
          {/* Results Count */}
          <div className="text-lg font-bold text-gray-300 mb-6">
            {nades.length} LINEUPS FOUND
          </div>
  
          {/* Nade Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nades.map(nade => (
              <LineupNadeCard key={nade.id} nade={nade} />
            ))}
          </div>
        </div>
      </section>
    );
  }