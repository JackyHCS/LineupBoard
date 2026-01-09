import { NadePosition } from '../types/lineup';

// Sample positions for now
  export const miragePositions: NadePosition[] = [
    {
      id: 1,
      type: 'smoke',
      x: 35,
      y: 25,
      title: 'Window Smoke',
      description: 'Jump throw from T Spawn',
      difficulty: 'Medium',
      side: 'T-Side'
    },
    {
      id: 2,
      type: 'smoke',
      x: 65,
      y: 40,
      title: 'CT Spawn Smoke',
      description: 'Stand throw from Mid',
      difficulty: 'Easy',
      side: 'T-Side'
    },
  ];
  
  export const infernoPositions: NadePosition[] = [
    
  ];
  
  export const dust2Positions: NadePosition[] = [
    
  ];
  
  export const nukePositions: NadePosition[] = [
    
  ];
  
  export const ancientPositions: NadePosition[] = [
    
  ];
  
  export const trainPositions: NadePosition[] = [
    
  ];
  
  export const vertigoPositions: NadePosition[] = [
    
  ];
  
  export const overpassPositions: NadePosition[] = [
    
  ];
  
  export const mapNadePositions: { [key: string]: NadePosition[] } = {
    'MIRAGE': miragePositions,
    'INFERNO': infernoPositions,
    'DUST2': dust2Positions,
    'NUKE': nukePositions,
    'ANCIENT': ancientPositions,
    'TRAIN': trainPositions,
    'VERTIGO': vertigoPositions,
    'OVERPASS': overpassPositions
  };