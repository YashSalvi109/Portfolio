/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL personal content for the site lives in this file.
 *  Edit it and the whole site (plus SEO tags, sitemap and robots.txt) updates.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Sources: CV (primary, "Yash Salvi_CV.pdf") + LinkedIn export ("Profile.pdf").
 *  Where they conflicted, the CV wins. Fields marked `source: 'linkedin'` come
 *  only from LinkedIn.
 *
 *  PLACEHOLDERS
 *  ------------
 *  • A string that starts with "TODO:" is a placeholder.
 *  • Inside longer text, a placeholder is written as "[TODO: …]".
 *  In `npm run dev` placeholders are shown highlighted in amber so they are easy
 *  to spot. In production builds they are hidden automatically, so the live site
 *  never shows "TODO". Search this file for "TODO" to find everything left to do.
 *
 *  PRIVACY: never add a phone number or home address here.
 */

// ── Site / SEO ───────────────────────────────────────────────────────────────
export const site = {
  /** Public URL of the site, no trailing slash. Used for canonical, Open Graph, sitemap and robots.txt. */
  url: 'https://yash-salvi.vercel.app',
  title: 'Yash Salvi | Market Research & Consumer Insights',
  description:
    'Yash Salvi is a London-based market research and consumer insights professional turning consumer behaviour, brand perceptions and market data into brand, product and go-to-market recommendations.',
  /** Social share image (1200x630) in /public. Regenerate with `npm run images`. */
  ogImage: '/og-image.jpg',
  locale: 'en_GB',
  keywords: [
    'Yash Salvi',
    'market research',
    'consumer insights',
    'brand strategy',
    'research associate',
    'London',
  ],
}

// ── Identity ─────────────────────────────────────────────────────────────────
export const profile = {
  name: 'Yash Salvi',
  firstName: 'Yash',
  headline: 'Market Research & Consumer Insights',
  location: 'London, UK',
  email: 'yashssalvi@outlook.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/yash-salvi-09/',
    github: 'https://github.com/YashSalvi109',
  },
  photo: {
    webp: '/profile.webp',
    fallback: '/profile.jpeg',
    alt: 'Yash Salvi',
  },
  /** Phrases cycled by the typing effect in the Hero. */
  roles: [
    'Research Associate',
    'Consumer Insights',
    'Brand Strategy',
    'Go-to-Market Strategy',
    'Mixed-Methods Research',
  ],
  tagline:
    'I turn consumer behaviour, brand perceptions and market data into clear commercial recommendations for global consumer brands.',
  /** Download CV button. Replace public/resume.pdf with the real CV (without phone number). */
  resume: {
    url: '/resume.pdf',
    fileName: 'Yash-Salvi-CV.pdf',
  },
  availability: 'Full right to work in the UK · Valid driving licence',
}

// ── About ────────────────────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    'I’m a market research and consumer insights professional with 1+ years of experience translating consumer behaviour, brand perceptions and market data into brand management, product, positioning and growth recommendations across international markets.',
    'I combine quantitative and qualitative evidence, from MaxDiff and perceptual mapping to expert interviews and usability observation, to identify consumer needs, evaluate commercial opportunities and influence brand decisions for global consumer businesses across FMCG, healthcare and retail.',
    'I bring analytical thinking, creative curiosity and an owner mindset, and I’m most at home in roles spanning market research, consumer insights and strategy, where rigorous research becomes commercially relevant action.',
  ],
  /** Headline numbers shown as animated stats. All taken from the CV. */
  stats: [
    { value: 2000, suffix: '+', label: 'consumers across UK, EMEA & APAC studies' },
    { value: 20, suffix: '%', label: 'reduction in fieldwork delays' },
    { value: 25, suffix: '%', label: 'fewer sample-collection failures' },
    { value: 12, suffix: '+', label: 'client-facing presentations' },
  ],
  sectors: ['FMCG', 'Healthcare', 'Retail'],
  clients: ['Unilever', 'Reckitt', 'P&G', 'Kenvue'],
}

// ── Experience ───────────────────────────────────────────────────────────────
export type Experience = {
  company: string
  role: string
  /** Specialism shown under the role (CV only). */
  focus?: string
  location: string
  /** Human-readable period, e.g. "Jun 2024 – Sep 2024". */
  period: string
  /** Sort key, YYYY-MM. Newest first on the site. */
  start: string
  current?: boolean
  /** 'cv' roles are shown as full, expandable cards; 'linkedin' roles are compact. */
  source: 'cv' | 'linkedin'
  summary: string
  highlights: string[]
  tags?: string[]
}

export const experience: Experience[] = [
  {
    company: 'MMR Research',
    role: 'Research Associate',
    focus: 'Mixed-Methods Research & Client Delivery',
    location: 'Remote',
    period: '2026 – Present',
    start: '2026-01',
    current: true,
    source: 'cv',
    summary:
      'Mixed-methods consumer research for global consumer brands including Unilever, Reckitt, P&G and Kenvue, turning evidence into product, positioning and launch recommendations.',
    highlights: [
      'Analysed consumer behaviour, brand perceptions and competitive positioning across multi-market studies for global consumer brands including Unilever, Reckitt, P&G & Kenvue, translating consumer evidence into product, positioning and launch recommendations.',
      'Evaluated 10–20 product features and claims using MaxDiff, perceptual mapping and consumer personas, identifying competitive white space and narrowing 3–4 alternative positioning routes to 1–2, with the lead route progressing into concept development.',
      'Owned 3 concurrent multi-market projects involving 2,000+ consumers across the UK, EMEA and APAC like a business owner, introducing earlier feasibility checks, shared quota tracking and partner reallocation to reduce fieldwork delays by 20% while meeting quality standards and deadlines.',
      'Developed research briefs, surveys, MaxDiff exercises and qualitative discussion guides, translating Brand, Product and Insights priorities into consumer research addressing product, claim and positioning decisions.',
      'Synthesised consumer evidence into commercial implications and recommendations across 12+ client-facing presentations, communicating consumer needs, trial & consumer activation opportunities and implications for brand and product decisions to stakeholders.',
      'Streamlined insight synthesis and reporting by testing Microsoft Copilot and automated reporting tools with analyst quality checks, reducing turnaround time by 15% and freeing 3–5 hours per report for deeper insight development.',
    ],
    tags: ['MaxDiff', 'Perceptual Mapping', 'Multi-market', 'Client Delivery', 'Microsoft Copilot'],
  },
  {
    company: 'Black Sheep Coffee',
    role: 'Crew Member',
    location: 'London Area, United Kingdom',
    period: 'Sep 2024 – Sep 2026',
    start: '2024-09',
    source: 'linkedin',
    summary: 'TODO: add a one-line description of the Black Sheep Coffee role',
    highlights: [],
  },
  {
    company: 'Cansford Laboratories',
    role: 'Project Consultant',
    focus: 'Market Research & Strategy Consulting',
    location: 'UK',
    period: 'Jun 2024 – Sep 2024',
    start: '2024-06',
    source: 'cv',
    summary:
      'Led an end-to-end commercial research workstream for a post-transplant home-testing product, improving launch readiness.',
    highlights: [
      'Led an end-to-end commercial research workstream for a post-transplant home-testing product, defining an ambiguous consumer problem and conducting 50+ hours of interviews and usability observations to identify barriers affecting commercial launch readiness.',
      'Identified 2–3 critical failure points across the consumer journey, including confidence in testing accuracy and practical sample-collection difficulties, using interviews, live observation and pathway mapping to determine root causes.',
      'Recommended changes to product messaging, kit packaging and patient instructions based on consumer behaviour and implementation cost, contributing to a 25% reduction in sample-collection failures during usability trials and strengthening go-to-market readiness.',
      'Influenced clinical, product and packaging stakeholders to adopt simplified consumer-facing instructions by demonstrating observed failure points while preserving clinically essential information.',
      'Coordinated specialist recruitment across hard-to-reach medical audiences and external partners, achieving a 95%+ interview completion rate while maintaining delivery requirements.',
      'Presented customer pathway maps and commercial recommendations to senior stakeholders, translating consumer, clinical and usability evidence into actions across product, positioning, messaging and commercialisation.',
      'Supported community management for the product’s patient and clinician user groups, moderating feedback channels and synthesising recurring themes into monthly insight reports that informed packaging and instruction updates.',
    ],
    tags: ['Healthcare', 'Usability Research', 'Pathway Mapping', 'Go-to-Market'],
  },
  {
    company: 'Lumina Datamatics Limited',
    role: 'Intern',
    location: 'Mumbai, Maharashtra, India',
    period: 'Jun 2022 – Jun 2023',
    start: '2022-06',
    source: 'linkedin',
    summary: 'TODO: add a one-line description of the Lumina Datamatics internship',
    highlights: [],
  },
  {
    company: 'Intent Global',
    role: 'Market Research Intern',
    focus: 'Survey Research & Data Analytics',
    location: 'Mumbai, India',
    period: 'Apr 2021 – Apr 2022',
    start: '2021-04',
    source: 'cv',
    summary:
      'Survey research and analytics across a 1,000+ respondent U&A study and quarterly brand-health tracking in 3 markets.',
    highlights: [
      'Analysed consumer behaviour, penetration, usage frequency and brand-switching patterns across a 1,000+ respondent U&A study in 3 markets, identifying differences across markets and consumer groups to inform market prioritisation.',
      'Evaluated quarterly brand-health tracking data, cleaning raw survey datasets and applying cross-tabulation and significance testing to distinguish meaningful shifts in consumer perceptions and competitive brand performance across reporting waves.',
      'Managed fieldwork and quota delivery across 3 markets, identifying demographic sample gaps and coordinating targeted recruitment with 2–3 external partners to achieve full completion on schedule without compromising sample quality.',
      'Prioritised targeted booster recruitment over quota relaxation or fieldwork extension when priority demographic groups fell short, accepting a 5–10% higher cost per complete to protect data quality, cross-market comparability and reporting deadlines.',
      'Analysed consumer datasets in Excel to identify behavioural and perception trends across reporting waves, translating statistical outputs into client-ready insights and contributing to approximately 20% faster reporting.',
      'Revised consumer-facing research materials after pilot interviews identified misunderstanding of key questions, simplifying technical terminology and visual communication to reduce clarification queries by 30–50% ahead of full launch.',
    ],
    tags: ['U&A', 'Brand Health', 'Significance Testing', 'Fieldwork Management'],
  },
  {
    company: 'EdVerb',
    role: 'Intern',
    location: 'Mumbai, Maharashtra, India',
    period: 'Feb 2021 – Mar 2021',
    start: '2021-02',
    source: 'linkedin',
    summary: 'TODO: add a one-line description of the EdVerb internship',
    highlights: [],
  },
  {
    company: 'Webtech Digital Solutions',
    role: 'Intern',
    location: 'Mumbai, Maharashtra, India',
    period: 'Nov 2020 – Mar 2021',
    start: '2020-11',
    source: 'linkedin',
    summary: 'TODO: add a one-line description of the Webtech Digital Solutions internship',
    highlights: [],
  },
]

// ── Projects & leadership ────────────────────────────────────────────────────
// Leave this array empty to hide the Projects section (and its nav link) automatically.
export type Project = {
  title: string
  organisation: string
  /** Used by the filter buttons. */
  category: string
  role?: string
  location: string
  period: string
  summary: string
  details: string[]
  tags: string[]
  /** Optional external link (case study, deck, article…). */
  link: string
}

export const projects: Project[] = [
  {
    title: 'Brand Launch Strategy: Flavoured Sparkling Water',
    organisation: 'University of Bath',
    category: 'Brand Strategy',
    location: 'UK',
    period: 'TODO: add project dates',
    summary:
      'Category evaluation and go-to-market plan for a premium no-added-sugar fruit-and-botanical sparkling water centred on guilt-free indulgence.',
    details: [
      'Evaluated the UK flavoured sparkling-water category using Mintel, Worldpanel, British Soft Drinks Association data, consumer surveys, focus groups and blind taste tests to identify priority consumer opportunities and unmet needs.',
      'Identified evidence that 70%+ of surveyed consumers actively avoided artificial sweeteners, shifting the proposed concept from a broad price-led flavoured water towards a premium no-added-sugar fruit-and-botanical proposition centred on guilt-free indulgence.',
      'Benchmarked Dash Water, San Pellegrino, Volvic, Trip and Something & Nothing to identify positioning white space between plain sparkling water and more indulgent soft drinks, with botanical variants preferred by 60–70% of the blind-taste panel.',
      'Developed a go-to-market strategy targeting urban, health-conscious consumers aged 22–38, combining willingness-to-pay evidence and competitor benchmarking to recommend £1.49–£1.69 pricing, phased distribution, sampling and retail promotions.',
      'Led media planning & buying for a simulated £50,000–£100,000 investment across social, influencer, Retailer Media and search channels, and outlined a digital commerce management approach linking channel allocation to awareness, trial, purchase intent and return-on-ad-spend objectives.',
    ],
    tags: ['Mintel', 'Worldpanel', 'Blind Taste Tests', 'Pricing', 'Media Planning'],
    link: 'TODO: add project link',
  },
  {
    title: 'Housing Support Outreach Programme',
    organisation: 'Ashman Foundation',
    category: 'Leadership & Volunteering',
    role: 'Assistant Supervisor (Volunteer)',
    location: 'TODO: confirm location',
    period: 'TODO: add dates',
    summary:
      'Led volunteer teams supporting widowed women experiencing housing vulnerability, from needs assessment to coordinated case progression.',
    details: [
      'Led 2 teams of 15 volunteers supporting widowed women experiencing housing vulnerability, coordinating targeted outreach campaigns and direct beneficiary engagement that increased programme enrolment[TODO: add enrolment %, CV says “by XX%”] across accommodation, safety and access-to-support needs.',
      'Conducted needs assessments through community visits, intake forms, structured interviews and follow-up feedback, gathering evidence on housing conditions, documentation barriers, scheme eligibility and immediate support requirements.',
      'Identified recurring barriers to housing support, including missing documentation and urgent accommodation risks, informing case prioritisation, documentation drives and local-language assistance.',
      'Coordinated local government bodies, partner organisations, legal-aid providers, donors and community representatives to progress housing-support cases, scheme applications, repairs and access to safer accommodation.',
    ],
    tags: ['Team Leadership', 'Needs Assessment', 'Stakeholder Coordination'],
    link: 'TODO: add project link',
  },
]

// ── Skills ───────────────────────────────────────────────────────────────────
export type SkillGroup = { name: string; skills: string[] }

export const skillGroups: SkillGroup[] = [
  {
    name: 'Consumer & Brand',
    skills: [
      'Consumer Behaviour',
      'Consumer Needs',
      'Brand Perceptions',
      'U&A',
      'Brand Health',
      'Concept Testing',
      'Consumer Segmentation',
      'Competitive Positioning',
      'Perceptual Mapping',
      'MaxDiff',
    ],
  },
  {
    name: 'Commercial & Strategic',
    skills: [
      'Marketing Strategy',
      'Market & Category Analysis',
      'Competitor Benchmarking',
      'Brand Positioning',
      'Product & Launch Strategy',
      'Pricing',
      'Go-to-Market Strategy',
      'Market Prioritisation',
      'Business Research', // LinkedIn
    ],
  },
  {
    name: 'Brand Building & Activation',
    skills: [
      'Product Proposition',
      'Consumer Messaging',
      'Target Consumer',
      'Sampling Strategy',
      'Influencer Marketing',
      'Media Planning',
      'Retailer Media',
      'Distribution & Channel Strategy',
    ],
  },
  {
    name: 'Brand & Growth',
    skills: [
      'Brand Management',
      'Consumer Behaviour',
      'Media Planning & Buying',
      'Digital Commerce Management',
      'Retailer Media',
      'Influencer Marketing',
      'Trial & Consumer Activation',
    ],
  },
  {
    name: 'Leadership & Execution',
    skills: [
      'Project Ownership',
      'Concurrent Project Management',
      'Prioritisation',
      'Problem-Solving',
      'External Partner Coordination',
      'Cross-Functional Collaboration',
      'Process Improvement',
    ],
  },
  {
    name: 'Communication & Influence',
    skills: [
      'Commercial Recommendations',
      'PowerPoint Storytelling',
      'Client Presentations',
      'Senior Stakeholder Communication',
      'Insight Synthesis',
      'Visual Communication',
    ],
  },
  {
    name: 'Data & Tools',
    skills: [
      'Advanced Excel',
      'PowerPoint',
      'SPSS',
      'Qualtrics',
      'Forsta',
      'Microsoft Copilot',
      'Mintel',
      'Kantar Worldpanel',
      'Raw Data Analysis',
      'R (Programming Language)', // LinkedIn
    ],
  },
  {
    name: 'Languages',
    skills: ['Spanish'], // LinkedIn. TODO: add other languages (e.g. proficiency levels) if he wants them listed
  },
]

// ── Education ────────────────────────────────────────────────────────────────
export type Education = {
  degree: string
  institution: string
  grade?: string
  location: string
  period: string
}

export const education: Education[] = [
  {
    degree: 'MSc Management',
    institution: 'University of Bath',
    grade: 'Merit',
    location: 'Bath, UK',
    period: 'Oct 2023 – Oct 2024',
  },
  {
    degree: 'B.E. Electronics Engineering',
    institution: 'University of Mumbai',
    grade: 'Distinction',
    location: 'Mumbai, India',
    period: 'Aug 2018 – May 2022',
  },
  {
    degree: 'High School, Science',
    institution: 'RIMS International School and Junior College',
    location: 'TODO: confirm location',
    period: '2016 – 2018',
  },
]

// ── Certifications & professional development ────────────────────────────────
export type Certification = {
  name: string
  issuer: string
  /** Optional badge, e.g. "Winner". */
  note?: string
  /** Optional verification link. */
  link?: string
}

export const certifications: Certification[] = [
  { name: 'Market Research Specialization', issuer: 'UC Davis', link: 'TODO: add credential link' },
  { name: 'Big Team Challenge', issuer: 'IBM', note: 'Winner' },
  { name: 'Excel for Marketers', issuer: 'HubSpot', link: 'TODO: add credential link' },
  { name: 'Inbound Sales Certification', issuer: 'HubSpot', link: 'TODO: add credential link' },
  { name: 'AMPM Member', issuer: 'TODO: confirm full name of AMPM body' },
]

// ── Contact ──────────────────────────────────────────────────────────────────
export const contact = {
  heading: 'Let’s talk',
  blurb:
    'Open to roles and conversations in market research, consumer insights and strategy. Send a message and I’ll get back to you.',
  /** Vercel serverless function that emails the message via Resend. */
  formEndpoint: '/api/contact',
}
