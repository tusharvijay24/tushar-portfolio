import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ExternalLink, Award, Briefcase, Download, Apple, Instagram, Facebook } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'experience', 'projects'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skillCategories = {
    'Languages & Frameworks': ['Swift', 'Objective-C', 'UIKit', 'SwiftUI', 'CoreData', 'SwiftData', 'Core Animation', 'CocoaTouch'],
    'iOS Frameworks': ['AVFoundation', 'CoreLocation', 'MapKit', 'CoreNFC', 'Vision', 'ARKit', 'StoreKit', 'HealthKit'],
    'Architecture & Patterns': ['MVVM', 'MVC', 'Clean Architecture', 'Modular Design', 'Auto Layout', 'Storyboards', 'XIBs'],
    'Networking & APIs': ['REST APIs', 'JSON', 'Alamofire', 'URLSession', 'Codable', 'Firebase', 'Push Notifications'],
    'Tools & CI/CD': ['Xcode', 'Git', 'TestFlight', 'Postman', 'CocoaPods', 'Swift Package Manager', 'Fastlane', 'Branch.io']
  };

  const projects = [
    {
      name: 'Cravingly',
      desc: 'Community-based food ordering platform connecting diners with nearby home cooks featuring discovery, search, and location-based filtering',
      tech: ['Swift', 'UIKit', 'MVVM', 'Firebase', 'MapKit'],
      link: 'https://apps.apple.com/us/app/cravingly/id6633424731',
      features: ['Location-based filtering', 'Social engagement', 'Secure checkout', 'Order tracking', 'Recipe discovery']
    },
    {
      name: 'SIPN Bourbon',
      desc: 'Social liquor e-commerce platform featuring interactive feeds, brand discovery, virtual bar curation, and shoppable collections',
      tech: ['Swift', 'UIKit', 'Firebase', 'In-App Payments', 'Social Feed'],
      link: 'https://apps.apple.com/in/app/sipn-bourbon/id1597312660',
      features: ['Interactive feed', 'Brand discovery', 'Virtual bar', 'Community forums', 'Shoppable content']
    },
    {
      name: 'BC Starter (BottleCapps)',
      desc: 'White-label liquor retail app with barcode scanning, varietal filters, secure in-app payments, and multi-location support',
      tech: ['Swift', 'CoreNFC', 'Apple Pay', 'MapKit', 'Barcode'],
      link: 'https://apps.apple.com/in/app/bc-starter/id1062799070',
      features: ['Barcode scanning', 'Multi-location', 'Apple Pay', 'Driver tips', 'Loyalty rewards']
    },
    {
      name: 'MyUI App',
      desc: 'Advanced UI component library and design system for iOS development with reusable components and custom design patterns',
      tech: ['Swift', 'UIKit', 'SwiftUI', 'Design System', 'Components'],
      link: 'https://apps.apple.com/us/app/myui-app/id6468562554',
      features: ['Reusable components', 'Custom UI elements', 'Design patterns', 'Developer tools', 'Style guide']
    },
    {
      name: 'VECV Evolve',
      desc: 'Enterprise HRMS solution for Volvo Eicher with leave management, cab booking, employee engagement, and HR workflows',
      tech: ['Swift', 'UIKit', 'MVVM', 'REST APIs', 'Enterprise'],
      link: 'https://apps.apple.com/in/app/vecvevolve-empower-yourself/id1208034545',
      features: ['Leave management', 'Cab booking', 'Employee engagement', 'HR workflows', 'Real-time updates']
    },
    {
      name: 'Ixkio',
      desc: 'Advanced NFC tag management platform integrating CoreNFC, QR/Barcode scanning, and Vision for reliable read/write/lock flows',
      tech: ['Swift', 'CoreNFC', 'Vision', 'QR/Barcode', 'Security'],
      link: 'https://apps.apple.com/us/app/ixkio/id6467871130',
      features: ['NFC operations', 'Multiple tag types', 'Vision framework', 'Secure workflows', 'Tag locking']
    },
    {
      name: 'Eicher CRM',
      desc: 'Enterprise CRM providing real-time visibility of critical KPIs across Sales, Services, Spares, Complaints, and On-Road Support',
      tech: ['Swift', 'UIKit', 'MVVM', 'REST APIs', 'Analytics'],
      link: 'https://apps.apple.com/in/app/eicher-crm/id1467873868',
      features: ['Real-time dashboards', 'Sales tracking', 'Service management', 'Analytics', 'KPI monitoring']
    },
    {
      name: 'Jimmy John\'s International',
      desc: 'Optimized iOS e-commerce experience with fast order placement, secure payments, personalized recommendations, and loyalty integration',
      tech: ['Swift', 'UIKit', 'Stripe', 'Push Notifications', 'E-commerce'],
      link: 'https://apps.apple.com/ca/app/jimmy-johns-international/id6569244964',
      features: ['Quick ordering', 'Loyalty integration', 'Recommendations', 'Secure payments', 'Order tracking']
    }
  ];

  const experience = [
    {
      title: 'Senior iOS Developer',
      company: 'Techmatic Systems India Pvt. Ltd.',
      period: 'Apr 2025 - Present',
      location: 'Hyderabad, Telangana',
      highlights: [
        'Leading iOS development for 3 large-scale SaaS platforms',
        'Reduced crash rates by ~30% through Instruments profiling',
        'Integrated Firebase, Apple Pay, MapKit, and barcode scanning',
        'Mentored junior developers and scaled delivery pipelines'
      ]
    },
    {
      title: 'iOS Developer',
      company: 'Mindcrew Technologies Pvt. Ltd.',
      period: 'Apr 2023 - Apr 2025',
      location: 'Indore, MP',
      highlights: [
        'Built enterprise apps for VECV (Volvo Eicher)',
        'Delivered Eicher CRM and VECV Evolve HRMS applications',
        'Migrated workflows to async/await patterns for better UX',
        'Implemented Firebase Performance and Crashlytics monitoring'
      ]
    },
    {
      title: 'Associate Software Engineer (iOS)',
      company: 'Softude Infotech Pvt. Ltd.',
      period: 'June 2021 - Dec 2022',
      location: 'Indore, MP',
      highlights: [
        'Developed iOS applications from scratch to App Store',
        'Implemented MVVM architecture and clean code practices',
        'Integrated third-party SDKs and RESTful APIs',
        'Managed releases via TestFlight and Git workflows'
      ]
    }
  ];

  const stats = [
    { number: '12+', label: 'Apps Shipped' },
    { number: '4+', label: 'Years Experience' },
    { number: '40%', label: 'Crash Reduction' },
    { number: '3', label: 'Companies' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-pink-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white bg-gradient-to-br from-pink-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">TV</h1>
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-colors ${activeSection === item.toLowerCase() ? 'text-pink-500' : 'text-gray-300 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <a 
  href="https://drive.google.com/uc?export=download&id=1s_IoLY2Rvo2YLRJ5PExH5HpkNw2fwniO"
  download="Tushar_Vijayvargiya_CV.pdf"
  className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center gap-2"
>
  <Download className="w-4 h-4" />
  Download CV
</a>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-gray-400 text-lg">Hello, I'm</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Tushar<br />Vijayvargiya
              </h1>
              <p className="text-2xl text-pink-500 font-semibold pt-2">Senior iOS Developer</p>
            </div>
            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Hey there! With 4+ years of iOS development expertise, I specialize in crafting exceptional mobile experiences using Swift, UIKit, and cutting-edge frameworks. Let's collaborate and turn your vision into reality!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://github.com/tusharvijay24" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-lg hover:bg-pink-500 transition-all border border-zinc-800">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/tusharvijayvargiya" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-lg hover:bg-pink-500 transition-all border border-zinc-800">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/btwittstushar/" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-lg hover:bg-pink-500 transition-all border border-zinc-800">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/Tusharvj24/" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-lg hover:bg-pink-500 transition-all border border-zinc-800">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="p-3 bg-zinc-900 rounded-lg hover:bg-pink-500 transition-all border border-zinc-800">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="pt-6 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <a href="tel:+917389548853" className="hover:text-pink-500 transition-colors">+91 7389548853</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="hover:text-pink-500 transition-colors">tusharvijayvargiya24112000@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>Indore, MP, India</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-3xl overflow-hidden border-4 border-pink-500/20 shadow-2xl shadow-pink-500/20">
                <img src="/tushar.jpg" alt="Tushar Vijayvargiya" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 rounded-xl shadow-xl">
                <p className="text-sm font-semibold">4+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => scrollToSection('about')} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-pink-500" />
        </button>
      </section>

      <section id="about" className="py-12 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">About <span className="text-pink-500">Me</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-pink-500">iOS Development Expert</h3>
              <p className="text-gray-300 leading-relaxed">
                Experienced iOS Developer with 4+ years specializing in Swift, Objective-C, and UIKit. I've delivered 6+ production apps across e-commerce, healthcare, and enterprise domains, consistently focusing on clean architecture, performance optimization, and reliability.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My expertise spans the full iOS development lifecycle—from initial architecture design through App Store deployment. I'm passionate about creating exceptional user experiences while maintaining code quality and app stability.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/30 p-6 rounded-xl border border-purple-500/20">
                  <Award className="w-10 h-10 text-pink-500 mb-3" />
                  <p className="text-sm text-gray-400">iOS Bootcamp</p>
                  <p className="font-semibold text-lg">Certified</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/30 p-6 rounded-xl border border-purple-500/20">
                  <Briefcase className="w-10 h-10 text-pink-500 mb-3" />
                  <p className="text-sm text-gray-400">B.Tech - EC</p>
                  <p className="font-semibold text-lg">MIT Indore</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-900/40 to-purple-600/20 p-8 rounded-2xl border border-purple-500/30 text-center hover:border-purple-500/50 transition-all backdrop-blur-sm">
                    <h4 className="text-5xl font-bold text-white mb-2">{stat.number}</h4>
                    <p className="text-gray-300 text-base">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h4 className="text-xl font-semibold mb-4 text-pink-500">Core Values</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Delivering exceptional quality with clean, maintainable code</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Performance-first approach with crash rate reduction focus</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Continuous learning and mentorship of junior developers</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Technical <span className="text-pink-500">Expertise</span></h2>
          </div>
          <div className="space-y-8">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <h3 className="text-xl font-semibold text-pink-500 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg text-sm border border-zinc-700 hover:border-pink-500 hover:bg-zinc-700 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-12 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Work <span className="text-pink-500">Experience</span></h2>
          </div>
          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div key={idx} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 hover:border-pink-500/50 transition-all">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-pink-500">{job.title}</h3>
                    <p className="text-xl text-white mt-1">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">{job.period}</p>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {job.highlights.map((highlight, hidx) => (
                    <li key={hidx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">{highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">Featured <span className="text-pink-500">Projects</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-pink-500 transition-all hover:transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <Apple className="w-6 h-6 text-pink-500" />
                </div>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, tidx) => (
                    <span key={tidx} className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-xs border border-pink-500/20">{tech}</span>
                  ))}
                </div>
                <div className="space-y-1 mb-4">
                  {project.features.slice(0, 4).map((feature, fidx) => (
                    <p key={fidx} className="text-gray-500 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                      {feature}
                    </p>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors text-sm font-medium">
                  View on App Store <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work <span className="text-pink-500">Together</span></h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Looking for a skilled iOS developer? I'm available for freelance projects, full-time opportunities, 
            and consulting work. Let's create something exceptional together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:tusharvijayvargiya24112000@gmail.com" className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all inline-flex items-center gap-2">
              <Mail className="w-5 h-5" />Send Email
            </a>
            <a href="tel:+917389548853" className="bg-zinc-900 px-8 py-4 rounded-lg hover:bg-pink-500 transition-all inline-flex items-center gap-2 border border-zinc-800">
              <Phone className="w-5 h-5" />Call Me
            </a>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <a href="https://www.instagram.com/btwittstushar/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/Tusharvj24/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/tusharvijayvargiya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/tusharvijay24" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Tushar Vijayvargiya.</p>
        </div>
      </footer>
    </div>
  );
}