import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
    return NextResponse.json({ ok: true, bookings: rows });
  } catch (error) {
    console.error("[admin/bookings] list failed:", error);
    return NextResponse.json({ ok: true, bookings: [] });
  }
}
