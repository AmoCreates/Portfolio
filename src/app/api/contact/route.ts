import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || "anmolmaurya.in@gmail.com";
    const emailPass = process.env.EMAIL_PASS;

    if (!emailPass) {
      return NextResponse.json(
        {
          error:
            "Email service missing Gmail App Password. Please set EMAIL_PASS in environment variables.",
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email message formatting
    const mailOptions = {
      from: `"${name} (Portfolio Inquiry)" <${emailUser}>`,
      replyTo: email,
      to: emailUser,
      subject: `[Portfolio Inquiry] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #0f172a; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #2563eb, #38bdf8); padding: 24px; text-align: center; color: #ffffff; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 28px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .message-box { background: #f1f5f9; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1e293b; }
            .footer { padding: 16px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>New Portfolio Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Sent directly from your Anmol Maurya Portfolio contact form. Replying to this email will send directly to ${email}.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email via Gmail SMTP
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email transmitted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer Transmit Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send email. Please check server credentials." },
      { status: 500 }
    );
  }
}
