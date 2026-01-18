"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ManaBackground from "./ManaBackground";

function Modal({
  open,
  title,
  subtitle,
  onClose,
  submitLabel,
  children,
  onSubmit,
  submitted,
  successMessage,
  errorMessage,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
  submitLabel: string;
  children?: React.ReactNode;
  onSubmit?: (data: ContactPayload) => Promise<void> | void;
  submitted?: boolean;
  successMessage?: string;
  errorMessage?: string | null;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:items-center sm:px-5">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0C0F1D] shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:rounded-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(500px_240px_at_0%_0%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(460px_260px_at_100%_0%,rgba(120,160,255,0.12),transparent_60%)]" />
        <div className="relative p-5 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xl font-semibold text-white">{title}</div>
              <div className="mt-1 text-sm text-white/55">{subtitle}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-white/70 hover:bg-white/10"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="mt-6">
              <div className="text-sm text-white/70">
                {successMessage ?? "Thanks! We will be in touch shortly."}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 h-12 w-full rounded-2xl bg-white text-sm font-semibold text-black hover:bg-white/90"
              >
                Close
              </button>
            </div>
          ) : (
            children ?? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formEl = e.currentTarget;
                  const formData = new FormData(formEl);
                  const academyName = String(
                    formData.get("academy_name") || ""
                  );
                  const contactName = String(
                    formData.get("contact_name") || ""
                  );
                  const phone = String(formData.get("phone") || "");
                  const website = String(formData.get("website") || "");
                  const email = String(formData.get("email") || "");
                  const form = String(formData.get("form") || "");
                  const message = [
                    `Academy: ${academyName}`,
                    `Contact: ${contactName}`,
                    `Email: ${email}`,
                    phone ? `Phone: ${phone}` : null,
                    website ? `Website: ${website}` : null,
                  ]
                    .filter(Boolean)
                    .join("\n");

                  const payload: ContactPayload = {
                    name: academyName,
                    email,
                    message,
                    form,
                    academyName,
                    contactName,
                    phone,
                    website,
                  };
                  onSubmit?.(payload);
                }}
                className="mt-5 space-y-3 sm:mt-6 sm:space-y-4"
              >
                <label className="block">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    Academy name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Academy name"
                    name="academy_name"
                    className="mt-2 h-10 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/35 outline-none focus:border-white/25 sm:h-11 sm:text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    Your name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    name="contact_name"
                    className="mt-2 h-10 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/35 outline-none focus:border-white/25 sm:h-11 sm:text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@academy.com"
                    name="email"
                    className="mt-2 h-10 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/35 outline-none focus:border-white/25 sm:h-11 sm:text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    Phone
                  </span>
                  <input
                    type="tel"
                    placeholder="+46..."
                    name="phone"
                    className="mt-2 h-10 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/35 outline-none focus:border-white/25 sm:h-11 sm:text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-white/55">
                    Website (optional)
                  </span>
                  <input
                    type="text"
                    placeholder="academy.com"
                    name="website"
                    className="mt-2 h-10 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/35 outline-none focus:border-white/25 sm:h-11 sm:text-sm"
                  />
                </label>
                <input type="hidden" name="form" value={title} />

                {errorMessage && (
                  <div className="text-xs text-red-300">{errorMessage}</div>
                )}

                <button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-2xl bg-white text-sm font-semibold text-black hover:bg-white/90 sm:h-12"
                >
                  {submitLabel}
                </button>
          </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  form: string;
  academyName: string;
  contactName: string;
  phone: string;
  website: string;
};

export default function MOVRLanding() {
  const [pilotOpen, setPilotOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [pilotError, setPilotError] = useState<string | null>(null);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  const sendContact = async (payload: ContactPayload) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error || "Request failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-auto text-white">
      <ManaBackground
        accent="rgba(130,90,255,0.42)"
        accent2="rgba(60,210,255,0.16)"
      />

      {/* Top (bara bredare container så allt får plats) */}
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="flex h-16 items-center justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-wide md:text-2xl">
              MOVR
            </span>
            <img
              src="/loggautantext.png"
              alt="MOVR logo"
              className="mt-1 h-5 w-5 scale-200 object-cover object-[50%_65%] md:mt-2 md:h-6 md:w-6 md:scale-250"
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-6 md:pt-10">
        {/* Vi tar bort 2-kol layouten här för att inte tvinga korten smalare */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-balance text-[32px] font-semibold tracking-tight sm:text-[38px] md:text-[60px]"
          >
            More time for athletes. Less administration.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mt-3 text-pretty text-[14px] leading-relaxed text-white/62 md:mt-4 md:text-[15px]"
          >
            Everything academys need to reduce admin — built into one system.
          </motion.p>
        </div>

        {/* ====== TVÅ LÅDOR BREDVID VARANDRA ======
            VÄNSTERKORTET ÄR EXAKT ORÖRT (copy/paste från din kod) */}
        <div className="mt-5 flex flex-col gap-4 md:mt-6 md:flex-row md:items-stretch md:gap-6">
          {/* LEFT CARD (ORÖRD) */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur md:max-w-xl md:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_0%_0%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(500px_300px_at_100%_20%,rgba(120,200,255,0.10),transparent_60%)]" />
            <div className="relative text-base font-semibold text-white/95">
              Everything your academy needs - in one system
            </div>
            <ul className="relative mt-4 flex flex-1 flex-col justify-between space-y-2 text-sm leading-relaxed text-white/75">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Automated payments (direct debit, card & Swish)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Automatic invoicing with built-in reminders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Clear financial overview and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Member and customer management, automated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Booking and attendance in one place</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Real-time statistics and insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Digital access cards via mobile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                <span>Time tracking for staff</span>
              </li>
            </ul>
          </div>

          {/* RIGHT CARD (SAME OUTER SIZE/STYLING) */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur md:max-w-xl md:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_0%_0%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(500px_300px_at_100%_20%,rgba(120,200,255,0.10),transparent_60%)]" />

            <div className="relative flex items-center justify-between">
              <div className="text-sm font-medium text-white/90">
                Product gallery
              </div>
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
              >
                See more
              </button>
            </div>

            {/* Detta gör att kortets höjd inte “drar iväg”. Innehållet scrollar vid behov. */}
            <div className="relative mt-3 max-h-[180px] overflow-y-hidden md:max-h-[260px] md:overflow-y-auto md:pr-1">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:snap-none">
                {[
                  
                  "/screen2.png",
                  "/screen3.png",
                  "/screen4.png",
                  "/screen5.png",
                  "/screen6.png",
                  "/screen7.png",
                  "/screen8.png",
                  "/screen10.png",
                ].map((src) => (
                  <div
                    key={src}
                    className="min-w-[60%] snap-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:min-w-0"
                  >
                    <img
                      src={src}
                      alt="MOVR screen"
                      className="h-24 w-full object-cover sm:h-28 md:h-32"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA (ORÖRD från din kod) */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setPilotSubmitted(false);
              setPilotOpen(true);
            }}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#16275E] via-[#1E2F78] to-[#3F5DDB] px-5 text-sm font-medium text-white shadow-lg shadow-[#1E2F78]/45 hover:from-[#142255] hover:via-[#1A2A6A] hover:to-[#3550C3] sm:w-auto"
          >
            Become a pilot customer (for free)
          </button>

          <button
            type="button"
            onClick={() => {
              setWaitlistSubmitted(false);
              setWaitlistOpen(true);
            }}
            className="group inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-5 text-sm font-medium text-black shadow-lg shadow-black/25 hover:bg-white/90 sm:w-auto"
          >
            Join waitlist
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-16 text-center text-[12px] text-white/38">
          © 2026 MOVR. All rights reserved.
        </div>
      </main>

      <Modal
        open={pilotOpen}
        title="Pilot customer"
        subtitle="Tell us about your academy and we will reach out with next steps."
        submitLabel="Apply for pilot"
        onClose={() => setPilotOpen(false)}
        onSubmit={async (payload) => {
          try {
            setPilotError(null);
            await sendContact({
              ...payload,
              message: "Pilot customer application",
              form: "pilot",
            });
            setPilotSubmitted(true);
          } catch (e) {
            setPilotError(
              e instanceof Error ? e.message : "Failed to send message"
            );
          }
        }}
        submitted={pilotSubmitted}
        successMessage="Thanks! We received your pilot application."
        errorMessage={pilotError}
      />
      <Modal
        open={waitlistOpen}
        title="Join the waitlist"
        subtitle="Be first to hear when we launch and open access."
        submitLabel="Join waitlist"
        onClose={() => setWaitlistOpen(false)}
        onSubmit={async (payload) => {
          try {
            setWaitlistError(null);
            await sendContact({
              ...payload,
              message: "Waitlist signup",
              form: "waitlist",
            });
            setWaitlistSubmitted(true);
          } catch (e) {
            setWaitlistError(
              e instanceof Error ? e.message : "Failed to send message"
            );
          }
        }}
        submitted={waitlistSubmitted}
        successMessage="Thanks! You're on the waitlist."
        errorMessage={waitlistError}
      />
      {galleryOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setGalleryOpen(false)}
          />
          <div className="relative z-10">
            <button
              type="button"
              onClick={() => setGalleryOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20"
            >
              Close
            </button>
            <div className="flex h-full w-full items-start pt-8">
              <div className="mx-auto w-full max-w-6xl px-5">
                <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
                {[
                  "/screen2.png",
                
                  
                  "/screen3.png",
                  "/screen4.png",
                  "/screen5.png",
                  "/screen6.png",
                  "/screen7.png",
                  "/screen8.png",
                  "/screen10.png",
                ].map((src) => (
                  <div
                    key={src}
                    className="w-full min-w-full snap-center overflow-hidden rounded-3xl border border-white/10 bg-[#07070B]"
                  >
                    <img
                      src={src}
                      alt="MOVR screen"
                      className="h-[92vh] w-full object-contain"
                    />
                  </div>
                ))}
                </div>
                <div className="text-center text-xs text-white/50">
                  Swipe to view more
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
