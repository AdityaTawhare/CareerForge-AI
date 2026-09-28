# CareerForge AI — API Keys & Accounts Needed

> **Last updated:** 2026-09-28  
> **Status:** ❌ Not obtained · ✅ Obtained · ⏭️ Not needed yet · 🔄 Optional

---

| # | Item | Env Variable(s) | Free? | Needed From Phase | Where to Get | Status |
|---|---|---|---|---|---|---|
| 1 | MongoDB Atlas M0 connection string | `MONGODB_URI` | ✅ Free | Phase 1 | [mongodb.com/atlas](https://www.mongodb.com/atlas) | ❌ |
| 2 | JWT access secret (random string) | `JWT_ACCESS_SECRET` | ✅ Free (self-generated) | Phase 4 | Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` | ❌ |
| 3 | JWT refresh secret (random string) | `JWT_REFRESH_SECRET` | ✅ Free (self-generated) | Phase 4 | Same command as above | ❌ |
| 4 | Google Gemini API key | `GEMINI_API_KEY` | ✅ Free tier | Phase 5 | [Google AI Studio](https://aistudio.google.com/apikey) | ❌ |
| 5 | Groq API key | `GROQ_API_KEY` | ✅ Free tier | Phase 5 | [console.groq.com](https://console.groq.com) | ❌ |
| 6 | OpenRouter API key (fallback) | `OPENROUTER_API_KEY` | ✅ Free models | Phase 5 | [openrouter.ai](https://openrouter.ai) | ❌ |
| 7 | Ollama installed locally (optional) | `OLLAMA_BASE_URL` | ✅ Free | Phase 5 | [ollama.com](https://ollama.com) | 🔄 |
| 8 | Adzuna App ID + Key | `ADZUNA_APP_ID`, `ADZUNA_APP_KEY` | ✅ Free | Phase 9/16 | [developer.adzuna.com](https://developer.adzuna.com) | ❌ |
| 9 | GitHub token (optional, raises rate limit) | `GITHUB_TOKEN` | ✅ Free | Phase 8 | GitHub → Settings → Developer Settings → Tokens | 🔄 |
| 10 | Tavily API key (optional) | `TAVILY_API_KEY` | ✅ Free tier | Phase 9 | [tavily.com](https://tavily.com) | 🔄 |
| 11 | Google OAuth client ID/secret (optional) | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | ✅ Free | Phase 4 | [Google Cloud Console](https://console.cloud.google.com) | 🔄 |
| 12 | Email service (optional) | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` or `BREVO_API_KEY` | ✅ Free tier | Phase 17 | [brevo.com](https://brevo.com) or Gmail app password | 🔄 |
| 13 | Cloudinary (optional, for original resume files) | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | ✅ Free tier | Phase 6 | [cloudinary.com](https://cloudinary.com) | 🔄 |
| 14 | Vercel account | — | ✅ Free | Phase 20 | [vercel.com](https://vercel.com) | ❌ |
| 15 | Render account | — | ✅ Free | Phase 20 | [render.com](https://render.com) | ❌ |
| 16 | Hugging Face account | — | ✅ Free | Phase 20 | [huggingface.co](https://huggingface.co) | ❌ |
| 17 | UptimeRobot account | — | ✅ Free | Phase 20 | [uptimerobot.com](https://uptimerobot.com) | ❌ |
| 18 | GitHub account (for repo + Actions) | — | ✅ Free | Phase 1 | [github.com](https://github.com) | ❌ |

---

## Notes

- **All services are free tier.** No credit card required for any item above.
- JWT secrets are self-generated random strings — no signup needed.
- Optional items (🔄) can be skipped; the app works without them.
- I will remind you which keys are needed **before each phase**.
