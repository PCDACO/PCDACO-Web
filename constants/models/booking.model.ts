export type BookingParams = RootRequest;

export interface ListBookingResponse {
  id: string;
  carName: string;
  driverName: string;
  ownerName: string;
  totalAmount: number;
  totalDistance: number;
  isPaid: boolean;
  isRefund: boolean;
  status: string;
  startTime: string;
  endTime: string;
  actualReturnTime: string;
}

export interface BookingResponse {
  id: string;
  car: CarDetail;
  driver: UserDetail;
  owner: UserDetail;
  booking: BookingDetail;
  payment: PaymentDetail;
  trip: TripDetail;
  feedbacks: FeedbackDetail[];
  contract: {
    id: string;
    terms: string;
  }
}

interface CarDetail {
  id: string;
  modelName: string;
  licensePlate: string;
  color: string;
  seat: number;
  transmissionType: string;
  fuelType: string;
  carImageUrl: string[];
  pickupAddress: string;
}

interface UserDetail {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

interface BookingDetail {
  startTime: Date;
  endTime: Date;
  actualReturnTime: Date;
  totalDistance: number;
  status: string;
  note: string;
  isRefund: boolean;
  refundAmount: number;
  refundDate: Date;
}

interface PaymentDetail {
  basePrice: number;
  platformFee: number;
  excessDay: number;
  excessDayFee: number;
  totalAmount: number;
  isPaid: boolean;
}

interface TripDetail {
  totalDistance: number;
}

interface FeedbackDetail {
  id: string;
  rating: number;
  content: string;
  type: Number;
  userName: string;
}

