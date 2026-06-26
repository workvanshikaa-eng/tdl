/**
 * Generate a readable, reasonably strong random password.
 * Avoids ambiguous characters (0/O, 1/l/I). Works in the browser and Node.
 */
export function randomPassword(length = 14): string {
  const chars =
    "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < length; i++) out += chars[arr[i] % chars.length];
  return out;
}
