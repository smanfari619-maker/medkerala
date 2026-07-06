'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormData = z.infer<typeof formSchema>;

import { submitEnquiry } from '@/app/actions/enquiry';

export default function ContactPage() {
  const tForm = useTranslations('Form');
  const locale = useLocale();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await submitEnquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
      if (res.success && res.referenceId) {
        setRefId(res.referenceId);
        setSubmitted(true);
        reset();
      } else {
        alert(locale === 'ar' ? 'حدث خطأ أثناء إرسال استفسارك. يرجى المحاولة لاحقاً.' : 'Failed to submit enquiry. Please try again.');
      }
    } catch (e) {
      console.error(e);
      alert(locale === 'ar' ? 'حدث خطأ أثناء إرسال استفسارك. يرجى المحاولة لاحقاً.' : 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isRtl = locale === 'ar';

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'نحن هنا لمساعدتك في رحلتك العلاجية' : 'Contact MedKerala'}
          </h1>
          <p className="text-lg text-text-muted">
            {locale === 'ar'
              ? 'تواصل مع فريق التنسيق الطبي لدينا في كالكوت، كيرلا. نجيب على جميع استفساراتك خلال 24 ساعة.'
              : 'Reach our medical coordinators in Kozhikode, Kerala. Call, WhatsApp, or drop a query.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Col: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#D4A96A]/35 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-text-dark pb-3 border-b border-slate-100">
                {locale === 'ar' ? 'معلومات الاتصال المباشر' : 'Direct Contact'}
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{locale === 'ar' ? 'دردشة واتساب الفورية' : 'Instant WhatsApp Support'}</h4>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
                      className="text-primary-green hover:underline font-semibold block text-lg min-h-[44px] flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{locale === 'ar' ? 'رقم الطوارئ المتاح 24/7' : '24/7 Coordinator Hotline'}</h4>
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="text-text-dark hover:text-primary-green font-semibold block text-lg min-h-[44px] flex items-center"
                      dir="ltr"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{locale === 'ar' ? 'البريد الإلكتروني للرعاية' : 'Patient Support Email'}</h4>
                    <a
                      href="mailto:care@medkerala.com"
                      className="text-text-dark hover:text-primary-green font-semibold block text-lg min-h-[44px] flex items-center"
                    >
                      care@medkerala.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-primary-green/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{locale === 'ar' ? 'مقر الشركة' : 'Headquarters Location'}</h4>
                    <p className="text-text-muted text-base leading-relaxed mt-1">
                      {locale === 'ar'
                        ? 'طريق هيلاند، بالقرب من المشفي التخصصي، كالكوت (كوزيكود)، كيرلا، الهند'
                        : 'Hilite Business Park, Near Bypass Junction, Calicut (Kozhikode), Kerala, India'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Process / Trust Card */}
            <div className="bg-[#FAF7F2] border border-[#D4A96A]/35 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-primary-dark font-display flex items-center gap-2">
                <span>⏱️</span>
                {locale === 'ar' ? 'ماذا يحدث بعد الإرسال؟' : 'What Happens Next?'}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-text-muted leading-relaxed font-sans list-none">
                <li className="flex gap-2">
                  <span className="text-primary-green">✓</span>
                  <span>{locale === 'ar' ? 'نؤكد استلام طلبك الطبي خلال ساعتين.' : 'We confirm receipt of your details within 2 hours.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-green">✓</span>
                  <span>{locale === 'ar' ? 'يقوم أطباؤنا بمراجعة تقاريرك مجاناً وبسرية تامة.' : 'Our medical team reviews your reports completely free of charge.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-green">✓</span>
                  <span>{locale === 'ar' ? 'تتلقى خطة علاجية مفصلة مع التكاليف خلال ٢٤ ساعة.' : 'You receive a detailed treatment plan and quotes within 24 hours.'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Col: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-[#D4A96A]/35 shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-text-dark font-display">
                  {locale === 'ar' ? 'أرسل لنا استفساراً سريعاً' : 'Quick Enquiry Form'}
                </h2>
                <p className="text-xs text-text-muted mt-1 font-sans">
                  {locale === 'ar' ? 'املأ النموذج بالأسفل وسيتواصل معك منسقنا الطبي المختص خلال دقائق.' : 'Fill out the details below to receive a custom response from our medical coordinators.'}
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl space-y-3 text-center">
                  <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold">{tForm('thankYou')}</h3>
                  <p className="text-base">{tForm('successMessage')}</p>
                  {refId && (
                    <div className="bg-white/60 rounded-xl p-3 border border-emerald-100 text-sm space-y-1 mt-2 text-start">
                      <p className="font-bold text-slate-800">
                        {locale === 'ar' ? `رقم المرجعي للاستفسار: ${refId}` : `Reference ID: ${refId}`}
                      </p>
                      <p className="text-xs text-text-muted">
                        {locale === 'ar' ? 'تم حفظ طلبك بأمان وسيصلك ردنا خلال 24 ساعة.' : 'Your enquiry has been securely logged. Response time is typically within 24 hours.'}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setRefId(''); }}
                    className="mt-4 bg-primary-green hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-full text-sm transition-colors duration-300 min-h-[44px] cursor-pointer"
                  >
                    {locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir={isRtl ? 'rtl' : 'ltr'}>
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-text-dark" htmlFor="name">
                      {tForm('fullName')} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green text-base bg-[#FAF7F2]/50 min-h-[48px]"
                      placeholder={locale === 'ar' ? 'مثال: أحمد العتيبي' : 'e.g. John Doe'}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm font-semibold">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-text-dark" htmlFor="email">
                      {tForm('email')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green text-base bg-[#FAF7F2]/50 min-h-[48px]"
                      placeholder="name@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-text-dark" htmlFor="phone">
                      {tForm('phone')} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green text-base bg-[#FAF7F2]/50 min-h-[48px]"
                      placeholder="+966 50 000 0000"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm font-semibold">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-text-dark" htmlFor="message">
                      {locale === 'ar' ? 'رسالتك واستفسارك' : 'Your Query Details'} *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green text-base bg-[#FAF7F2]/50 min-h-[48px]"
                      placeholder={locale === 'ar' ? 'تفاصيل حالتك العلاجية أو اللوجستية...' : 'Describe how we can help you...'}
                      {...register('message')}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-600 text-sm font-semibold">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Security/HIPAA badge */}
                  <div className="bg-[#FAF7F2] border border-[#D4A96A]/40 rounded-2xl p-4 flex gap-3 items-start text-xs text-text-muted leading-relaxed">
                    <span className="text-lg shrink-0 mt-0.5">🔒</span>
                    <p className="font-sans">
                      {locale === 'ar'
                        ? 'تشفير آمن للبيانات وسرية طبية تامة. يتم مراجعة تقاريرك الطبية ومعلوماتك حصرياً من قبل منسقينا الطبيين والأطباء الاستشاريين المرخصين في كيرلا.'
                        : 'Secure data encryption & absolute medical confidentiality. Your medical files and clinical details are shared exclusively with licensed clinical coordinators and partner doctors in Kerala.'}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-green hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-full text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 min-h-[48px]"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5 shrink-0" />
                        <span>{locale === 'ar' ? 'إرسال استفساري الطبي — رد مجاني خلال ٢٤ ساعة ←' : 'Send My Medical Enquiry — Free Response Within 24hrs →'}</span>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
