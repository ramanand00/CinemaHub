import React, { useEffect, useRef } from 'react';
import { extractYouTubeId } from '../services/api';

const VideoPlayer = ({ movie }) => {
  const iframeRef = useRef(null);

  // Extract YouTube ID from URL
  const youtubeId = extractYouTubeId(movie?.video_url);

  // Generate YouTube embed URL
  const embedUrl = youtubeId 
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : '';

  useEffect(() => {
    // If we have a valid iframe reference and movie changed, we could add additional controls
    if (iframeRef.current && movie) {
      // Additional YouTube API integration could go here
      console.log('Video player loaded for:', movie.title);
    }
  }, [movie]);

  if (!movie || !youtubeId) {
    return (
      <div className="w-full aspect-video bg-youtube-gray rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-youtube-red text-6xl mb-4">🎬</div>
          <p className="text-youtube-textSecondary">Select a movie to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={movie.title}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Info */}
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <div className="flex items-center mt-2 space-x-4 text-youtube-textSecondary">
          <span className="px-3 py-1 bg-youtube-gray rounded-full text-sm">
            {movie.genres}
          </span>
          <span>•</span>
          <span>Movie</span>
        </div>
        
        {/* Description */}
        <div className="mt-4 p-4 bg-youtube-gray rounded-lg">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-youtube-textSecondary line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;