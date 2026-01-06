interface NadePosition {
    id: number;
    type: 'smoke' | 'molotov' | 'flashbang' | 'grenade';
    x: number; // percent from left (0-100)
    y: number; // percent from top (0-100)
    title: string;
    description: string;
    difficulty: string;
    side: string;
    videoUrl: string;
  }
  
  // Sample positions for now
  export const miragePositions: NadePosition[] = [
    {
      id: 1,
      type: 'smoke',
      x: 35,
      y: 25,
      title: 'A-Site Window Smoke',
      description: 'Jump throw from T Spawn',
      difficulty: 'Medium',
      side: 'T-Side',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
    },
    {
      id: 2,
      type: 'smoke',
      x: 65,
      y: 40,
      title: 'CT Spawn Smoke',
      description: 'Stand throw from Mid',
      difficulty: 'Easy',
      side: 'T-Side',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
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