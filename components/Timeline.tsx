import React from 'react';
import { Activity } from '../types';

interface TimelineProps {
  activities: Activity[];
}

const Timeline: React.FC<TimelineProps> = ({ activities }) => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'food': return '🍜';
      case 'transport': return '🚕';
      case 'shopping': return '🛍️';
      case 'massage': return '💆';
      default: return '📷';
    }
  };

  if (!activities || activities.length === 0) {
    return (
        <div className="p-8 text-center text-gray-500">
            <p>No activities for this day.</p>
        </div>
    )
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex group">
          {/* Time Column */}
          <div className="flex flex-col items-center mr-4 min-w-[60px]">
            <span className="text-lg font-bold text-amber-800 font-mono">{activity.time}</span>
            <div className={`h-full w-0.5 bg-amber-300 my-2 ${index === activities.length - 1 ? 'hidden' : ''} rounded-full`}></div>
          </div>

          {/* Card */}
          <div className="flex-1 bg-white rounded-xl shadow-md border border-amber-100 overflow-hidden relative hover:shadow-lg transition-shadow">
            {/* Top Color Bar */}
            <div className={`h-2 w-full ${
              activity.type === 'food' ? 'bg-orange-400' : 
              activity.type === 'transport' ? 'bg-blue-400' :
              activity.type === 'shopping' ? 'bg-pink-400' : 'bg-emerald-500'
            }`}></div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{activity.title}</h3>
                <span className="text-2xl ml-2">{getIcon(activity.type)}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
              
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                 {activity.costEstimate && (
                   <span className="bg-amber-50 text-amber-800 px-2 py-1 rounded-full border border-amber-200">
                     💰 {activity.costEstimate}
                   </span>
                 )}
              </div>

              <a 
                href={activity.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-600 font-bold text-sm hover:underline"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {activity.location}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
