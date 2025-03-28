export type ReportParams = RootRequest;

export interface ReportResponse {
  id: string;
  bookingId: string;
  reporterId: string;
  reportedName: string;
  title: string;
  description: string;
  reportType: string;
  status: string;
  resolvedAt?: Date;
  resolvedById?: string;
  resolutionComments?: string;
  imageReports: ImageReport[];
}

export interface UnderReviewResponse {
  id: string;
  bookingId: string;
  title: string;
  bookingReportType: number;
  description: string;
  bookingReportStatus: number;
  createdAt: Date;
  reportedByName: string;
}

export interface ImageReport {
  id: string;
  bookingReportId: string;
  url: string;
  createdAt: string;
}

export interface ReportDetailResponse {
  id: string;
  reporterId: string;
  reportedName: string;
  title: string;
  description: string;
  reportType: string;
  status: string;
  resolvedAt: string | null;
  resolvedById: string | null;
  resolutionComments: string | null;
  imageUrls: string[];
  bookingDetail: BookingDetail;
  carDetail: CarDetail;
  compensationDetail: CompensationDetail;
  inspectionScheduleDetail: InspectionScheduleDetail;
}


interface BookingDetail {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverPhone: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerPhone: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  basePrice: number;
}


interface CarDetail {
  id: string;
  licensePlate: string;
  modelName: string;
  manufacturerName: string;
  color: string;
  imageUrl: string[];
}


interface CompensationDetail {
  userId: string;
  userName: string;
  userAvatar: string;
  compensationReason: string;
  compensationAmount: number;
  isPaid: boolean;
  imageUrl: string | null;
  paidAt: string | null;
}


interface InspectionScheduleDetail {
  id: string;
  technicianId: string;
  technicianName: string;
  technicianAvatar: string;
  status: string;
  inspectionAddress: string;
  inspectionDate: string;
  note: string;
  photoUrls: string[];
}


