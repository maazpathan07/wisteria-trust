import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  role: "admin";
  email: string;
}

export function verifyAdminAuth(req: NextRequest): { authenticated: boolean; error?: string; user?: TokenPayload } {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authenticated: false, error: "Missing or invalid authorization token" };
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("❌ JWT_SECRET is not defined in environment variables");
    return { authenticated: false, error: "Authentication service misconfiguration" };
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    if (decoded.role !== "admin") {
      return { authenticated: false, error: "Insufficient administrator permissions" };
    }
    return { authenticated: true, user: decoded };
  } catch (err: any) {
    return { authenticated: false, error: "Invalid or expired session token" };
  }
}
