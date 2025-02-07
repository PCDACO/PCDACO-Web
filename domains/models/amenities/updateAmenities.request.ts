export interface UpdateAmenityRequest {
  id: string;
  name: string;
  description: string;
  icon?: FileList;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setId: (id: string) => void;
  setIcon: (icon: FileList) => void;
}
