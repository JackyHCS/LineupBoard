export interface Nade {
    id: number;
    title: string;
    map: string;
    type: string;
    side: string;
    thumbnail: string;
    difficulty: string;
  }

export interface NadePosition {
    id: number;
    type: 'smoke' | 'molotov' | 'flashbang' | 'grenade';
    x: number;
    y: number;
    title: string;
    description: string;
    difficulty: string;
    side: string;
    videoUrl: string;
  }
  
  
export interface NadeMarkerProps {
    nade: NadePosition;
    onClick: (nade: NadePosition) => void;
    isActive: boolean;
  }