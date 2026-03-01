import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { confirmationEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  if (!supabaseAdmin || !resend) {
    return NextResponse.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, date, time, partySize, requests } = body;

    if (!name || !email || !phone || !date || !time || !partySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        name,
        email,
        phone,
        date,
        time,
        party_size: partySize,
        requests: requests || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create reservation" },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "The Parlour <reservations@updates.maisonbakery.com>",
        to: email,
        subject: "Your Reservation at The Parlour is Confirmed",
        html: confirmationEmail({
          name,
          email,
          date,
          time,
          party_size: partySize,
          requests,
          confirmation_token: data.confirmation_token,
        }),
      });
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Don't fail the reservation if email fails
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Reservation API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
