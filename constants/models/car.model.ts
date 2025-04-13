export type CarPayload = object;

export interface CarResponse {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  licensePlate: string;
  color: string;
  seat: number;
  status: string;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelComsumption: number;
  requiresCollateral: boolean;
  price: PriceDetail;
  location?: LocationDetail;
  manufacturer: ManufacturerDetail;
  images: ImageDetail[];
  amenities: AmenityDetail[];
}

interface PriceDetail {
  perHour: number;
  perDay: number;
}

interface LocationDetail {
  longtitude: number;
  latitude: number;
}

interface ManufacturerDetail {
  id: string;
  name: string;
}

interface ImageDetail {
  id: string;
  url: string;
}
interface AmenityDetail {
  id: string;
  name: string;
  description: string;
  icon: string;
}
export interface CarParams extends RootRequest {
  status?: number;
  onlyHasInprogressInspectionSchedule?: boolean;
  onlyNoGps?: boolean;
}

export interface CarEditResponse {
  id: string;
}

export interface CarCreateResponse {
  id: string;
}

export interface CarDetailResponse {
  id: string;
  modelId: string;
  hasInspectionSchedule: boolean;
  modelName: string;
  releaseDate: string;
  color: string;
  licensePlate: string;
  seat: number;
  description: string;
  transmissionId: string;
  transmissionType: string;
  fuelTypeId: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  terms: string;
  status: string;
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatarUrl: string;
  };
  statistics: {
    totalBookings: number;
    totalEarnings: number;
    averageRating: number;
    lastRented: Date;
  };
  pickupLocation: {
    longtitude: number;
    latitude: number;
    address: string;
  };
  manufacturer: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
    type: string;
    name: string;
  }[];
  amenities: {
    id: string;
    name: string;
    description: string;
    icon: string;
  }[];
  bookings: {
    bookingId: string;
    driverId: string;
    driverName: string;
    avatarUrl: string;
    startTime: string;
    endTime: string;
    amount: number;
    status: string;
  }[];
  contract: {
    id: string;
    terms: string;
  }
}

export interface CarLocationResponse {
  latitude: number;
  longitude: number;
  updatedAt: Date;
}
