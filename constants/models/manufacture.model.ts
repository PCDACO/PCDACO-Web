export interface ManufacturePayload {
  name: string;
}

export interface ManufactureResponse {
  id: string;
  name: string;
  createdAt: Date;
}

export type ManufactureParams = RootRequest;

export interface ManufactureEditResponse {
  id: string;
}