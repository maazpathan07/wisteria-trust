import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Verification from "@/models/Verification";
import { VerificationStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let rawId = params.id || "";
    // Strip trailing .svg if present
    if (rawId.toLowerCase().endsWith(".svg")) {
      rawId = rawId.slice(0, -4);
    }

    const verificationId = rawId.trim().toUpperCase();

    let status: VerificationStatus | "NOT_FOUND" = "NOT_FOUND";
    let businessName = "Wisteria Trust Registry";

    if (verificationId) {
      try {
        await connectDB();
        const record = await Verification.findOne({ verificationId }).lean();
        if (record) {
          businessName = record.businessName || "Verified Principal";
          status = record.status;
          // Check expiry
          if (status === "ACTIVE" && new Date(record.expiryDate) < new Date()) {
            status = "EXPIRED";
          }
        }
      } catch (dbErr) {
        console.error("❌ [Badge DB Error]:", dbErr);
      }
    }

    // Dynamic Color Schemes based on Status
    let statusBg = "#10b981";
    let statusText = "VERIFIED SELLER";
    let statusGlow = "rgba(16, 185, 129, 0.4)";
    let shieldPath = "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5l-7 7z";

    if (status === "REVOKED") {
      statusBg = "#ef4444";
      statusText = "ACCREDITATION REVOKED";
      statusGlow = "rgba(239, 68, 68, 0.4)";
      shieldPath = "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z M13 8h-2v5h2V8z M13 15h-2v2h2v-2z";
    } else if (status === "EXPIRED") {
      statusBg = "#f59e0b";
      statusText = "ACCREDITATION EXPIRED";
      statusGlow = "rgba(245, 158, 11, 0.4)";
      shieldPath = "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z M12.5 7v5l4 2.4-.75 1.23L11 12.75V7h1.5z";
    } else if (status === "NOT_FOUND") {
      statusBg = "#64748b";
      statusText = "UNREGISTERED ENTITY";
      statusGlow = "rgba(100, 116, 139, 0.3)";
      shieldPath = "M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z M13 8h-2v5h2V8z M13 15h-2v2h2v-2z";
    }

    const safeId = escapeXml(verificationId || "UNVERIFIED");
    const safeName = escapeXml(businessName.length > 24 ? businessName.slice(0, 22) + "..." : businessName);

    // Luxury Dynamic SVG Template (Width: 280, Height: 90)
    const svg = `
<svg width="280" height="90" viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldBorder" x1="0" y1="0" x2="280" y2="90" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ecd177"/>
      <stop offset="0.5" stop-color="#d4af37"/>
      <stop offset="1" stop-color="#8e6d2f"/>
    </linearGradient>
    <linearGradient id="darkCardBg" x1="0" y1="0" x2="280" y2="90" gradientUnits="userSpaceOnUse">
      <stop stop-color="#141820"/>
      <stop offset="1" stop-color="#090a0d"/>
    </linearGradient>
    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <!-- Background Card -->
  <rect x="1.5" y="1.5" width="277" height="87" rx="14" fill="url(#darkCardBg)" stroke="url(#goldBorder)" stroke-width="1.5" filter="url(#badgeShadow)"/>

  <!-- Left Trust Crest Emblem -->
  <g transform="translate(14, 18)">
    <circle cx="27" cy="27" r="24" fill="#11141a" stroke="url(#goldBorder)" stroke-width="1.2"/>
    <circle cx="27" cy="27" r="21" fill="none" stroke="rgba(197, 160, 89, 0.25)" stroke-dasharray="2 2"/>
    <path d="${shieldPath}" transform="translate(15, 15) scale(1)" fill="${statusBg}"/>
  </g>

  <!-- Right Details -->
  <g transform="translate(76, 20)">
    <!-- Header Title -->
    <text x="0" y="12" fill="#faf9f6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5">
      WISTERIA TRUST
    </text>

    <!-- Business / ID Label -->
    <text x="0" y="27" fill="#9ba7b7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500">
      ${safeName} • <tspan fill="#d4af37" font-weight="700">${safeId}</tspan>
    </text>

    <!-- Dynamic Status Pill -->
    <g transform="translate(0, 36)">
      <rect x="0" y="0" width="186" height="18" rx="9" fill="${statusBg}" fill-opacity="0.14" stroke="${statusBg}" stroke-width="0.8"/>
      <circle cx="9" cy="9" r="3.5" fill="${statusBg}"/>
      <text x="18" y="12.5" fill="${statusBg}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="800" letter-spacing="1">
        ${statusText}
      </text>
    </g>
  </g>
</svg>
`.trim();

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("❌ [Badge Render Error]:", error);
    return new NextResponse("<svg width='280' height='90'><text y='45'>Error</text></svg>", {
      status: 500,
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}
