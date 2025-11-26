import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import ExpenseTracker from './components/ExpenseTracker';
import GeminiAssistant from './components/GeminiAssistant';
import { ITINERARY_DATA } from './data';
import { WeatherData, Expense } from './types';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  // Fetch Weather (Simulated/Real Mix)
  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        // Using Open-Meteo (No API Key needed) for real Bangkok data
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=13.7563&longitude=100.5018&current=temperature_2m,relative_humidity_2m,weather_code');
        const data = await res.json();
        
        if (data.current) {
            setWeather({
                temp: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                condition: getWeatherDescription(data.current.weather_code)
            });
        }
      } catch (error) {
        console.error("Weather fetch failed", error);
        // Fallback mock
        setWeather({ temp: 32, condition: 'Sunny', humidity: 70 });
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code: number): string => {
      // Simple WMO code interpretation
      if (code <= 3) return "Sunny/Clear";
      if (code <= 48) return "Foggy";
      if (code <= 67) return "Rainy";
      if (code <= 99) return "Thunderstorm";
      return "Unknown";
  }

  const currentItinerary = ITINERARY_DATA.find(d => d.day === selectedDay);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prev => [...prev, newExpense]);
  };

  return (
    <div className="min-h-screen pb-10">
      <Hero weather={weather} loadingWeather={loadingWeather} />

      {/* Sticky Date Navigator */}
      <div className="sticky top-0 z-30 bg-[#FFFBEB]/95 backdrop-blur shadow-sm border-b border-amber-200">
        <div className="flex overflow-x-auto py-3 px-4 space-x-3 no-scrollbar snap-x">
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.day}
              onClick={() => {
                  setSelectedDay(day.day);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-colors snap-center whitespace-nowrap ${
                selectedDay === day.day
                  ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                  : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {day.dateLabel}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-2xl mx-auto min-h-[60vh]">
        {currentItinerary ? (
           <Timeline activities={currentItinerary.activities} />
        ) : (
           <div className="p-10 text-center">Itinerary not found</div>
        )}
      </main>

      <ExpenseTracker 
        expenses={expenses} 
        onAddExpense={handleAddExpense} 
        isOpen={isExpenseOpen}
        setIsOpen={setIsExpenseOpen}
      />
      
      <GeminiAssistant />

      {/* Footer Decoration */}
      <div className="text-center text-amber-300 text-xs py-8 opacity-50">
        Designed with ❤️ for Bangkok
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
