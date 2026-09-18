// Central site configuration. Real values as of launch; remaining swaps are
// listed in README.md.

export const site = {
  name: 'Rupom Morol',
  role: 'Graphic Designer',
  intro:
    'Brand identities and print design, shaped by 8 years of studio and freelance work.',
  yearsExperience: 8,
  fiverr: {
    level: 'Fiverr Level 2 Seller',
    url: 'https://www.fiverr.com/users/rupommoral10',
  },
  availability: 'Currently booking new projects', // or: 'Booked through <month>'
  email: 'abdullahyusufrupom@gmail.com',
  socials: [
    { label: 'WhatsApp', url: 'https://wa.me/8801641876853' },
    { label: 'Instagram', url: 'https://www.instagram.com/rupoommoral10/' },
    { label: 'Behance', url: 'https://www.behance.net/RupomsDesign' },
    { label: 'Behance · Print', url: 'https://www.behance.net/rupomm' },
  ],
  // Contact form is Netlify-native (data-netlify) : no third-party service.
  featuredCount: 6,
  // Ceiling, not a guarantee: home renders however many projects actually carry
  // featured: true, up to this number (may be fewer, handled gracefully).
} as const;
