'use client';

import {useState} from 'react';
import {nadeMapIcons} from '../constants/nadeMapIcons';
import {NadePosition, NadeMarkerProps} from '../types/lineup';
import {mapRadars} from '../constants/mapRadars';

const NadeMarker: React.FC<NadeMarkerProps> = ({ nade, onClick, isActive }) => {
  const icon = nadeMapIcons[nade.type];
  return (
    <button
      onClick={() => onClick(nade)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${ isActive ? 'z-20 scale-125' : 'z-hover:scale-110'}`}
      style={{left: `${nade.x}%`, top: `${nade.y}%` }}
    >
      <div className={`w-6 h-6 rounded-full ${icon} border-2 flex items-center justify-center shadow-lg cursor-pointer ${
        isActive ? 'ring-4 ring-white' : ''
      }`}>
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      {!isActive && (
        <div className={`absolute inset-0 rounded-full ${icon} opacity-50 animate-ping`}></div>
      )}
    </button>
  );
};

interface MapRadarProps {
  mapName: string;
  nadePositions?: NadePosition[];
}

export default function LineupRadar({ mapName, nadePositions = [] }: MapRadarProps) {
  const [selectedNade, setSelectedNade] = useState<NadePosition | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const radarImage = mapRadars[mapName];
  
  if (!radarImage) {
    return null;
  }

  const filteredNades = filterType === 'all' 
    ? nadePositions 
    : nadePositions.filter(nade => nade.type === filterType);

  return (
    <div className="mb-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button 
           onClick={() => setFilterType('all')}
           className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterType === 'all' 
            ? 'bg-blue-500 text-white' 
            : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041] border border-gray-700'}`}
        >
          All ({nadePositions.length})
        </button>
        <button
          onClick={() => setFilterType('smoke')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filterType === 'smoke' 
              ? 'bg-gray-500 text-white' 
              : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041] border border-gray-700'
          }`}
        >
          Smokes ({nadePositions.filter(n => n.type === 'smoke').length})
        </button>
        <button
          onClick={() => setFilterType('molotov')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filterType === 'molotov' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041] border border-gray-700'
          }`}
        >
          Molotovs ({nadePositions.filter(n => n.type === 'molotov').length})
        </button>
        <button
          onClick={() => setFilterType('flashbang')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filterType === 'flashbang' 
              ? 'bg-yellow-500 text-black' 
              : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041] border border-gray-700'
          }`}
        >
          Flashbangs ({nadePositions.filter(n => n.type === 'flashbang').length})
        </button>
        <button
          onClick={() => setFilterType('grenade')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filterType === 'grenade' 
              ? 'bg-green-500 text-white' 
              : 'bg-[#1a2332] text-gray-300 hover:bg-[#243041] border border-gray-700'
          }`}
        >
          Grenades ({nadePositions.filter(n => n.type === 'grenade').length})
        </button>
      </div>

      {/* Map Container */}
      <div className="relative bg-[#1a2332] rounded-lg border border-gray-700 overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <img src={radarImage} alt={`${mapName} Radar`} className="absolute inset-0 w-full h-full object-contain"/>
          
          {/* Nade Markers */}
          {filteredNades.map(nade => (
            <NadeMarker key={nade.id} nade={nade} onClick={setSelectedNade} isActive={selectedNade?.id === nade.id}/>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-[#0f1419] border border-gray-700 rounded-lg p-3">
          <h3 className="text-xs font-bold text-white mb-2">Legend</h3>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-gray-500"></div>
              <span className="text-xs text-gray-300">Smoke</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-orange-600"></div>
              <span className="text-xs text-gray-300">Molotov</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-500"></div>
              <span className="text-xs text-gray-300">Flashbang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-600"></div>
              <span className="text-xs text-gray-300">Grenade</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}