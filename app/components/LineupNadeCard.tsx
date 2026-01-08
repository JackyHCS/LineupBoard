import {Nade} from '../types/lineup';

interface LineupNadeCardProps {
    nade: Nade;
}

export default function LineupNadeCard({ nade }: LineupNadeCardProps) {
  return (
      <div className="bg-[#1a2332] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition group">
        <div className="relative aspect-video overflow-hidden">
          <iframe
            src={nade.videoUrl}
            className="w-full h-full cursor-pointer"
            allow="clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            title={nade.title}
          />
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