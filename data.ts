import { DayItinerary } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    dateLabel: "Day 1",
    activities: [
      {
        id: '1-1',
        time: '14:00',
        title: 'Arrival & Check-in',
        type: 'transport',
        description: 'Take ARL to Phaya Thai, then BTS to hotel. Drop luggage.',
        location: 'Hotel (Sukhumvit Area)',
        googleMapsUrl: 'https://maps.google.com/?q=Sukhumvit+Bangkok',
        costEstimate: 'ARL: 45฿, BTS: 30฿',
        imageUrl: 'https://picsum.photos/400/200?random=1'
      },
      {
        id: '1-2',
        time: '17:00',
        title: 'Jodd Fairs Night Market',
        type: 'food',
        description: 'Famous Leng Saap (Spicy Mountain Ribs) and fruit smoothies.',
        location: 'Jodd Fairs Rama 9',
        googleMapsUrl: 'https://maps.google.com/?q=Jodd+Fairs+Rama+9',
        costEstimate: 'Food: 500฿',
        imageUrl: 'https://picsum.photos/400/200?random=2'
      }
    ]
  },
  {
    day: 2,
    dateLabel: "Day 2",
    activities: [
      {
        id: '2-1',
        time: '09:00',
        title: 'The Grand Palace',
        type: 'sightseeing',
        description: 'Visit the Emerald Buddha. Dress code: No shorts/sleeveless.',
        location: 'The Grand Palace',
        googleMapsUrl: 'https://maps.google.com/?q=The+Grand+Palace+Bangkok',
        costEstimate: 'Ticket: 500฿',
        imageUrl: 'https://picsum.photos/400/200?random=3'
      },
      {
        id: '2-2',
        time: '12:30',
        title: 'Wat Arun (Temple of Dawn)',
        type: 'sightseeing',
        description: 'Take the cross-river ferry (5฿). Iconic photo spot.',
        location: 'Wat Arun',
        googleMapsUrl: 'https://maps.google.com/?q=Wat+Arun',
        costEstimate: 'Ticket: 100฿',
        imageUrl: 'https://picsum.photos/400/200?random=4'
      },
      {
        id: '2-3',
        time: '18:00',
        title: 'IconSiam',
        type: 'shopping',
        description: 'Indoor floating market (SookSiam) for dinner. Watch the fountain show.',
        location: 'ICONSIAM',
        googleMapsUrl: 'https://maps.google.com/?q=IconSiam',
        costEstimate: 'Free entry',
        imageUrl: 'https://picsum.photos/400/200?random=5'
      }
    ]
  },
  {
    day: 3,
    dateLabel: "Day 3",
    activities: [
      {
        id: '3-1',
        time: '10:00',
        title: 'Chatuchak Weekend Market',
        type: 'shopping',
        description: 'World\'s largest weekend market. Coconut ice cream is a must.',
        location: 'Chatuchak Market',
        googleMapsUrl: 'https://maps.google.com/?q=Chatuchak+Weekend+Market',
        costEstimate: 'Shopping budget: 2000฿',
        imageUrl: 'https://picsum.photos/400/200?random=6'
      },
      {
        id: '3-2',
        time: '16:00',
        title: 'Thai Massage',
        type: 'massage',
        description: 'Relax after walking all day.',
        location: 'Health Land / Let\'s Relax',
        googleMapsUrl: 'https://maps.google.com/?q=Health+Land+Asoke',
        costEstimate: '600฿ / 2 hrs',
        imageUrl: 'https://picsum.photos/400/200?random=7'
      }
    ]
  },
  {
    day: 4,
    dateLabel: "Day 4",
    activities: [
      {
        id: '4-1',
        time: '08:00',
        title: 'Ayutthaya Day Trip',
        type: 'sightseeing',
        description: 'Ancient capital ruins. Train from Bang Sue Grand Station.',
        location: 'Ayutthaya Historical Park',
        googleMapsUrl: 'https://maps.google.com/?q=Ayutthaya',
        costEstimate: 'Train: 20฿-300฿',
        imageUrl: 'https://picsum.photos/400/200?random=8'
      }
    ]
  },
  {
    day: 5,
    dateLabel: "Day 5",
    activities: [
      {
        id: '5-1',
        time: '10:00',
        title: 'Bangkok Art & Culture Centre',
        type: 'sightseeing',
        description: 'Modern art exhibitions. Walk to Siam Discovery via skywalk.',
        location: 'BACC',
        googleMapsUrl: 'https://maps.google.com/?q=BACC+Bangkok',
        costEstimate: 'Free',
        imageUrl: 'https://picsum.photos/400/200?random=9'
      },
      {
        id: '5-2',
        time: '19:00',
        title: 'Rooftop Bar',
        type: 'food',
        description: 'Cocktails with a view.',
        location: 'Tichuca / Octave',
        googleMapsUrl: 'https://maps.google.com/?q=Tichuca+Rooftop+Bar',
        costEstimate: 'Drinks: 400฿+',
        imageUrl: 'https://picsum.photos/400/200?random=10'
      }
    ]
  },
  {
    day: 6,
    dateLabel: "Day 6",
    activities: [
      {
        id: '6-1',
        time: '10:00',
        title: 'Big C Supercenter',
        type: 'shopping',
        description: 'Buy snacks and souvenirs (Pocky, Pretz, Dried Mango).',
        location: 'Big C Ratchadamri',
        googleMapsUrl: 'https://maps.google.com/?q=Big+C+Ratchadamri',
        costEstimate: 'Budget: 1000฿',
        imageUrl: 'https://picsum.photos/400/200?random=11'
      },
      {
        id: '6-2',
        time: '14:00',
        title: 'Airport Transfer',
        type: 'transport',
        description: 'Heading back to BKK/DMK airport.',
        location: 'Airport',
        googleMapsUrl: '',
        imageUrl: 'https://picsum.photos/400/200?random=12'
      }
    ]
  }
];
