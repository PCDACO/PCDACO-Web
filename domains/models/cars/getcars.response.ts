export interface GetCarsResponses {
  items: GetCarsResponse[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  setItems: (items: GetCarsResponse[]) => void;
  setHasNext: (hasNext: boolean) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalItems: (totalItems: number) => void;
}

export interface GetCarsResponse {
  id: string;
  manufacturerId: string;
  manufacturerName: string;
  ownerId: string;
  ownerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: PriceDetail;
  location: LocationDetail;
  manufacturer: ManufacturerDetail;
  images: ImageDetail[];
  amenities: AmenityDetail[];
}

export interface PriceDetail {
  perHour: number;
  perDay: number;
}

export interface LocationDetail {
  longitude: number;
  latitude: number;
}

export interface ManufacturerDetail {
  id: string;
  name: string;
}

export interface ImageDetail {
  id: string;
  url: string;
}

export interface AmenityDetail {
  id: string;
  name: string;
  description: string;
}
