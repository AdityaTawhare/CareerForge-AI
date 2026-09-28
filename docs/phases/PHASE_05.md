# Phase 05 — LLM Gateway & AI Infrastructure

> **Priority:** [M] MUST  
> **Owner:** C (AI/NLP lead)  
> **Parallel:** Can be done alongside Phase 4 (B+A work on auth)  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build the central LLM Gateway module with multi-provider fallback (Gemini → Groq → OpenRouter → Ollama), response caching, per-user quota tracking, streaming support, and JSON validation/repair loop. Set up the prompt registry, PII masking utility, FastAPI service skeleton with embedding endpoint, basic evaluation harness, admin AI health page, and Demo Mode infrastructure.

---

## Detailed Task List

1. **LLM Gateway module** (`server/src/llm/`):
   - Provider abstraction: each provider (Gemini, Groq, OpenRouter, Ollama) implements a common interface
   - Provider priority list from env config
   - Automatic fallback: try next provider on 429/5xx/timeout
   - Circuit breaker per provider (3 failures in 5 min → skip for 10 min)
   - Streaming support (SSE) for long outputs
   - Cost/latency logging per request
2. **Response cache** (`LLMCache` collection):
   - Hash: SHA-256 of prompt template name + version + input variables
   - Cache hit returns immediately; cache miss calls LLM
   - TTL configurable per prompt type (default 24h)
3. **Quota tracking** (`QuotaUsage` collection):
   - Per-user daily token counter
   - Global daily counter per provider
   - Configurable limits (env vars)
   - Return 429 with "quota exceeded" message when hit
4. **JSON validation/repair loop:**
   - LLM returns text → try JSON.parse → validate with Zod schema
   - If invalid: retry once with validation error appended to prompt
   - If still invalid: return fallback (rule-based result or cached result) + flag "basic mode"
5. **Prompt registry** (`server/src/llm/prompts/`):
   - Prompts as versioned files: `resume_analysis.v1.md`, `interview_question.v1.md`, etc.
   - Each prompt file has: template with `{{variables}}`, output JSON schema, examples, test fixture
   - Loader function: `loadPrompt(name, version, variables) → string`
6. **PII masking utility** (`server/src/llm/piiMasker.js`):
   - Regex-based masking for: phone numbers, email addresses, physical addresses, Aadhaar-like patterns
   - Replace with `[PHONE]`, `[EMAIL]`, `[ADDRESS]`, `[ID]`
   - Reversible mapping for display (store mapping, restore after LLM response)
7. **FastAPI AI service enhancements:**
   - `/embed` endpoint: accept text, return embedding vector (sentence-transformers)
   - `/embed/batch` endpoint: accept list of texts, return list of vectors
   - Load model on startup: `all-MiniLM-L6-v2` (or `multilingual-e5-small`)
   - `/health` enhanced: model loaded status, memory usage
8. **Demo Mode:**
   - Toggle in admin settings (stored in DB or env)
   - When enabled: LLM Gateway returns pre-stored fixtures instead of calling providers
   - Fixture loader: reads from `data/demo-fixtures/` JSON files
   - Demo student + demo company data seeded
9. **Admin AI health page:**
   - Provider status (up/down/circuit-open)
   - Quota usage (today/this week per provider)
   - Cache stats (hits/misses/size)
   - Demo Mode toggle
10. **Evaluation harness** (`ai-service/evals/`):
    - Script runner for eval tasks
    - Basic structure: input → expected output → actual output → metrics

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/ai/generate` | Yes | Send prompt through LLM Gateway |
| `GET` | `/api/ai/stream/:jobId` | Yes | SSE stream for long AI jobs |
| `GET` | `/api/ai/health` | Admin | Provider status, quota, cache stats |
| `PUT` | `/api/ai/demo-mode` | Admin | Toggle Demo Mode |
| `GET` | `/api/ai/quota` | Yes | User's remaining quota |
| `POST` | `[AI] /embed` | Internal | Get embedding for text |
| `POST` | `[AI] /embed/batch` | Internal | Get embeddings for batch |

---

## External Keys/Data Needed

| Item | Env Variable | Status |
|---|---|---|
| Gemini API key | `GEMINI_API_KEY` | ❌ Team must get from AI Studio |
| Groq API key | `GROQ_API_KEY` | ❌ Team must get from console.groq.com |
| OpenRouter API key | `OPENROUTER_API_KEY` | ❌ Team must get from openrouter.ai |
| Ollama (optional) | `OLLAMA_BASE_URL` | 🔄 Install ollama locally |

**⚠️ Before starting:** Team must provide at least the Gemini API key. Groq and OpenRouter are recommended but the system works with just one provider.

---

## Acceptance Checklist

- [ ] A test prompt returns valid JSON through the gateway
- [ ] Fallback works: disable primary provider → next provider handles it
- [ ] Cache: second identical request returns from cache (visible in logs)
- [ ] Quota: user exceeding limit gets 429 with clear message
- [ ] PII masking: phone/email/address replaced before LLM call, restored after
- [ ] Prompt registry: prompts loaded from files with variable substitution
- [ ] Embedding endpoint returns correct-dimension vectors
- [ ] Demo Mode: toggle on → LLM calls return fixtures; toggle off → real calls
- [ ] Admin health page shows provider status and quota usage
- [ ] JSON validation: invalid LLM output triggers retry, then fallback

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| Free tier limits change | Check current limits before implementation; build generous caching |
| Gemini API rate limits during dev | Use cache aggressively; each developer uses their own key |
| Ollama too heavy on some machines | Make it optional last-resort; never required |
| Embedding model download slow | Pre-download in setup; cache model in project |
