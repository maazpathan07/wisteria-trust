import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Verification from "@/models/Verification";
import { verifyAdminAuth } from "@/lib/auth";
import { generateVerificationId } from "@/lib/generateId";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/verifications
 * List verifications with search, status filter, and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = (page - 1) * limit;

    const query: any = {};

    if (status && ["ACTIVE", "EXPIRED", "REVOKED"].includes(status)) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { verificationId: { $regex: search, $options: "i" } },
        { sellerName: { $regex: search, $options: "i" } },
        { businessName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const [verifications, total] = await Promise.all([
      Verification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Verification.countDocuments(query),
    ]);

    // Auto update expired status dynamically in list if needed
    const now = new Date();
    const formatted = verifications.map((v) => {
      let currentStatus = v.status;
      if (currentStatus === "ACTIVE" && new Date(v.expiryDate) < now) {
        currentStatus = "EXPIRED";
      }
      return {
        ...v,
        status: currentStatus,
      };
    });

    return NextResponse.json({
      success: true,
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("❌ [Admin List Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve verifications", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/verifications
 * Create new verified seller accreditation record
 */
export async function POST(req: NextRequest) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.authenticated) {
      return NextResponse.json({ success: false, message: auth.error }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { sellerName, businessName, email, city, website, expiryDate, customId } = body;

    // Validation
    if (!sellerName || !businessName || !email || !city || !expiryDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (sellerName, businessName, email, city, expiryDate)",
        },
        { status: 400 }
      );
    }

    // Determine ID
    let verificationId = customId ? customId.trim().toUpperCase() : await generateVerificationId();

    // Check duplicate
    const existing = await Verification.findOne({ verificationId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Verification ID ${verificationId} already exists` },
        { status: 409 }
      );
    }

    const newRecord = await Verification.create({
      verificationId,
      sellerName: sellerName.trim(),
      businessName: businessName.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      website: website ? website.trim() : "",
      status: "ACTIVE",
      expiryDate: new Date(expiryDate),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Seller verification created successfully",
        data: newRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ [Admin Create Error]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create verification", error: error.message },
      { status: 500 }
    );
  }
}
