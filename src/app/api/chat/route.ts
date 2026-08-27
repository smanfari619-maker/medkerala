import { NextRequest, NextResponse } from 'next/server';
import { getSmartFallbackReply } from '@/lib/chatFallback';

export async function POST(req: NextRequest) {
  let locale = 'en';
  let lastUserMsg = '';

  try {
    const body = await req.json();
    const messages = body.messages || [];
    locale = body.locale || 'en';

    if (messages.length > 0) {
      const lastMsgObj = messages[messages.length - 1];
      lastUserMsg = typeof lastMsgObj?.content === 'string' ? lastMsgObj.content : '';
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // System prompt defining Maya persona with exact business process rules
    const systemPrompt = `You are Maya, a warm, empathetic patient care coordinator at TreatInKerala (https://treatinkerala.com).
TreatInKerala is a premier medical tourism facilitation company in Kerala, India.

IMPORTANT BUSINESS & PROCESS RULES:
1. NO STAFF DOCTORS: We do NOT have doctors on our staff. NEVER say "our doctor will review/contact you" or "our staff doctors".
2. OUR EXACT WORKFLOW: Our team members collect the patient's details and medical reports, consult with top accredited partner hospitals & senior specialists in Kerala, and prepare a custom itemized quotation for the patient.
3. WARMTH & EMPATHY: Make every visitor feel truly welcomed, valued, and supported. Express genuine empathy for their health concern or treatment search.
4. CONCISE & NATURAL (2-3 short sentences max, ~25-45 words): Keep replies short and readable like real text messages. Avoid walls of text or long lists.
5. INTERACTIVE: Always end your reply with 1 warm, gentle follow-up question.
6. LEAD CAPTURE: Ask for their Name, Email, or WhatsApp so our team member can reach out to collect their details and send a personalized custom quotation.
7. Language: ${locale === 'ar' ? 'العربية الدافئة والودودة جداً. يرجى توضيح أن فريقنا يقوم بجمع البيانات والتنسيق مع المستشفيات الشريكة لإرسال عرض أسعار مخصص.' : 'Warm, empathetic, friendly English.'}`;

    // Plan B: If API key is missing, use smart rule-based fallback
    if (!groqApiKey) {
      const fallbackReply = getSmartFallbackReply(lastUserMsg, locale);
      return NextResponse.json({
        role: 'assistant',
        content: fallbackReply,
      });
    }

    // Call Groq API with 6-second timeout to prevent UI hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.warn('[Groq API Fallback Triggered] Status:', response.status, '| Error:', errText);
      // Seamlessly fall back to smart rule-based reply
      const fallbackReply = getSmartFallbackReply(lastUserMsg, locale);
      return NextResponse.json({
        role: 'assistant',
        content: fallbackReply,
      });
    }

    const data = await response.json();
    const replyContent = data.choices?.[0]?.message?.content?.trim();

    if (!replyContent) {
      const fallbackReply = getSmartFallbackReply(lastUserMsg, locale);
      return NextResponse.json({
        role: 'assistant',
        content: fallbackReply,
      });
    }

    return NextResponse.json({
      role: 'assistant',
      content: replyContent,
    });
  } catch (error) {
    console.warn('[Chat Route Error - Using Smart Fallback]:', error);
    // Seamless Plan B: user never gets an ugly error message
    const fallbackReply = getSmartFallbackReply(lastUserMsg, locale);
    return NextResponse.json({
      role: 'assistant',
      content: fallbackReply,
    });
  }
}
