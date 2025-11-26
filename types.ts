export interface Activity {
  id: string;
  time: string;
  title: string;
  type: 'sightseeing' | 'food' | 'transport' | 'shopping' | 'massage';
  description?: string;
  location: string;
  googleMapsUrl: string;
  costEstimate?: string; // Text description of cost
  imageUrl?: string;
}

export interface DayItinerary {
  day: number;
  dateLabel: string; // e.g., "Day 1 (Sat)"
  activities: Activity[];
}

export interface Expense {
  id: string;
  item: string;
  amount: number;
  currency: 'THB' | 'TWD';
  paidBy: 'A' | 'B'; // Person A or Person B
  timestamp: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
}
