'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Building2, Stethoscope, Leaf, MapPin,
  Search, ChevronRight, MessageCircle,
  LayoutGrid, X
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

// ============================================================
// DATA STRUCTURE & HOSPITAL DIRECTORY DATA
// ============================================================

type HospitalType = 'allopathy' | 'ayurveda';

interface Hospital {
  id: string;
  nameEn: string;
  nameAr: string;
  type: HospitalType;
  cityEn: string;
  cityAr: string;
  accreditations: string[];
  overviewEn: string;
  overviewAr: string;
  focusEn: string;
  focusAr: string;
  specialitiesEn: string[];
  specialitiesAr: string[];
  website: string;
}

const HOSPITALS_DATA: Hospital[] = [
  // ── ALLOPHY (MODERN MEDICINE) ──
  {
    id: 'aster-medcity',
    nameEn: 'Aster Medcity (Kochi)',
    nameAr: 'أستر ميدسيتي (كوتشي)',
    type: 'allopathy',
    cityEn: 'Kochi',
    cityAr: 'كوتشي',
    accreditations: ['JCI Accredited', 'NABH Certified', 'NABL'],
    overviewEn: 'A massive, world-class waterfront quaternary care hospital featuring state-of-the-art diagnostic and clinical infrastructure.',
    overviewAr: 'مستشفى رعاية رباعي ضخم عالمي المستوى يطل على واجهة بحرية، ويضم بنية تحتية تشخيصية وعلاجية هي الأحدث من نوعها.',
    focusEn: 'Dedicated international patient desk, multi-lingual coordinators (Arabic/English), visa invitation letters, and custom rehabilitation suites.',
    focusAr: 'مكتب مخصص للمرضى الدوليين، منسقون متعددو اللغات (العربية/الإنجليزية)، خطابات دعوة التأشيرة، وأجنحة تأهيل مخصصة.',
    specialitiesEn: ['Cardiology', 'Neurology & Spine', 'Oncology', 'Organ Transplants', 'Joint Replacement'],
    specialitiesAr: ['القلب والشرايين', 'الأعصاب والعمود الفقري', 'الأورام والسرطان', 'زراعة الأعضاء', 'استبدال المفاصل'],
    website: 'https://www.asterhospitals.in/hospitals/aster-medcity-kochi'
  },
  {
    id: 'meitra-hospital',
    nameEn: 'Meitra Hospital (Calicut)',
    nameAr: 'مستشفى ميترا (كالكوت)',
    type: 'allopathy',
    cityEn: 'Calicut (Kozhikode)',
    cityAr: 'كالكوت (كوزيكود)',
    accreditations: ['JCI Accredited', 'NABH Certified'],
    overviewEn: 'One of the most modern paperless digital hospitals in India, renowned for its modular designs and high clinical outcomes.',
    overviewAr: 'أحد أكثر المستشفيات الرقمية حداثة وخالٍ تماماً من المعاملات الورقية في الهند، ويشتهر بتصاميمه الذكية ونتائجه العلاجية العالية.',
    focusEn: 'JCI accreditation standard, Arabic translators, priority clinical queues, custom estimates, airport pickup from Calicut Airport.',
    focusAr: 'معيار اعتماد JCI العالمي، مترجمون فوريون للعربية، طوابير سريرية ذات أولوية، تقديرات أسعار مخصصة، واستقبال من مطار كالكوت.',
    specialitiesEn: ['Cardiac Surgery', 'Orthopaedics & Joint', 'Neurosurgery', 'Urology & Kidney'],
    specialitiesAr: ['جراحة القلب', 'العظام والمفاصل', 'جراحة الأعصاب', 'المسالك البولية والكلى'],
    website: 'https://www.meitra.com/'
  },
  {
    id: 'amrita-hospital',
    nameEn: 'Amrita Hospital (Kochi)',
    nameAr: 'مستشفى أمريتا (كوتشي)',
    type: 'allopathy',
    cityEn: 'Kochi',
    cityAr: 'كوتشي',
    accreditations: ['NABH Certified', 'JCI Accredited', 'NABL Approved'],
    overviewEn: 'One of South India\'s largest cross-specialty teaching hospitals with over 1,300 beds and a massive global reputation for research and complex surgeries.',
    overviewAr: 'واحد من أكبر المستشفيات التعليمية متعددة التخصصات في جنوب الهند مع أكثر من ١٣٠٠ سرير وسمعة عالمية واسعة في الأبحاث والعمليات المعقدة.',
    focusEn: 'Experienced international relations team, medical travel insurance assistance, and dedicated recovery apartments.',
    focusAr: 'فريق علاقات دولية ذو خبرة عالية، مساعدة في التأمين الطبي للسفر، وشقق مخصصة للنقاهة والتعافي.',
    specialitiesEn: ['Cardiology & Bypass', 'Pediatric Heart Surgery', 'Oncology Care', 'Robotic Surgery', 'Gastroenterology'],
    specialitiesAr: ['القلب وجراحة المجازة', 'جراحة قلب الأطفال', 'علاج الأورام', 'الجراحة الروبوتية', 'الجهاز الهضمي'],
    website: 'https://www.amritahospitals.org/'
  },
  {
    id: 'aster-mims-calicut',
    nameEn: 'Aster MIMS Hospital (Calicut)',
    nameAr: 'أستر ميمس (كالكوت)',
    type: 'allopathy',
    cityEn: 'Calicut (Kozhikode)',
    cityAr: 'كالكوت (كوزيكود)',
    accreditations: ['NABH Certified', 'NABL Accredited'],
    overviewEn: 'A leading quaternary care hospital serving Malabar region, known for highly qualified doctors and international standard ICU setups.',
    overviewAr: 'مستشفى رائد للرعاية الرباعية يخدم منطقة مالابار بالكامل، ويشتهر بأطبائه المؤهلين تأهيلاً عالياً ووحدات العناية المركزة ذات المعايير الدولية.',
    focusEn: 'International Patient Desk, language translation, visa invitation letters, post-discharge remote doctor follow-ups.',
    focusAr: 'مكتب مخصص للمرضى الدوليين، ترجمة فورية للغات، خطابات دعوة التأشيرة، ومتابعة طبية عن بعد بعد العودة للوطن.',
    specialitiesEn: ['Oncology & Bone Marrow', 'Gastroenterology', 'Cardiology & Bypass', 'Neurosurgery & Spine'],
    specialitiesAr: ['الأورام وزراعة النخاع', 'الجهاز الهضمي', 'أمراض وجراحة القلب', 'جراحة الأعصاب والعمود الفقري'],
    website: 'https://www.asterhospitals.in/hospitals/aster-mims-calicut'
  },
  {
    id: 'apollo-adlux',
    nameEn: 'Apollo Adlux Hospital (Cochin)',
    nameAr: 'أبولو أدلوكس (كوتشي/أنغامالي)',
    type: 'allopathy',
    cityEn: 'Kochi',
    cityAr: 'كوتشي',
    accreditations: ['NABH Certified', 'Apollo Quality Standards'],
    overviewEn: 'A state-of-the-art super-specialty hospital located close to Cochin International Airport, backed by the prestigious Apollo clinical network.',
    overviewAr: 'مستشفى تخصصي فائق التطور يقع بالقرب من مطار كوتشي الدولي، مدعوم بشبكة أبولو الطبية المرموقة في الهند.',
    focusEn: '3 Tesla MRI diagnostics, robotic cancer surgeries, swift airport reception, and premium suites for overseas patients.',
    focusAr: 'تشخيصات الرنين المغناطيسي 3 تسلا، جراحات السرطان الروبوتية، استقبال سريع بالمطار، وأجنحة ممتازة للمرضى الأجانب.',
    specialitiesEn: ['Robotic Oncology', 'Cardiac Sciences', 'Advanced Orthopaedics', 'Critical Care'],
    specialitiesAr: ['جراحة الأورام الروبوتية', 'علوم وجراحة القلب', 'جراحة العظام المتقدمة', 'العناية المركزة والطوارئ'],
    website: 'https://www.apolloadluxhospital.co/'
  },
  {
    id: 'baby-memorial',
    nameEn: 'Baby Memorial Hospital (BMH)',
    nameAr: 'مستشفى بيبي التذكاري (كالكوت)',
    type: 'allopathy',
    cityEn: 'Calicut (Kozhikode)',
    cityAr: 'كالكوت (كوزيكود)',
    accreditations: ['NABH Certified', 'NABL accredited labs'],
    overviewEn: 'One of the largest, most trusted multi-specialty hospitals in Kerala, boasting over 800 beds and comprehensive diagnostic systems.',
    overviewAr: 'واحد من أكبر مستشفيات التخصصات المتعددة وأكثرها ثقة في كيرلا، ويضم أكثر من ٨٠٠ سرير وأنظمة تشخيص شاملة.',
    focusEn: 'Dedicated International Relations division, currency exchange assistance, Arabic interpreter, and custom food plans.',
    focusAr: 'قسم علاقات دولية مخصص، مساعدة في تصريف العملات، مترجم لغة عربية، وخطة تغذية مخصصة للمريض ومرافقه.',
    specialitiesEn: ['Orthopedics & Spine', 'Plastic & Reconstructive Surgery', 'Urology', 'Diagnostics'],
    specialitiesAr: ['العظام والعمود الفقري', 'التجميل والترميم والجراحة', 'المسالك البولية', 'الفحوصات الشاملة'],
    website: 'https://www.babymemorialhospital.org/'
  },
  {
    id: 'mar-sleeva',
    nameEn: 'Mar Sleeva Medcity (Palai)',
    nameAr: 'مار سليفا ميدسيتي (بالاي)',
    type: 'allopathy',
    cityEn: 'Kottayam',
    cityAr: 'كوتايام',
    accreditations: ['NABH Certified'],
    overviewEn: 'A premier quaternary care medical hub in Central Kerala, providing compassionate care and advanced surgery setups.',
    overviewAr: 'مركز طبي رائد للرعاية الرباعية في وسط كيرلا، يوفر رعاية طبية متكاملة وغرف جراحة متطورة.',
    focusEn: 'Quiet recovery atmosphere, custom international patient estimates, and dedicated family stay suites.',
    focusAr: 'بيئة نقاهة هادئة، تقديرات أسعار مخصصة للمرضى الدوليين، وأجنحة سكنية مخصصة للعائلات.',
    specialitiesEn: ['Cardiology', 'Advanced Diagnostics', 'General Surgery', 'Neurology'],
    specialitiesAr: ['القلب والشرايين', 'التشخيص والفحوصات المتقدمة', 'الجراحة العامة', 'أطباء الأعصاب'],
    website: 'https://www.marsleevamedcity.com/'
  },
  {
    id: 'cmc-vellore',
    nameEn: 'Christian Medical College (CMC Vellore)',
    nameAr: 'مستشفى كلية الطب المسيحية (CMC فيلور)',
    type: 'allopathy',
    cityEn: 'Vellore, Tamil Nadu',
    cityAr: 'فيلور، تاميل نادو',
    accreditations: ['NABH Certified', 'Institutional Excellence', 'NABL'],
    overviewEn: 'One of India\'s most prestigious, historical, and largest quaternary medical facilities, internationally renowned for treating complex clinical cases.',
    overviewAr: 'واحد من أكثر المرافق الطبية المرموقة والتاريخية والأكبر في الهند، ويحظى بشهرة دولية واسعة في علاج الحالات الطبية والسريرية المعقدة.',
    focusEn: 'Specialized international patient care coordination, multi-lingual translators, custom clinical queues, and close liaison with consulates.',
    focusAr: 'تنسيق رعاية المرضى الدوليين المتخصص، مترجمون متعددو اللغات، طوابير سريرية مخصصة، وتواصل وثيق مع القنصليات والبعثات الدبلوماسية.',
    specialitiesEn: ['Haematology & Oncology', 'Neurosurgery', 'Pediatrics', 'Rheumatology', 'Endocrinology'],
    specialitiesAr: ['أمراض الدم والأورام', 'جراحة المخ والأعصاب', 'طب الأطفال وجراحتها', 'الروماتيزم والمفاصل', 'الغدد الصماء والهرمونات'],
    website: 'https://www.cmch-vellore.edu/'
  },
  {
    id: 'apollo-greams-road',
    nameEn: 'Apollo Hospital, Greams Road (Chennai)',
    nameAr: 'مستشفى أبولو، طريق غريمز (تشيناي)',
    type: 'allopathy',
    cityEn: 'Chennai, Tamil Nadu',
    cityAr: 'تشيناي، تاميل نادو',
    accreditations: ['JCI Accredited', 'NABH Certified', 'Apollo Centers of Excellence'],
    overviewEn: 'The flagship hospital of the Apollo Group, globally acclaimed for pioneer work in cardiac surgeries, oncology treatments, and organ transplants.',
    overviewAr: 'المستشفى الرئيسي لمجموعة أبولو الشهيرة، وحائز على تقدير عالمي كبير لدوره الريادي في جراحات القلب وعلاجات الأورام وزراعة الأعضاء.',
    focusEn: 'Comprehensive foreign client coordinator, luxury inpatient suites, fast-track consultation bookings, and embassy support.',
    focusAr: 'منسق شامل للعملاء الأجانب، أجنحة تنويم فاخرة، حجز سريع للاستشارات مع كبار الأطباء، ودعم كامل للبعثات والملحقيات.',
    specialitiesEn: ['Cardiology & CABG', 'Oncology (Proton Therapy)', 'Liver & Renal Transplant', 'Orthopaedics', 'Robotic Spine Surgery'],
    specialitiesAr: ['القلب وجراحة الصدر', 'الأورام والعلاج بالبروتونات', 'زراعة الكبد والكلى', 'جراحة العظام والمفاصل', 'جراحة العمود الفقري الروبوتية'],
    website: 'https://www.apollohospitals.com/'
  },

  // ── AYURVEDA & wellness ──
  {
    id: 'kottakkal-avs',
    nameEn: 'Kottakkal Arya Vaidya Sala',
    nameAr: 'مركز كوتاكال أريا فيديا سالا',
    type: 'ayurveda',
    cityEn: 'Kottakkal (Malappuram)',
    cityAr: 'كوتاكال (مالابورام)',
    accreditations: ['NABH Certified', 'Green Leaf Certified', 'AYUSH Standard'],
    overviewEn: 'Established in 1902, this is the undisputed global epicenter for authentic classical Ayurveda and Panchakarma therapies.',
    overviewAr: 'تأسس عام ١٩٠٢، وهو المركز العالمي الأبرز والأكثر عراقة لعلاجات الأيورفيدا الكلاسيكية الأصيلة والبانشاكارما.',
    focusEn: 'Premium international guest blocks, highly expert traditional physicians, herbal medicine production on-site, and translation support.',
    focusAr: 'أجنحة ضيافة ممتازة للمرضى الأجانب، أطباء تقليديون خبراء، إنتاج الأدوية العشبية محلياً، ودعم الترجمة.',
    specialitiesEn: ['Authentic Panchakarma', 'Neurological Rehab', 'Arthritis & Disc Issues', 'Chronic Disease Management'],
    specialitiesAr: ['البانشاكارما الأصيلة', 'التأهيل العصبي والشلل', 'التهاب المفاصل والديسك', 'علاج الأمراض المزمنة'],
    website: 'https://www.aryavaidyasala.com/'
  },
  {
    id: 'ayurmana',
    nameEn: 'AyurMana - Dharma Ayurveda',
    nameAr: 'أيرومانا - دارما أيورفيدا (تيروفانانتابورام)',
    type: 'ayurveda',
    cityEn: 'Thiruvananthapuram',
    cityAr: 'تيروفانانتابورام',
    accreditations: ['NABH Certified', '9 Generations Lineage'],
    overviewEn: 'A premier advanced traditional healing center located on a tranquil hilltop, backed by 9 generations of Ayurvedic expertise.',
    overviewAr: 'مركز رائد للشفاء التقليدي المتقدم يقع على تلة هادئة، مدعوم بتسعة أجيال متتالية من خبرة عائلة دارما أيورفيدا.',
    focusEn: 'Focus on chronic stroke recovery, severe spine/disc treatments, peaceful environment, and tailored organic diet plans.',
    focusAr: 'التركيز على التعافي من السكتة الدماغية، علاجات العمود الفقري والديسك الشديدة، بيئة هادئة، وتغذية عضوية مخصصة.',
    specialitiesEn: ['Stroke & Paralysis Rehab', 'Severe Disc Slip & Back Pain', 'Rheumatoid Arthritis', 'Stress Elimination'],
    specialitiesAr: ['إعادة تأهيل الشلل والسكتات', 'الديسك الشديد وآلام الظهر', 'الروماتيزم والتهاب المفاصل', 'التخلص من الإجهاد والتوتر'],
    website: 'https://www.ayurmana.in/'
  },
  {
    id: 'somatheeram',
    nameEn: 'Somatheeram Ayurveda Village',
    nameAr: 'قرية سوماتيرام للأيورفيدا (كوفالام)',
    type: 'ayurveda',
    cityEn: 'Kovalam (Trivandrum)',
    cityAr: 'كوفالام (تيروفانانتابورام)',
    accreditations: ['NABH Accredited', 'National Tourism Award Winner'],
    overviewEn: 'The world\'s first Ayurvedic resort, combining resort-style beachfront cottages with strict clinical Ayurveda treatments.',
    overviewAr: 'أول منتجع للأيورفيدا في العالم، يجمع بين الأكواخ الشاطئية على طراز المنتجعات وعلاجات الأيورفيدا الطبية الصارمة.',
    focusEn: 'Highly popular with European and Middle Eastern guests, English/German/Arabic translation guides, beach recovery walks.',
    focusAr: 'يحظى بشعبية كبيرة بين الضيوف الأوروبيين والخليجيين، أدلة ترجمة (الإنجليزية/الألمانية/العربية)، ونقاهة على الشاطئ.',
    specialitiesEn: ['Body Purification (Panchakarma)', 'Anti-Aging & Rejuvenation', 'Slimming Packages', 'Stress Management & Yoga'],
    specialitiesAr: ['تطهير الجسم (البانشاكارما)', 'مكافحة الشيخوخة والتجديد', 'باقات التخسيس الوزن', 'إدارة التوتر واليوغا المرافقة'],
    website: 'https://somatheeram.net/'
  },
  {
    id: 'athreya-ayurvedic',
    nameEn: 'Athreya Ayurvedic Centre (Kottayam)',
    nameAr: 'مركز أتريا للأيورفيدا (كوتايام)',
    type: 'ayurveda',
    cityEn: 'Kottayam',
    cityAr: 'كوتايام',
    accreditations: ['NABH Certified', '5 Generations Lineage'],
    overviewEn: 'An authentic medical Ayurvedic hospital run by a family of traditional physicians, offering customized holistic treatments.',
    overviewAr: 'مستشفى أيورفيدي طبي أصيل تديره عائلة من الأطباء التقليديين، ويقدم علاجات مخصصة وشاملة لكل حالة.',
    focusEn: 'Strictly clinical protocols, daily doctor consultations, peaceful paddy-field surroundings, and customized treatment diets.',
    focusAr: 'بروتوكولات طبية صارمة، استشارات يومية من الأطباء، بيئة هادئة محاطة بحقول الأرز، ووجبات علاجية مخصصة.',
    specialitiesEn: ['Panchakarma Detox', 'Rejuvenation Therapies', 'Psoriasis & Skin Care', 'Spine & Joint Care'],
    specialitiesAr: ['سموم البانشاكارما', 'علاجات التجديد والحيوية', 'الصدفية والعناية بالبشرة', 'رعاية العمود الفقري والمفاصل'],
    website: 'https://theathreya.com/'
  },
  {
    id: 'vaidyaratnam',
    nameEn: 'Vaidyaratnam Oushadhasala (Thrissur)',
    nameAr: 'مركز فيدياراتنام أوشاداسالا (تريشور)',
    type: 'ayurveda',
    cityEn: 'Thrissur',
    cityAr: 'تريشور',
    accreditations: ['NABH Accredited', 'Ashtavaidya Tradition'],
    overviewEn: 'Rooted deeply in the classical Ashtavaidya tradition since 1941, combining traditional medicine with modern diagnosis.',
    overviewAr: 'متجذر بعمق في تقاليد الأشتوفايديا الكلاسيكية للأيورفيدا منذ عام ١٩٤١، ويجمع بين الطب التقليدي والتشخيص الحديث.',
    focusEn: 'State-of-the-art research facility, comfortable nursing homes, and authentic formulation of herbal remedies.',
    focusAr: 'مرفق أبحاث متطور للغاية، دور تمريض مريحة، وتركيبات عشبية أصلية.',
    specialitiesEn: ['Traditional Panchakarma', 'Chronic Pain Management', 'Neurological Ailments', 'Rejuvenation Packages'],
    specialitiesAr: ['البانشاكارما التقليدية', 'إدارة الآلام المزمنة', 'الأمراض العصبية', 'باقات التجديد والاستشفاء'],
    website: 'https://www.vaidyaratnammooss.com/'
  },
  {
    id: 'punarnava',
    nameEn: 'Punarnava Ayurveda Hospital',
    nameAr: 'مستشفى بونارنافا للأيورفيدا (كوتشي)',
    type: 'ayurveda',
    cityEn: 'Kochi',
    cityAr: 'كوتشي',
    accreditations: ['NABH Certified', 'Green Leaf Certified'],
    overviewEn: 'Operating for over three decades, Punarnava is highly regarded for treating lifestyle diseases and chronic pain in a serene atmosphere.',
    overviewAr: 'يعمل منذ أكثر من ثلاثة عقود، ويحظى بتقدير كبير في علاج أمراض نمط الحياة والآلام المزمنة في بيئة هادئة ومريحة.',
    focusEn: 'Multidisciplinary experts, digital follow-ups, and specialized programs for weight-loss and lifestyle disorders.',
    focusAr: 'خبراء متعددو التخصصات، متابعة رقمية، وبرامج متخصصة لتخفيف الوزن واضطرابات نمط الحياة.',
    specialitiesEn: ['Lifestyle Diseases Care', 'Metabolic Disorders', 'Chronic Joint Pain', 'Detox & Wellness'],
    specialitiesAr: ['رعاية أمراض نمط الحياة', 'الاضطرابات الأيضية', 'آلام المفاصل المزمنة', 'التخلص من السموم والعافية'],
    website: 'https://punarnava.com/'
  },
  {
    id: 'sakalya-ayurveda',
    nameEn: 'Sakalya Ayurveda Hospital (Calicut)',
    nameAr: 'مستشفى ساكاليا للأيورفيدا (كالكوت)',
    type: 'ayurveda',
    cityEn: 'Calicut (Kozhikode)',
    cityAr: 'كالكوت (كوزيكود)',
    accreditations: ['NABH Certified', 'Harivihar Partnership'],
    overviewEn: 'Partners with the 170-year-old Harivihar Heritage Homestead, allowing patients to experience clinical Ayurveda inside a luxurious heritage retreat.',
    overviewAr: 'شريك مع بيت هاري فيهار التراثي الذي يبلغ عمره ١٧٠ عاماً، مما يتيح للمرضى تجربة الأيورفيدا السريرية في منتجع تراثي فاخر.',
    focusEn: 'Luxury heritage stay, rigorous medical Ayurveda, personalized wellness itineraries, yoga training.',
    focusAr: 'إقامة تراثية فاخرة، أيورفيدا طبية دقيقة، مسارات عافية مخصصة، وتدريب على اليوغا.',
    specialitiesEn: ['Preventive Medicine', 'Inpatient Rehabilitation', 'Classical Rejuvenation', 'Yoga Therapy'],
    specialitiesAr: ['الطب الوقائي', 'تأهيل المرضى المنومين', 'التجديد الكلاسيكي', 'العلاج باليوغا مكمل'],
    website: 'https://www.sakalya.com/'
  },
  {
    id: 'edhini-ayurveda',
    nameEn: 'Edhini Ayurveda Hospital (Calicut)',
    nameAr: 'مستشفى إدهيني للأيورفيدا (كالكوت)',
    type: 'ayurveda',
    cityEn: 'Calicut (Kozhikode)',
    cityAr: 'كالكوت (كوزيكود)',
    accreditations: ['Authentic Ayurvedic Setup'],
    overviewEn: 'Located on a sprawling five-acre property surrounded by nature, providing the perfect tranquil environment for healing.',
    overviewAr: 'يقع في ملكية فسيحة تبلغ مساحتها خمسة أفدنة وتحيط بها الطبيعة الخلابة، مما يوفر البيئة الهادئة المثالية للاستشفاء.',
    focusEn: 'Nature-centric recovery, specialized stroke rehabilitation program, and tailored diet itineraries.',
    focusAr: 'التعافي المرتكز على الطبيعة، برنامج متخصص لتأهيل السكتات الدماغية، وأنظمة غذائية مخصصة.',
    specialitiesEn: ['Stroke Rehabilitation', 'Spine & Joint Care', 'Stress Management', 'Holistic Wellness'],
    specialitiesAr: ['إعادة تأهيل الشلل', 'رعاية المفاصل والعمود الفقري', 'علاج التوتر والضغوط', 'العافية الشاملة'],
    website: 'https://edhiniayurveda.com/'
  }
];

// ============================================================
// COMPONENT RENDERING
// ============================================================

export default function HospitalsDirectoryPage() {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [activeType, setActiveType] = useState<'all' | HospitalType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = useMemo(() => {
    return HOSPITALS_DATA.filter((h) => {
      // 1. Type Filter
      if (activeType !== 'all' && h.type !== activeType) return false;

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = h.nameEn.toLowerCase().includes(query) || h.nameAr.includes(query);
        const cityMatch = h.cityEn.toLowerCase().includes(query) || h.cityAr.includes(query);
        const specMatch = h.specialitiesEn.some((s) => s.toLowerCase().includes(query)) ||
                          h.specialitiesAr.some((s) => s.includes(query));
        const overviewMatch = h.overviewEn.toLowerCase().includes(query) || h.overviewAr.includes(query);

        return nameMatch || cityMatch || specMatch || overviewMatch;
      }

      return true;
    });
  }, [activeType, searchQuery]);

  return (
    <div className="py-16 bg-[#FAF7F2] min-h-screen border-b border-[#D4A96A]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#D4A96A] font-bold text-sm uppercase tracking-widest block font-sans">
            {isRtl ? 'المستشفيات الشريكة المعتمدة' : 'Accredited Partner Directory'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold font-display text-primary-dark tracking-tight">
            {isRtl ? 'مستشفيات كبار الجراحين ومراكز الاستشفاء' : 'Premier Hospitals & Healing Centres in Kerala'}
          </h1>
          <p className="text-lg text-text-muted font-sans">
            {isRtl
              ? 'تصفح قائمتنا المنسقة لأهم المستشفيات الحديثة (الطب الغربي) والمراكز الطبية التقليدية (الأيورفيدا) المعتمدة.'
              : 'Browse our curated list of world-class quaternary care hospitals (Allopathy) and certified authentic healing resorts (Ayurveda).'}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-[#D4A96A]/35 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 mb-10 max-w-4xl mx-auto relative overflow-hidden">
          {/* Decorative ambient background glows */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-green/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-gold/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Search Input Container */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute inset-y-0 start-4 flex items-center pointer-events-none text-text-muted/40 transition-colors duration-200 group-focus-within:text-primary-green">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder={isRtl ? 'ابحث باسم المستشفى، التخصص، أو المدينة...' : 'Search by hospital name, specialty, or city...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ps-12 pe-10 py-3 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] focus:bg-white border border-[#D4A96A]/35 hover:border-primary-green/30 focus:border-primary-green rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-primary-green/10 text-sm text-text-dark placeholder-text-muted/40 transition-all duration-300 font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 end-3 flex items-center px-2 text-text-muted/40 hover:text-primary-green transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter Tabs - Premium Segmented Controls */}
              <div className="lg:col-span-5 flex p-1 bg-[#FAF7F2] border border-[#D4A96A]/30 rounded-2xl gap-1">
                {[
                  { key: 'all' as const, labelEn: 'All Streams', labelAr: 'الجميع', icon: LayoutGrid },
                  { key: 'allopathy' as const, labelEn: 'Modern', labelAr: 'الطب الحديث', icon: Stethoscope },
                  { key: 'ayurveda' as const, labelEn: 'Traditional', labelAr: 'الأيورفيدا', icon: Leaf }
                ].map((tab) => {
                  const active = activeType === tab.key;
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveType(tab.key)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer font-sans min-h-[38px] flex-1 ${
                        active
                          ? 'bg-primary-green text-white shadow-xs'
                          : 'text-[#4A4A6A] hover:text-primary-green hover:bg-white/60'
                      }`}
                    >
                      <TabIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{isRtl ? tab.labelAr : tab.labelEn}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Quick Search Tags & Match Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[#D4A96A]/40 text-xs">
              
              {/* Popular tags list */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-text-muted/50 font-medium font-sans">
                  {isRtl ? 'الكلمات الشائعة:' : 'Popular:'}
                </span>
                {(isRtl 
                  ? [
                      { label: 'كوتشي', val: 'كوتشي' },
                      { label: 'كالكوت', val: 'كالكوت' },
                      { label: 'القلب', val: 'القلب' },
                      { label: 'الأيورفيدا', val: 'الأيورفيدا' },
                      { label: 'العمود الفقري', val: 'العمود الفقري' }
                    ]
                  : [
                      { label: 'Kochi', val: 'Kochi' },
                      { label: 'Calicut', val: 'Calicut' },
                      { label: 'Cardiology', val: 'Cardiology' },
                      { label: 'Ayurveda', val: 'Ayurveda' },
                      { label: 'Spine Care', val: 'Spine' }
                    ]
                ).map((tag) => {
                  const isSelected = searchQuery.toLowerCase() === tag.val.toLowerCase();
                  return (
                    <button
                      key={tag.label}
                      onClick={() => setSearchQuery(isSelected ? '' : tag.val)}
                      className={`px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer font-sans ${
                        isSelected
                          ? 'bg-primary-green/10 border-primary-green/30 text-primary-green font-semibold'
                          : 'bg-[#FAF7F2] border-[#D4A96A]/30 text-text-muted hover:border-primary-green/30 hover:text-primary-green'
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Matches Counter */}
              <div className="text-text-muted/70 font-semibold font-sans flex items-center gap-1.5 shrink-0 bg-[#FAF7F2] border border-[#D4A96A]/40 px-3 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse" />
                <span>
                  {isRtl
                    ? `تم العثور على ${filteredHospitals.length} مستشفى`
                    : `${filteredHospitals.length} ${filteredHospitals.length === 1 ? 'hospital' : 'hospitals'} matching`}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Directory Listing */}
        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredHospitals.map((hospital) => {
              const Icon = hospital.type === 'allopathy' ? Stethoscope : Leaf;
              const isAllopathy = hospital.type === 'allopathy';
              const name = isRtl ? hospital.nameAr : hospital.nameEn;
              const city = isRtl ? hospital.cityAr : hospital.cityEn;
              const overview = isRtl ? hospital.overviewAr : hospital.overviewEn;
              const specs = isRtl ? hospital.specialitiesAr : hospital.specialitiesEn;

              return (
                <div
                  key={hospital.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A96A]/35 hover:border-primary-green/40 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group glow-card-green"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <div>
                    {/* Upper row: Stream & Accreditations */}
                    <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-sans uppercase tracking-wider ${
                        isAllopathy 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}>
                        <Icon className="h-3.5 w-3.5" />
                        <span>{isAllopathy ? (isRtl ? 'طب حديث' : 'Allopathy') : (isRtl ? 'أيورفيدا' : 'Ayurveda')}</span>
                      </span>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full font-sans uppercase tracking-tight flex items-center gap-0.5 shadow-xs">
                          ⭐ {isRtl ? 'سعر مؤسسي مخفض' : 'Corporate Partner Rate'}
                        </span>
                        {hospital.accreditations.map((acc, i) => (
                          <span key={i} className="bg-primary-green text-white font-bold text-[10px] px-2 py-0.5 rounded-full font-sans uppercase tracking-tight">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hospital Name & Location */}
                    <h3 className="text-xl sm:text-2xl font-bold text-text-dark group-hover:text-primary-green transition-colors duration-200 mb-1 font-display">
                      {name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#D4A96A] font-bold font-sans mb-4">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{city}</span>
                    </div>

                    {/* Overview */}
                    <p className="text-text-muted text-sm leading-relaxed mb-4 font-sans">
                      {overview}
                    </p>

                    {/* Specialties pills */}
                    <div className="space-y-2 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-dark font-sans block">
                        {isRtl ? 'أبرز التخصصات الطبية:' : 'Primary Specialties:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {specs.slice(0, 3).map((sp, idx) => (
                          <span key={idx} className="bg-slate-100 border border-slate-200 text-text-dark text-xs font-semibold px-2.5 py-1 rounded-lg font-sans">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Best Rate Guarantee info note */}
                    <div className="bg-[#FAF7F2] border border-amber-500/20 rounded-2xl p-4 mb-6 text-xs text-text-muted flex flex-col gap-1">
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        🛡️ {isRtl ? 'ضمان السعر المؤسسي الأقل + دفع مباشر للمستشفى' : 'Best Institutional Rate Guaranteed + Direct Hospital Pay'}
                      </span>
                      <span>
                        {isRtl 
                          ? 'بصفتنا شريكاً رسمياً معتمداً، نضمن لك أسعاراً أقل بـ ١٥-٢٠٪ من حجز الأفراد المباشر. الدفع يتم للمستشفى مباشرة مع كافة الخدمات اللوجستية المجانية.' 
                          : 'As an official network partner, you receive 15-20% institutional discount off direct walk-in international tariffs. All clinical bills paid directly to the hospital.'}
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(isRtl ? `مرحباً علاج في كيرلا، أود الحصول على عرض السعر المؤسسي المخفض لمستشفى: ${name}` : `Hello TreatInKerala, I would like to request the discounted corporate partner rate estimate for: ${name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm hover:shadow-md transition-all font-sans min-h-[40px] cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 text-white" />
                      <span>{isRtl ? 'حجز واستشارة عبر واتساب' : 'WhatsApp to Book'}</span>
                    </a>

                    <Link
                      href="/get-estimate"
                      className="inline-flex items-center gap-1 text-xs font-bold text-text-muted hover:text-primary-green transition-colors min-h-[40px] font-sans"
                    >
                      <span>{isRtl ? 'احصل على تسعيرة' : 'Get Free Estimate'}</span>
                      <ChevronRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Result */
          <div className="text-center py-20 bg-white border border-[#D4A96A]/35 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-xs px-6 mb-16">
            <Building2 className="h-12 w-12 text-[#D4A96A]/60 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-dark font-sans">
                {isRtl ? 'لم نعثر على مستشفيات مطابقة' : 'No hospitals match your search'}
              </h3>
              <p className="text-text-muted text-sm font-sans max-w-sm mx-auto">
                {isRtl 
                  ? 'جرب البحث باستخدام كلمة مفتاحية أخرى أو تغيير تصفية نوع الطب.' 
                  : 'Try searching for other specialties, cities or adjusting your stream filter.'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveType('all');
              }}
              className="bg-primary-green hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-sm font-sans cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{isRtl ? 'إعادة ضبط البحث' : 'Reset Filters'}</span>
            </button>
          </div>
        )}

        {/* Global CTA */}
        <div className="bg-primary-dark text-white rounded-3xl p-8 lg:p-12 border border-accent-gold/20 text-center space-y-6 max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary-green/20 to-transparent -z-10 opacity-70"></div>
          <h3 className="text-2xl sm:text-3xl font-semibold font-display">
            {isRtl ? 'هل تحتاج لمساعدة في اختيار المستشفى؟' : 'Need help selecting the best hospital?'}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {isRtl
              ? 'تواصل مباشرة مع مستشارينا الطبيين في كيرلا لمراجعة تقاريرك مجاناً وترشيح الطبيب والمستشفى الأنسب لحالتك.'
              : 'Chat directly with our medical consultants in Kerala to get free report reviews and custom hospital recommendations.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-3 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 cursor-pointer font-sans w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 text-white shrink-0" />
              <span>{isRtl ? 'استشارة مجانية عبر واتساب' : 'Consult via WhatsApp'}</span>
            </a>
            
            <Link
              href="/get-estimate"
              className="bg-primary-green hover:bg-white hover:text-primary-green text-white font-bold px-7 py-3 rounded-full text-base shadow-md hover:shadow-lg transition-all duration-300 min-h-[44px] flex items-center justify-center cursor-pointer font-sans w-full sm:w-auto"
            >
              <span>{isRtl ? 'احصل على عرض سعر متكامل' : 'Request Free Estimate'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
