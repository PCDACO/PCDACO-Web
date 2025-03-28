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

export interface ImageReport {
  id: string;
  bookingReportId: string;
  url: string;
  createdAt: string;
}
