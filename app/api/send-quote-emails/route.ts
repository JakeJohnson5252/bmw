import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    } = await req.json();

    // 1️⃣ Email to BUSINESS
    await resend.emails.send({
      from: "B&M Landscaping <onboarding@resend.dev>",
      to: ["contact@bmlandscaping.com"],
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 2️⃣ Confirmation to CUSTOMER
    await resend.emails.send({
      from: "B&M Landscaping <onboarding@resend.dev>",
      to: [email],
      subject: "We received your quote request!",
      html: `
        <h2>Thanks for contacting B&M Landscaping</h2>
        <p>Hi ${firstName},</p>
        <p>We’ve received your request and will reach out shortly.</p>
        <p><strong>Requested Service:</strong> ${service}</p>
        <p>— B&M Landscaping</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
