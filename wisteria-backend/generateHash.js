import bcrypt from "bcryptjs";

const email = "admin@wisteriatrust.com";
const password = "Admin@123";

const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);
const isMatch = await bcrypt.compare(password, hash);

console.log("=========================================");
console.log("✅ WISTERIA TRUST ADMIN CREDENTIALS");
console.log("=========================================");
console.log("EMAIL / USERNAME :", email);
console.log("PASSWORD         :", password);
console.log("BCRYPT HASH      :", hash);
console.log("VERIFIED MATCH   :", isMatch ? "YES (100% OK)" : "NO");
console.log("=========================================");
