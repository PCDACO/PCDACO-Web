export interface SharedResponse<T = undefined> {
  value: T | null;
  isSuccess: boolean;
  message: string;
}
