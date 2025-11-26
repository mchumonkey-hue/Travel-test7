import React from 'react';
import { WeatherData } from '../types';

interface HeroProps {
  weather: WeatherData | null;
  loadingWeather: boolean;
}

const Hero: React.FC<HeroProps> = ({ weather, loadingWeather }) => {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative bg-gradient-to-b from-amber-500 to-amber-600 text-white pb-6 pt-8 px-6 rounded-b-[2rem] shadow-xl overflow-hidden">
      {/* Decorative Thai Pattern Overlay (Simulated with circles) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-2">
           <svg className="w-16 h-16 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
           </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-1 drop-shadow-md">Bangkok</h1>
        <p className="text-amber-100 text-sm mb-4">{today}</p>

        {/* Weather Widget */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center space-x-4 border border-white/30">
          {loadingWeather ? (
            <span className="text-sm animate-pulse">Loading weather...</span>
          ) : weather ? (
            <>
              <div className="text-4xl font-bold">{Math.round(weather.temp)}°</div>
              <div className="text-left">
                <div className="text-sm font-bold capitalize">{weather.condition}</div>
                <div className="text-xs text-amber-100">Humidity: {weather.humidity}%</div>
              </div>
            </>
          ) : (
            <span className="text-sm">Weather Unavailable</span>
          )}
        </div>
      </div>

      {/* Elephant Decoration (SVG) */}
      <div className="absolute bottom-2 right-4 opacity-30 w-16 h-16 pointer-events-none">
         <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M80,60 C85,60 90,55 90,50 C90,40 80,30 70,35 C65,30 55,25 45,30 C40,20 30,20 25,30 C15,30 10,40 10,50 C10,60 15,65 20,65 L20,80 L30,80 L30,65 L40,65 L40,80 L50,80 L50,60 L80,60 Z" />
         </svg>
      </div>
    </div>
  );
};

export default Hero;
