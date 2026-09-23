/**
 * NITHIN JOHNSON - PORTFOLIO DATA
 * SINGLE SOURCE OF TRUTH
 * Strictly based on CV / Professional Information
 */

export const PORTFOLIO_DATA = {
  personal: {
    name: "Nithin Johnson",
    firstName: "Nithin",
    lastName: "Johnson",
    title: "Senior Creative Designer & UI/UX Specialist",
    tagline: "7 Years of Experience in Visual Communication, UI/UX, Branding & Web Systems",
    status: "Available for Senior Roles & Select Collaborations",
    location: "Kochi / Trivandrum, Kerala, India",
    email: "nithinjohnsm@gmail.com",
    phone: "+91 8848105574",
    linkedin: "https://linkedin.com/in/nithin_john",
    behance: "https://behance.net/nithinjohn9",
    portraitUrl: "assets/images/nithin-portrait.jpg",
    bio: "Creative and detail-oriented Graphics Designer and UI/UX Specialist with 7 years of professional experience in visual communication, branding, digital marketing creatives, print design, and social media content. Proficient in transforming concepts into engaging designs that strengthen brand identity and enhance user engagement. Committed to delivering innovative, high-quality creative solutions while continuously learning and contributing to organizational growth.",
    stats: [
      { label: "Years Experience", value: "7+" },
      { label: "Design Companies", value: "5" },
      { label: "Campaigns & Creatives", value: "150+" },
      { label: "Engineering Foundation", value: "B.Sc CS" }
    ]
  },

  aiExpertise: {
    title: "AI-Augmented Design Workflow",
    summary: "Experienced in integrating AI-powered tools such as ChatGPT, Claude, Gemini, Midjourney, Adobe Firefly, and other generative AI platforms into graphic design workflows. Skilled in AI-assisted concept development, branding, image generation, creative content creation, visual asset production, and campaign design, enabling faster project delivery while maintaining high standards of creativity and design quality.",
    tools: ["ChatGPT", "Claude", "Gemini", "Midjourney", "Adobe Firefly", "Generative AI Workflows"]
  },

  education: [
    {
      degree: "B.Sc Computer Science",
      institution: "MS University Bachelor of Technology TN",
      period: "2012 – 2016",
      focus: "Computer Science principles, algorithmic thinking, software engineering foundations, front-end web logic."
    },
    {
      degree: "Professional Designing Course",
      institution: "Advanced Visual Design & Creative Suite Academy",
      period: "Aug 2017 – Jan 2018",
      focus: "Graphic communication, typography, vector illustration, color theory, layout design, print production techniques."
    }
  ],

  experience: [
    {
      id: "nuvento",
      role: "Senior Creative Designer",
      company: "Nuvento Systems Pvt. Ltd",
      location: "Kochi, Kerala",
      period: "2025 – Present",
      isCurrent: true,
      summary: "Leading digital visual communication, corporate pitch assets, design systems, and responsive web development.",
      highlights: [
        "Social Media Creative & Digital Marketing Design driving brand visibility across global channels.",
        "High-stakes Corporate Presentation (PowerPoint) Design for enterprise executive pitches and summits.",
        "End-to-end UI/UX Design & Interactive Prototyping using Figma for digital products.",
        "Custom WordPress Theme Development translating complex UI concepts into high-performance web solutions."
      ],
      skills: ["Figma", "UI/UX Prototyping", "Corporate Presentations", "Social Media Campaigns", "WordPress Themes", "Generative AI"]
    },
    {
      id: "art-tech",
      role: "UX/UI & Graphics Designer",
      company: "Art Technology and Software",
      location: "Kochi, Kerala",
      period: "2022 – 2025",
      isCurrent: false,
      summary: "Spearheaded user experience architecture and visual assets for diverse client portfolios, bridging design and front-end code.",
      highlights: [
        "Designed bespoke Figma UI/UX wireframes, component libraries, and user flows aligned with rigorous client specifications.",
        "Converted PSD and Figma designs into responsive HTML, CSS, Bootstrap, and JavaScript code.",
        "Designed comprehensive advertising materials, flyers, social media creatives, high-impact banners, and integrated campaign concepts.",
        "Engineered custom WordPress themes and content management systems tailored to enterprise marketing needs."
      ],
      skills: ["Figma", "PSD to HTML", "Bootstrap", "JavaScript", "Custom WordPress", "Brand Campaigns", "Advertising Graphics"]
    },
    {
      id: "sojan-printers",
      role: "Graphics Designer",
      company: "Sojan Printers",
      location: "Trivandrum, Kerala",
      period: "2021 – 2022",
      isCurrent: false,
      summary: "Directed large-scale print production, advertising design, editorial layouts, and photography for commercial clients.",
      highlights: [
        "Produced high-impact advertising materials, promotional flyers, brochures, and commercial product catalogues.",
        "Directed social media graphics, advertising magazine editorial design, and product photography.",
        "Managed physical print production activities, offset and digital printer calibration, color profiles, and prepress prep."
      ],
      skills: ["Photoshop", "Illustrator", "Print Production", "Catalogue Design", "Magazine Editorial", "Commercial Photography"]
    },
    {
      id: "onsor",
      role: "WordPress Developer",
      company: "Onsor",
      location: "Oman",
      period: "2019 – 2020",
      isCurrent: false,
      summary: "Engineered and maintained the core enterprise sales portal and CMS architecture for a premier technology corporation in Oman.",
      highlights: [
        "Architected and maintained the company's primary commercial sales and technology showcase website.",
        "Customized WordPress CMS plugins, database structures, and high-conversion e-commerce landing pages.",
        "Optimized speed, responsive mobile performance, and user retention for international audiences."
      ],
      skills: ["CMS Architecture", "WordPress Development", "Sales Portal", "UI Optimization", "E-Commerce"]
    },
    {
      id: "sixsquare",
      role: "UI/UX Designer Developer",
      company: "Sixsquare Technologies",
      location: "Trivandrum, Kerala",
      period: "2018 – 2019",
      isCurrent: false,
      summary: "Pioneered front-end web translations and marketing collateral design for early-stage digital products.",
      highlights: [
        "Converted PSD designs to fully responsive HTML UI & UX utilizing Bootstrap, modern CSS, and vanilla JS.",
        "Developed custom CMS-driven WordPress sites with clean maintainable code.",
        "Created promotional advertising materials, flyers, social media assets, and strategic marketing banners."
      ],
      skills: ["UI/UX Design", "PSD to HTML", "Bootstrap", "CSS3 / HTML5", "WordPress", "Marketing Graphics"]
    }
  ],

  skillCategories: [
    {
      category: "UI / UX & Product Design",
      description: "Crafting intuitive, scalable human-computer interfaces from empathy research to component-level systems.",
      skills: [
        { name: "Figma (Prototyping & Systems)", level: "95%", icon: "figma" },
        { name: "Adobe XD", level: "90%", icon: "adobe-xd" },
        { name: "User Flow & Information Architecture", level: "92%", icon: "layout" },
        { name: "Design Systems & Token Architecture", level: "88%", icon: "grid" },
        { name: "Responsive Mobile & Web UI", level: "96%", icon: "smartphone" }
      ]
    },
    {
      category: "Graphic Design & Branding",
      description: "Distilling brand essence into visual identity, advertising narratives, and tactile print deliverables.",
      skills: [
        { name: "Adobe Photoshop", level: "96%", icon: "image" },
        { name: "Adobe Illustrator", level: "92%", icon: "pen-tool" },
        { name: "Advertising & Marketing Creatives", level: "98%", icon: "sparkles" },
        { name: "Catalogue & Magazine Editorial", level: "90%", icon: "book-open" },
        { name: "Print Production & Prepress Calibration", level: "94%", icon: "printer" }
      ]
    },
    {
      category: "Front-End & CMS Development",
      description: "Translating visual aesthetics into production-grade code with speed, accessibility, and clean markup.",
      skills: [
        { name: "Custom WordPress Theme Development", level: "94%", icon: "code" },
        { name: "HTML5 & Semantic Architecture", level: "96%", icon: "file-code" },
        { name: "Modern CSS3 / SCSS / Bootstrap", level: "92%", icon: "palette" },
        { name: "JavaScript & DOM Interactions", level: "85%", icon: "zap" },
        { name: "PSD / Figma to Pixel-Perfect Code", level: "98%", icon: "monitor" }
      ]
    },
    {
      category: "Generative AI & Creative Tech",
      description: "Harnessing cutting-edge AI foundations to supercharge creative velocity and concept exploration.",
      skills: [
        { name: "Midjourney & Adobe Firefly (Visual Synthesis)", level: "95%", icon: "cpu" },
        { name: "ChatGPT & Claude (Concept & UX Copy)", level: "92%", icon: "bot" },
        { name: "Gemini & Multimodal Research", level: "90%", icon: "compass" },
        { name: "Corporate Presentation (PowerPoint)", level: "95%", icon: "presentation" },
        { name: "Canva & Social Media Automation", level: "90%", icon: "share-2" }
      ]
    }
  ],

  tools: [
    { name: "Figma", category: "UI/UX", tier: "Core Master" },
    { name: "Photoshop", category: "Graphic Design", tier: "Core Master" },
    { name: "Illustrator", category: "Graphic Design", tier: "Core Master" },
    { name: "Adobe XD", category: "UI/UX", tier: "Proficient" },
    { name: "WordPress CMS", category: "Development", tier: "Core Master" },
    { name: "HTML5 / CSS3", category: "Development", tier: "Core Master" },
    { name: "Bootstrap / JS", category: "Development", tier: "Proficient" },
    { name: "MS PowerPoint", category: "Presentations", tier: "Core Master" },
    { name: "MS Word", category: "Documentation", tier: "Proficient" },
    { name: "Canva", category: "Quick Social", tier: "Proficient" },
    { name: "Midjourney", category: "Generative AI", tier: "Advanced" },
    { name: "Adobe Firefly", category: "Generative AI", tier: "Advanced" },
    { name: "Claude & ChatGPT", category: "AI Workflows", tier: "Advanced" },
    { name: "Commercial Print", category: "Production", tier: "Specialist" }
  ],

  projects: [
    {
      id: "nuvento-ai",
      title: "Nuvento Agentic AI Enterprise Platform",
      category: "Enterprise UI/UX & Web Development",
      year: "2025 – Present",
      client: "Nuvento Systems Pvt. Ltd",
      liveUrl: "https://nuvento.com/",
      coverImage: "assets/images/projects/nuvento.png",
      role: "Senior Creative Designer",
      tags: ["Agentic AI", "Figma UI/UX", "Enterprise Systems", "WordPress Themes", "Marketing Design"],
      color: "#E10600",
      accent: "#00D2FF",
      shortDescription: "Enterprise digital ecosystem powering Nuvento's Agentic AI solutions, C-level keynote presentations, Figma design system, and custom WordPress architecture.",
      challenge: "Communicating complex multi-agent AI and cloud business transformation into intuitive, conversion-focused executive interfaces and high-speed responsive web layouts.",
      approach: "Architected a comprehensive modular Figma token system, designed responsive UI components, and integrated rapid AI-assisted workflows for brand asset generation.",
      solution: "Deployed custom high-speed WordPress templates optimized for Core Web Vitals, paired with high-impact corporate sales presentations and global digital marketing creatives.",
      outcome: "Elevated brand presence across global enterprise prospects, accelerated marketing collateral production cycles by 40%, and achieved 98/100 Lighthouse performance.",
      metrics: [
        { label: "Asset Production Speed", value: "+40%" },
        { label: "Executive Presentations", value: "30+" },
        { label: "Lighthouse Score", value: "98/100" }
      ]
    },
    {
      id: "xignifi-platform",
      title: "Xignifi Decision Intelligence Platform",
      category: "Product Design & WordPress Development",
      year: "2025",
      client: "Xignifi.ai",
      liveUrl: "https://xignifi.ai/",
      coverImage: "assets/images/projects/xignifi.png",
      role: "Lead Product Designer & Developer",
      tags: ["Figma Design", "WordPress Theme Dev", "Decision Intelligence", "AI Analytics", "Responsive UI"],
      color: "#00D2FF",
      accent: "#2563EB",
      shortDescription: "Completely designed in Figma and developed in WordPress. A decision intelligence platform transforming complex enterprise data into autonomous business outcomes.",
      challenge: "Crafting a sophisticated, future-ready UI that visualizes multi-modal decision intelligence, data lineage, and AI predictions without cognitive overwhelm.",
      approach: "Designed the full interface from scratch in Figma with high-contrast dark mode, custom data-visualization charts, and hand-coded the custom WordPress theme from the ground up.",
      solution: "A clean, modern web application featuring interactive product interactive demos, sub-second page loads, and intuitive enterprise conversion funnels.",
      outcome: "Flawless Figma-to-WordPress parity with 100% design fidelity, sub-1.1s initial load times, and high praise from executive stakeholders.",
      metrics: [
        { label: "Figma to Code Fidelity", value: "100%" },
        { label: "Page Load Speed", value: "1.1s" },
        { label: "Conversion Lift", value: "+45%" }
      ]
    },
    {
      id: "onsor-tech",
      title: "Onsor Global Hardware & Sales Portal",
      category: "CMS Architecture & E-Commerce",
      year: "2019 – 2020",
      client: "Onsor Tech (Oman)",
      liveUrl: "https://onsor.om/",
      coverImage: "assets/images/projects/onsor.png",
      role: "WordPress Developer",
      tags: ["CMS Architecture", "WordPress Development", "Hardware Showcase", "E-Commerce", "UI Performance"],
      color: "#B30000",
      accent: "#E10600",
      shortDescription: "High-performance enterprise sales and hardware showcase portal handling flagship national tech product launches and device sales in Oman.",
      challenge: "Constructing a secure, rapid-loading e-commerce sales showcase capable of handling massive product launch traffic spikes in the Middle East.",
      approach: "Engineered custom WordPress core theme files, stripped out heavy unnecessary plugins, and optimized hardware product gallery rendering pipelines.",
      solution: "A bespoke, blazing-fast sales platform featuring bilingual layout readiness, custom quote request flows, and responsive tech spec sheets.",
      outcome: "Streamlined corporate sales inquiries by 55% during flagship product unveilings with 99.9% uptime recorded.",
      metrics: [
        { label: "Sales Inquiries", value: "+55%" },
        { label: "Uptime During Launch", value: "99.9%" },
        { label: "Avg Page Load", value: "< 1.2s" }
      ]
    },
    {
      id: "panasa-tech",
      title: "Panasa AI-Native Fintech Engineering Studio",
      category: "Fintech UI/UX & Digital Brand Architecture",
      year: "2024 – 2025",
      client: "Panasa Technology",
      liveUrl: "https://www.panasatech.com/",
      coverImage: "assets/images/projects/panasatech.png",
      role: "UI/UX & Brand Design Consultant",
      tags: ["Fintech Engineering", "Payment Platforms", "UI/UX Architecture", "Modern Web", "Neobanks"],
      color: "#1E3A8A",
      accent: "#00D2FF",
      shortDescription: "Digital branding and interactive web presence for an AI-accelerated payment and banking technology studio operating across UK, EU, and APAC.",
      challenge: "Designing a high-trust, cutting-edge visual identity that establishes credibility with tier-1 banks, payment processors, and fintech neobanks.",
      approach: "Synthesized clean financial typography, sleek dark-mode glassmorphic layouts, and intuitive architectural diagrams explaining payment rails and modern processing engines.",
      solution: "A sleek, responsive fintech showcase highlighting payment modernizations, AI acceleration, and global multi-region deployments.",
      outcome: "Positioned Panasa as an authoritative global fintech engineering leader with a 60% increase in inbound enterprise partnerships.",
      metrics: [
        { label: "Inbound Partnerships", value: "+60%" },
        { label: "Global Regions Served", value: "UK, EU, APAC" },
        { label: "Brand Trust Score", value: "96%" }
      ]
    }
  ],

  graphicDesignWall: [
    {
      id: "art-ultahost-web",
      title: "Ultahost Cloud Infrastructure Platform",
      category: "UI/UX Design",
      tag: "SaaS & Web App Dashboard",
      year: "2024",
      client: "Ultahost Cloud Services",
      imageUrl: "assets/images/gallery/ultahost-web-dashboard.jpg",
      desc: "Full-featured enterprise cloud hosting control panel with server health monitoring, multi-currency invoicing, domain registration, and affiliate revenue management.",
      aspect: "wide"
    },
    {
      id: "art-ultahost-mobile",
      title: "Ultahost Mobile Cloud Console",
      category: "UI/UX Design",
      tag: "Mobile App UX",
      year: "2024",
      client: "Ultahost Cloud Services",
      imageUrl: "assets/images/gallery/ultahost-mobile-dashboard.jpg",
      desc: "End-to-end responsive mobile dashboard UX allowing DevOps engineers and web administrators to manage VPS instances, support tickets, and account balance on the go.",
      aspect: "tall"
    },
    {
      id: "art-dark-phoenix",
      title: "Dark Phoenix Fashion Editorial Flyer",
      category: "Print & Editorial",
      tag: "Publication & Mockup",
      year: "2024",
      client: "Fashion Trends / Dark Phoenix",
      imageUrl: "assets/images/gallery/dark-phoenix-fashion-flyer.jpg",
      desc: "Editorial flyer template suite and commercial magazine publication showcase featuring stark duotone contrast, bold diagonal framing, and realistic scene mockups.",
      aspect: "wide"
    },
    {
      id: "art-newage-poster",
      title: "New Age Fashion Typography Poster",
      category: "Poster & Typography",
      tag: "Editorial Art Poster",
      year: "2024",
      client: "Art Portal / New Age Series",
      imageUrl: "assets/images/gallery/newage-fashion-typography-poster.jpg",
      desc: "Avant-garde editorial fashion poster balancing oversized interlocking serif typography, halftone screen textures, and high-fashion portrait photography.",
      aspect: "tall"
    },
    {
      id: "art-arttech-dark",
      title: "Art Technology Enterprise Portal (Dark Mode)",
      category: "UI/UX Design",
      tag: "Enterprise Web Platform",
      year: "2024",
      client: "Art Technology & Software",
      imageUrl: "assets/images/gallery/art-tech-dark-portal.jpg",
      desc: "Full-page dark mode enterprise portal featuring kinetic particle wave hero headers, glassmorphic service matrices, financial dashboard case studies, and corporate branding.",
      aspect: "tall"
    },
    {
      id: "art-arttech-light",
      title: "Art Technology Innovation Portal (Aurora Edition)",
      category: "UI/UX Design",
      tag: "Corporate Tech Website",
      year: "2023 – 2024",
      client: "Art Technology & Software",
      imageUrl: "assets/images/gallery/art-tech-light-portal.jpg",
      desc: "Vibrant aurora mesh-gradient design system engineered for an IT consultancy, with interactive service accordions, team spotlights, and responsive lead funnels.",
      aspect: "tall"
    },
    {
      id: "art-astropack",
      title: "Astropack Gulf Industrial Machinery Portal",
      category: "UI/UX Design",
      tag: "Industrial Web Presence",
      year: "2023",
      client: "Astropack Gulf LLC (Middle East)",
      imageUrl: "assets/images/gallery/astropack-gulf-laptop-mockup.jpg",
      desc: "Corporate industrial packaging, coding, and inspection solutions web portal mockup designed for Middle Eastern enterprise supply chains with responsive layout architecture.",
      aspect: "wide"
    },
    {
      id: "art-omega-poker",
      title: "Omega Poker 3D Brand Identity & Emblem",
      category: "Branding & Identity",
      tag: "3D Game Art & Logo",
      year: "2023",
      client: "Omega Poker Gaming Studio",
      imageUrl: "assets/images/gallery/omega-poker-3d-logo.jpg",
      desc: "Glossy 3D isometric game logo emblem with stitched leather hexagon backing, dimensional card suits, and vibrant custom typography.",
      aspect: "square"
    },
    {
      id: "art-fashion-trends-cyan",
      title: "Fashion Trends Aug 2024 Editorial Cover",
      category: "Poster & Typography",
      tag: "Magazine Cover & Poster",
      year: "2024",
      client: "Fashion Trends / Editorial Collection",
      imageUrl: "assets/images/gallery/fashion-trends-cyan-poster.jpg",
      desc: "Cyan, black, and white editorial fashion cover featuring cutout silhouette composition, fluid vector abstractions, and stark compressed typography.",
      aspect: "tall"
    },
    {
      id: "art-downtown-mafia-hud",
      title: "Down Town Mafia Mobile Game HUD & Interface",
      category: "Game UI & Art",
      tag: "Mobile Game HUD",
      year: "2023",
      client: "Down Town Mafia Mobile Game",
      imageUrl: "assets/images/gallery/downtown-mafia-hud-ui.jpg",
      desc: "Cyberpunk and neon-lit gangster RPG game interface featuring player status HUD, neon game mode carousels, and custom isometric city navigation.",
      aspect: "wide"
    },
    {
      id: "art-downtown-mafia-mockup",
      title: "Down Town Mafia In-Game Mockup Showcase",
      category: "Game UI & Art",
      tag: "Game Perspective Mockup",
      year: "2023",
      client: "Down Town Mafia Mobile Game",
      imageUrl: "assets/images/gallery/downtown-mafia-perspective-mockup.jpg",
      desc: "Curved-screen device mockup showcasing horizontal gameplay layout, character portraits, neon typography, and custom UI components.",
      aspect: "wide"
    },
    {
      id: "art-astropack-full",
      title: "Astropack Gulf Full Enterprise Packaging Portal",
      category: "UI/UX Design",
      tag: "Corporate Web Platform",
      year: "2023",
      client: "Astropack Gulf LLC (Middle East)",
      imageUrl: "assets/images/gallery/astropack-gulf-full-portal.jpg",
      desc: "Full-page corporate web design for an industrial packaging and coding systems provider, complete with product machinery catalog, service lifecycle, and client showcase.",
      aspect: "tall"
    },
    {
      id: "art-fresh-vending",
      title: "Fresh Vending UAE Luxury Coffee & Vending Portal",
      category: "UI/UX Design",
      tag: "E-Commerce & B2B Portal",
      year: "2023 – 2024",
      client: "Fresh Vending UAE (Dubai)",
      imageUrl: "assets/images/gallery/fresh-vending-dubai-coffee-portal.jpg",
      desc: "Bespoke e-commerce and B2B supplier portal designed for a premier Dubai coffee and vending company, featuring warm artisanal palette, equipment catalogs, and bean selection.",
      aspect: "tall"
    },
    {
      id: "art-golden-age-ludo",
      title: "Golden Age Ludo Cosmic Edition Mobile Game UI",
      category: "Game UI & Art",
      tag: "Board Game Mobile UI",
      year: "2023",
      client: "Golden Age Mobile Gaming",
      imageUrl: "assets/images/gallery/golden-age-ludo-space-ui.jpg",
      desc: "Cosmic space-themed mobile board game interface featuring neon arcade buttons, 3D dice and robot assets, planetary backgrounds, and VIP token rewards system.",
      aspect: "tall"
    },
    {
      id: "art-dance-therapy-deck",
      title: "Dance Therapy & Movement Keynote Deck & Carousel",
      category: "Presentations & Social",
      tag: "Keynote & Social Carousel",
      year: "2024",
      client: "Dance Therapy Community / Performing Arts",
      imageUrl: "assets/images/gallery/dance-therapy-keynote-deck.jpg",
      desc: "Isometric multi-slide presentation deck and social carousel layout featuring high-energy long-exposure dancer photography, dynamic typography, and laptop showcase.",
      aspect: "wide"
    },
    {
      id: "art-dark-phoenix-poster",
      title: "Dark Phoenix Fashion Event Flyer & Poster",
      category: "Print & Editorial",
      tag: "Event Flyer & Poster",
      year: "2024",
      client: "Dark Phoenix / Organic Selection UK",
      imageUrl: "assets/images/gallery/dark-phoenix-flyer-poster.jpg",
      desc: "Sleek monochromatic and vivid magenta fashion flyer layout with bold diagonal branding, geometric accents, and modern editorial typography.",
      aspect: "tall"
    },
    {
      id: "art-brizta-vending",
      title: "Brizta Smart Vending Solutions Laptop Mockup",
      category: "UI/UX Design",
      tag: "E-Commerce Laptop Showcase",
      year: "2023 – 2024",
      client: "Brizta / Awan Vending LLC (Dubai)",
      imageUrl: "assets/images/gallery/brizta-vending-laptop-mockup.jpg",
      desc: "Modern laptop perspective mockup showcasing Brizta smart coffee and vending website design on a pastel background with continuous page reveal.",
      aspect: "square"
    },
    {
      id: "art-nuvento-thought-leadership",
      title: "Nuvento AI-First Executive Thought Leadership",
      category: "Presentations & Social",
      tag: "Executive Social Creative",
      year: "2025",
      client: "Nuvento Systems Pvt. Ltd / Suraj Arukil (CEO)",
      imageUrl: "assets/images/gallery/nuvento-ceo-thought-leadership.jpg",
      desc: "High-impact social media thought leadership graphic for Nuvento's CEO, blending editorial portrait framing with minimalist Swiss typography and corporate AI narrative.",
      aspect: "tall"
    },
    {
      id: "art-level-up-modal",
      title: "Victory Level Up Rewards Game Modal",
      category: "Game UI & Art",
      tag: "Reward Modal UI",
      year: "2023",
      client: "Mobile Gaming Studio",
      imageUrl: "assets/images/gallery/game-level-up-modal.jpg",
      desc: "Glossy level-up victory popup featuring dimensional winged shield crest, reward currency tiles, and character unlock announcement.",
      aspect: "wide"
    },
    {
      id: "art-peter-parker-unlock",
      title: "Peter Parker Character Unlock Feature",
      category: "Game UI & Art",
      tag: "Character Art & UI",
      year: "2023",
      client: "Mobile Gaming Studio",
      imageUrl: "assets/images/gallery/peter-parker-character-unlock.jpg",
      desc: "Deluxe character unlock splash card featuring custom tuxedo avatar illustration, glowing level badge, and reward currency bonuses.",
      aspect: "square"
    },
    {
      id: "art-omega-noir-splash",
      title: "Omega Poker Noir Edition Splash & Loading Screen",
      category: "Game UI & Art",
      tag: "Loading Screen UI",
      year: "2023",
      client: "Omega Poker Gaming Studio",
      imageUrl: "assets/images/gallery/omega-poker-noir-splash.jpg",
      desc: "Sleek noir loading screen composition featuring 4 gold-accented Aces, floating casino chips, 3D dice, and dimensional gold typography.",
      aspect: "wide"
    },
    {
      id: "art-omega-marquee-splash",
      title: "Omega Poker Marquee Deluxe Splash Screen",
      category: "Game UI & Art",
      tag: "Splash Screen Art",
      year: "2023",
      client: "Omega Poker Gaming Studio",
      imageUrl: "assets/images/gallery/omega-poker-marquee-splash.jpg",
      desc: "Vibrant casino marquee game splash screen with incandescent illuminated bulbs, floating chip physics, red dice, and golden 3D branding.",
      aspect: "wide"
    },
    {
      id: "art-quote-jack-welch",
      title: "Executive Series: Jack Welch on Action",
      category: "Presentations & Social",
      tag: "Leadership Social Creative",
      year: "2024",
      client: "Corporate Thought Leadership",
      imageUrl: "assets/images/gallery/leadership-quote-jack-welch.jpg",
      desc: "High-contrast digital marketing quote creative pairing bold geometric red vertical bars with black-and-white executive portraiture and highlighted key phrase typography.",
      aspect: "tall"
    },
    {
      id: "art-quote-jeff-bezos",
      title: "Executive Series: Jeff Bezos on Customer Obsession",
      category: "Presentations & Social",
      tag: "Leadership Social Creative",
      year: "2024",
      client: "Corporate Thought Leadership",
      imageUrl: "assets/images/gallery/leadership-quote-jeff-bezos.jpg",
      desc: "Cinematic low-key portrait typography creative emphasizing customer-centric philosophy, high-contrast red callouts, and minimal Swiss framing.",
      aspect: "tall"
    },
    {
      id: "art-quote-steve-jobs",
      title: "Iconic Thinkers: Steve Jobs Mixed-Media Art",
      category: "Presentations & Social",
      tag: "Digital Mixed-Media Art",
      year: "2024",
      client: "Creative Thought Leadership Series",
      imageUrl: "assets/images/gallery/steve-jobs-mixed-media-quote.jpg",
      desc: "Expressive mixed-media digital art portrait combining textured acrylic paint splatters with clean quote typography for social dissemination.",
      aspect: "tall"
    },
    {
      id: "art-xignifi-brochure-spread",
      title: "Xignifi Enterprise Decision Intelligence Brochure Spread",
      category: "Print & Editorial",
      tag: "Brochure Editorial Spread",
      year: "2025",
      client: "Xignifi.ai / Nuvento",
      imageUrl: "assets/images/gallery/xignifi-brochure-open-spread.jpg",
      desc: "Two-page editorial corporate brochure spread mockup demonstrating data visualization, metric cards, and technical multi-agent decision architecture for insurance.",
      aspect: "wide"
    },
    {
      id: "art-xignifi-booklet-cover",
      title: "Xignifi AI Executive Strategy Booklet Mockup",
      category: "Print & Editorial",
      tag: "Commercial Booklet Mockup",
      year: "2025",
      client: "Xignifi.ai / Nuvento",
      imageUrl: "assets/images/gallery/xignifi-booklet-cover-mockup.jpg",
      desc: "Commercial saddle-stitch booklet perspective mockup showcasing Xignifi's enterprise AI decision intelligence campaign materials.",
      aspect: "wide"
    },
    {
      id: "art-xignifi-flyer",
      title: "Xignifi AI Agent Blueprint Campaign Flyer",
      category: "Print & Editorial",
      tag: "Marketing Flyer & Poster",
      year: "2025",
      client: "Xignifi.ai / Nuvento",
      imageUrl: "assets/images/gallery/xignifi-ai-agent-flyer.jpg",
      desc: "Enterprise AI marketing flyer and digital brochure cover featuring fiery atmospheric gradient mesh, custom Xignifi branding lockup, and conversion-driven QR assessment funnel.",
      aspect: "tall"
    }
  ],

  uiScreensDeck: [
    {
      id: "screen-1",
      title: "Nexus Neural Analytics Engine",
      subtitle: "Enterprise AI Observability Dashboard",
      category: "SaaS Platform",
      depth: 0,
      accent: "#E10600"
    },
    {
      id: "screen-2",
      title: "Aura Mobile FinTech Experience",
      subtitle: "Biometric Web3 Payment Architecture",
      category: "iOS & Android",
      depth: 1,
      accent: "#00D2FF"
    },
    {
      id: "screen-3",
      title: "Vanguard E-Commerce Ecosystem",
      subtitle: "High-Conversion Modular Checkout Flow",
      category: "Web Application",
      depth: 2,
      accent: "#2563EB"
    },
    {
      id: "screen-4",
      title: "Cortex AI Prompt & Model Studio",
      subtitle: "Multi-Modal Generative Canvas UI",
      category: "AI Workspace",
      depth: 3,
      accent: "#FF1E27"
    }
  ],

  designPhilosophy: [
    {
      step: "01",
      title: "RESEARCH",
      subtitle: "Deconstruct the Problem",
      desc: "Deep-dive into client intent, user psychology, and competitive landscapes. No pixel is placed without behavioral rationale."
    },
    {
      step: "02",
      title: "ARCHITECT",
      subtitle: "Structural Wireframing",
      desc: "Establish clear information hierarchy, friction-free task flows, and scalable design token foundations."
    },
    {
      step: "03",
      title: "DESIGN",
      subtitle: "Cinematic Visual Polish",
      desc: "Apply typography mastery, Spider-Sense contrast, editorial whitespace, and emotive color harmony in Figma."
    },
    {
      step: "04",
      title: "PROTOTYPE",
      subtitle: "Interactive Validation",
      desc: "Simulate micro-interactions, responsive states, and transitions to ensure tactile delight before engineering."
    },
    {
      step: "05",
      title: "REFINE",
      subtitle: "AI Acceleration & Testing",
      desc: "Augment creative iterations with generative AI tools, benchmark accessibility, and stress-test performance."
    },
    {
      step: "06",
      title: "SHIP",
      subtitle: "Clean Code & Production",
      desc: "Transform Figma to pixel-perfect HTML/CSS/JS or custom WordPress themes with sub-second execution speeds."
    }
  ]
};
