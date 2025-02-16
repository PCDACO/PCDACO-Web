export interface DriverPayLoad {
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export interface DriverResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export type DriverParams = RootRequest;

export interface DriverEditResponse {
  id: string;
}

export interface DriverCreateResponse {
  id: string;
}
