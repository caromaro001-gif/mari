// =============================================================
// EDITABLE CONFIGURATION
// -------------------------------------------------------------
// Replace the placeholder values below with your real details.
// On Vercel / Next.js these map directly to env variables:
//   NEXT_PUBLIC_FORMSPREE_ENDPOINT
//   NEXT_PUBLIC_CASHAPP
//   NEXT_PUBLIC_BTC_ADDRESS
//   NEXT_PUBLIC_WHATSAPP
// In this Vite build we read from import.meta.env when present,
// otherwise fall back to the editable defaults here.
// =============================================================

const env = (import.meta as any)?.env ?? {};

export const SITE = {
  brand: 'MariiUtrera Premium',

  // Formspree endpoint, e.g. https://formspree.io/f/xxxxxxx
  formspreeEndpoint:
    env.VITE_FORMSPREE_ENDPOINT ||
    env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
    'https://formspree.io/f/xqevdjlg',

  // Cash App $cashtag
  cashApp: env.VITE_CASHAPP || env.NEXT_PUBLIC_CASHAPP || '$Jfern3000',

  // Bitcoin wallet address
  btcAddress:
    env.VITE_BTC_ADDRESS ||
    env.NEXT_PUBLIC_BTC_ADDRESS ||
    'bc1q085nuvlzmvlrpz5yzv9xvyazxepvfyrnss7fg3',

  // WhatsApp number in international format, digits only (e.g. 14155551234)
  whatsapp: env.VITE_WHATSAPP || env.NEXT_PUBLIC_WHATSAPP || '+14155984726',
};

export const whatsappLink = (message?: string) => {
  const text = encodeURIComponent(
    message || `Hi! I need help with ${SITE.brand} access.`
  );
  return `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${text}`;
};
