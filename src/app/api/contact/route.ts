import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message, form } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const payload = {
      from: "Movr <onboarding@resend.dev>",
      to: ["tomas@movrlabs.io", "samed@movrlabs.io"],
      reply_to: email,
      subject: `New contact form (${form || "website"})`,
      html: `
        <strong>Name:</strong> ${String(name || "")}<br/>
        <strong>Email:</strong> ${String(email || "")}<br/><br/>
        <strong>Message:</strong><br/>
        ${String(message || "")}
      `,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ ok: false, error: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
