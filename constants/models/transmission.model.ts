export interface TransmissionPayload {
  name: string;
}

export interface TransmissionResponse {
  id: string;
  name: string;
  createdAt: Date;
}

export type TransmissionParams = RootRequest;

export interface TransmissionEditResponse {
  id: string;
}

export interface TransmissionCreateResponse {
  id: string;
}
