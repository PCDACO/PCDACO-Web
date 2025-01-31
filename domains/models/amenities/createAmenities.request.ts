export interface CreateAmenitiesRequest {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
}
