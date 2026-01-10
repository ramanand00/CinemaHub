import React from 'react';
import { FaPlay } from 'react-icons/fa';

const MovieCard = ({ movie, onClick, isCurrent = false }) => {
  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-300 
        ${isCurrent ? 'ring-2 ring-youtube-red' : 'hover:scale-105'}
      `}
      onClick={() => onClick(movie)}
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden rounded-lg bg-youtube-gray">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x450/272727/ffffff?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-youtube-red rounded-full flex items-center justify-center">
            <FaPlay className="text-white ml-1" />
          </div>
        </div>

        {/* Current Playing Indicator */}
        {isCurrent && (
          <div className="absolute top-2 right-2 bg-youtube-red px-2 py-1 rounded text-xs font-semibold">
            NOW PLAYING
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="mt-2">
        <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
        <p className="text-youtube-textSecondary text-xs truncate">
          {movie.genres.split(',').slice(0, 2).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;