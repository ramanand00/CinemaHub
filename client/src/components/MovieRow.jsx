import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, currentMovie, onMovieClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-1)}
            className="p-2 rounded-full bg-youtube-gray hover:bg-youtube-lightGray transition-colors"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 rounded-full bg-youtube-gray hover:bg-youtube-lightGray transition-colors"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard
                movie={movie}
                isCurrent={currentMovie?.id === movie.id}
                onClick={onMovieClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;