'use client'

import { Nade } from '../types/lineup';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

interface LineupNadeCardProps {
    nade: Nade;
}

export default function LineupNadeCard({ nade }: LineupNadeCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the nade is favorited
  useEffect(() => {
    if (user) {
      fetch('/api/favorites')
        .then((res) => res.json())
        .then((data) => {
          if (data.favorites && data.favorites.includes(nade.id)) {
            setIsFavorite(true);
          }
        })
        .catch((err) => console.error('Error fetching favorites:', err));
    }
  }, [user, nade.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        // Remove favorite
        const response = await fetch(`/api/favorites?nade_id=${nade.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Add favorite
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nade_id: nade.id }),
        });
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="bg-[#1a2332] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition group relative">
        <div className="relative aspect-video overflow-hidden">
          <iframe
            src={nade.videoUrl}
            className="w-full h-full cursor-pointer"
            allow="clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            title={nade.title}
          />
          {user && (
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-black/50 hover:bg-black/70 text-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-3 line-clamp-2">
            {nade.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                {nade.type}
              </span>
              <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-medium rounded">
                {nade.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{nade.map}</span>
              <span>{nade.side}</span>
            </div>
          </div>
        </div>
      </div>
  );
}