import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Palmtree, Compass, Users, Heart, Ship, MapPin, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'تجربة السياحة في كيرلا والتعافي | ميدكيرلا' : 'Kerala Tourism & Rejuvenation | MedKerala',
    description: locale === 'ar' 
      ? 'استمتع بالاستشفاء في أحضان الطبيعة الاستوائية بكيرلا. جولات قوارب هادئة، منتجعات صحية وتلال خضراء تساعدك على التعافي السريع.'
      : 'Combine world-class healthcare with serene nature. Explore Kerala houseboats, hill stations, and tropical climates optimized for healing.',
  };
}

export default async function KeralaExperiencePage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: 'Common' });

  const isRtl = locale === 'ar';

  const packages = [
    {
      title: isRtl ? 'جولة قوارب البيت في كمباناكون' : 'Backwater Houseboat Cruise',
      loc: isRtl ? 'ألاپوزا / كوماراكوم' : 'Alleppey / Kumarakom',
      duration: isRtl ? 'جولة ليلة واحدة بالكامل' : '1 Day / Overnight Cruise',
      icon: Ship,
      desc: isRtl
        ? 'استمتع برحلة هادئة داخل القنوات المائية الاستوائية الخضراء لكيرلا على متن قارب بيت خشبي تقليدي (Kettuvallam) مع وجبات طعام محلية طازجة.'
        : 'Relax on a traditional wooden houseboat floating through tranquil green canals lined with coconut groves. Includes fresh local meals cooked onboard.'
    },
    {
      title: isRtl ? 'حدائق البهارات وجبال مونار' : 'Munnar Tea Gardens & Spice Plantation Tour',
      loc: isRtl ? 'مونار / تيكادي' : 'Munnar / Thekkady',
      duration: isRtl ? 'يومان / ليلة واحدة' : '2 Days / 1 Night Tour',
      icon: Palmtree,
      desc: isRtl
        ? 'استنشق الهواء الجبلي النقي وسط تلال الشاي الخضراء الشاسعة، وتعرف على زراعة الهيل والفلفل الأسود والقرنفل في حدائق البهارات الشهيرة.'
        : 'Breathe pure mountain air in tea-covered valleys, and visit organic farms growing cardamom, pepper, and organic vanilla in Munnar.'
    },
    {
      title: isRtl ? 'شاطئ كاباد التاريخي والنقاهة' : 'Kappad Historic Beach Recovery',
      loc: isRtl ? 'كالكوت (كوزيكود)' : 'Kappad, Calicut',
      duration: isRtl ? 'رحلة نصف يوم' : 'Half-Day Trip',
      icon: Compass,
      desc: isRtl
        ? 'قم بزيارة الشاطئ التاريخي الذي هبط فيه البحار فاسكو دا غاما عام ١٤٩٨. يتميز بشطآن نظيفة وهادئة مثالية للمشي والنقاهة المسائية.'
        : 'Visit the historic golden sands where Vasco da Gama landed in 1498. Pristine, quiet beaches perfect for peaceful walks during recuperation.'
    }
  ];

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
            {locale === 'ar' ? 'سياحة ونقاهة في الجنة' : 'Recuperation in Paradise'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {locale === 'ar' ? 'اكتشف كيرلا — جنة النقاهة والاستشفاء الطبيعي' : 'Kerala Culture & Tour Add-ons'}
          </h1>
          <p className="text-lg text-text-muted">
            {locale === 'ar'
              ? 'امزج رحلتك العلاجية بجمال الطبيعة والاسترخاء. باقات سياحية وجولات مخصصة للمرضى ومرافقيهم.'
              : 'Combine your medical visit with the breathtaking beauty of Kerala backwaters, hill stations, and spice gardens.'}
          </p>
        </div>

        {/* Tour grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, idx) => {
            const PkgIcon = pkg.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#D4A96A]/20 hover:border-primary-green/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-[#D4A96A] bg-[#FAF7F2] border border-[#D4A96A]/20 px-3 py-1 rounded-full flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{pkg.loc}</span>
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-primary-green/10 flex items-center justify-center group-hover:bg-primary-green transition-colors duration-300">
                      <PkgIcon className="h-5 w-5 text-primary-green group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors duration-200">
                    {pkg.title}
                  </h3>
                  <p className="text-accent-gold font-serif italic text-sm mb-4 font-medium">
                    {pkg.duration}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {pkg.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Companion Program Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block">
              {locale === 'ar' ? 'رعاية مخصصة لمرافق السفر' : 'Support for Family & Friends'}
            </span>
            <h2 className="text-3xl font-semibold font-display text-primary-dark">
              {locale === 'ar' ? 'برنامج ميدكيرلا لمرافقي المرضى' : 'MedKerala Companion Support Program'}
            </h2>
            <p className="text-text-muted text-base leading-relaxed">
              {locale === 'ar'
                ? 'ندرك تماماً أن مرافق السفر يحتاج للراحة والدعم أيضاً. بينما يتلقى المريض العلاج في المستشفى، نقوم بترتيب جولات سياحية محلية ممتعة للمرافق، وتنقلات تسوق للمنتجات والحرير، وترتيب إقامة إضافية مريحة بالقرب من المريض مع توفير خطوط اتصال طوارئ مخصصة.'
                : 'We understand that family members and companions traveling with patients need support, comfort, and options to relax. While the patient undergoes clinical procedures or stays at the hospital, MedKerala arranges companion sightseeing outings, organic spice shopping drives, comfortable companion stays at luxury hotels, and dedicated local communication support.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2 text-text-dark font-semibold">
                <Users className="h-5 w-5 text-primary-green shrink-0" />
                <span>{locale === 'ar' ? 'إقامات مرافقة مريحة' : 'Comfortable Companion stays'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-dark font-semibold">
                <Heart className="h-5 w-5 text-primary-green shrink-0" />
                <span>{locale === 'ar' ? 'خط دعم طوارئ 24/7' : '24/7 dedicated support desk'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/25 text-center space-y-6 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white">
              {locale === 'ar' ? 'اجمع بين العلاج والراحة الاستوائية' : 'Plan Your Recup Trip'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
              {locale === 'ar'
                ? 'تواصل معنا لتضمين برامج جولات كيرلا السياحية ضمن خطة رحلتك العلاجية.'
                : 'Get in touch with our coordinators to custom package sightseeing options into your itinerary.'}
            </p>
            <div className="pt-2">
              <Link
                href="/get-estimate"
                className="bg-primary-green hover:bg-white text-white hover:text-primary-green font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 shadow-md hover:shadow-lg min-h-[48px] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{tCommon('getEstimate')}</span>
                <ArrowRight className="h-4.5 w-4.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
