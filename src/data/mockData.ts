export interface ElderProfile {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'other';
  village: string;
  district: string;
  state: string;
  abha_id: string;
  bpl_card: boolean;
  social_category: string;
  trusted_contact: {
    name: string;
    relation: string;
    phone: string;
    location: string;
  };
  chronic_conditions: string[];
  current_meds: string[];
  default_prompt: string;
  scenario_note: string;
}

export const PRESET_ELDERS: ElderProfile[] = [
  {
    id: 'eld_8921',
    name: 'Venkatamma',
    age: 72,
    gender: 'female',
    village: 'Kanaganapalle',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    abha_id: '91-4521-8902-3341',
    bpl_card: true,
    social_category: 'OBC',
    trusted_contact: {
      name: 'Ravi',
      relation: 'son',
      phone: '+91 98765 43210',
      location: 'Bengaluru (Tech Worker)',
    },
    chronic_conditions: ['Hypertension', 'Osteoarthritis'],
    current_meds: ['Amlong 5mg (Amlodipine)'],
    default_prompt: 'BP tablets aypoyayi, kallu thiruguthunnayi. Son in Bengaluru did not call this week, feeling quite lonely and knees ache when walking to the well.',
    scenario_note: '70+ Universal Ayushman Vaya Vandana (₹5L) + Amlong refill + Loneliness alert',
  },
  {
    id: 'eld_5204',
    name: 'Raghavan',
    age: 52,
    gender: 'male',
    village: 'Kodavalur',
    district: 'Nellore',
    state: 'Andhra Pradesh',
    abha_id: '91-1190-7822-4501',
    bpl_card: false,
    social_category: 'GENERAL',
    trusted_contact: {
      name: 'Priya',
      relation: 'daughter',
      phone: '+91 98112 34567',
      location: 'Hyderabad',
    },
    chronic_conditions: ['Pre-diabetes', 'Early Joint Stiffness'],
    current_meds: ['Glycomet 500mg', 'Calpol 650mg'],
    default_prompt: 'Need to check about government life insurance closing at age 50, sugar medicine Glycomet 500mg is finishing, and right knee hurts while climbing temple stairs.',
    scenario_note: 'Pre-Senior (50-55) PMJJBY Window Expiry Alert (₹2L life cover) + Jan Aushadhi Metformin switch',
  },
  {
    id: 'eld_6412',
    name: 'Kameshwar Prasad',
    age: 64,
    gender: 'male',
    village: 'Tekari',
    district: 'Gaya',
    state: 'Bihar',
    abha_id: '91-3481-9902-1256',
    bpl_card: true,
    social_category: 'SC',
    trusted_contact: {
      name: 'Sunita',
      relation: 'daughter-in-law',
      phone: '+91 97234 56789',
      location: 'Same village',
    },
    chronic_conditions: ['Hypertension', 'Acid Reflux'],
    current_meds: ['Telma 40mg', 'Pan 40mg'],
    default_prompt: 'High BP medicine Telma 40mg costs 110 rupees every 10 days, gas problem in stomach, and pension has not been credited for 2 months.',
    scenario_note: 'Statutory Senior (60+) Old Age Pension (₹3,000/mo) + Telma generic switch saving ₹96/mo',
  },
];

export const SAMPLE_AUDIO_PRESETS = [
  {
    id: 'audio_te_01',
    label: 'Telugu Spoken Note (Venkatamma)',
    duration: '0:24',
    transcript: 'BP tablets aypoyayi thalli, kallu thiruguthunnayi. Ma vadu Bengaluru lo untunnadu, phone chesi 8 days aindi.',
  },
  {
    id: 'audio_hi_02',
    label: 'Hindi Spoken Note (Kameshwar)',
    duration: '0:28',
    transcript: 'Telma 40mg ki dawa khatam ho gayi hai, pet mein jalan ho rahi hai aur pension abhi tak nahi aayi.',
  },
];
