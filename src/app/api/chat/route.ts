import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = 'en' } = await req.json();

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

    if (!groqApiKey) {
      // Intelligent fallback response if GROQ_API_KEY is not set yet
      const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content.toLowerCase() : '';

      let fallbackReply = locale === 'ar'
        ? "أهلاً وسهلاً بك! أنا مايا من فريق كيرلا للرعاية. يسعدنا جمع بياناتك والتنسيق مع المستشفيات الشريكة لإرسال عرض أسعار مخصص. ما هو العلاج الذي تبحث عنه؟"
        : "Welcome! I'm Maya from the TreatInKerala care team. Our team would be happy to collect your details and send you a custom quotation from top hospitals. What treatment are you exploring?";

      if (lastUserMsg.includes('ayurveda') || lastUserMsg.includes('panchakarma') || lastUserMsg.includes('wellness') || lastUserMsg.includes('أيورفيدا')) {
        fallbackReply = locale === 'ar'
          ? "الأيورفيدا في كيرلا تجربة شفاء رائعة! فريقنا يساعدك بتوفير عرض أسعار مخصص لأفضل المراكز المعتمدة. ما هي الحالة التي تود علاجها؟"
          : "Ayurveda in Kerala offers wonderful healing! Our team can collect your details and send custom package options from top resorts. What health goal or condition are you looking to treat?";
      } else if (lastUserMsg.includes('cost') || lastUserMsg.includes('price') || lastUserMsg.includes('quote') || lastUserMsg.includes('تكلفة') || lastUserMsg.includes('سعر')) {
        fallbackReply = locale === 'ar'
          ? "يسعد فريقنا بإرسال عرض أسعار تفصيلي ومخصص بدون أي رسوم إضافية. هل يمكنك تزويدنا بإيميلك أو واتساب ليواصل معك أحد أعضاء فريقنا؟"
          : "Our team would love to prepare a custom, itemized quotation with zero extra fees for you! Could you share your email or WhatsApp so our team member can get in touch?";
      } else if (lastUserMsg.includes('surgery') || lastUserMsg.includes('doctor') || lastUserMsg.includes('hospital') || lastUserMsg.includes('جراحة') || lastUserMsg.includes('طبيب')) {
        fallbackReply = locale === 'ar'
          ? "فريقنا ينقسّق مباشرة مع أفضل الجراحين في مستشفيات كيرلا المعتمدة لإعداد عرض أسعار مخصص لك. ما هي الجراحة أو الاستشارة المطلوبة؟"
          : "Our care team coordinates directly with chief surgeons at Kerala's top JCI hospitals to build a custom quote for you. What procedure or consultation do you need?";
      }

      return NextResponse.json({
        role: 'assistant',
        content: fallbackReply,
      });
    }

    // Call Groq API (OpenAI compatible endpoint)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Groq API Error]:', errText);
      return NextResponse.json({
        role: 'assistant',
        content: locale === 'ar'
          ? 'يسعدنا خدمتك! يرجى ترك بريدك الإلكتروني ورقم واتساب لنقوم بمشاركتك كافة التفاصيل والاستشارات الطبية المتاحة.'
          : 'I am here to assist you! Please share your email address and WhatsApp number so our medical team can provide you with comprehensive treatment options and cost details.',
      });
    }

    const data = await response.json();
    const replyContent = data.choices?.[0]?.message?.content || 'How can I assist your medical journey to Kerala today?';

    return NextResponse.json({
      role: 'assistant',
      content: replyContent,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
