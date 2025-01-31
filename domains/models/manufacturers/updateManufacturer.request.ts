export interface UpdateManufacturerRequest {
  id: string;
  name: string;
  setName: (name: string) => void;
  setId: (id: string) => void;
}
