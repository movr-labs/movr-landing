import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, form } = await req.json();

  await resend.emails.send({
    from: "Movr <onboarding@resend.dev>",
    to: ["tomas@movrlabs.io", "samed@movrlabs.io"],
    replyTo: email,
    subject: \`New contact form (\${form || "website"})\`,
    html: \`
      <strong>Name:</strong> \${name}<br/>
      <strong>Email:</strong> \${email}<br/><br/>
      <strong>Message:</strong><br/>
      \${message}
    \`,
  });

  return NextResponse.json({ ok: true });
}
