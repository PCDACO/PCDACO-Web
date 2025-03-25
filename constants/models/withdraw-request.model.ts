export interface WithdrawRequestParams {
  limit: number,
  lastId?: string,
  searchTerm?: string,
  status: number,
  fromDate: Date,
  toDate: Date
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
