export interface PredefinedLandmark {
  id: string;
  name: string;
  type: 'pickup' | 'dropoff' | 'both';
  address: string;
  coordinates: { x: number; y: number }; // Simulated map coords from 0-100%
  popularity: string;
}

export interface Captain {
  id: string;
  name: string;
  rating: number;
  completedRides: number;
  phone: string;
  photoUrl: string;
  vehicleModel: string;
  licensePlate: string;
  currentLocation: { x: number; y: number };
}

export type RideMode = 'bike' | 'auto' | 'cab';

export interface RideOption {
  id: RideMode;
  title: string;
  subtitle: string;
  description: string;
  pricePerKm: number;
  etaMinutes: number;
  badge?: string;
  iconName: string;
  safetyFeatures: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isQuickOption?: boolean;
}

export interface BookingState {
  step: 'idle' | 'calculating' | 'matching' | 'found' | 'ongoing' | 'completed';
  pickup: PredefinedLandmark | null;
  dropoff: PredefinedLandmark | null;
  mode: RideMode;
  priceEstimate: number;
  captain: Captain | null;
  durationSeconds: number;
  elapsedSeconds: number;
  trackingPin: string;
  isSOSActive: boolean;
  sosAlertSent: boolean;
}

export interface CaptainApplication {
  name: string;
  phone: string;
  city: string;
  vehicleType: string;
  experienceYears: string;
  hasLicense: boolean;
  agreedToSafetyBadge: boolean;
}
