export interface ModelPayLoad {
  name: string;
  releaseDate: Date;
  manufacturerId: string;
}

export interface ModelResponse {
  id: string;
  name: string;
  releaseDate: Date;
  createdAt: Date;
  manufacturer: ManufacturerDetail;
}

interface ManufacturerDetail {
  id: string;
  name: string;
}

export type ModelParams = RootRequest

export interface ModelEditResponse {
  id: string;
}

export interface ModelCreateResponse {
  id: string;
}
