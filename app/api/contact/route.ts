export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["maiadarshkumar@gmail.com"],
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("CONTACT API ERROR:", error)
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
