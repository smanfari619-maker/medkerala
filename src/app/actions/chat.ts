'use server';

import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/config';

export interface ChatAttachment {
  filename: string;
  content: string; // base64 string
  contentType: string;
}

export interface ChatLeadData {
  name: string;
  email: string;
  phone?: string;
  treatmentInterest?: string;
  healthCondition?: string;
  chatTranscript?: Array<{ role: 'user' | 'assistant'; content: string }>;
  attachments?: ChatAttachment[];
}

export async function submitChatLead(data: ChatLeadData) {
  try {
    const referenceId = `MK-CHAT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    
    console.log('[Chat Lead Captured]', JSON.stringify({ referenceId, name: data.name, email: data.email, attachmentCount: data.attachments?.length || 0 }, null, 2));

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn('[Chat Email Warning] SMTP credentials not set in .env.local');
      return { success: true, referenceId, emailSent: false };
    }

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

    // Process attachments for Nodemailer
    const mailAttachments = data.attachments && data.attachments.length > 0
      ? data.attachments.map(att => ({
          filename: att.filename,
          content: Buffer.from(att.content, 'base64'),
          contentType: att.contentType,
        }))
      : [];

    // Format transcript for admin email
    const transcriptHtml = data.chatTranscript && data.chatTranscript.length > 0
      ? data.chatTranscript.map(m => `
        <div style="margin-bottom: 8px; padding: 8px 12px; border-radius: 8px; ${m.role === 'user' ? 'background: #E8F5E9; text-align: right;' : 'background: #F0F4F8;'}">
          <strong style="color: ${m.role === 'user' ? '#2E7D32' : '#1565C0'}; font-size: 11px; text-transform: uppercase;">
            ${m.role === 'user' ? 'Patient' : 'Maya (AI Facilitator)'}:
          </strong>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #222;">${m.content}</p>
        </div>
      `).join('')
      : '<em>No transcript recorded.</em>';

    // Email 1: Notification to Admin (treatinkerala@gmail.com)
    const adminMailOptions = {
      from: `"TreatInKerala AI LiveChat" <${smtpUser}>`,
      to: SITE_CONFIG.email || 'treatinkerala@gmail.com',
      subject: `${mailAttachments.length > 0 ? '📎 [Medical Report Attached] ' : ''}🔥 Hot AI Chat Lead - [${referenceId}] from ${data.name || 'Website Visitor'}`,
      attachments: mailAttachments,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 650px; margin: 0 auto; border: 1px solid #D4A96A; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">New Patient Lead Captured via AI Chat</h2>
            <span style="font-size: 12px; color: #BAD7B0; font-weight: bold; background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 6px; display: inline-block; margin-top: 8px;">Ref ID: ${referenceId}</span>
          </div>

          <div style="padding: 24px; background-color: #FAF7F2;">
            <h3 style="color: #1B4332; font-size: 15px; border-bottom: 2px solid #D4A96A; padding-bottom: 6px; margin-top: 0;">Patient Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0; width: 140px; color: #4A5C52;">Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1B4332; font-weight: bold;">${data.name || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #2D6A4F; font-weight: 600; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Phone / WhatsApp:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 14px;">${data.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Treatment Interest:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1B4332;">${data.treatmentInterest || 'General Medical Facilitation'}</td>
              </tr>
              ${mailAttachments.length > 0 ? `
              <tr>
                <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Attached Files:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #2E7D32; font-weight: bold;">
                  📎 ${data.attachments?.map(a => a.filename).join(', ')} (Attached to this email)
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #4A5C52; vertical-align: top;">Health Concern:</td>
                <td style="padding: 8px; color: #333; line-height: 1.5; font-style: italic;">${data.healthCondition || 'Not specified in form'}</td>
              </tr>
            </table>

            ${data.phone ? `
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" target="_blank" style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px; box-shadow: 0 4px 10px rgba(37,211,102,0.3);">
                  💬 Contact Patient on WhatsApp
                </a>
              </div>
            ` : ''}

            <h3 style="color: #1B4332; font-size: 15px; border-bottom: 2px solid #D4A96A; padding-bottom: 6px; margin-top: 24px;">AI Chat Conversation History</h3>
            <div style="background: #FFF; padding: 14px; border-radius: 8px; border: 1px solid #E2E8F0; max-height: 350px; overflow-y: auto;">
              ${transcriptHtml}
            </div>
          </div>

          <div style="background-color: #F4F6F5; padding: 14px; text-align: center; font-size: 11px; color: #84948B; border-top: 1px solid #e2e8f0;">
            Captured on ${new Date().toLocaleString()} | TreatInKerala AI Facilitator System
          </div>
        </div>
      `,
    };

    // Email 2: Thoughtful Welcome & Care Guide Email to Patient
    const patientMailOptions = {
      from: `"Maya from TreatInKerala Care" <${smtpUser}>`,
      to: data.email,
      subject: `Warm Greetings from Kerala! Your Treatment Consultation Details [${referenceId}]`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #2C3E35; max-width: 620px; margin: 0 auto; border: 1px solid #D4A96A; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); padding: 32px 20px; text-align: center; color: white; border-bottom: 4px solid #D4A96A;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 500; letter-spacing: -0.5px;">TreatInKerala</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #BAD7B0; letter-spacing: 1.2px; text-transform: uppercase;">World-Class Healthcare & Authentic Ayurveda in God's Own Country</p>
          </div>

          <!-- Body Content -->
          <div style="padding: 32px; background-color: #FAF7F2;">
            <h2 style="color: #1B4332; font-size: 19px; margin-top: 0; font-weight: bold;">Dear ${data.name || 'Valued Guest'},</h2>

            <p style="margin-bottom: 20px; font-weight: 400; font-size: 15px; color: #2C3E35;">
              Thank you for chatting with me on <strong>TreatInKerala</strong>! I have passed your medical requirements and details to our patient care team here in Calicut, Kerala. Our team will coordinate with top accredited partner hospitals and send you a custom quotation within 24 hours.
            </p>

            <div style="background: #FFFFFF; border-left: 4px solid #D4A96A; padding: 16px 20px; border-radius: 0 12px 12px 0; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <h4 style="margin: 0 0 6px 0; color: #1B4332; font-size: 14px; font-weight: bold;">Summary of Your Consultation Request:</h4>
              <ul style="margin: 0; padding-left: 18px; color: #4A5C52; font-size: 14px;">
                <li><strong>Ref ID:</strong> ${referenceId}</li>
                <li><strong>Treatment Category:</strong> ${data.treatmentInterest || 'Medical & Wellness Facilitation'}</li>
                ${data.healthCondition ? `<li><strong>Health Goal / Condition:</strong> ${data.healthCondition}</li>` : ''}
              </ul>
            </div>

            <h3 style="color: #1B4332; font-size: 16px; border-bottom: 1px dashed #D4A96A; padding-bottom: 8px; margin-top: 28px;">
              What Happens Next? (Our 4-Step Free Service)
            </h3>

            <div style="margin-bottom: 18px;">
              <strong style="color: #1B4332; font-size: 14px;">1. Senior Doctor Review:</strong>
              <div style="font-size: 14px; color: #5D6B64;">Our clinical team securely evaluates your request with chief specialists across our accredited JCI & NABH hospital network.</div>
            </div>

            <div style="margin-bottom: 18px;">
              <strong style="color: #1B4332; font-size: 14px;">2. Itemized Cost Quotes (Save 60–80%):</strong>
              <div style="font-size: 14px; color: #5D6B64;">Within 24 hours, we will email you official hospital treatment plans, estimated stay durations, doctor profiles, and direct transparent pricing.</div>
            </div>

            <div style="margin-bottom: 18px;">
              <strong style="color: #1B4332; font-size: 14px;">3. Complimentary Travel & Visa Facilitation:</strong>
              <div style="font-size: 14px; color: #5D6B64;">We provide official hospital invitation letters for your Indian Medical Visa, arrange airport reception, and book comfortable partner accommodations.</div>
            </div>

            <div style="margin-bottom: 24px;">
              <strong style="color: #1B4332; font-size: 14px;">4. Personal Care Manager:</strong>
              <div style="font-size: 14px; color: #5D6B64;">A dedicated coordinator will guide you throughout your journey from arrival in Kerala to recovery.</div>
            </div>

            <div style="background-color: #E8F0EC; padding: 16px; border-radius: 12px; text-align: center; margin-top: 24px;">
              <p style="margin: 0; font-size: 13px; color: #1B4332; font-weight: bold;">Have urgent questions or medical reports to share right away?</p>
              <a href="https://wa.me/919400018008" target="_blank" style="background-color: #25D366; color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 13px; margin-top: 10px;">
                💬 Message Us directly on WhatsApp (+91 94000 18008)
              </a>
            </div>

            <p style="margin-top: 28px; margin-bottom: 0; font-size: 14px; color: #4A5C52;">
              Warm regards,<br/>
              <strong>Maya & The TreatInKerala Care Team</strong><br/>
              <em>Calicut, Kerala, India</em>
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #1B4332; padding: 20px 30px; color: white; border-top: 1px solid #D4A96A; font-size: 12px; font-weight: 300; text-align: center;">
            TreatInKerala International Medical Tourism Facilitation Desk<br/>
            Hilite Business Park, Calicut, Kerala, India | <a href="mailto:treatinkerala@gmail.com" style="color: #BAD7B0; text-decoration: none;">treatinkerala@gmail.com</a>
          </div>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(patientMailOptions),
    ]);

    console.log(`[Email Dispatched] Lead notification & patient welcome emails successfully sent for ${referenceId}`);
    return { success: true, referenceId, emailSent: true };
  } catch (error) {
    console.error('Failed to submit chat lead:', error);
    return { success: false, error: 'Lead processing failed' };
  }
}
