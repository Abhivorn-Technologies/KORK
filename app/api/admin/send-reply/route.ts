import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'To, subject, and body are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'KORK InventRex';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const formattedHtml = `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; margin: 0; font-size: 20px; font-family: Inter, sans-serif;">${siteName}</h2>
          <span style="font-size: 11px; color: #64748b; font-family: Inter, sans-serif;">Client Response Team</span>
        </div>
        
        <div style="font-size: 14px; line-height: 1.6; color: #334155; font-family: Inter, sans-serif; white-space: pre-line;">
          ${body}
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <div style="text-align: center; font-family: Inter, sans-serif;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">This email was sent securely from the KORK administration dashboard.</p>
          <p style="margin: 8px 0 0 0;"><a href="${siteUrl}" style="color: #06B6D4; text-decoration: none; font-size: 11px; font-weight: bold;">Visit KORK Website &rarr;</a></p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${siteName} Support" <${process.env.EMAIL_USER || 'support@korkinventrex.com'}>`,
      to,
      subject,
      html: formattedHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email reply:', error);
    return NextResponse.json({ error: error.message || 'Failed to dispatch email.' }, { status: 500 });
  }
}
