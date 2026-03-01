import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  let query = supabaseAdmin
    .from("reservations")
    .select("*")
    .order("time", { ascending: true });

  if (date) {
    query = query.eq("date", date);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Admin reservations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
