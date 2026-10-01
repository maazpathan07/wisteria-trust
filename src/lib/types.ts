export type VerificationStatus = "ACTIVE" | "EXPIRED" | "REVOKED";

export interface IVerification {
  _id?: string;
  verificationId: string;
  sellerName: string;
  businessName: string;
  email: string;
  city: string;
  website?: string;
  status: VerificationStatus;
  expiryDate: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  verified?: boolean;
  status?: VerificationStatus | "NOT_FOUND";
}

export interface AdminSession {
  email: string;
  role: "admin";
  token?: string;
}
