import {
  Camera,
  Video,
  CalendarClock,
  MessageSquareHeart,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

export const PREVIEW_IMAGES = [
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830015872_06acc4f9.png',
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830006636_f91956a6.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830017458_a88d4739.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830008031_f5234390.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830009011_52f5d4a6.jpg',
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830022160_f7f147ef.png',
];

export const HERO_BG =
  'https://d64gsuwffb70l.cloudfront.net/6a43d36580360f5deac41024_1782830062002_06954554.png';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Camera,
    title: 'Exclusive Photo Sets',
    description: 'High-resolution premium galleries you won’t find anywhere else.',
    image: PREVIEW_IMAGES[0],
  },
  {
    icon: Video,
    title: 'Private Videos',
    description: 'Subscriber-only video drops, full-length and uncut.',
    image: PREVIEW_IMAGES[1],
  },
  {
    icon: CalendarClock,
    title: 'Daily Updates',
    description: 'Fresh content delivered every single day, no gaps.',
    image: PREVIEW_IMAGES[2],
  },
  {
    icon: MessageSquareHeart,
    title: 'VIP Messages',
    description: 'Direct, personal messages reserved for VIP members.',
    image: PREVIEW_IMAGES[3],
  },
  {
    icon: Sparkles,
    title: 'Limited Drops',
    description: 'Rare, time-limited collections before they vanish forever.',
    image: PREVIEW_IMAGES[4],
  },
];

export interface Plan {
  name: string;
  price: number;
  cadence: string;
  perks: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Monthly Access',
    price: 100,
    cadence: '/ month',
    perks: [
      'Full premium gallery access',
      'Private video library',
      'Daily content updates',
      'Cancel anytime',
    ],
  },
  {
    name: 'VIP Access',
    price: 200,
    cadence: '/ month',
    popular: true,
    perks: [
      'Everything in Monthly',
      'VIP direct messages',
      'Early access to drops',
      'Priority requests',
      'Exclusive behind-the-scenes',
    ],
  },
  {
    name: 'Lifetime Premium',
    price: 500,
    cadence: 'one-time',
    perks: [
      'Lifetime full access',
      'All future content included',
      'All VIP perks forever',
      'Never pay again',
    ],
  },
];

export interface Testimonial {
  name: string;
  handle: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Daniel R.',
    handle: '@danielr',
    text: 'Worth every cent. The quality and the daily drops are unreal. Best subscription I have.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    handle: '@marcust',
    text: 'VIP access is next level. Got verified and unlocked in minutes. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Alex P.',
    handle: '@alexp',
    text: 'Lifetime was a no-brainer. Exclusive content you literally cannot get anywhere else.',
    rating: 5,
  },
  {
    name: 'Chris M.',
    handle: '@chrism',
    text: 'Smooth payment, fast confirmation, premium feel throughout. Five stars.',
    rating: 5,
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'How do I get access after paying?',
    a: 'After your payment, fill out the verification form with your transaction details. Once confirmed, access instructions are sent to your email.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We currently accept Cash App and Bitcoin (BTC) only. Both are listed in the payment section with the exact details.',
  },
  {
    q: 'How long does verification take?',
    a: 'Most payments are reviewed within a few hours. You will receive your access instructions by email once confirmed.',
  },
  {
    q: 'Is my information private?',
    a: 'Absolutely. Your details are only used to confirm your payment and deliver access. We never share your data.',
  },
  {
    q: 'What is the difference between the plans?',
    a: 'Monthly gives full premium access, VIP adds direct messages and early drops, and Lifetime gives permanent access to everything forever.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Monthly and VIP plans can be cancelled anytime. Lifetime is a one-time payment with no recurring charges.',
  },
];
