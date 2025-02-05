export interface SharedResponse<T = undefined> {
  value: T;
  isSuccess: boolean;
  message: string;
}
