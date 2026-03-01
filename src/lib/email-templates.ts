interface ReservationData {
  name: string;
  email: string;
  date: string;
  time: string;
  party_size: string;
  requests?: string;
  confirmation_token: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function formatDateReadable(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${year}`;
}

export function confirmationEmail(reservation: ReservationData): string {
  const cancelUrl = `${BASE_URL}/reserve/cancel?token=${reservation.confirmation_token}`;
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=18601+Dixie+Hwy+Homewood+IL";
  const dateFormatted = formatDateReadable(reservation.date);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background-color:#2a3d3a;padding:40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:normal;letter-spacing:2px;">The Parlour</h1>
          <p style="color:#c8b8a0;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:12px 0 0;">at Maison</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="color:#2a3d3a;font-size:22px;font-weight:normal;margin:0 0 8px;font-style:italic;">Your reservation is confirmed.</h2>
          <p style="color:#666;font-size:15px;margin:0 0 30px;">Thank you, ${reservation.name}. We look forward to welcoming you.</p>

          <!-- Details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e0db;border-radius:4px;margin-bottom:24px;">
            <tr>
              <td style="padding:20px;border-right:1px solid #e5e0db;text-align:center;width:33%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Date</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${dateFormatted}</p>
              </td>
              <td style="padding:20px;border-right:1px solid #e5e0db;text-align:center;width:33%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Time</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${reservation.time}</p>
              </td>
              <td style="padding:20px;text-align:center;width:34%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Guests</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${reservation.party_size}</p>
              </td>
            </tr>
          </table>

          ${reservation.requests ? `<p style="color:#666;font-size:13px;margin:0 0 24px;"><strong style="color:#2a3d3a;">Special Requests:</strong> ${reservation.requests}</p>` : ""}

          <!-- Directions -->
          <a href="${directionsUrl}" style="display:block;text-align:center;padding:14px;border:1px solid #e5e0db;border-radius:4px;color:#2a3d3a;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">
            Get Directions
          </a>

          <!-- Cancel -->
          <a href="${cancelUrl}" style="display:block;text-align:center;color:#999;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            Cancel Reservation
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#faf8f5;padding:24px 40px;text-align:center;border-top:1px solid #e5e0db;">
          <p style="color:#999;font-size:12px;margin:0;">18601 Dixie Hwy, Homewood, IL 60430</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function reminderEmail(reservation: ReservationData): string {
  const cancelUrl = `${BASE_URL}/reserve/cancel?token=${reservation.confirmation_token}`;
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=18601+Dixie+Hwy+Homewood+IL";
  const dateFormatted = formatDateReadable(reservation.date);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0eb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:4px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background-color:#2a3d3a;padding:40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:normal;letter-spacing:2px;">The Parlour</h1>
          <p style="color:#c8b8a0;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:12px 0 0;">at Maison</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="color:#2a3d3a;font-size:22px;font-weight:normal;margin:0 0 8px;font-style:italic;">Your reservation is tomorrow.</h2>
          <p style="color:#666;font-size:15px;margin:0 0 30px;">Just a friendly reminder, ${reservation.name} &mdash; we'll see you soon.</p>

          <!-- Details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e0db;border-radius:4px;margin-bottom:24px;">
            <tr>
              <td style="padding:20px;border-right:1px solid #e5e0db;text-align:center;width:33%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Date</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${dateFormatted}</p>
              </td>
              <td style="padding:20px;border-right:1px solid #e5e0db;text-align:center;width:33%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Time</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${reservation.time}</p>
              </td>
              <td style="padding:20px;text-align:center;width:34%;">
                <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Guests</p>
                <p style="color:#2a3d3a;font-size:14px;margin:0;">${reservation.party_size}</p>
              </td>
            </tr>
          </table>

          <!-- Directions -->
          <a href="${directionsUrl}" style="display:block;text-align:center;padding:14px;border:1px solid #e5e0db;border-radius:4px;color:#2a3d3a;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">
            Get Directions
          </a>

          <!-- Cancel -->
          <a href="${cancelUrl}" style="display:block;text-align:center;color:#999;text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            Need to Cancel?
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#faf8f5;padding:24px 40px;text-align:center;border-top:1px solid #e5e0db;">
          <p style="color:#999;font-size:12px;margin:0;">18601 Dixie Hwy, Homewood, IL 60430</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
