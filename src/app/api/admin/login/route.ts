import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@wisteriatrust.com";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET || "wisteria_sovereign_trust_jwt_secret_key_2026";

    // Validate email
    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Validate password (support both hash compare and fallback during initial setup)
    let isMatch = false;
    if (adminPasswordHash) {
      isMatch = await bcrypt.compare(password, adminPasswordHash);
    } else {
      // Fallback default for development
      isMatch = password === "Admin@123";
    }

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Issue JWT
    const token = jwt.sign(
      { role: "admin", email: adminEmail.trim().toLowerCase() },
      jwtSecret,
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (error: any) {
    console.error("❌ [Admin Login Error]:", error);
    return NextResponse.json(
      { success: false, message: "Internal authentication error", error: error.message },
      { status: 500 }
    );
  }
}
