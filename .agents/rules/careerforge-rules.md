# CareerForge AI — Workspace Rules

## Approval Gate
- Work in phases (see `docs/PHASES.md`). **Never start a phase without explicit team approval.**
- Before each phase, show a Phase Brief and ask: "Approve Phase N? Reply: YES / EDIT / SKIP / LATER"
- After each phase, show a Phase Report and update `docs/PROGRESS.md`.

## Session Start
- **Always** read `docs/PROGRESS.md` at the start of every session to know where we left off.
- Check `docs/API_KEYS_NEEDED.md` to see if any keys are missing for the current phase.
- Check `docs/DATA_NEEDED_FROM_TEAM.md` for any pending data items.

## Engineering Standards
- Backend: Node.js + Express, plain JavaScript. Frontend: React + Vite + TypeScript.
- Validate all inputs with Zod. Central error handler. Never trust LLM output.
- Environment variables only via `.env`. Never commit secrets. Provide `.env.example`.
- Every phase must leave the app runnable. No half-broken main branch.
- Use seed/fixture data so the app looks alive in demos.
- All Windows development. Use cross-platform scripts.
- No Docker. Services run natively.

## AI Rules
- AI outputs are guidance, not truth. Always show confidence and sources.
- PII masking before any text goes to a cloud LLM.
- Camera/voice processing in-browser only. No video upload.
- Demo Mode must work without internet/API quotas.

## File Organization
- Monorepo: `client/`, `server/`, `ai-service/`, `data/`, `docs/`
- Planning docs in `docs/`; phase details in `docs/phases/`
- Shared schemas in `packages/shared/` (optional)
