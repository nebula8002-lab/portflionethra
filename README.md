# Nethra Shree SD — Premium AI/ML Portfolio Website

Official personal portfolio website for **Nethra Shree SD**, first-year B.Tech undergraduate in **Artificial Intelligence and Machine Learning (AI & ML)** at **SRM Institute of Science and Technology, Ramapuram Campus, Chennai** (Batch: 2026–2030).

---

## 🌌 Visual Identity & Design Direction

- **Atmosphere**: Futuristic AI laboratory aesthetic combined with high-end personal branding.
- **Color Palette**: Deep midnight navy & near-black base (`#030712`, `#060913`, `#0a101f`), Crisp White (`#ffffff`), Electric Violet & Purple (`#8b5cf6`, `#a855f7`), Cyan (`#06b6d4`, `#38bdf8`), and Deep Electric Blue (`#2563eb`).
- **Typography**: Clean, contemporary typography using *Plus Jakarta Sans* and *JetBrains Mono*.
- **Cinematic Animated Background**:
  - Full-viewport ambient lighting with floating violet, cyan, and blue gradient orbs.
  - Multi-depth 3D floating particles (deep dust, midground particles, foreground synapse nodes).
  - Neural network constellation with proximity connections, glowing nodes, and traveling data pulses.
  - Faint perspective cyber-grid at the lower horizon.
  - Desktop mouse-responsive parallax with smooth damping.
  - Automatic performance throttling on mobile, viewport visibility pausing, and `prefers-reduced-motion` compliance.
- **3D Interactive Hero Visual**:
  - Holographic 3D Geodesic Neural Sphere rendered with mathematical perspective projection.
  - Tilted orbital gyroscope rings with orbiting beacon satellites.
  - Interactive mouse tilt and drag-to-spin controls.
  - Segmented switcher: **3D Neural Orb**, **Portrait Photo**, or **Monogram Fallback (`NS`)**.
- **Physics-Based 3D Card Tilts**: Interactive tilt and dynamic specular reflection on project and interest cards.

---

## 📁 Project Architecture

```
nethra portfolio/
├── index.html                     # Semantic HTML5 architecture with all 10 core sections
├── server.js                      # Zero-dependency local preview server (Node 6+ compatible)
├── README.md                      # Comprehensive guide, customization & deployment manual
├── public/                        # Static public directory with resume PDF
│   └── resume.pdf                 # Direct PDF link
├── assets/
│   ├── Nethra_Shree_SD_Resume.pdf # Valid, standardized PDF resume (downloadable)
│   └── images/
│       └── profile-avatar.jpg     # Professional portrait asset
├── css/
│   ├── main.css                   # Core tokens, glassmorphism, visual switcher & section layouts
│   ├── animations.css             # Floating orb keyframes, 3D card tilt & reduced-motion queries
│   └── responsive.css             # Responsive breakpoints (Desktop, Laptop, Tablet, Mobile)
└── js/
    ├── data.js                    # Centralized Single Source of Truth for all personal & project data
    ├── canvas-bg.js               # Full-viewport multi-depth neural background & parallax engine
    ├── hero-3d.js                 # 3D holographic neural sphere & gyroscope projection engine
    └── app.js                     # Navigation, typing text rotator, 3D tilt, modal & contact handler
```

---

## 🚀 How to Run and Preview Locally

You have two simple zero-configuration options:

### Option 1: Direct File Opening (No setup required)
Double-click `index.html` in your file manager to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari. All styles, 3D engines, animations, and PDF links work seamlessly offline.

### Option 2: Local Static Server (Node.js)
Open PowerShell or your terminal in this directory and run:
```bash
node server.js
```
Then visit:
```
http://localhost:3000
```

---

## 🧭 Website Sections & Highlights

1. **Navigation Bar (Section A)**: Sticky frosted-glass header with minimal `NS` monogram, smooth navigation links, and a prominent **Resume (PDF)** download button.
2. **Hero Section (Section B)**:
   - Eyebrow: `AI/ML STUDENT · DEVELOPER IN PROGRESS`
   - Main Heading: `Hi, I'm Nethra Shree SD.`
   - Animated rotating headline typing through 4 phrases:
     - *Exploring Artificial Intelligence*
     - *Building Technical Skills*
     - *Turning Curiosity Into Code*
     - *Learning, Creating, Improving*
   - Interactive 3D Holographic AI Neural Orb with desktop mouse reaction and drag-to-spin controls.
   - Verified social icons: GitHub, LinkedIn, LeetCode, Instagram, Email, Phone.
3. **About Me (Section C)**:
   - Authentic first-year engineering narrative.
   - Three 3D tilt highlight cards: **Curiosity**, **Communication**, and **Technology**.
4. **Skills & Competencies (Section D)**:
   - **Technical Interests**: Artificial Intelligence, Machine Learning, Programming, Problem-Solving, Computational Thinking.
   - **Programming Foundations**: C Programming highlighted as a first-year foundation without exaggerated claims; upcoming languages cleanly designated for future semesters.
   - **Professional Skills**: Communication, Debating & Public Speaking, Critical Thinking, Collaboration, Continuous Learning.
5. **Projects — "Things I'm Exploring" (Section E)**:
   - Modular project cards with tech pills, status tags, GitHub links, and 3D card tilt.
   - Standard Project Card Architecture Blueprint modal showing the exact JSON schema for future additions.
6. **Education (Section F)**: Clean modern timeline chronicling B.Tech at SRMIST Ramapuram (Batch 2026–2030) and DAV Girls Senior Secondary School, Gopalapuram.
7. **Interests — "Beyond the Code" (Section G)**:
   - Three distinct 3D cards: **The Reader**, **The Debater**, and **The Curious Technologist**.
   - Personal academic philosophy quote strip.
8. **Resume Download (Section H)**:
   - Dedicated glassmorphism card with document preview and verified section breakdown.
   - **Download My Resume (PDF)** button that initiates a direct download of `Nethra_Shree_SD_Resume.pdf`.
   - **Open in New Tab** button for quick browser viewing.
9. **Contact — "Let's Connect." (Section I)**:
   - Click-to-call phone link (`+91 8248989393`), email (`nebula8002@gmail.com`), LinkedIn, GitHub, LeetCode, and Instagram.
   - One-click copy buttons for email and telephone.
   - Form validation with prefilled mailto email draft generator.
10. **Footer (Section J)**:
    - `"Designed with curiosity by Nethra Shree SD."`
    - Dynamic copyright year, quick links, and smooth back-to-top button.

---

## ✏️ How to Customize & Update Your Portfolio

All content is maintained in **`js/data.js`**. You don't need to write complex HTML!

### 1. Updating Projects
To add a new semester project, lab practical, or hackathon build, open `js/data.js` and add an object to `PORTFOLIO_DATA.projects.items`:
```javascript
{
  id: "proj-my-new-project",
  title: "AI Handwritten Digit Classifier",
  status: "Completed Lab Practical",
  badge: "Semester 2 Milestone",
  category: "Computer Vision & Deep Learning",
  shortDescription: "Convolutional neural network trained on MNIST with 98.6% classification accuracy.",
  problemStatement: "Mitigating gradient vanishing and optimizing convolutional filter convergence.",
  technologies: ["Python", "PyTorch", "NumPy", "Matplotlib"],
  keyLearnings: "Backpropagation dynamics, kernel convolution math, and validation loss tuning.",
  githubUrl: "https://github.com/nebula8002-lab/digit-classifier",
  demoUrl: null,
  isPlaceholder: false
}
```

### 2. Updating Programming Languages & Skills
In `js/data.js`, update `PORTFOLIO_DATA.skills.programming`:
- When you begin learning Python or C++, update the `level` and `badge` attributes from "Scheduled" to "Active Coursework".

### 3. Replacing or Updating Your Resume PDF
- The portfolio links to `assets/Nethra_Shree_SD_Resume.pdf`.
- When you update your resume, simply export your new resume as a PDF, name it **`Nethra_Shree_SD_Resume.pdf`**, and place it in the **`assets/`** folder (overwriting the existing file).
- The download button and "Open in New Tab" button will immediately serve your updated resume!

---

## 🌐 Deploying to the Web

The website is 100% static (HTML, CSS, JS, assets) and requires no build pipeline. You can deploy it for free on any platform:

### Deploying to GitHub Pages (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Deploy Nethra Shree SD Portfolio Website"
   git branch -M main
   ```
2. Create a new repository on [GitHub](https://github.com) named `portfolio` (or `nethra-portfolio`).
3. Connect and push your code:
   ```bash
   git remote add origin https://github.com/nebula8002-lab/portfolio.git
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages**, select **Deploy from a branch**, choose `main` / `root`, and click **Save**.
5. Your website will be live at `https://nebula8002-lab.github.io/portfolio/`!

### Deploying to Vercel or Netlify
- Drag and drop this folder directly into the [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com) dashboard. It will deploy in under 10 seconds!

---

© 2026 Nethra Shree SD. Designed with curiosity. Batch 2026–2030, SRMIST Ramapuram.
