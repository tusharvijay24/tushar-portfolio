export const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Apps', id: 'apps' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export const metrics = [
  { value: '10+', label: 'Production apps shipped' },
  { value: '5+', label: 'Years building iOS apps' },
  { value: '8+', label: 'App Store products' },
  { value: '2+', label: 'Web products in production' },
];

export const appProjects = [
  {
    name: 'Cravingly',
    category: 'Food Ordering',
    summary: 'Community food ordering platform with nearby home-cook discovery, MapKit flows, Firebase-backed engagement, checkout, and order tracking.',
    stack: ['Objective-C', 'UIKit', 'MVVM', 'StoreKit', 'Deep Links'],
    outcome: 'Led iOS development across discovery, search, privacy-ready release flows, push notifications, and App Store compliance.',
    link: 'https://apps.apple.com/us/app/cravingly/id6633424731',
    accent: 'from-rose-500 to-orange-400',
  },
  {
    name: 'SIPN Bourbon',
    category: 'Social Commerce',
    summary: 'Social liquor commerce experience with interactive feeds, shoppable collections, brand discovery, and community-led purchase journeys.',
    stack: ['Swift', 'UIKit', 'MVVM', 'Firebase', 'Alamofire'],
    outcome: 'Built interactive feed, Virtual Bar, community modules, cocktail recipes, and shoppable content for in-app purchase journeys.',
    link: 'https://apps.apple.com/in/app/sipn-bourbon/id1597312660',
    accent: 'from-amber-500 to-red-500',
  },
  {
    name: 'Ixkio',
    category: 'NFC Platform',
    summary: 'NFC tag management app combining CoreNFC, Vision, QR and barcode scanning with secure read, write, lock, and validation workflows.',
    stack: ['Swift', 'CoreNFC', 'Vision', 'QR/Barcode', 'Security'],
    outcome: 'Architected reliable NFC read, write, and lock flows for NTAG and ICODE tags with QR/barcode scanning support.',
    link: 'https://apps.apple.com/us/app/ixkio/id6467871130',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'VECV Evolve',
    category: 'Enterprise HRMS',
    summary: 'Employee platform for Volvo Eicher covering leave management, cab booking, HR workflows, internal communication, and engagement modules.',
    stack: ['Swift', 'UIKit', 'REST APIs', 'Enterprise', 'MVVM'],
    outcome: 'Shipped enterprise workflows used by employees across core HR operations.',
    link: 'https://apps.apple.com/in/app/vecvevolve-empower-yourself/id1208034545',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Eicher CRM',
    category: 'CRM Analytics',
    summary: 'Enterprise CRM app for sales, services, spares, complaints, on-road support, and KPI visibility across operational teams.',
    stack: ['Swift', 'UIKit', 'Analytics', 'REST APIs', 'Dashboards'],
    outcome: 'Delivered KPI visibility across sales, service, spares, complaints, and on-road support for management and dealer teams.',
    link: 'https://apps.apple.com/in/app/eicher-crm/id1467873868',
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    name: 'BC Starter',
    category: 'Retail Commerce',
    summary: 'White-label retail commerce app with barcode scanning, varietal filters, multi-location ordering, secure payments, and rewards.',
    stack: ['Swift', 'SwiftUI', 'MVVM', 'Stripe', 'WorldPay'],
    outcome: 'Delivered white-label retail flows with barcode scan, filters, secure payments, pickup, delivery, driver tips, and directions.',
    link: 'https://apps.apple.com/in/app/bc-starter/id1062799070',
    accent: 'from-fuchsia-500 to-pink-500',
  },
  {
    name: 'PetPlayPartner',
    category: 'Social Networking',
    summary: 'Social platform for pets and owners to create profiles, discover playmates worldwide, and connect through a dedicated pet network.',
    stack: ['Swift', 'UIKit', 'MVVM', 'REST APIs', 'Firebase'],
    outcome: 'Built pet video profiles, global search, connection requests, and owner-to-owner messaging for a niche social platform.',
    link: 'https://apps.apple.com/in/app/petplaypartner/id6757954029',
    accent: 'from-lime-400 to-green-500',
  },
  {
    name: '3Fam',
    category: 'Personal Safety',
    summary: 'Emergency safety app enabling instant SOS alerts with live location, background audio recording, and quick access to nearby emergency services.',
    stack: ['Swift', 'CoreLocation', 'MapKit', 'AVFoundation', 'WidgetKit'],
    outcome: 'Delivered multi-method SOS activation including widgets, back tap, voice commands, and lock screen access with real-time location sharing.',
    link: 'https://apps.apple.com/in/app/3fam/id6755695418',
    accent: 'from-sky-400 to-blue-600',
  },
  {
    name: 'Latkanwali.in',
    category: 'E-commerce Web',
    summary: 'Full-stack production e-commerce storefront and admin for a live fashion brand, built with Next.js, PocketBase, and Razorpay.',
    stack: ['Next.js', 'React', 'TypeScript', 'PocketBase', 'Tailwind CSS'],
    outcome: 'Shipped complete storefront, admin panel, order management, payments, shipping integration, and WhatsApp OTP auth end-to-end.',
    link: 'https://latkanwali.in',
    accent: 'from-orange-400 to-rose-500',
  },
];

export const experience = [
  {
    role: 'Senior iOS Developer',
    company: 'Techmatic Systems India Pvt. Ltd.',
    period: 'Apr 2025 - Jan 2026',
    location: 'Hyderabad, Telangana',
    points: [
      'Leading iOS delivery for 3 large-scale SaaS and commerce products with Swift, UIKit, SwiftUI, Firebase, MapKit, barcode scanning, and payments.',
      'Improving production reliability through crash analysis, Instruments profiling, release monitoring, and tighter QA feedback loops.',
      'Adopting Tuist and mise for modular architecture, faster builds, and consistent development environments across the team.',
    ],
  },
  {
    role: 'iOS Developer',
    company: 'Mindcrew Technologies Pvt. Ltd.',
    period: 'Apr 2023 - Apr 2025',
    location: 'Indore, MP',
    points: [
      'Delivered 6+ iOS applications from scratch to App Store across e-commerce, healthcare, utilities, and service-based domains.',
      'Implemented MVVM architecture, API integration, push notifications, Firebase services, and third-party SDK workflows.',
      'Used Fastlane, Git, and TestFlight for beta testing, release management, and reliable delivery workflows.',
    ],
  },
  {
    role: 'Associate Software Engineer (iOS)',
    company: 'Softude Infotech Pvt. Ltd.',
    period: 'Jun 2021 - Dec 2022',
    location: 'Indore, MP',
    points: [
      'Delivered enterprise iOS modules for VECV, including CRM dashboards, HR workflows, employee services, and support operations.',
      'Modularized networking with URLSession and Codable, moving blocking workflows to background tasks and async patterns.',
      'Used Firebase Performance, Crashlytics, App Store Connect metrics, GitLab, Zoho, and TestFlight inside Agile delivery squads.',
    ],
  },
];

export const skillGroups = [
  {
    title: 'iOS Engineering',
    items: ['Swift', 'Objective-C', 'UIKit', 'SwiftUI', 'Combine', 'Auto Layout', 'Core Animation', 'CoreData', 'SwiftData'],
  },
  {
    title: 'Apple Frameworks',
    items: ['AVFoundation', 'CoreLocation', 'MapKit', 'CoreNFC', 'Vision', 'ARKit', 'StoreKit', 'HealthKit'],
  },
  {
    title: 'Web Development',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Node.js', 'REST APIs', 'PocketBase'],
  },
  {
    title: 'Architecture',
    items: ['MVVM', 'MVC', 'Clean Architecture', 'Modular Design', 'Reusable Components', 'Design Systems'],
  },
  {
    title: 'Product Delivery',
    items: ['Firebase', 'Push Notifications', 'Deep Links', 'Fastlane', 'TestFlight', 'Tuist', 'mise', 'GitHub Actions'],
  },
];

export const services = [
  'Production iOS app development',
  'App modernization and UIKit to SwiftUI migration',
  'Firebase, maps, payments, NFC, and scanning integrations',
  'Full-stack web development with React and Next.js',
  'Crash debugging, profiling, and release support',
];

export const highlights = [
  ['Clean Architecture', 'MVVM, modular components, reusable UI, component-driven web'],
  ['Native Integrations', 'Firebase, Apple Pay, maps, NFC, camera, REST APIs, PocketBase'],
  ['Release Ownership', 'TestFlight, App Store, CI/CD, GitHub Actions, debugging, support'],
  ['Product Mindset', 'Stable UX, measurable outcomes, iOS & web delivery'],
];
