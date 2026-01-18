import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      message,
      form,
      academyName,
      contactName,
      phone,
      website,
    } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const payload = {
      from: "Movr <noreply@movrlabs.io>",
      to: ["tomas@movrlabs.io", "samed@movrlabs.io"],
      reply_to: email,
      subject: `New contact form (${form || "website"})`,
      html: `
        <strong>ACADEMY NAME:</strong> ${String(
          academyName || name || ""
        )}<br/>
        <strong>YOUR NAME:</strong> ${String(contactName || "")}<br/>
        <strong>EMAIL:</strong> ${String(email || "")}<br/>
        <strong>PHONE:</strong> ${String(phone || "")}<br/>
        <strong>WEBSITE:</strong> ${String(website || "")}<br/><br/>
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
      return NextResponse.json(
        {
          ok: false,
          error: `Resend error (${res.status}): ${errText}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
