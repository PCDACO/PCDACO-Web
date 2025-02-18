export interface GPSDevicePayload {
  name: string;
}

export interface GPSDeviceResponse {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
}

export type GPSDeviceParams = RootRequest;

export interface GPSDeviceEditResponse {
  id: string;
}

export interface GPSDeviceCreateResponse {
  id: string;
}
