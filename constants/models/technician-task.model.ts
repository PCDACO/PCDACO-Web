export interface TechnicianTaskResponse {
  technicianName: string;
  inspectionDate: Date;
  cars: CarDetail[];
}
export interface CarDetail {
  id: string;
  modelId: string;
  modelName: string;
  manufacturerName: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  transmissionType: string;
  fuelType: string;
  fuelConsumption: number;
  requiresCollateral: boolean;
  price: number;
  images: ImageDetail[];
  owner: UserDetail;
  inspectionAddress: string;
}
export interface ImageDetail {
  id: string;
  url: string;
}
export interface UserDetail {
  id: string;
  name: string;
  avatarUrl: string;
}
