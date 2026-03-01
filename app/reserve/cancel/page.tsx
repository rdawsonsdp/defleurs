"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CancelContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMsg("No confirmation token provided.");
      return;
    }

    fetch("/api/reservations/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
        } else {
          return res.json().then((data) => {
            throw new Error(data.error || "Failed to cancel reservation");
          });
        }
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err.message);
      });
  }, [token]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f5f0eb] px-[5%]">
      <div className="max-w-md text-center">
        {status === "loading" && (
          <>
            <h1 className="font-didot text-3xl text-[#2a3d3a]">
              Cancelling...
            </h1>
            <p className="mt-4 text-neutral-500">
              Please wait while we process your cancellation.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="font-didot text-3xl text-[#2a3d3a]">
              Reservation Cancelled
            </h1>
            <p className="mt-4 text-neutral-600">
              Your reservation has been cancelled. We hope to see you another
              time.
            </p>
            <a
              href="/reserve"
              className="mt-8 inline-block border border-neutral-900 px-6 py-3 text-xs uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Book Again
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-didot text-3xl text-[#2a3d3a]">
              Unable to Cancel
            </h1>
            <p className="mt-4 text-neutral-600">
              {errorMsg || "This reservation may have already been cancelled."}
            </p>
            <a
              href="/"
              className="mt-8 inline-block border border-neutral-900 px-6 py-3 text-xs uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Return Home
            </a>
          </>
        )}
      </div>
    </section>
  );
}

export default function CancelPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-[#f5f0eb]">
          <p className="text-neutral-400">Loading...</p>
        </section>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
