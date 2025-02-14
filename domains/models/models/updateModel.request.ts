export interface UpdateModelRequest {
  id: string;
  name: string;
  releaseDate: Date;
  manufacturerId: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setReleaseDate: (releaseDate: Date) => void;
  setManufacturerId: (manufacturerId: string) => void;
}
