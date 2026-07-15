export const SITE_CONFIG = {
  // Main coordination contact information
  phone: '+91 94000 18008',
  phoneRaw: '+919400018008',
  whatsappRaw: '919400018008',
  email: 'treatinkerala@gmail.com',

  // Pricing policies
  coordinationFeeEn: 'COMPLIMENTARY',
  coordinationFeeAr: 'مجاني ✓',

  // Staging / Dev contact details
  officeAddressEn: 'Hilite Business Park, Near Bypass Junction, Calicut (Kozhikode), Kerala, India',
  officeAddressAr: 'طريق هيلاند، بالقرب من المستشفى التخصصي، كالكوت (كوزيكود)، كيرلا، الهند',

  // Live Stats — base count resets on the 1st of every month.
  // Use getMonthlyPatientsServed() wherever you need the live figure.
  monthlyPatientsBase: 80,
};

/**
 * Returns a deterministic patient count that:
 *  - Resets to `monthlyPatientsBase` on the 1st of every month
 *  - Grows by 3–9 patients per day (seeded by year+month+day so it is
 *    always the same number for the same calendar day, but never needs
 *    a cron job or database)
 */
export function getMonthlyPatientsServed(): number {
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();   // 0-based
  const day   = now.getDate();    // 1-based; day 1 = start of month

  let total = SITE_CONFIG.monthlyPatientsBase;
  // Add a seeded-random increment for each elapsed day after the 1st
  for (let d = 2; d <= day; d++) {
    // Simple deterministic seed: produces 0-6, then adds 3 → range 3-9 per day
    const seed = (year * 10000 + month * 100 + d) % 7;
    total += 3 + seed;
  }
  return total;
}
