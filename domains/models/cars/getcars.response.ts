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
  price: {
    perHour: number;
    perDay: number;
  };
  location: {
    longitude: number;
    latitude: number;
  };
  manufacturer: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
  }[];
  amenities: {
    id: string;
    name: string;
    description: string;
  }[];
}
