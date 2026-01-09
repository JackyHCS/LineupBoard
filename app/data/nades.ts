import { Nade } from '../types/lineup';

export const nades: Nade[] = [
    // Mirage smokes
    {
        id: 1,
        title: 'A-Site Window Smoke from T Spawn',
        map: 'Mirage',
        type: 'Smoke',
        side: 'T-Side',
        videoUrl: 'https://www.youtube.com/embed/VidID', // sample format, replace with personal later
        difficulty: 'Medium'
    },
    {
        id: 2,
        title: 'CT Spawn Smoke from T Spawn',
        map: 'Mirage',
        type: 'Smoke',
        side: 'T-Side',
        videoUrl: 'https://www.youtube.com/embed/VidID',
        difficulty: 'Medium'
    },
    {
        id: 3,
        title: 'Window Smoke from Mid',
        map: 'Mirage',
        type: 'Smoke',
        side: 'T-Side',
        videoUrl: 'https://www.youtube.com/embed/VidID',
        difficulty: 'Easy'
    }
]

export const maps = ['MIRAGE', 'INFERNO', 'DUST2', 'NUKE', 'ANCIENT', 'TRAIN', 'VERTIGO', 'OVERPASS'];