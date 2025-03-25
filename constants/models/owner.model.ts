export interface OwnerApprovalPayload {
  isApproved: boolean,
  rejectReason: string
}

export interface OwnerPendingApprovalResponse {
  id: string,
  name: string,
  email: string,
  avatarUrl: string,
  address: string,
  dateOfBirth: Date,
  phone: string,
  role: string,
  createdAt: Date,
  licenseNumber: string,
  licenseExpiryDate: Date,
  licenseImageFrontUrl: string,
  licenseImageBackUrl: string,
  isApprovedLicense: boolean,
  licenseRejectReason: string,
  licenseApprovedAt: Date,
  licenseImageUploadedAt: Date,
}

export interface OwnerPayLoad {
  name: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export interface OwnerResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  address: string;
  dateOfBirth: Date;
  phone: string;
  role: string;
  createdAt: Date;
}

export type OwnerParams = RootRequest;

export interface OwnerEditResponse {
  id: string;
}

export interface OwnerCreateResponse {
  id: string;
}
