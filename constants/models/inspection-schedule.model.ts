export interface GetInspectionSchedulesParams {
  technicianId?: string;
  month: number;
  year: number;
}

export interface GetCurrentInspectionSchedulesParams {
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
  carId: string;
  carOwnerId: string;
  carOwnerName: string;
  statusName: string;
  note: string;
  inspectionAddress: string;
  inspectionDate: Date;
  type: number;
  reportId: string;
  createdAt: Date;
}

export interface InspectionSchedulePayload {
  technicianId: string;
  carId: string;
  inspectionAddress: string;
  inspectionDate: Date;
  type: number;
  reportId?: string;
}

export interface ReassignInspectionSchedulePayload {
  technicianId: string;
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
  contractDetail: ContractDetail;
  type: number;
}

interface ContractDetail {
  id: string;
  terms: string;
  status: string;
  ownerSignatureDate?: Date;
  technicianSignatureDate?: Date;
  inspectionResults?: string;
  gPSDeviceId?: string;
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
  isTechnicianSigned: boolean;
  isOwnerSigned: boolean;
  type: string;
  status: string;
  photos: {
    id: string;
    url: string;
    type: string;
  }[];
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
  iconUrl: string,
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
