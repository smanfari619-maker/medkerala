import React from 'react';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { Metadata } from 'next';

function getYouTubeId(urlOrId: string) {
  if (!urlOrId) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return (match && match[2].length === 11) ? match[2] : urlOrId;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'قصص نجاح مرضانا | ميدكيرلا' : 'International Patient Success Stories | MedKerala',
    description: locale === 'ar' 
      ? 'اقرأ قصص وتجارب حقيقية وشاهد المقابلات المرئية لمرضانا الدوليين الذين اختاروا كيرلا للعلاج الطبي والتعافي.'
      : 'Read honest testimonials and watch video reviews from GCC, UK, and European patients who travelled to Kerala for clinical procedures.',
  };
}

export default async function PatientStoriesPage({ params }: Props) {
  const { locale } = await params;

  const isRtl = locale === 'ar';

  const reviews = [
    {
      name: isRtl ? 'فيصل عبد الله' : 'Faisal Abdullah',
      origin: isRtl ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      treatment: isRtl ? 'زراعة الأسنان الكاملة' : 'Full Arch Dental Implants',
      days: isRtl ? '٧ أيام في كالكوت' : '7 Days in Calicut',
      rating: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=n81JsnYvIqE',
      quote: isRtl
        ? '"شاهد قصتي المصورة عن تجربتي مع زراعة الأسنان والخدمات المقدمة من ميدكيرلا في الهند. مستوى النظافة والتعقيم فاق توقعاتي ووفرت أكثر من ٨٠٪ مقارنة بالرياض."'
        : '"Watch my video testimonial detailing the dental procedure and the logistics support in India. Highly modern workspace and very friendly doctor. Coordinated flawlessly by MedKerala."'
    },
    {
      name: 'Sarah Jenkins',
      origin: 'London, United Kingdom',
      treatment: 'Ayurveda Panchakarma',
      days: '14-Day Wellness Package',
      rating: 5,
      youtubeUrl: '',
      quote: isRtl
        ? '"عانيت من آلام مزمنة في الظهر والتوتر لسنوات. برنامج البانشاكارما في كيرلا كان رائعاً للغاية ومريحاً للأعصاب. أطباء المركز ودودون جداً ومؤهلون. ميدكيرلا اهتمت بجميع تفاصيل السفر والاستقبال من البداية."'
        : '"Ayurvedic healing in Kerala is magic. The Panchakarma cleansing therapies reset my physiological balance and eliminated chronic back muscle aches. Safe airport pickup and premium resort booking coordinated by MedKerala."'
    },
    {
      name: isRtl ? 'أحمد الهادي' : 'Ahmed Al-Hadi',
      origin: isRtl ? 'مسقط، عُمان' : 'Muscat, Oman',
      treatment: isRtl ? 'عملية مجازة القلب' : 'Coronary Bypass Surgery',
      days: '21 Days (العلاج والنقاهة)',
      rating: 5,
      youtubeUrl: 'https://www.youtube.com/watch?v=9Beb7Wb_H10',
      quote: isRtl
        ? '"عملية القلب كانت ناجحة للغاية. مستشفى أستر ميمس متطور جداً ويفوق المستشفيات الخاصة بالخليج. التكلفة التقديرية كانت دقيقة جداً ووفرت مبالغ طائلة مقارنة بالعلاج بالخارج في أوروبا."'
        : '"Undergoing cardiac surgery in Calicut was a major decision, but MedKerala provided absolute confidence. Doctor Nair is a brilliant surgeon. Excellent recovery environment. Saved 75% compared to London prices."'
    }
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block font-sans">
            {locale === 'ar' ? 'تجارب الشفاء' : 'Heartwarming Outcomes'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'قصص نجاح وتجارب مرضانا في كيرلا' : 'Real Patient Stories & Testimonials'}
          </h1>
          <p className="text-lg text-text-muted font-sans">
            {locale === 'ar'
              ? 'اقرأ وتصفح تجارب مرضانا الدوليين الذين وثقوا بـ ميدكيرلا لترتيب علاجهم الطبي الحديث وأنشطتهم اللوجستية.'
              : 'Read and watch real outcomes from patients who traveled to Kozhikode for high-quality surgeries and traditional wellness retreats.'}
          </p>
        </div>

        {/* Stories Listing */}
        <div className="space-y-8 max-w-5xl mx-auto mb-16">
          {reviews.map((rev, idx) => {
            const youtubeId = getYouTubeId(rev.youtubeUrl);
            const flags: Record<string, string> = {
              'Oman': '🇴🇲', 'عمان': '🇴🇲', 'عُمان': '🇴🇲',
              'UK': '🇬🇧', 'United Kingdom': '🇬🇧', 'London': '🇬🇧',
              'Saudi Arabia': '🇸🇦', 'الرياض': '🇸🇦',
            };
            const flag = Object.entries(flags).find(([key]) => rev.origin.includes(key))?.[1] ?? '🌍';

            return (
              <div
                key={idx}
                className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D4A96A]/20 shadow-md flex flex-col md:flex-row gap-8 items-start relative group hover:border-primary-green/30 hover:shadow-xl transition-all duration-300"
              >
                <Quote className="absolute right-8 top-8 h-12 w-12 text-[#D4A96A]/10 -z-0 shrink-0" />
                
                {/* Patient Badge */}
                <div className="w-full md:w-48 shrink-0 space-y-3 z-10 text-left rtl:text-right">
                  <div className="h-14 w-14 rounded-full bg-primary-green text-white flex items-center justify-center font-bold text-xl font-display relative">
                    {rev.name[0]}
                    <span className="absolute -bottom-1 -right-1 bg-primary-green text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] border-2 border-white" title="Verified Patient">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark text-base font-sans">{rev.name}</h3>
                    <p className="text-xs text-text-muted font-sans flex items-center gap-1">
                      <span>{flag}</span>
                      <span>{rev.origin}</span>
                    </p>
                    <span className="text-[10px] font-bold text-primary-green bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wide">
                      ✓ {isRtl ? 'مريض موثق' : 'Verified Patient'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs font-semibold text-[#D4A96A] uppercase tracking-wider font-sans">
                    <p>{rev.treatment}</p>
                    <p className="text-text-muted font-normal lowercase">{rev.days}</p>
                  </div>
                </div>

                {/* Quote & Video Content */}
                <div className="space-y-4 z-10 flex-1 text-left rtl:text-right">
                  {!youtubeId && (
                    <div className="flex gap-1 text-accent-gold font-sans">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent-gold text-accent-gold" />
                      ))}
                    </div>
                  )}

                  {/* YouTube Embed */}
                  {youtubeId ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-[#D4A96A]/20 bg-slate-100 my-4 max-w-xl group cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        alt={`${rev.name} Video Testimonial`}
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/40">
                        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 fill-white text-white translate-x-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md font-sans">
                        {isRtl ? 'مشاهدة على يوتيوب ↗' : 'Watch Story ↗'}
                      </span>
                    </a>
                  ) : (
                    <p className="text-text-dark text-lg italic leading-relaxed font-sans">
                      {rev.quote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Submit CTA */}
        <div className="bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/20 text-center space-y-6 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-[#2D6A4F]/20 to-transparent -z-10 opacity-70"></div>
          <h3 className="text-2xl sm:text-3xl font-semibold font-display">
            {locale === 'ar' ? 'هل كنت أحد مرضانا؟ شارك قصتك' : 'Are you a MedKerala patient? Share your journey'}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'ساعد المرضى الآخرين في اتخاذ القرار الصحيح ومشاركة تجربتك في التماثل للشفاء في كيرلا.'
              : 'Help other patients find confidence. Share your clinical treatment details and experience with us.'}
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{locale === 'ar' ? 'أرسل تجربتك عبر واتساب' : 'Share via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
