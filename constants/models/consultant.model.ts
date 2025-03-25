export interface ConsultantPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  roleName: string;
}

export interface ConsultantResponse {
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

export type ConsultantParams = RootRequest;

export interface ConsultantCreateResponse {
  id: string;
}
export interface ConsultantEditResponse {
  id: string;
}
