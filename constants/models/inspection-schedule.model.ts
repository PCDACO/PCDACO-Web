export interface GetInspectionSchedulesParams {
  technicianId?: string;
  month: number;
  year: number;
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
