export interface UpdateTransmissionRequest {
  id: string;
  name: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
}
