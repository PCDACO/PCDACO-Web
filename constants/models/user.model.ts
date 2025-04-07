export interface CurrentUserResponse {
  id: string,
  name: string,
  email: string,
  avatarUrl: string,
  address: string,
  dateOfBirth: Date,
  phone: string,
  role: string,
  totalRent: number,
  totalRented: number,
  balance: number,
  totalCar: number,
}

export interface UpdateUserPayload {
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
}

export interface UserDetailResponse {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  balance: number;
  license: LicenseDetail;
  isBanned: boolean;
  bannedReason: string;
  role: string;
  cars: UserCarDetail[];
  bookings: UserBookingDetail[];
  reports: UserReportDetail[];
}

interface LicenseDetail {
  licenseNumber: string;
  licenseImageFrontUrl: string;
  licenseExpiryDate: Date;
  licenseIsApproved: boolean;
  licenseRejectReason: string;
  licenseImageUploadedAt: Date;
  licenseApprovedAt: Date;
}

export interface UserCarDetail {
  id: string;
  ownerId: string;
  modelId: string;
  fuelTypeId: string;
  transmissionTypeId: string;
  status: string;
  licensePlate: string;
  color: string;
  seat: number;
  description: string;
  fuelConsumption: string;
  price: number;
  terms: string;
  pickUpLocation: PickUpLocationDetail;
  modelName: string;
  manufacturerName: string;
  fuelTypeName: string;
  transmissionTypeName: string;
  imageUrls: string[];
}

interface PickUpLocationDetail {
  longitude: number;
  latitude: number;
  address: string;
}

export interface UserBookingDetail {
  id: string;
  userId: string;
  carId: string;
  status: string;
  startTime: string;
  endTime: string;
  actualReturnTime: string;
  basePrice: number;
  platformFee: number;
  excessDay: number;
  excessDayFee: number;
  totalAmount: number;
  totalDistance: number;
  note: string;
  isCarReturned: boolean;
  payOSOrderCode: number;
  isPaid: boolean;
  isRefund: boolean;
  refundAmount: number;
  refundDate: string;
  carModelName: string;
  driverName: string;
}

export interface UserReportDetail {
  id: string;
  bookingId: string;
  reportedById: string;
  title: string;
  reportType: string;
  description: string;
  status: string;
  compensationPaidUserId: string;
  compensationReason: string;
  compensationAmount: number;
  isCompensationPaid: boolean;
  compensationPaidImageUrl: string;
  compensationPaidAt: string;
  resolvedAt: string;
  resolvedById: string;
  resolutionComments: string;
  reporterName: string;
  resolverName: string;
  imageUrls: string[];
}
