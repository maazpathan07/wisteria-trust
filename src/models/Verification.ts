import mongoose, { Schema, Document, Model } from "mongoose";
import { VerificationStatus } from "@/lib/types";

export interface IVerificationDocument extends Document {
  verificationId: string;
  sellerName: string;
  businessName: string;
  email: string;
  city: string;
  website: string;
  status: VerificationStatus;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new Schema<IVerificationDocument>(
  {
    verificationId: {
      type: String,
      required: [true, "Verification ID is required"],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    sellerName: {
      type: String,
      required: [true, "Seller / Entity name is required"],
      trim: true,
    },
    businessName: {
      type: String,
      required: [true, "Business / Store name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Corporate email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid corporate email address",
      ],
    },
    city: {
      type: String,
      required: [true, "City / Jurisdiction is required"],
      trim: true,
    },
    website: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "REVOKED"],
      default: "ACTIVE",
      index: true,
    },
    expiryDate: {
      type: Date,
      required: [true, "Accreditation expiry date is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling model in Next.js development hot-reload
export const Verification: Model<IVerificationDocument> =
  mongoose.models.Verification ||
  mongoose.model<IVerificationDocument>("Verification", VerificationSchema);

export default Verification;
