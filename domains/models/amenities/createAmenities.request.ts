export interface CreateAmenitiesRequest {
  name: string;
  description: string;
  icon?: FileList;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setIcon: (icon: FileList) => void;
}
