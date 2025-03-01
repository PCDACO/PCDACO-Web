export type CarPayload = object;

export interface CarResponse {
  id: string;
  modelId: string;
  modelName: string;
  ownerId: string;
  ownerName: string;
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
  amenities: AmenityDetail;
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
}
export interface CarParams extends RootRequest {
  status?: string;
}

export interface CarEditResponse {
  id: string;
}

export interface CarCreateResponse {
  id: string;
}
