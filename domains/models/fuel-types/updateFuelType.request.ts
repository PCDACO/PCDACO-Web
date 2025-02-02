export interface UpdateFuelTypeRequest {
  id: string;
  name: string;
  setName: (name: string) => void;
  setId: (id: string) => void;
}
