"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, surname, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong — try again?");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong — try again?");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 p-5 text-center">
        <p className="text-2xl" aria-hidden>
          🎉
        </p>
        <p className="mt-2 font-bold text-gray-900">You&apos;re on the list!</p>
        <p className="mt-1 text-sm text-gray-600">
          Look out for the first newsletter next month.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-400 focus:outline-none"
        />
        <input
          type="text"
          required
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-400 focus:outline-none"
        />
      </div>
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-400 focus:outline-none"
      />
      {status === "error" ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95 disabled:opacity-60"
      >
        {status === "loading" ? "Signing up…" : "Sign me up"}
      </button>
    </form>
  );
}
