/**
 * Edge-safe session constants. Kept free of any Node-only imports
 * (Prisma, bcrypt, next/headers) so middleware can import them.
 */
export const SESSION_COOKIE = "tdl_session";
export const SESSION_DAYS = 7;
