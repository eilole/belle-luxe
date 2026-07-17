import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { SERVICES, TIME_SLOTS } from "@/lib/services";

async function ensureTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id serial PRIMARY KEY,
      name varchar(120) NOT NULL,
      phone varchar(40) NOT NULL,
      service varchar(60) NOT NULL,
      preferred_date varchar(20) NOT NULL,
      preferred_time varchar(20) NOT NULL,
      notes text,
      status varchar(20) NOT NULL DEFAULT 'pending',
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 40);
    const service = clean(body.service, 60);
    const preferredDate = clean(body.date, 20);
    const preferredTime = clean(body.time, 20);
    const notes = clean(body.notes, 800);

    const validService =
      SERVICES.some((s) => s.id === service) ||
      service === "bridal" ||
      service === "consultation";

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Please share your name.";
    if (!/^[+\d][\d\s()-]{6,19}$/.test(phone))
      errors.phone = "Please share a valid phone / WhatsApp number.";
    if (!validService) errors.service = "Please choose a service.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate))
      errors.date = "Please pick a date.";
    if (!TIME_SLOTS.includes(preferredTime))
      errors.time = "Please pick a time slot.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    const values = { name, phone, service, preferredDate, preferredTime, notes };

    try {
      await db.insert(bookings).values(values);
    } catch {
      // Table may not exist yet in a fresh environment — create and retry once.
      await ensureTable();
      await db.insert(bookings).values(values);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[bookings] failed to store booking:", error);
    return NextResponse.json(
      { ok: false, error: "We could not save your request right now." },
      { status: 500 },
    );
  }
}
