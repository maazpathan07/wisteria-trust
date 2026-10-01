import Verification from "@/models/Verification";
import connectDB from "./db";

/**
 * Generates a collision-safe, sequential Verification ID (e.g., WT-2026-0001)
 */
export async function generateVerificationId(targetYear?: number): Promise<string> {
  await connectDB();

  const year = targetYear || new Date().getFullYear();
  const yearPrefix = `WT-${year}-`;

  // Find the highest existing ID for the given year using regex prefix
  const highestRecord = await Verification.findOne({
    verificationId: { $regex: `^${yearPrefix}` },
  })
    .sort({ verificationId: -1 })
    .collation({ locale: "en", numericOrdering: true })
    .select("verificationId")
    .lean();

  let nextSequence = 1;

  if (highestRecord && highestRecord.verificationId) {
    const parts = highestRecord.verificationId.split("-");
    if (parts.length === 3) {
      const parsedNum = parseInt(parts[2], 10);
      if (!isNaN(parsedNum)) {
        nextSequence = parsedNum + 1;
      }
    }
  }

  // Format as 4-digit zero-padded number (e.g., 0001, 0002)
  const paddedSeq = String(nextSequence).padStart(4, "0");
  const newId = `${yearPrefix}${paddedSeq}`;

  // Double check uniqueness just in case
  const exists = await Verification.exists({ verificationId: newId });
  if (exists) {
    const fallbackSeq = String(nextSequence + 1).padStart(4, "0");
    return `${yearPrefix}${fallbackSeq}`;
  }

  return newId;
}

export default generateVerificationId;
