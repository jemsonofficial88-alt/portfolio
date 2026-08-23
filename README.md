# Jemson C. Parcon — Personal Portfolio & Full-Stack Application

> **1st-Year BSIT Student • Web & Python Developer • Aspiring Cloud & Cybersecurity Specialist • Roblox Game Creator**  
> Bago City, Negros Occidental, Philippines  
> 📧 [jemsonparcon@gmail.com](mailto:jemsonparcon@gmail.com) • 🌐 [github.com/jemsonofficial88](https://github.com/jemsonofficial88)

---

## 📌 Project Overview

This repository contains the complete portfolio of **Jemson C. Parcon**. It features a modern, compact, interactive frontend paired with a dedicated **Python (FastAPI) Backend** and **SQLite Database** to showcase practical full-stack development, API architecture, cybersecurity concepts, and cloud readiness.

---

## 📁 Full-Stack Project Structure

```text
personal-portfolio/
│
├── index.html                  # Main portfolio website structure & interactive sections
├── README.md                   # Project documentation & guide
├── LICENSE                     # MIT Open Source License
├── vercel.json                 # Vercel deployment configuration & security headers
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
│
├── assets/
│   ├── images/                 # Profile, project previews & certificates
│   │   ├── profile.png         # Profile photo
│   │   ├── projects/
│   │   └── certificates/
│   ├── icons/                  # SVG / PNG icon assets
│   └── fonts/                  # Custom web fonts
│
├── css/
│   ├── style.css               # Core theme variables, typography & canvas resets
│   ├── components.css          # Compact cards, hero, buttons, roadmap, contact UI
│   └── responsive.css          # Media queries (mobile, tablet, desktop)
│
├── js/
│   ├── main.js                 # App initialization, particles, typing, contact form async handler
│   ├── navigation.js           # Mobile drawer toggle & scrollspy
│   ├── animations.js           # Scroll reveal via Intersection Observer
│   └── projects.js             # Dynamic project card rendering with mouse spotlight
│
├── data/
│   ├── projects.json           # Showcase projects data
│   ├── skills.json             # Categorized skills & learning areas
│   └── experience.json         # Education & experience timeline
│
├── docs/
│   └── resume.pdf              # Curriculum Vitae / Resume
│
└── backend/                    # Python FastAPI Backend & Database
    ├── main.py                 # FastAPI application with REST endpoints & Swagger UI
    ├── database.py             # SQLite database helper for inquiries & visitor stats
    ├── requirements.txt        # Python backend dependencies
    ├── .env.example            # Environment variables template
    └── README.md               # Backend documentation & deployment guide
```

---

## ⚡ Tech Stack

- **Frontend:** Semantic HTML5, Modern CSS3 (Grid, Flexbox, Custom Properties, Glassmorphism), Vanilla JavaScript (ES6+)
- **Backend:** Python 3, FastAPI, SQLite, Pydantic, SlowAPI (Rate-limiting)
- **Deployment:** GitHub Pages / Vercel (Frontend), Render / Railway (Python Backend)

---

## 🛠️ Running Locally

### 1. Run the Frontend
You can open `index.html` directly in your browser or use VS Code's **Live Server** extension.

### 2. Run the Python Backend (Optional for Full-Stack Development)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
- Open Interactive API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🚀 How to Publish Live on the Internet (Free)

### Step A: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit of full-stack portfolio"
git remote add origin https://github.com/jemsonofficial88/portfolio.git
git branch -M main
git push -u origin main
```

### Step B: Enable GitHub Pages or Vercel
- **GitHub Pages**: Go to your repository settings > **Pages** > Select **GitHub Actions** as source.
- **Vercel**: Import your repository on [vercel.com](https://vercel.com) for instant deployment with free SSL.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
