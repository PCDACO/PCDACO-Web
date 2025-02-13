export interface CreateModelRequest {
  name: string;
  releaseDate: Date;
  manufacturerId: string;
  setName: (name: string) => void;
  setReleaseDate: (releaseDate: Date) => void;
  setManufacturerId: (manufacturerId: string) => void;
}
