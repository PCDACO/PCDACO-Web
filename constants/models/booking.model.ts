export interface BookingResponse {
  id: string;
  car: CarDetail;
  driver: UserDetail;
  owner: UserDetail;
  booking: BookingDetail;
  payment: PaymentDetail;
  trip: TripDetail;
  feedbacks: FeedbackDetail[];
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

