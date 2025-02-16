export interface OwnerPayLoad {
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export interface OwnerResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export type OwnerParams = RootRequest;

export interface OwnerEditResponse {
  id: string;
}

export interface OwnerCreateResponse {
  id: string;
}
