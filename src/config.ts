// Central site configuration. Every PLACEHOLDER here is swapped in one pass
// at launch — see the spec's "Known facts" section.

export const site = {
  name: 'Rupom Morol',
  role: 'Graphic Designer',
  intro:
    'Brand identities and print design, shaped by 8 years of studio and freelance work.',
  yearsExperience: 8,
  fiverr: {
    level: 'Fiverr Level 2 Seller',
    url: '', // PLACEHOLDER — swap at launch (Fiverr profile URL)
  },
  availability: 'Currently booking new projects', // or: 'Booked through March 2027'
  email: 'hello@example.com', // PLACEHOLDER — swap at launch
  socials: [
    { label: 'Behance', url: '' }, // PLACEHOLDER — swap at launch
    { label: 'Instagram', url: '' }, // PLACEHOLDER — swap at launch
    { label: 'LinkedIn', url: '' }, // PLACEHOLDER — swap at launch
  ],
  formspreeId: '', // set at launch to activate the contact form; '' renders the email fallback
  // Ceiling, not a guarantee: home renders however many projects actually carry
  // featured: true, up to this number (may be fewer — that's handled gracefully).
  featuredCount: 6,
} as const;
