export interface TechnicianPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  roleName: string;
}

export interface TechnicianResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export type TechnicianParams = RootRequest;

export interface TechnicianCreateResponse {
  id: string;
}
export interface TechnicianEditResponse {
  id: string;
}
