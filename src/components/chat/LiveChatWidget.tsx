'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, Phone, Mail, Sparkles, ChevronRight, ShieldCheck, HeartPulse, Paperclip, FileText } from 'lucide-react';
import { submitChatLead, ChatLeadData, ChatAttachment } from '@/app/actions/chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function LiveChatWidget() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Attachment State
  const [selectedAttachment, setSelectedAttachment] = useState<ChatAttachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCondition, setLeadCondition] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert(isRtl ? 'حجم الملف كبير جداً. يرجى اختيار ملف أصغر من 8 ميجابايت' : 'File size is too large. Please select a file under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const base64Content = dataUrl.split(',')[1];
      const attachmentObj = {
        filename: file.name,
        content: base64Content,
        contentType: file.type || 'application/octet-stream',
      };
      setSelectedAttachment(attachmentObj);
      setShowLeadForm(true);

      // Add a message from Maya acknowledging the file
      const reportAckMsg: Message = {
        id: `asst-report-${Date.now()}`,
        role: 'assistant',
        content: isRtl
          ? `تم إرفاق التقرير الطبي (${file.name}) بنجاح! يرجى إدخال اسمك وبريدك الإلكتروني في النموذج أعلاه ليتمكن فريقنا من مراجعته وإرسال عرض الأسعار لك.`
          : `Medical report (${file.name}) attached! Please share your name and email below so our team can review it and send your custom quotation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reportAckMsg]);
    };
    reader.readAsDataURL(file);
  };

  // Initial welcome greeting & global event listener
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen((prev) => !prev);
      setUnreadCount(0);
    };
    window.addEventListener('open-ai-chat', handleOpenChat);

    const initialGreeting: Message = {
      id: 'msg-welcome',
      role: 'assistant',
      content: isRtl
        ? 'أهلاً بك! أنا مايا من فريق علاج في كيرلا. كيف يمكنني مساعدتك في العلاج أو السفر اليوم؟'
        : "Hi there! I'm Maya from TreatInKerala. How can I help with your medical treatment or travel today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialGreeting]);

    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, [isRtl]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, showLeadForm]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Prompt lead capture form if user mentions contact/cost keywords or after 2 messages
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes('cost') ||
      lowerText.includes('price') ||
      lowerText.includes('email') ||
      lowerText.includes('quote') ||
      lowerText.includes('contact') ||
      lowerText.includes('book') ||
      lowerText.includes('سعر') ||
      lowerText.includes('تكلفة') ||
      lowerText.includes('تواصل')
    ) {
      setTimeout(() => setShowLeadForm(true), 1500);
    }

    try {
      const apiMessages = messages.concat(userMsg).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, locale }),
      });

      // Realistic human typing delay
      await new Promise((resolve) => setTimeout(resolve, 1400));

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: Message = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `asst-err-${Date.now()}`,
        role: 'assistant',
        content: isRtl
          ? 'يسعدني خدمتكم! يمكنك ترك رقم واتساب أو بريدك الإلكتروني لأقوم بمشاركتكم برامج العلاج والتكلفة مباشرة.'
          : "I'd be glad to help! Please feel free to share your email or WhatsApp number so our senior doctors can send you exact treatment quotes.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim() || !leadName.trim()) return;

    setIsSubmittingLead(true);

    const leadData: ChatLeadData = {
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      healthCondition: leadCondition || messages.map((m) => m.content).join(' | ').slice(-200),
      treatmentInterest: 'Live Chat Consultation',
      chatTranscript: messages.map((m) => ({ role: m.role, content: m.content })),
      attachments: selectedAttachment ? [selectedAttachment] : [],
    };

    const res = await submitChatLead(leadData);

    setIsSubmittingLead(false);
    setLeadSubmitted(true);
    setShowLeadForm(false);

    // Add confirmation message from Maya
    const confirmMsg: Message = {
      id: `asst-confirm-${Date.now()}`,
      role: 'assistant',
      content: isRtl
        ? `شكراً جزيلاً لك يا ${leadName}! لقد قمت بإرسال ملف استشارتك إلى فريقنا الطبي وستستلم رسالة تأكيد إلكترونية على (${leadEmail}) خلال لحظات.`
        : `Thank you so much, ${leadName}! I have submitted your details to our senior clinical coordination board. Check your inbox at (${leadEmail}) for your welcome email!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  const quickPrompts = isRtl
    ? [
        '🌿 برامج الأيورفيدا والتنقية',
        '🏥 جراحة العظام واستبدال المفاصل',
        '💰 طلب تقدير التكلفة',
        '🩺 استشارة طبية مجانية',
      ]
    : [
        '🌿 Ayurveda & Panchakarma',
        '🏥 Joint & Orthopedic Surgery',
        '💰 Get Free Cost Estimate',
        '🩺 Free Medical Consultation',
      ];

  return (
    <div className={`fixed bottom-[4.25rem] md:bottom-5 ${isRtl ? 'left-2.5 sm:left-5' : 'right-2.5 sm:right-5'} z-[70] font-sans flex flex-col items-end rtl:items-start`}>
      {/* Compact Floating Chat Launcher Button — desktop only (mobile uses bottom nav) */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          aria-label="Live Chat with Maya"
          className="hidden md:flex relative group items-center gap-2.5 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white px-3.5 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-[#D4A96A]/40"
        >
          {/* Online status indicator */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
          </span>

          <MessageSquare className="w-4 h-4 text-[#BAD7B0] shrink-0" />

          <span className="text-xs font-semibold tracking-tight text-white whitespace-nowrap">
            {isRtl ? 'تحدث مع مايا' : 'Chat with Maya'}
          </span>

          {unreadCount > 0 && (
            <span className="bg-[#D4A96A] text-[#1B4332] text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
              1
            </span>
          )}
        </button>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-1.25rem)] max-w-[400px] sm:w-[400px] h-[520px] max-h-[75vh] md:max-h-[85vh] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D4A96A]/30 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Always-mounted hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            className="hidden"
          />

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white p-4 flex items-center justify-between shadow-md border-b border-[#D4A96A]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#D4A96A] p-0.5 flex items-center justify-center shadow">
                  <div className="w-full h-full rounded-full bg-[#1B4332] flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#1B4332] rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-base leading-tight text-white">Maya</h3>
                  <span className="bg-[#D4A96A]/20 text-[#BAD7B0] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-[#D4A96A]/30">
                    TreatInKerala
                  </span>
                </div>
                <p className="text-xs text-[#BAD7B0] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                  {isRtl ? 'منسقة رعاية طبية • متصل الآن' : 'Senior Care Facilitator • Online'}
                </p>
              </div>
            </div>

            <button
              onClick={toggleChat}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

            {/* Guarantee Banner */}
          <div className="bg-[#1B4332]/5 border-b border-[#D4A96A]/20 px-4 py-2 text-[11px] text-[#4A5C52] flex items-center justify-between">
            <span className="flex items-center gap-1 font-medium truncate">
              <Sparkles className="w-3 h-3 text-[#D4A96A] shrink-0" />
              <span className="truncate">{isRtl ? 'تنسيق مجاني 100% بدون عمولات' : '100% Free Facilitation & Direct Rates'}</span>
            </span>

            {!showLeadForm && !leadSubmitted && (
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="text-[10px] bg-[#D4A96A] hover:bg-[#c49859] text-[#1B4332] font-bold px-2 py-0.5 rounded-full transition shadow-xs shrink-0 whitespace-nowrap"
              >
                {isRtl ? '📩 طلب تسعيرة' : '📩 Get Quote'}
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1B4332] text-white rounded-br-none'
                      : 'bg-white text-[#1A1A2E] border border-[#E2E8F0] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span
                    className={`text-[10px] block mt-1 ${
                      msg.role === 'user' ? 'text-[#BAD7B0] text-right' : 'text-gray-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 bg-white text-gray-500 border border-[#E2E8F0] p-3 rounded-2xl rounded-bl-none max-w-[120px] shadow-sm">
                <span className="text-xs font-medium text-[#2D6A4F]">Maya typing</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#2D6A4F] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#2D6A4F] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#2D6A4F] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            {/* Quick Suggestion Chips */}
            {messages.length <= 2 && !isTyping && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-[#4A5C52] uppercase tracking-wider mb-2">
                  {isRtl ? 'الاستفسارات الشائعة:' : 'Quick Prompts:'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs bg-white hover:bg-[#1B4332] hover:text-white text-[#1B4332] border border-[#1B4332]/20 px-3 py-1.5 rounded-full transition shadow-sm font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Capture Form Card */}
            {showLeadForm && !leadSubmitted && (
              <div className="bg-white border-2 border-[#D4A96A] rounded-xl p-4 shadow-lg my-3 animate-in fade-in relative">
                <div className="flex items-center justify-between text-[#1B4332] font-semibold mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4A96A]" />
                    <span>{isRtl ? 'احصل على عرض الأسعار المخصص' : 'Get Free Custom Hospital Quote'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
                    title={isRtl ? 'إغلاق النموذج' : 'Close form'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#5D6B64] mb-3">
                  {isRtl
                    ? 'أدخل بياناتك لتصلك عروض الأسعار الرسمية من مستشفيات كيرلا المعتمدة مجاناً:'
                    : 'Share your details to receive custom hospital quotations & package options directly to your inbox:'}
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'الاسم الكامل *' : 'Full Name *'}
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                  <input
                    type="email"
                    required
                    placeholder={isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                  <input
                    type="tel"
                    placeholder={isRtl ? 'رقم الواتساب (مع الرمز الدولي)' : 'WhatsApp / Phone Number'}
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />

                  {/* Attachment Section inside Form */}
                  <div className="pt-1">
                    {selectedAttachment ? (
                      <div className="flex items-center justify-between bg-[#E8F0EC] border border-[#2D6A4F]/30 px-3 py-1.5 rounded-lg text-xs text-[#1B4332]">
                        <span className="flex items-center gap-1.5 truncate">
                          <FileText className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                          <span className="truncate max-w-[180px] font-medium">{selectedAttachment.filename}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedAttachment(null)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border border-dashed border-[#1B4332]/30 hover:border-[#1B4332] bg-[#FAF7F2] hover:bg-white text-[#1B4332] py-2 px-3 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-[#D4A96A]" />
                        <span>{isRtl ? 'إرفاق تقرير طبي أو أشعة (اختياري)' : 'Attach Medical Report / Prescriptions'}</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-medium py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow"
                  >
                    {isSubmittingLead ? (
                      <span>{isRtl ? 'جاري الإرسال...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#BAD7B0]" />
                        <span>{isRtl ? 'إرسال واستلام العروض' : 'Send & Get Free Consultation'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#E2E8F0] flex flex-col gap-1.5">
            {selectedAttachment && (
              <div className="flex items-center justify-between bg-[#E8F0EC] px-3 py-1 rounded-full text-[11px] text-[#1B4332]">
                <span className="flex items-center gap-1 truncate">
                  <Paperclip className="w-3 h-3 text-[#2D6A4F]" />
                  <span className="truncate max-w-[200px]">{selectedAttachment.filename}</span>
                </span>
                <button onClick={() => setSelectedAttachment(null)} className="text-gray-400 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title={isRtl ? 'إرفاق تقرير طبي' : 'Attach Medical Report (PDF/Image)'}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E8F0EC] text-[#1B4332] border border-gray-200 flex items-center justify-center transition shrink-0"
              >
                <Paperclip className="w-4 h-4 text-[#2D6A4F]" />
              </button>
              <input
                type="text"
                placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Ask Maya anything about treatment in Kerala...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3.5 py-2 text-xs border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#1B4332] bg-[#FAF7F2]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={(!inputValue.trim() && !selectedAttachment) || isTyping}
                className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center hover:bg-[#2D6A4F] transition disabled:opacity-50 shadow shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
