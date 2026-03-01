"use client";

import { useState, useEffect, useCallback } from "react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: string;
  requests: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  no_show: "bg-amber-100 text-amber-800",
  completed: "bg-blue-100 text-blue-800",
};

const statusLabels: Record<string, string> = {
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  no_show: "No Show",
  completed: "Completed",
};

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${day}`;
}

function toLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ReservationDashboard() {
  const [date, setDate] = useState(() => toLocalDateString(new Date()));
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const password =
    typeof window !== "undefined"
      ? sessionStorage.getItem("admin-password") || ""
      : "";

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reservations?date=${date}`, {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
    } finally {
      setLoading(false);
    }
  }, [date, password]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
    setMenuOpenId(null);
  };

  const shiftDate = (days: number) => {
    const d = new Date(date + "T12:00:00");
    d.setDate(d.getDate() + days);
    setDate(toLocalDateString(d));
  };

  const active = reservations.filter((r) => r.status !== "cancelled");
  const cancelled = reservations.filter((r) => r.status === "cancelled");
  const totalCovers = active.reduce((sum, r) => {
    const size = parseInt(r.party_size) || 0;
    return sum + size;
  }, 0);

  const isToday = date === toLocalDateString(new Date());

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-didot text-2xl text-[#2a3d3a] sm:text-3xl">
            Reservations
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => shiftDate(-1)}
              className="rounded px-2 py-1 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900"
            >
              &larr;
            </button>
            <button
              onClick={() => setDate(toLocalDateString(new Date()))}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                isToday
                  ? "bg-[#2a3d3a] text-white"
                  : "text-neutral-600 hover:bg-white"
              }`}
            >
              Today
            </button>
            <span className="min-w-[120px] text-center text-sm text-neutral-700">
              {formatDateDisplay(date)}
            </span>
            <button
              onClick={() => shiftDate(1)}
              className="rounded px-2 py-1 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900"
            >
              &rarr;
            </button>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ml-2 rounded border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-700"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4 text-sm text-neutral-600">
          <span>
            <strong className="text-[#2a3d3a]">{active.length}</strong>{" "}
            reservation{active.length !== 1 ? "s" : ""}
          </span>
          <span>&middot;</span>
          <span>
            <strong className="text-[#2a3d3a]">{totalCovers}</strong> covers
          </span>
          {cancelled.length > 0 && (
            <>
              <span>&middot;</span>
              <span>
                <strong className="text-red-600">{cancelled.length}</strong>{" "}
                cancellation{cancelled.length !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-20 text-center text-neutral-400">Loading...</div>
        ) : reservations.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">
            No reservations for this date.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="border-b border-neutral-100 last:border-b-0"
              >
                {/* Main row */}
                <div
                  className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-neutral-50 sm:px-6"
                  onClick={() =>
                    setExpandedId(expandedId === r.id ? null : r.id)
                  }
                >
                  <span className="w-20 shrink-0 text-sm font-medium text-[#2a3d3a]">
                    {r.time}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-neutral-800">
                    {r.name}
                  </span>
                  <span className="shrink-0 text-sm text-neutral-500">
                    {r.party_size}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusColors[r.status] || "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {statusLabels[r.status] || r.status}
                  </span>
                  {/* Action menu */}
                  <div className="relative shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === r.id ? null : r.id);
                      }}
                      className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    >
                      &hellip;
                    </button>
                    {menuOpenId === r.id && (
                      <div className="absolute right-0 top-8 z-10 w-40 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                        {r.status !== "confirmed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(r.id, "confirmed");
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            Confirm
                          </button>
                        )}
                        {r.status !== "completed" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(r.id, "completed");
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            Completed
                          </button>
                        )}
                        {r.status !== "no_show" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(r.id, "no_show");
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            No Show
                          </button>
                        )}
                        {r.status !== "cancelled" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(r.id, "cancelled");
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {expandedId === r.id && (
                  <div className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-3 sm:px-6">
                    <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
                      <div>
                        <span className="text-neutral-400">Phone: </span>
                        <a
                          href={`tel:${r.phone}`}
                          className="text-[#2a3d3a] underline"
                        >
                          {r.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-400">Email: </span>
                        <a
                          href={`mailto:${r.email}`}
                          className="text-[#2a3d3a] underline"
                        >
                          {r.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-400">Booked: </span>
                        <span className="text-neutral-600">
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {r.requests && (
                      <div className="mt-2 text-sm">
                        <span className="text-neutral-400">Requests: </span>
                        <span className="text-neutral-700">{r.requests}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
