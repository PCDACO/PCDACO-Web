export interface GPSDevicePayload {
  name: string;
  status: number;
  carId: string;
}

export interface GPSDeviceAssignPayload {
  carId: string;
  deviceId: string;
  longtitude: number;
  latitude: number;
}

export interface GPSDeviceResponse {
  id: string;
  name: string;
  status: number;
  createdAt: Date;
  car: {
    id: string;
    isDeleted: boolean;
  }
}

export type GPSDeviceParams = RootRequest;

export interface GPSDeviceEditResponse {
  id: string;
}

export interface GPSDeviceCreateResponse {
  id: string;
}
