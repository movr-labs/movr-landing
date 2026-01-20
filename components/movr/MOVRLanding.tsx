"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
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
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-white/70 hover:bg-white/10 cursor-pointer"
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
  const headline = "More time for athletes.\nLess administration.";
  const [pilotOpen, setPilotOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [appPreviewOpen, setAppPreviewOpen] = useState(false);
  const [webPreviewOpen, setWebPreviewOpen] = useState(false);
  const [pilotSubmitted, setPilotSubmitted] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [pilotError, setPilotError] = useState<string | null>(null);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  
  useEffect(() => {
    if (!appPreviewOpen && !webPreviewOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAppPreviewOpen(false);
        setWebPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [appPreviewOpen, webPreviewOpen]);

  useEffect(() => {
    let index = 0;
    setTypedText("");
    setTypingDone(false);

    const interval = setInterval(() => {
      index += 1;
      setTypedText(headline.slice(0, index));
      if (index >= headline.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [headline]);

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

  const featureBullets = [
    "Automated payments (direct debit, card & Swish)",
    "Automatic invoicing with built-in reminders",
    "Clear financial overview and reporting",
    "Member and customer management, automated",
    "Booking and attendance in one place",
    "Real-time statistics and insights",
    "Digital access cards via mobile",
    "Time tracking for staff",
  ];
  const appPreviews = [
    "/stitch_payment_summary/campaign_management/h1.png",
    "/stitch_payment_summary/class_schedule/h2.png",
    "/stitch_payment_summary/customer_directory/h3.png",
    
    "/stitch_payment_summary/financial_kpi_overview/h5.png",
    "/stitch_payment_summary/live_insights/h6.png",
    "/stitch_payment_summary/membership_&_access/h7.png",
    "/stitch_payment_summary/payment_summary/h8.png",
    "/stitch_payment_summary/smart_scheduler/h9.png",
    "/stitch_payment_summary/staff_timesheets/h10.png",
  ];
  const webPreviews = [
    "/screen.png",
    "/screen2.png",
    "/screen3.png",
    "/screen4.png",
    "/screen5.png",
    "/screen6.png",
    "/screen7.png",
    "/screen8.png",
  ];

  return (
    <div className="relative min-h-screen overflow-y-auto text-white">
      <ManaBackground
        accent="rgba(130,90,255,0.42)"
        accent2="rgba(60,210,255,0.16)"
      />

      {/* Top (bara bredare container så allt får plats) */}
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="flex h-16 items-center justify-start">
          <img
            src="/loggautantext.png"
            alt="MOVR logo"
            className="h-[5.5em] w-auto object-contain mr-[-1.3em] translate-y-[0.4em]"
          />
          <span className="ml-0 text-xl font-semibold tracking-wide md:text-2xl">
            MOVR
          </span>
        </div>
      </div>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-6 md:pt-14">
        {/* Vi tar bort 2-kol layouten här för att inte tvinga korten smalare */}
        <div className="max-w-3xl">
          <div className="flex min-h-0 flex-col justify-start pt-4 md:min-h-0 md:translate-y-15">
            <motion.h1
              initial={false}
              aria-label={headline}
              className="whitespace-pre-line text-[32px] font-semibold tracking-tight sm:text-[38px] md:text-[60px]"
            >
              <span className="relative block">
                <span className="invisible">{headline}</span>
                <span className="absolute inset-0">
                  {typedText}
                  {!typingDone && (
                    <span className="ml-1 inline-block h-[1em] w-[1px] bg-white/70 align-middle" />
                  )}
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
          </div>
        </div>

        {/* ====== TVÅ LÅDOR BREDVID VARANDRA ======
            VÄNSTERKORTET ÄR EXAKT ORÖRT (copy/paste från din kod) */}
        <div className="md:ml-auto md:max-w-xl md:-translate-y-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-6 flex flex-col gap-8 md:mt-4 md:flex-row md:items-stretch md:gap-12"
          >
            <div className="flex w-full flex-col gap-5">
            {/* LEFT CARD */}
            <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur md:self-start md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_0%_0%,rgba(255,255,255,0.12),transparent_60%),radial-gradient(500px_300px_at_100%_20%,rgba(120,200,255,0.10),transparent_60%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="text-base font-semibold leading-snug text-white/95">
                  <span className="block">Everything your academy</span>
                  <span className="block">needs - in one system</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFeaturesExpanded((prev) => !prev)}
                  className="cursor-pointer inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                >
                  {featuresExpanded ? "See less" : "See more"}
                </button>
              </div>
              <ul className="relative mt-4 flex flex-col space-y-2 text-sm leading-relaxed text-white/75">
                {featureBullets
                  .slice(0, featuresExpanded ? featureBullets.length : 3)
                  .map((text) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-white/70" />
                      <span>{text}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setAppPreviewOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setAppPreviewOpen(true);
                  }
                }}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur cursor-pointer"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(460px_220px_at_0%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-white/90">
                    Preview App
                  </div>
                  <button
                    type="button"
                    onClick={() => setAppPreviewOpen(true)}
                    className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    See more
                  </button>
                </div>
                <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={appPreviews[0]}
                    alt="Preview App"
                    className="h-36 w-full object-cover"
                  />
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setWebPreviewOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setWebPreviewOpen(true);
                  }
                }}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur cursor-pointer"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(460px_220px_at_0%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-white/90">
                    Preview Webb
                  </div>
                  <button
                    type="button"
                    onClick={() => setWebPreviewOpen(true)}
                    className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    See more
                  </button>
                </div>
                <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={webPreviews[0]}
                    alt="Preview Webb"
                    className="h-36 w-full object-cover"
                  />
                </div>
              </div>
            </div>
            </div>
          </motion.div>

        </div>

        {/* CTA (ORÖRD från din kod) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-start md:mr-auto md:max-w-3xl md:-translate-y-[13rem]"
        >
          <button
            type="button"
            onClick={() => {
              setPilotSubmitted(false);
              setPilotOpen(true);
            }}
            className="cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#2F1758] via-[#3C1D7C] to-[#7249F0] px-5 text-[15px] font-medium text-white shadow-lg shadow-[#140A2A]/45 hover:from-[#27134A] hover:via-[#34196A] hover:to-[#6641DB] sm:w-auto"
          >
            Become a pilot customer (for free)
          </button>

          <button
            type="button"
            onClick={() => {
              setWaitlistSubmitted(false);
              setWaitlistOpen(true);
            }}
            className="cursor-pointer group inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-5 text-[15px] font-medium text-black shadow-lg shadow-black/25 hover:bg-white/90 sm:w-auto"
          >
            Join waitlist
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>

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
      {appPreviewOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setAppPreviewOpen(false)}
          />
          <div
            className="relative z-10"
            onClick={() => setAppPreviewOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAppPreviewOpen(false)}
              className="cursor-pointer absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20"
            >
              Close
            </button>
            <div className="flex h-full w-full items-start pt-0">
              <div className="mx-auto w-full max-w-none px-0 md:px-4">
                <div className="flex h-[100svh] w-full gap-6 overflow-x-auto overflow-y-hidden pb-6 pt-1 md:hidden">
                  {appPreviews.map((src, index) => (
                    <div
                      key={src}
                      className="flex w-screen flex-shrink-0 items-center justify-center overflow-hidden"
                    >
                      <div className="flex w-full items-center justify-center px-4">
                        <img
                          src={src}
                          alt="App mockup"
                          onClick={(event) => event.stopPropagation()}
                          className="justify-self-center max-h-[96svh] max-w-[90vw] h-auto w-auto object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden max-h-[92vh] w-full gap-6 overflow-x-auto overflow-y-hidden pb-6 pt-1 md:flex">
                  {appPreviews.map((src, index) => (
                    <div
                      key={src}
                      className="flex h-[92vh] w-screen flex-shrink-0 items-center justify-center overflow-hidden"
                    >
                      <div className="flex w-full items-center justify-center px-6">
                        <img
                          src={src}
                          alt="App mockup"
                          onClick={(event) => event.stopPropagation()}
                          className="justify-self-center max-h-[94vh] max-w-[60vw] h-auto w-auto object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-white/50">
                  Scroll to view more
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {webPreviewOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setWebPreviewOpen(false)}
          />
          <div
            className="relative z-10"
            onClick={() => setWebPreviewOpen(false)}
          >
            <button
              type="button"
              onClick={() => setWebPreviewOpen(false)}
              className="cursor-pointer absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20"
            >
              Close
            </button>
            <div className="flex h-full w-full items-start pt-0">
              <div className="mx-auto w-full max-w-none px-0 md:px-4">
                <div className="flex h-[100svh] w-full gap-6 overflow-x-auto overflow-y-hidden pb-6 pt-1 md:hidden">
                  {webPreviews.map((src, index) => (
                    <div
                      key={src}
                      className="flex w-screen flex-shrink-0 items-center justify-center overflow-hidden"
                    >
                      <div className="flex w-full items-center justify-center px-4">
                        <img
                          src={src}
                          alt="Web mockup"
                          onClick={(event) => event.stopPropagation()}
                          className="justify-self-center max-h-[96svh] max-w-[95vw] h-auto w-auto object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden max-h-[92vh] w-full gap-6 overflow-x-auto overflow-y-hidden pb-6 pt-1 md:flex">
                  {webPreviews.map((src, index) => (
                    <div
                      key={src}
                      className="flex h-[92vh] w-screen flex-shrink-0 items-center justify-center overflow-hidden"
                    >
                      <div className="flex w-full items-center justify-center px-6">
                        <img
                          src={src}
                          alt="Web mockup"
                          onClick={(event) => event.stopPropagation()}
                          className="justify-self-center max-h-[94vh] max-w-[86vw] h-auto w-auto object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-white/50">
                  Scroll to view more
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
