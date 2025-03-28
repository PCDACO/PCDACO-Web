export interface TransactionResponse {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: Date;
  status: string;
  details: TransactionDetail;
  prooUrl: string;
}

interface TransactionDetail {
  bookingId: string;
  bankName: string;
  bankAccountName: string;
}

export interface TransactionParams extends RootRequest {
  transactionType: string;
}
