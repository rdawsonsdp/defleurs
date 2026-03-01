import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { reminderEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const { data: reservations, error } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .eq("status", "confirmed")
      .eq("date", tomorrowStr)
      .eq("reminder_sent", false);

    if (error) {
      console.error("Reminder query error:", error);
      return NextResponse.json(
        { error: "Failed to query reservations" },
        { status: 500 }
      );
    }

    let sent = 0;

    for (const reservation of reservations || []) {
      try {
        await resend.emails.send({
          from: "The Parlour <reservations@updates.maisonbakery.com>",
          to: reservation.email,
          subject: "Reminder: Your Reservation Tomorrow at The Parlour",
          html: reminderEmail({
            name: reservation.name,
            email: reservation.email,
            date: reservation.date,
            time: reservation.time,
            party_size: reservation.party_size,
            requests: reservation.requests,
            confirmation_token: reservation.confirmation_token,
          }),
        });

        await supabaseAdmin
          .from("reservations")
          .update({ reminder_sent: true })
          .eq("id", reservation.id);

        sent++;
      } catch (emailErr) {
        console.error(`Failed to send reminder to ${reservation.email}:`, emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      reminders_sent: sent,
      total_found: reservations?.length || 0,
    });
  } catch (err) {
    console.error("Cron reminders error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
