# Nithin Johnson — 3D Interactive Design Portfolio

An award-level personal portfolio website for **Nithin Johnson** (Senior Creative Designer / UI/UX Specialist), inspired by the spatial storytelling of [juanmora.co](https://juanmora.co/) and a sophisticated **Spider-Man-inspired visual language** (obsidian black, spider red, dark crimson, electric blue, abstract web geometry, and spider-sense lighting).

---

## 🕷️ Visual & Interaction Highlights

- **Hero 3D Centerpiece**: Real-time 3D polyhedral Spider-Web artifact built with Three.js (with hardware-accelerated Canvas 3D projective fallback) reacting to pointer velocity and scroll depth.
- **Single Source of Truth**: All professional history (*Nuvento Systems*, *Art Technology & Software*, *Sojan Printers*, *Onsor Tech*, *Sixsquare Technologies*), education, AI capabilities, and contact details are driven strictly from Nithin Johnson's CV via `js/data/portfolio-data.js`.
- **Portrait Presentation**: Integrated real portrait of Nithin Johnson with duotone Spider-Man rim lighting, corner crosshairs, and 3D tilt.
- **Custom Magnetic Cursor**: Interactive cursor follower with contextual state indicators (`EXPLORE`, `VIEW`, `INSPECT`, `CONNECT`), disabled on touch/mobile.
- **Interactive UI/UX 3D Screen Deck**: Floating perspective screen stack allowing visitors to cycle through simulated SaaS, FinTech, and AI interface mockups.
- **Graphic Design Art Wall**: Responsive masonry wall showcasing advertising collateral, print production, corporate presentations, and AI-assisted art with category filters.
- **Interactive Case Study Drawers**: Deep-dive project presentation overlays with challenge, architecture, metrics, and deliverable placeholders.
- **Web Audio API Micro-Haptics**: Futuristic Spider-Sense tone synthesizer with toggleable sound button (0 external audio dependencies).

---

## 🚀 How to Run Locally

### Option 1: Python Dev Server (Instant, Zero Installs)
```bash
cd /Users/nithin/.gemini/antigravity/scratch/nithin-johnson-portfolio
python3 serve.py 8080
```
Open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option 2: Node / NPM
```bash
cd /Users/nithin/.gemini/antigravity/scratch/nithin-johnson-portfolio
npm start
```

---

## 📁 Architecture

```
nithin-johnson-portfolio/
├── index.html                   # Semantic HTML5 entry point & WebGL stages
├── package.json                 # Project descriptor & run scripts
├── serve.py                     # Local dev server with CORS & proper MIME types
├── README.md                    # Documentation & customization guide
├── assets/
│   └── images/
│       ├── nithin-portrait.jpg  # User's uploaded professional portrait
│       └── projects/            # High-res screenshots / mockups
├── css/
│   ├── tokens.css               # Spider-Man color tokens & fluid typography
│   ├── main.css                 # Base resets, typography, layout, atmospheric glows
│   ├── components.css           # Navigation, cards, cursor, modals, timeline
│   ├── spider-effects.css       # Web meshes, laser lines, spider-sense radar
│   └── responsive.css           # Mobile & tablet fluid optimizations
└── js/
    ├── data/
    │   └── portfolio-data.js    # Single Source of Truth (CV data, projects, case studies)
    ├── three/
    │   ├── WebGLHeroWeb.js      # Three.js 3D WebGL centerpiece + Canvas 3D fallback
    │   └── ScreenDepthDeck.js   # Interactive 3D UI screen depth stack
    ├── modules/
    │   ├── cursor.js            # Custom magnetic Spider-Sense cursor
    │   ├── smooth-scroll.js     # Lenis smooth-scroll & scroll listener
    │   ├── case-study-modal.js  # Deep-dive interactive project drawer
    │   ├── gallery-wall.js      # Graphic design art-wall interactive lightbox & filters
    │   └── sound-effects.js     # Synthesized Web Audio API micro-haptics
    └── main.js                  # Master application lifecycle & DOM mounting
```

---

## 🎨 Updating Content & Projects

All copy and projects are strictly centralized in:
`js/data/portfolio-data.js`

To add a new project, edit `PORTFOLIO_DATA.projects`:
```javascript
{
  id: "your-project-id",
  title: "Project Name",
  category: "UI/UX & Product Design",
  year: "2026",
  client: "Client Name",
  role: "Lead Designer",
  tags: ["Figma", "UI/UX", "Mobile"],
  ...
}
```
All cards, metrics, and modals update automatically.
