import { getIherbUrl } from './config';

export interface RecoveryProduct {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  category: string;
  categoryAr: string;
  benefit: string;
  benefitAr: string;
  rating: number;
  reviewCount: number;
  estimatedPrice: string;
  searchQuery: string;
  imageUrl: string;
  badge?: string;
  badgeAr?: string;
  treatmentSlugs: string[];
}

export const RECOVERY_PRODUCTS: RecoveryProduct[] = [
  // 1. CARDIAC RECOVERY
  {
    id: 'cardiac-coq10',
    name: 'CoQ10 (Ubiquinol / Coenzyme Q10) 200mg',
    nameAr: 'مساعد الإنزيم كيو-10 عالي الامتصاص ٢٠٠ ملغ',
    brand: 'California Gold Nutrition / Doctor\'s Best',
    category: 'Cardiovascular Support',
    categoryAr: 'صحة القلب والشرايين',
    benefit: 'Supports cellular energy production and cardiovascular recovery post-cardiac surgery.',
    benefitAr: 'يدعم إنتاج الطاقة الخلوية وتسريع تعافي عضلة القلب بعد جراحات القلب والقسطرة.',
    rating: 4.8,
    reviewCount: 14200,
    estimatedPrice: '$22 – $34',
    searchQuery: 'CoQ10 200mg',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    badge: 'Cardiologist Recommended',
    badgeAr: 'موصى به لمرضى القلب',
    treatmentSlugs: ['cardiac']
  },
  {
    id: 'cardiac-omega3',
    name: 'Triple Strength Omega-3 EPA & DHA Fish Oil',
    nameAr: 'أوميغا-3 ثلاثي القوة زيت سمك نقي',
    brand: 'Sports Research / Solgar',
    category: 'Heart & Vascular Flow',
    categoryAr: 'تدفق الدم ومرونة الشرايين',
    benefit: 'Pharmaceutical grade molecularly distilled fish oil for arterial flexibility and lipid balance.',
    benefitAr: 'زيت سمك نقي مقطر جزيئياً لتعزيز مرونة الأوعية الدموية وتوازن الدهون الثلاثية.',
    rating: 4.9,
    reviewCount: 38500,
    estimatedPrice: '$24 – $38',
    searchQuery: 'Triple Strength Omega 3 Fish Oil',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&auto=format&fit=crop&q=80',
    badge: 'Best Seller',
    badgeAr: 'الأكثر مبيعاً',
    treatmentSlugs: ['cardiac', 'neurosurgery', 'ophthalmology']
  },
  {
    id: 'cardiac-magnesium',
    name: 'High-Absorption Magnesium Glycinate 200mg',
    nameAr: 'مغنيسيوم جلايسينات عالي الامتصاص ٢٠٠ ملغ',
    brand: 'Doctor\'s Best / NOW Foods',
    category: 'Muscle & Rhythm Relaxation',
    categoryAr: 'استرخاء العضلات وانتظام النبض',
    benefit: 'Chelated magnesium for heart muscle relaxation, steady rhythm, and deep restorative sleep.',
    benefitAr: 'مغنيسيوم مخلب مهدئ لعضلة القلب، يدعم انتظام ضربات القلب والنوم الهادئ بعد الجراحة.',
    rating: 4.8,
    reviewCount: 22100,
    estimatedPrice: '$16 – $26',
    searchQuery: 'High Absorption Magnesium Glycinate',
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['cardiac', 'ayurveda', 'orthopaedics']
  },

  // 2. ORTHOPAEDIC & JOINT RECOVERY
  {
    id: 'ortho-joint-complex',
    name: 'Glucosamine, Chondroitin, MSM & Hyaluronic Acid',
    nameAr: 'مركب الجلوكوزامين والكوندرويتين مع حمض الهيالورونيك',
    brand: 'Doctor\'s Best / Solgar',
    category: 'Joint Cartilage Repair',
    categoryAr: 'ترميم غضاريف المفاصل',
    benefit: 'Targeted joint lubrication and cartilage regeneration after knee or hip arthroplasty.',
    benefitAr: 'تزييت المفاصل وتحفيز تجديد الغضاريف بعد عمليات استبدال الركبة والورك.',
    rating: 4.7,
    reviewCount: 19800,
    estimatedPrice: '$28 – $45',
    searchQuery: 'Glucosamine Chondroitin MSM Joint Support',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80',
    badge: 'Orthopaedic Choice',
    badgeAr: 'خيار أطباء العظام',
    treatmentSlugs: ['orthopaedics']
  },
  {
    id: 'ortho-collagen',
    name: 'Multi-Collagen Peptides (Type I, II, III, V, X)',
    nameAr: 'ببتيدات الكولاجين المتعدد (النوع ١ و ٢ و ٣)',
    brand: 'Sports Research / Vital Proteins',
    category: 'Connective Tissue Recovery',
    categoryAr: 'إعادة بناء الأنسجة والأوتار',
    benefit: 'Hydrolyzed peptides for rapid ligament, tendon, and post-surgical wound healing.',
    benefitAr: 'ببتيدات متحللة مائياً لسرعة التئام الأربطة والأوتار والشقوق الجراحية بعد العمليات.',
    rating: 4.9,
    reviewCount: 31200,
    estimatedPrice: '$32 – $48',
    searchQuery: 'Collagen Peptides Hydrolyzed',
    imageUrl: 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=600&auto=format&fit=crop&q=80',
    badge: 'Rapid Healing',
    badgeAr: 'التئام سريع',
    treatmentSlugs: ['orthopaedics', 'dental']
  },
  {
    id: 'ortho-calcium-d3',
    name: 'Bone Strength Complex: Calcium Citrate + D3 & K2 (MK-7)',
    nameAr: 'مركب تقوية العظام: كالسيوم مع فيتامين د٣ وفيتامين ك٢',
    brand: 'NOW Foods / Life Extension',
    category: 'Bone Mineral Density',
    categoryAr: 'كثافة المعادن والعظام',
    benefit: 'Directs calcium into bone matrix rather than arteries, essential post-implant stabilization.',
    benefitAr: 'يوجه الكالسيوم مباشرة إلى العظام لتثبيت المفاصل الاصطناعية والغرسات بأعلى كفاءة.',
    rating: 4.8,
    reviewCount: 16400,
    estimatedPrice: '$18 – $29',
    searchQuery: 'Calcium D3 K2 Bone Complex',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['orthopaedics', 'dental']
  },

  // 3. AYURVEDA & HOLISTIC WELLNESS
  {
    id: 'ayurveda-ashwagandha',
    name: 'Organic KSM-66 Ashwagandha (Full Spectrum Root)',
    nameAr: 'عشبة الأشواغاندا العضوية KSM-66 كاملة الطيف',
    brand: 'Organic India / Doctor\'s Best',
    category: 'Adaptogen & Stress Relief',
    categoryAr: 'تخفيف التوتر وإعادة التوازن',
    benefit: 'Authentic Indian adaptogen for cortisol regulation, adrenal recovery, and deep vitality.',
    benefitAr: 'مكيف هندي أصيل لخفض هرمون التوتر وتجديد الطاقة والحيوية بعد جلسات البانشاكارما.',
    rating: 4.9,
    reviewCount: 26700,
    estimatedPrice: '$18 – $28',
    searchQuery: 'Organic KSM-66 Ashwagandha',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    badge: 'Ayurvedic Classic',
    badgeAr: 'أيورفيدا كلاسيكي',
    treatmentSlugs: ['ayurveda', 'fertility']
  },
  {
    id: 'ayurveda-triphala',
    name: 'Organic Certified Triphala Detox & Digestion',
    nameAr: 'تريفالا العضوية المعتمدة لتنقية الهضم والسموم',
    brand: 'Organic India / Planetary Herbals',
    category: 'Ayurvedic Colon Cleansing',
    categoryAr: 'تنظيف الجهاز الهضمي والسموم',
    benefit: 'Three sacred Ayurvedic fruits (Amalaki, Bibhitaki, Haritaki) for gentle daily gut detox.',
    benefitAr: 'تركيبة الفواكه الهندية الثلاث المقدسة لتطهير القولون وتعزيز الهضم الطبيعي المتوازن.',
    rating: 4.7,
    reviewCount: 11900,
    estimatedPrice: '$14 – $22',
    searchQuery: 'Organic Triphala Capsules',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['ayurveda', 'gastroenterology']
  },
  {
    id: 'ayurveda-curcumin',
    name: 'Curcumin 95% Standardized + BioPerine',
    nameAr: 'مستخلص الكركمين عالي النقاء ٩٥٪ مع البيوبيرين',
    brand: 'Doctor\'s Best / Solgar',
    category: 'Natural Anti-Inflammatory',
    categoryAr: 'مضاد التهاب طبيعي قوي',
    benefit: 'Gold-standard turmeric extract for systemic inflammation reduction and joint comfort.',
    benefitAr: 'مستخلص كركم فائق الامتصاص لتخفيف آلام المفاصل والالتهابات وتطهير الجسم الطبيعي.',
    rating: 4.8,
    reviewCount: 28400,
    estimatedPrice: '$20 – $34',
    searchQuery: 'Curcumin with BioPerine',
    imageUrl: 'https://images.unsplash.com/photo-1615485290196-857501a3556d?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['ayurveda', 'orthopaedics', 'oncology']
  },

  // 4. IVF & FERTILITY ESSENTIALS
  {
    id: 'fertility-prenatal',
    name: 'Advanced Prenatal Multi + DHA & Methylfolate',
    nameAr: 'فيتامينات ما قبل الحمل المتقدمة مع ميثيل فولات وDHA',
    brand: 'Nature Made / Thorne',
    category: 'Reproductive Readiness',
    categoryAr: 'التهيئة الإنجابية وصحة البويضات',
    benefit: 'Clinically balanced methylated nutrients essential for egg quality and pre-IVF preparation.',
    benefitAr: 'عناصر غذائية ميثيلية متوازنة سريرياً لتحسين جودة البويضات وبطانة الرحم قبل دورة الأنابيب.',
    rating: 4.8,
    reviewCount: 18700,
    estimatedPrice: '$26 – $42',
    searchQuery: 'Prenatal Multivitamin Methylfolate DHA',
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80',
    badge: 'Fertility Must-Have',
    badgeAr: 'أساسي لبرامج الخصوبة',
    treatmentSlugs: ['fertility']
  },
  {
    id: 'fertility-inositol',
    name: 'Myo-Inositol & D-Chiro Inositol (40:1 Ratio)',
    nameAr: 'ميو-إينوزيتول مع دي-كايرو إينوزيتول بنسبة ٤٠:١',
    brand: 'Wholesome Story / Fairhaven Health',
    category: 'Ovarian & Cycle Balance',
    categoryAr: 'توازن التبويض والمبايض',
    benefit: 'Supports healthy ovarian response, egg quality, and metabolic balance for fertility patients.',
    benefitAr: 'يدعم توازن الهرمونات وجودة التبويض واستجابة المبايض لبروتوكولات التلقيح الصناعي.',
    rating: 4.9,
    reviewCount: 15300,
    estimatedPrice: '$24 – $36',
    searchQuery: 'Myo-Inositol D-Chiro Inositol 40:1',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['fertility']
  },

  // 5. ONCOLOGY NUTRITIONAL SUPPORT
  {
    id: 'onco-mushroom',
    name: '7-Mushroom Immune Defense (Reishi, Turkey Tail, Maitake)',
    nameAr: 'مركب ٧ فطريات طبية لدعم المناعة والتعافي (ريشي وتيركي تيل)',
    brand: 'Host Defense / Real Mushrooms',
    category: 'Immune & Cellular Resilience',
    categoryAr: 'تعزيز المناعة والمقاومة الخلوية',
    benefit: 'Beta-glucan rich medicinal mushroom extracts for immune recovery alongside clinical oncology.',
    benefitAr: 'مستخلصات فطر طبي غنية بالبيتا جلوكان لدعم الجهاز المناعي والتكيف أثناء خطط العلاج.',
    rating: 4.9,
    reviewCount: 9400,
    estimatedPrice: '$32 – $52',
    searchQuery: 'Turkey Tail Reishi Mushroom Complex',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    badge: 'Immune Support',
    badgeAr: 'دعم المناعة',
    treatmentSlugs: ['oncology']
  },
  {
    id: 'onco-liposomal-c',
    name: 'Liposomal Vitamin C 1000mg High Bioavailability',
    nameAr: 'فيتامين سي ليبوزومي ١٠٠٠ ملغ فائق الامتصاص',
    brand: 'Aurora Nutrascience / Dr. Mercola',
    category: 'Cellular Antioxidant Defense',
    categoryAr: 'مضاد أكسدة وحماية خلوية',
    benefit: 'Phospholipid-encapsulated Vitamin C that bypasses digestive breakdown for direct cellular delivery.',
    benefitAr: 'فيتامين سي مغلف بالدهون الفوسفورية لامتصاص مباشر وحماية الخلايا ومكافحة الإجهاد التأكسدي.',
    rating: 4.8,
    reviewCount: 12800,
    estimatedPrice: '$28 – $46',
    searchQuery: 'Liposomal Vitamin C Liquid or Capsules',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['oncology', 'dental']
  },

  // 6. NEUROSURGERY & BRAIN HEALTH
  {
    id: 'neuro-lions-mane',
    name: 'Organic Lion\'s Mane Mushroom (Neuro-Regeneration)',
    nameAr: 'فطر عرف الأسد العضوي لدعم الأعصاب والتركيز الذهني',
    brand: 'Real Mushrooms / Host Defense',
    category: 'Nerve Growth Factor Support',
    categoryAr: 'تحفيز عوامل نمو الأعصاب',
    benefit: 'Stimulates Nerve Growth Factor (NGF) synthesis for post-neurosurgery neurological rehab.',
    benefitAr: 'يحفز تجديد الخلايا العصبية ويعزز صفاء الذهن واستعادة الوظائف العصبية بعد الجراحات.',
    rating: 4.9,
    reviewCount: 16900,
    estimatedPrice: '$24 – $38',
    searchQuery: 'Organic Lions Mane Mushroom Extract',
    imageUrl: 'https://images.unsplash.com/photo-1512867697637-29509f62e8ec?w=600&auto=format&fit=crop&q=80',
    badge: 'Neuro Choice',
    badgeAr: 'خيار صحة الأعصاب',
    treatmentSlugs: ['neurosurgery']
  },
  {
    id: 'neuro-magnesium-l-threonate',
    name: 'Magnesium L-Threonate (Brain Cross-Barrier)',
    nameAr: 'مغنيسيوم إل-ثريونات العابر للحاجز الدماغي',
    brand: 'Life Extension / NOW Foods',
    category: 'Cognitive & Synaptic Function',
    categoryAr: 'الوظائف الإدراكية والروابط العصبية',
    benefit: 'The only magnesium form clinically proven to cross the blood-brain barrier for neural healing.',
    benefitAr: 'الشكل الوحيد من المغنيسيوم القادر على عبور الحاجز الدموي الدماغي لتسريع التعافي العصبي.',
    rating: 4.8,
    reviewCount: 11400,
    estimatedPrice: '$32 – $48',
    searchQuery: 'Magnesium L-Threonate Magtein',
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['neurosurgery']
  },

  // 7. GASTROENTEROLOGY & DIGESTIVE HEALING
  {
    id: 'gastro-probiotics',
    name: '50 Billion CFU Shelf-Stable Multi-Strain Probiotics',
    nameAr: 'بروبيوتيك ٥٠ مليار مستعمرة بكتيريا نافعة متعددة السلالات',
    brand: 'California Gold Nutrition / Garden of Life',
    category: 'Microbiome Restoration',
    categoryAr: 'استعادة توازن ميكروبيوم الأمعاء',
    benefit: 'Essential gut flora restoration following antibiotics, therapeutic endoscopy, or gastro surgery.',
    benefitAr: 'إعادة بناء البكتيريا النافعة في الأمعاء بعد المضادات الحيوية وجراحات الجهاز الهضمي.',
    rating: 4.8,
    reviewCount: 36500,
    estimatedPrice: '$22 – $36',
    searchQuery: '50 Billion Probiotics Multi Strain',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    badge: 'Gut Health',
    badgeAr: 'صحة الجهاز الهضمي',
    treatmentSlugs: ['gastroenterology', 'ayurveda']
  },
  {
    id: 'gastro-zinc-carnosine',
    name: 'Zinc-L-Carnosine Gastric Lining Shield',
    nameAr: 'زنك إل-كارنوزين لحماية وترميم بطانة المعدة',
    brand: 'Doctor\'s Best / Integrative Therapeutics',
    category: 'Mucosal Membrane Repair',
    categoryAr: 'ترميم الغشاء المخاطي للمعدة',
    benefit: 'Targeted adhesion to damaged stomach and intestinal lining to soothe ulcers and speed recovery.',
    benefitAr: 'يلتصق بمناطق التهيج في بطانة المعدة والأمعاء لتسريع شفاء القرح والتهابات الجهاز الهضمي.',
    rating: 4.8,
    reviewCount: 8800,
    estimatedPrice: '$18 – $30',
    searchQuery: 'Zinc Carnosine PepZin GI',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    treatmentSlugs: ['gastroenterology']
  },

  // 8. OPHTHALMOLOGY & VISION RECOVERY
  {
    id: 'eye-lutein-zeaxanthin',
    name: 'Lutein & Zeaxanthin with Astaxanthin Eye Shield',
    nameAr: 'لوتين وزياكسانثين مع الأستازانتين لحماية العين والقرنية',
    brand: 'Doctor\'s Best / Jarrow Formulas',
    category: 'Macular & Retinal Protection',
    categoryAr: 'حماية شبكية العين والقرنية',
    benefit: 'High-potency carotenoid formula supporting visual recovery after LASIK or cataract procedures.',
    benefitAr: 'كاروتينات عالية النقاوة لتسريع تعافي القرنية وحماية شبكية العين بعد جراحات الليزك والمياه البيضاء.',
    rating: 4.8,
    reviewCount: 14100,
    estimatedPrice: '$19 – $32',
    searchQuery: 'Lutein Zeaxanthin Astaxanthin Eye Health',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
    badge: 'Vision Shield',
    badgeAr: 'حماية النظر',
    treatmentSlugs: ['ophthalmology']
  }
];

export function getRecoveryProductsForTreatment(slug: string): RecoveryProduct[] {
  const matching = RECOVERY_PRODUCTS.filter(p => p.treatmentSlugs.includes(slug));
  if (matching.length > 0) return matching;
  return RECOVERY_PRODUCTS.slice(0, 3);
}

export function getRecoveryProductsForBlog(blogSlug: string, category: string = ''): RecoveryProduct[] {
  const lower = (blogSlug + ' ' + category).toLowerCase();
  if (lower.includes('ayurveda') || lower.includes('panchakarma') || lower.includes('herb')) {
    return RECOVERY_PRODUCTS.filter(p => p.treatmentSlugs.includes('ayurveda'));
  }
  if (lower.includes('cardiac') || lower.includes('bypass') || lower.includes('heart')) {
    return RECOVERY_PRODUCTS.filter(p => p.treatmentSlugs.includes('cardiac'));
  }
  if (lower.includes('joint') || lower.includes('knee') || lower.includes('ortho')) {
    return RECOVERY_PRODUCTS.filter(p => p.treatmentSlugs.includes('orthopaedics'));
  }
  if (lower.includes('supplement') || lower.includes('recovery')) {
    return [
      RECOVERY_PRODUCTS.find(p => p.id === 'ortho-collagen')!,
      RECOVERY_PRODUCTS.find(p => p.id === 'cardiac-coq10')!,
      RECOVERY_PRODUCTS.find(p => p.id === 'gastro-probiotics')!
    ].filter(Boolean);
  }
  // Default to top 3 broad wellness items
  return [
    RECOVERY_PRODUCTS.find(p => p.id === 'cardiac-omega3')!,
    RECOVERY_PRODUCTS.find(p => p.id === 'ayurveda-ashwagandha')!,
    RECOVERY_PRODUCTS.find(p => p.id === 'ortho-joint-complex')!
  ].filter(Boolean);
}

export function getProductReferralUrl(product: RecoveryProduct): string {
  return getIherbUrl(product.searchQuery);
}
