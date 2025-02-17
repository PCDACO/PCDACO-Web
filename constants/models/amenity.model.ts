export interface AmenityPayLoad {
  name: string;
  description: string;
  icon?: FileList;
}

export interface AmenityResponse {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: Date;
}

export type AmenityParams = RootRequest;

export interface AmenityEditResponse {
  id: string;
}

export interface AmenityCreateResponse {
  id: string;
}
