const crypto = require("crypto");

function gen() {
  return crypto.randomBytes(32).toString("base64");
}

console.log("\n=== GENERATED STRAPI KEYS ===\n");

console.log(`APP_KEYS=${gen()},${gen()},${gen()},${gen()}`);
console.log(`API_TOKEN_SALT=${gen()}`);
console.log(`TRANSFER_TOKEN_SALT=${gen()}`);
console.log(`ADMIN_JWT_SECRET=${gen()}`);
console.log(`JWT_SECRET=${gen()}`);

console.log("\n==============================\n");
