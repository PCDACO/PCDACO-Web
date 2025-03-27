export interface WithdrawRequestPayload {
  transactionProof?: FileList;
  adminNote: string;
}
export interface WithdrawRequestParams extends RootRequest {
  status?: number,
  fromDate?: Date,
  toDate?: Date
}
export interface WithdrawRequestResponse {
  id: string,
  user: UserDetail,
  bankAccount: BankAccountDetail,
  amount: number,
  status: string,
  createdAt: Date,
  processedInfo?: ProcessedInfoDetail
}

export interface WithdrawRequestQRResponse {
  qrCodeUrl: string,
  bankName: string,
  accountName: string,
  accountNumber: string,
  amount: number,
  description: string,
}

export interface UserDetail {
  id: string,
  name: string,
  email: string,
  phone: string,
  balance: number,
  avatarUrl: string,
}

export interface BankAccountDetail {
  id: string,
  bankName: string,
  bankCode: string,
  accountName: string,
  accountNumber: string,
}

export interface ProcessedInfoDetail {
  processedAt: Date,
  processedByAdminName: string,
  adminNote: string,
  rejectReason: string,
  transactionId: string,
}
