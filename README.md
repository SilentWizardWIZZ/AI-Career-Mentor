AI Career Mentor
An AI-powered web application that helps students and professionals discover, plan, and pursue the career path that best matches their interests, skills, and goals.

Banner
<img width="1816" height="747" alt="Screenshot 2025-07-20 211057" src="https://github.com/user-attachments/assets/cb96eb46-7127-4ab4-99c4-69112234b25c" />
<img width="1824" height="742" alt="Screenshot 2025-07-20 211027" src="https://github.com/user-attachments/assets/3e7bdad1-1a7f-4d03-b97a-5676e6873109" />


✨ Key Features
Category	Description
Interactive Assessment	8-step questionnaire covering education, skills, interests, lifestyle, and career goals
AI-Driven Recommendations	OpenAI-powered engine delivers top career matches with compatibility scores
12-Month Roadmaps	Auto-generated learning paths, certifications, and project milestones
Resource Hub	Curated courses, books, YouTube playlists, and GitHub projects for every career
PDF Export	One-click generation of a polished, shareable career-plan PDF
Modern UI/UX	Apple-inspired design, smooth animations, and fully responsive layouts

🏗️ Tech Stack
Layer	Technology
Frontend	React • Vite • TypeScript • Tailwind CSS • Framer Motion
Backend API	Python 3.11 • Flask • FastAPI (async endpoints)
AI Services	OpenAI GPT-4o (text) • Cohere (fallback)
Database	Supabase Postgres • Row Level Security
Auth	Supabase Auth (email ⧸ OAuth)
PDF Generation	jsPDF • html2canvas
Deployment	Netlify (frontend) • Render (backend)

🗂️ Repository Structure
text
ai-career-mentor/
├─ app/                # React frontend (Vite)
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ hooks/
│  │  └─ styles/
│  └─ index.html
├─ api/                # Python Flask & FastAPI backend
│  ├─ main.py
│  ├─ routes/
│  ├─ services/
│  └─ requirements.txt
├─ scripts/            # Utility scripts (seeding, lint, deploy)
├─ docs/               # Architecture diagrams, screenshots
├─ .env.example        # Environment variable template
└─ README.md

🚀 Getting Started
Prerequisites
Node.js ≥ 20.0

Python ≥ 3.11

Supabase account & project

OpenAI API key

1 · Clone & Install
bash
git clone https://github.com/your-handle/ai-career-mentor.git
cd ai-career-mentor

# Frontend
cd app && npm install && cd ..

# Backend
cd api && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt && cd ..
2 · Configure Environment Variables
Copy .env.example → .env in both app/ and api/, then fill in:

text
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=...
DATABASE_URL=postgresql://...
FLASK_SECRET=change-me
3 · Run in Development
bash
# Terminal 1 – Backend
auth/venv$ cd api && uvicorn main:app --reload --port 8000

# Terminal 2 – Frontend
$ cd app && npm run dev
The app is now live at http://localhost:5173 and will proxy API calls to http://localhost:8000.

🛠️ Build & Deploy
Target	Command
Production build (frontend)	npm run build → outputs to app/dist/
Preview locally	npm run preview
Deploy (Netlify)	Connect repo → set env vars → Netlify builds with npm run build
Deploy API (Render)	New web service → Python build → Start Cmd uvicorn main:app --host 0.0.0.0 --port 10000
📝 Tip: Configure CORS in api/middlewares.py to allow your Netlify domain.

🧩 Extending the Project
Add New Careers → Modify api/data/careers.json and regenerate roadmaps.

Switch LLM Provider → Abstracted in api/services/ai.py; drop in Anthropic or Gemini.

Custom Themes → Tweak Tailwind config and CSS variables in app/src/styles/theme.css.

Analytics → Integrate PostHog or Plausible in app/src/main.tsx.

🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss what you would like to change.

bash
# Lint & Type-check
npm run lint && npm run typecheck
📜 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements
OpenAI for the GPT-4o API

Supabase for the generous OSS plan

Tailwind CSS for rapid UI development

Icons by Phosphor Icons

Empowering individuals to design fulfilling futures through data-driven career guidance.
