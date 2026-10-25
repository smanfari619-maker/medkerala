import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/config';

// In-memory cache to debounce spam clicks from the same IP/session within 2 minutes
const recentClicks = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      page = 'Unknown page',
      topic = 'General WhatsApp Inquiry',
      buttonText = 'WhatsApp CTA',
      referrer = 'Direct / None',
      timestamp = new Date().toISOString(),
    } = body;

    // Get client identifier for basic debouncing (2 minutes window)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
    const userAgent = req.headers.get('user-agent') || 'Unknown device';
    const debounceKey = `${ip}-${topic}`;
    const now = Date.now();
    const lastClickTime = recentClicks.get(debounceKey);

    if (lastClickTime && now - lastClickTime < 120_000) {
      // Already sent an alert for this IP and topic within 2 minutes; return 200 without sending duplicate email
      return NextResponse.json({ success: true, debounced: true });
    }
    recentClicks.set(debounceKey, now);

    // Clean up memory map periodically
    if (recentClicks.size > 200) {
      for (const [k, v] of recentClicks.entries()) {
        if (now - v > 300_000) recentClicks.delete(k);
      }
    }

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      const host = process.env.SMTP_HOST || 'smtp.gmail.com';
      const port = parseInt(process.env.SMTP_PORT || '465');
      const secure = port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const clickTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const mailOptions = {
        from: `"TreatInKerala Alerts" <${smtpUser}>`,
        to: SITE_CONFIG.email,
        subject: `⚡ WhatsApp Click Alert: Visitor interested in "${topic}"`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1B4332 0%, #25D366 100%); padding: 24px; text-align: center; color: white;">
              <span style="font-size: 32px; display: block; margin-bottom: 8px;">⚡💬</span>
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">New WhatsApp Click Alert!</h2>
              <p style="margin: 6px 0 0; font-size: 13px; color: #f0fdf4; opacity: 0.95;">A potential patient just tapped your WhatsApp chat link.</p>
            </div>

            <!-- Content Body -->
            <div style="padding: 24px; background-color: #FAF7F2;">
              <div style="background: white; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 130px;">Interest / Topic:</td>
                    <td style="padding: 8px 0; font-weight: 700; color: #1B4332; font-size: 14px;">${topic}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; border-top: 1px solid #f1f5f9;">Button Clicked:</td>
                    <td style="padding: 8px 0; color: #334155; border-top: 1px solid #f1f5f9;">${buttonText}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; border-top: 1px solid #f1f5f9;">Page Viewed:</td>
                    <td style="padding: 8px 0; border-top: 1px solid #f1f5f9;">
                      <a href="${page}" target="_blank" style="color: #2D6A4F; text-decoration: underline; word-break: break-all;">${page}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; border-top: 1px solid #f1f5f9;">Indian Time (IST):</td>
                    <td style="padding: 8px 0; color: #334155; border-top: 1px solid #f1f5f9; font-weight: 600;">${clickTime} IST</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; border-top: 1px solid #f1f5f9;">Device / Platform:</td>
                    <td style="padding: 8px 0; color: #64748b; border-top: 1px solid #f1f5f9; font-size: 12px;">${userAgent.slice(0, 90)}...</td>
                  </tr>
                </table>
              </div>

              <!-- Action Card -->
              <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 16px; text-align: center;">
                <p style="margin: 0 0 12px; font-size: 13px; color: #065F46; font-weight: 600;">
                  Check your WhatsApp (${SITE_CONFIG.phone}) for incoming patient messages or medical scans.
                </p>
                <a href="https://wa.me/${SITE_CONFIG.whatsappRaw}" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 10px 22px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13px; box-shadow: 0 2px 8px rgba(37,211,102,0.35);">
                  Open WhatsApp Chat Desk
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              TreatInKerala Real-Time Lead Alerts • treatinkerala.com
            </div>
          </div>
        `,
      };

      // Send mail asynchronously without blocking response
      transporter.sendMail(mailOptions).catch((err) => {
        console.error('Failed to send WhatsApp click email alert:', err);
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error handling WhatsApp click alert:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
