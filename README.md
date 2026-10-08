# CareerForge AI

> 🚀 An AI-powered career management platform that takes students from resume to company-specific interview readiness, with personalized roadmaps, mock interviews, and proof of improvement.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Node.js + Express (JavaScript), Mongoose, Zod |
| AI Service | Python FastAPI, spaCy, sentence-transformers |
| Database | MongoDB Atlas M0 (free) |
| LLM | Gemini → Groq → OpenRouter (fallback chain) |

---

## Prerequisites

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **Python** 3.10+ ([python.org](https://python.org))
- **Git** ([git-scm.com](https://git-scm.com))
- **MongoDB Atlas** M0 cluster ([mongodb.com/atlas](https://mongodb.com/atlas)) — free

---

## Local Setup (Windows)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/careerforge-ai.git
cd careerforge-ai
```

### 2. Install Node dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
# Copy the example files
copy server\.env.example server\.env
copy ai-service\.env.example ai-service\.env
copy client\.env.example client\.env
```

Then open `server/.env` and fill in your `MONGODB_URI` and other values.

### 4. Set up Python virtual environment (for AI service)

```powershell
cd "f:\CareerForge AI\ai-service"

# Create venv
py -m venv venv

# Allow scripts (run once if you get an error)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Activate venv (PowerShell — note .ps1 not .bat)
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

cd ..
```

### 5. Run all services

```bash
# Terminal 1 — Client + Server (concurrent)
npm run dev

# Terminal 2 — Python AI service
cd ai-service
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

Or run them separately:

```bash
npm run dev:client   # http://localhost:5173
npm run dev:server   # http://localhost:5000
npm run dev:ai       # http://localhost:8000  (from ai-service/ with venv active)
```

### 6. Verify

- Client: http://localhost:5173
- Server health: http://localhost:5000/api/health
- AI service health: http://localhost:8000/health

---

## Project Structure

```
careerforge-ai/
├─ client/             # React + Vite + TypeScript frontend
├─ server/             # Node.js + Express backend (JavaScript)
├─ ai-service/         # Python FastAPI AI service
├─ data/               # Seed data, demo fixtures
├─ docs/               # Planning docs, phase files, design system
├─ packages/shared/    # Shared types (optional)
└─ .github/workflows/  # CI/CD
```

---

## Team

| Role | Member |
|---|---|
| A — Frontend & UI/UX | Team Member A |
| B — Backend & DevOps | Team Member B |
| C — AI/NLP | Team Member C |
| D — Interview/Voice/QA | Team Member D |

---

## Documentation

- [Project Plan](docs/PROJECT_PLAN.md)
- [Phase Overview](docs/PHASES.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [API Keys Needed](docs/API_KEYS_NEEDED.md)
- [Research Gap Analysis](docs/RESEARCH_GAP_ANALYSIS.md)

---

## License

MIT
