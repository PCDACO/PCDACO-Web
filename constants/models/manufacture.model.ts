export interface ManufacturePayload {
  name: string;
  icon?: FileList;
}

export interface ManufactureResponse {
  id: string;
  name: string;
  logoUrl: string;
  createdAt: string;
}

export type ManufactureParams = RootRequest;

export interface ManufactureEditResponse {
  id: string;
}
