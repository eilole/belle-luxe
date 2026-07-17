import { cookies } from "next/headers";
import { createHash } from "crypto";

export const ADMIN_COOKIE = "belle_admin";

/** The salon owner's admin password. Override via ADMIN_PASSWORD env var. */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "belleluxe";
}

/** Deterministic token derived from the password so cookies invalidate if it changes. */
export function adminToken(): string {
  return createHash("sha256")
    .update(`belle-luxe::${adminPassword()}`)
    .digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}
