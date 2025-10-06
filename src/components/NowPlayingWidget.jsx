import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, ExternalLink } from 'lucide-react';

const NowPlayingWidget = ({ apiBase }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(`${apiBase}/api/now-playing`);
        const data = await response.json();
        setCurrentTrack(data);
      } catch (err) {
        setCurrentTrack(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [apiBase]);

  if (isLoading) {
    return (
      <div className="now-playing-widget bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg w-80">
        <div className="flex items-center space-x-10">
          <div className="w-20 h-20 bg-white/10 rounded-lg animate-pulse" />
          <div className="flex-1">
            <div className="h-3 bg-white/10 rounded mb-2 animate-pulse" />
            <div className="h-2.5 bg-white/10 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentTrack || !currentTrack.isPlaying) {
    return (
      <div className="now-playing-widget bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg w-80">
        <div className="flex items-center space-x-10">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
            <Music className="h-8 w-8 text-white/60" />
          </div>
          <div className="flex-1">
            <p className="text-white/60 font-medium text-sm">Not playing</p>
            <p className="text-white/40 text-sm">Check back later</p>
          </div>
        </div>
      </div>
    );
  }

  const { track, isPlaying, platform, progress } = currentTrack;
  const progressPercentage = track.duration ? (progress / track.duration) * 100 : 0;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPlatformColor = (platform) => {
    if (platform?.toLowerCase() === 'spotify') return 'from-green-500 to-green-600';
    return 'from-purple-500 to-purple-600';
  };

  return (
    <div className="now-playing-widget bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 shadow-lg w-80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">Now Playing</span>
        </div>
        <span className="text-xs text-white/60 font-medium">{platform}</span>
      </div>

      <div className="flex items-start space-x-20">
        <div className="relative flex-shrink-0">
          <img
            src={track.albumArt || '/api/placeholder/64/64'}
            alt="Album cover"
            className="w-20 h-20 rounded-lg object-cover shadow-sm"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r ${getPlatformColor(platform)} rounded-full flex items-center justify-center`}>
            {isPlaying ? <Play className="h-2.5 w-2.5 text-white fill-current" /> : <Pause className="h-2.5 w-2.5 text-white" />}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-10">
          <h4 className="text-white font-semibold text-sm leading-tight">{track.name}</h4>
          <p className="text-white/70 text-sm leading-tight">by {track.artists?.join(', ') || 'Unknown Artist'}</p>
          <p className="text-white/50 text-xs leading-tight">{track.album}</p>
        </div>

        {track.externalUrl && (
          <div className="flex-shrink-0">
            <a href={track.externalUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ExternalLink className="h-3.5 w-3.5 text-white/60 hover:text-white" />
            </a>
          </div>
        )}
      </div>

      {track.duration && (
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className={`h-full bg-gradient-to-r ${getPlatformColor(platform)} rounded-full transition-all duration-1000`} style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NowPlayingWidget;