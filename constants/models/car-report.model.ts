export type CarReportParams = RootRequest;

export interface CarReportResponse {
  id: string;
  carId: string;
  reporterId: string;
  title: string;
  description: string;
  reportType: number;
  status: number;
  resolvedAt: string;
  resolvedById: string;
  resolutionComments: string;
  imageReports: string[];
}

export interface CarReportDetailResponse {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  title: string;
  description: string;
  reportType: number;
  status: number;
  resolvedAt: string;
  resolvedById: string;
  resolutionComments: string;
  imageUrls: string[];
  carDetail: {
    id: string;
    licensePlate: string;
    modelName: string;
    manufacturerName: string;
    color: string;
    imageUrls: string[];
  };
  inspectionScheduleDetail: {
    id: string;
    technicianId: string;
    technicianName: string;
    technicianAvatar: string;
    status: number;
    inspectionAddress: string;
    inspectionDate: string;
    note: string;
    photoUrls: string[];
  }
}
