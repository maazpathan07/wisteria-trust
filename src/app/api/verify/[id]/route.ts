import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Verification from "@/models/Verification";
import { VerificationStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const rawId = params.id;
    if (!rawId) {
      return NextResponse.json(
        { success: false, message: "Verification identifier is required" },
        { status: 400 }
      );
    }

    const verificationId = rawId.trim().toUpperCase();

    // Query record in MongoDB
    const record = await Verification.findOne({ verificationId }).lean();

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          status: "NOT_FOUND",
          message: `Record ${verificationId} does not exist in the official Wisteria Trust Registry.`,
        },
        { status: 404 }
      );
    }

    // Dynamic Expiry Calculation
    let currentStatus: VerificationStatus = record.status;
    const now = new Date();
    const expiry = new Date(record.expiryDate);

    if (currentStatus === "ACTIVE" && expiry < now) {
      currentStatus = "EXPIRED";
    }

    const isVerified = currentStatus === "ACTIVE";

    return NextResponse.json({
      success: true,
      verified: isVerified,
      status: currentStatus,
      verificationId: record.verificationId,
      sellerName: record.sellerName,
      businessName: record.businessName,
      city: record.city,
      website: record.website || "",
      issuedAt: record.createdAt,
      validTill: record.expiryDate,
      message: isVerified
        ? "Official Legitimacy Confirmed in Wisteria Trust Sovereign Ledger"
        : `Accreditation status is currently ${currentStatus}`,
    });
  } catch (error: any) {
    console.error("❌ [API] Verification Query Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal verification gateway error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
