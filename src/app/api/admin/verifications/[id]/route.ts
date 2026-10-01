import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Verification from "@/models/Verification";
import { verifyAdminAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * PUT /api/admin/verifications/:id
 * Body: { action: "extend" | "revoke" | "reactivate", newExpiryDate?: string }
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    await connectDB();

    const verificationId = params.id.trim().toUpperCase();
    const body = await req.json();
    const { action, newExpiryDate } = body;

    const record = await Verification.findOne({ verificationId });
    if (!record) {
      return NextResponse.json(
        { success: false, message: `Verification ID ${verificationId} not found` },
        { status: 404 }
      );
    }

    if (action === "revoke") {
      record.status = "REVOKED";
      await record.save();
      return NextResponse.json({
        success: true,
        message: `Verification ${verificationId} revoked successfully`,
        data: record,
      });
    }

    if (action === "reactivate") {
      record.status = "ACTIVE";
      if (newExpiryDate) {
        record.expiryDate = new Date(newExpiryDate);
      } else if (new Date(record.expiryDate) < new Date()) {
        // Extend 1 year if already expired
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        record.expiryDate = nextYear;
      }
      await record.save();
      return NextResponse.json({
        success: true,
        message: `Verification ${verificationId} reactivated successfully`,
        data: record,
      });
    }

    if (action === "extend") {
      if (!newExpiryDate) {
        return NextResponse.json(
          { success: false, message: "New expiry date is required for extension" },
          { status: 400 }
        );
      }
      record.expiryDate = new Date(newExpiryDate);
      if (new Date(newExpiryDate) > new Date() && record.status === "EXPIRED") {
        record.status = "ACTIVE";
      }
      await record.save();
      return NextResponse.json({
        success: true,
        message: `Verification ${verificationId} extended successfully`,
        data: record,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action. Supported: extend, revoke, reactivate" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("❌ [Admin Update Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update verification", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/verifications/:id
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    await connectDB();

    const verificationId = params.id.trim().toUpperCase();
    const result = await Verification.findOneAndDelete({ verificationId });

    if (!result) {
      return NextResponse.json(
        { success: false, message: `Verification ID ${verificationId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Verification ${verificationId} deleted permanently`,
    });
  } catch (error: any) {
    console.error("❌ [Admin Delete Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete verification", error: error.message },
      { status: 500 }
    );
  }
}
