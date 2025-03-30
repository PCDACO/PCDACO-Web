export interface GetInspectionSchedulesParams {
  technicianId?: string;
  month: number;
  year: number;
}
export interface ContractFromScheduleUpdateResponse {
  carId: string;
}
export interface InspectionScheduleResponse {
  inspectionSchedules: InspectionScheduleDetail[];
}
export interface InspectionScheduleDetail {
  id: string;
  technicianId: string;
  technicianName: string;
  carOwnerId: string;
  carOwnerName: string;
  inspectionStatusId: string;
  statusName: string;
  note: string;
  inspectionAddress: string;
  inspectionDate: Date;
  createdAt: Date;
}

export interface InspectionSchedulePayload {
  technicianId: string;
  carId: string;
  inspectionAddress: string;
  inspectionDate: Date;
}

export interface CarInspectionSchedulePayload {
  photos: Record<string, File | null>,
  dates: Record<string, Date | undefined>,
  descriptions: Record<string, string>,
  note: string,
}

export interface InspectionScheduleCreateResponse {
  id: string;
}

export interface InProgressInspectionScheduleResponse {
  id: string;
  date: Date;
  ownerName: string;
  address: string;
  licensePlate: string;
}

export interface InspectionScheduleDetailResponse {
  id: string;
  date: Date;
  address: string;
  notes: string;
  technician: TechnicianDetail;
  owner: OwnerDetail;
  car: CarDetail;
  createdAt: Date;
  contractId: string;
  hasGPSDevice: boolean;
}

interface CarDetail {
  id: string,
  modelId: string,
  modelName: string,
  fuelType: string,
  transmissionType: string,
  amenities: AmenityDetail[]
}

interface AmenityDetail {
  id: string,
  name: string,
  iconUrl: string
}

interface OwnerDetail {
  id: string,
  name: string,
  avatarUrl: string,
  phone: string,
}

interface TechnicianDetail {
  id: string,
  name: string
}
