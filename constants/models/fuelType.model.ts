export interface FuelTypePayload {
  name: string;
}

export interface FuelTypeResponse {
  id: string;
  name: string;
  createdAt: Date;
}

export type FuelTypeParams = RootRequest;

export interface FuelTypeEditResponse {
  id: string;
}

export interface FuelTypeCreateResponse {
  id: string;
}
