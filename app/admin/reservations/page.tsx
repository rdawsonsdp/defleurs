"use client";

import { AdminAuth } from "@/components/admin/AdminAuth";
import { ReservationDashboard } from "@/components/admin/ReservationDashboard";

export default function AdminReservationsPage() {
  return (
    <AdminAuth>
      <ReservationDashboard />
    </AdminAuth>
  );
}
