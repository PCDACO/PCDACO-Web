export interface ManufacturePayload {
  name: string;
}

export interface ManufactureResponse {
  id: string;
  name: string;
  createdAt: Date;
}

export interface ManufactureParams extends RootRequest {}

export interface ManufactureEditResponse {
  id: string;
}
