'use server';

import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/config';

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SubmissionRecord extends EnquiryData {
  id: string;
  timestamp: string;
}

export async function submitEnquiry(data: EnquiryData) {
  try {
    const referenceId = `MK-ENQ-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const newSubmission: SubmissionRecord = {
      id: referenceId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    // 1. Securely log submission on server console.
    console.log('[Submission Saved]', JSON.stringify(newSubmission, null, 2));

    // 2. Email sending logic via Nodemailer (with fallback if credentials are missing)
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

      // Email 1: Notification to Admin (treatinkerala@gmail.com)
      const adminMailOptions = {
        from: `"TreatInKerala Portal" <${smtpUser}>`,
        to: SITE_CONFIG.email,
        subject: `🚨 New Patient Inquiry - [${referenceId}] from ${data.name}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #1B4332; padding: 20px; text-align: center; color: white;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">New Patient Enquiry Received</h2>
              <span style="font-size: 12px; color: #BAD7B0; font-weight: bold; background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 6px; display: inline-block; margin-top: 8px;">Ref ID: ${referenceId}</span>
            </div>
            <div style="padding: 24px; background-color: #FAF7F2;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; width: 140px; color: #4A5C52;">Patient Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1B4332; font-weight: bold;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Email Address:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #2D6A4F; font-weight: 600; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #4A5C52;">Phone Number:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 14px;">${data.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; vertical-align: top; color: #4A5C52;">Inquiry/Request:</td>
                  <td style="padding: 10px; color: #333; line-height: 1.6; white-space: pre-wrap; font-style: italic;">${data.message}</td>
                </tr>
              </table>
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" target="_blank" style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 14px; box-shadow: 0 4px 10px rgba(37,211,102,0.25);">
                  💬 Reach out on WhatsApp
                </a>
              </div>
            </div>
            <div style="background-color: #F4F6F5; padding: 15px; text-align: center; font-size: 11px; color: #84948B; border-top: 1px solid #e2e8f0;">
              Submitted on ${new Date().toLocaleString()} | TreatInKerala Medical Panel
            </div>
          </div>
        `,
      };

      // Email 2: Autoreply to Patient explaining How This Works
      const patientMailOptions = {
        from: `"TreatInKerala Care" <${smtpUser}>`,
        to: data.email,
        subject: `Your Medical Consultation with TreatInKerala - How It Works`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.7; color: #2C3E35; max-width: 600px; margin: 0 auto; border: 1px solid #D4A96A; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); padding: 30px 20px; text-align: center; color: white; border-bottom: 3px solid #D4A96A;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 500; letter-spacing: -0.5px;">TreatInKerala</h1>
              <p style="margin: 5px 0 0 0; font-size: 13px; color: #BAD7B0; letter-spacing: 1px; uppercase;">Complimentary Medical Facilitation</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 30px; background-color: #FAF7F2;">
              <h2 style="color: #1B4332; font-size: 18px; margin-top: 0; font-weight: bold;">Dear ${data.name},</h2>
              <p style="margin-bottom: 24px; font-weight: 300;">
                Thank you for reaching out to the TreatInKerala coordination desk. We have received your inquiry regarding your medical consultation. 
                Our specialized medical panel in Kerala, India is already reviewing your request.
              </p>
              
              <h3 style="color: #D4A96A; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid rgba(212,169,106,0.3); padding-bottom: 8px; margin-bottom: 20px;">
                How Our Free Coordination Works
              </h3>
              
              <!-- Step 1 -->
              <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; color: #1B4332; font-size: 15px; margin-bottom: 4px;">
                  1. Clinical Review & Multi-Hospital Coordination
                </div>
                <div style="font-size: 14px; color: #5D6B64; font-weight: 300;">
                  We securely share your medical reports with top senior consultants across our network of accredited <strong>JCI & NABH</strong> super-specialty hospitals in Kerala.
                </div>
              </div>
              
              <!-- Step 2 -->
              <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; color: #1B4332; font-size: 15px; margin-bottom: 4px;">
                  2. Confirmed Itemized Cost Quotes (Save 60–80%)
                </div>
                <div style="font-size: 14px; color: #5D6B64; font-weight: 300;">
                  Within 24 hours, we will email you a complete, official treatment plan, estimated hospital stays, doctor profiles, and confirmed quotes. You benefit from direct hospital rates with zero markup or agency fees.
                </div>
              </div>
              
              <!-- Step 3 -->
              <div style="margin-bottom: 24px;">
                <div style="font-weight: bold; color: #1B4332; font-size: 15px; margin-bottom: 4px;">
                  3. End-to-End Travel & On-Ground Care
                </div>
                <div style="font-size: 14px; color: #5D6B64; font-weight: 300;">
                  Once you decide to travel, we handle all logistics for you: issuing your official medical visa invitation letter, arranging complimentary airport pick-ups, booking nearby hotel accommodation, and assigning a dedicated translator.
                </div>
              </div>

              <!-- Trust Callout -->
              <div style="background-color: #F4F6F5; border-left: 4px solid #2D6A4F; padding: 15px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                <strong style="color: #1B4332; font-size: 13px; display: block; margin-bottom: 3px;">🔒 Zero Coordination Fees</strong>
                <span style="font-size: 13px; color: #5D6B64; font-weight: 300; display: block;">
                  Our patient facilitation is 100% free. You pay the hospital directly for your medical treatment.
                </span>
              </div>
              
              <p style="margin-bottom: 0; font-size: 14px; font-weight: 300;">
                A personal medical coordinator is preparing your file and will contact you via WhatsApp or Email within 24 hours to guide you through the next steps.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1B4332; padding: 25px 30px; color: white; border-top: 1px solid #D4A96A; font-size: 13px; font-weight: 300;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    <strong>TreatInKerala Coordination Desk</strong><br/>
                    Hilite Business Park, Calicut, Kerala, India<br/>
                    <a href="mailto:treatinkerala@gmail.com" style="color: #BAD7B0; text-decoration: none;">treatinkerala@gmail.com</a> | <span style="color: #BAD7B0;">+91 94000 18008</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `,
      };

      // Execute both sends concurrently
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(patientMailOptions),
      ]);
      
      console.log(`[Email Sent] Admin & Patient notification emails sent successfully for ${referenceId}`);
    } else {
      console.warn('[Email Skipped] Nodemailer credentials are not set in environment variables. Set SMTP_USER and SMTP_PASS in .env.local to activate email delivery.');
    }

    return { success: true, referenceId };
  } catch (error) {
    console.error('Server action: Failed to process enquiry and send email:', error);
    return { success: false, error: 'Submission processing error' };
  }
}
