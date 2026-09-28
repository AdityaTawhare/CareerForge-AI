# Phase 14 — Voice & Behaviour Analytics

> **Priority:** [S] SHOULD  
> **Owner:** D (Interview/Voice lead)  
> **Parallel:** Can start once Phase 13 mock basics work  
> **Estimated effort:** Medium (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Add voice answers via Web Speech API (with Groq Whisper fallback), AI interviewer TTS, speech metrics (WPM, filler words, pauses), sentiment/confidence from transcript, optional camera indicators (face presence, gaze estimate, posture) using MediaPipe in-browser, privacy notice and permission flow. Only aggregated numbers saved — no video/audio upload.

---

## Detailed Task List

1. **Voice input (STT):**
   - Browser Web Speech API for speech-to-text
   - Real-time transcription displayed
   - Groq Whisper API as fallback (audio recorded in-browser, sent as short clip)
   - Language: English (Hindi via browser API if supported)

2. **AI interviewer speaks (TTS):**
   - Browser speechSynthesis API reads questions aloud
   - Configurable voice, speed, pitch
   - Toggle: mute interviewer voice

3. **Speech metrics (computed from transcript + audio):**
   - Words per minute (WPM)
   - Filler words count ("um", "uh", "like", "you know", "basically")
   - Pause frequency and average duration
   - Answer length (word count)
   - Speaking time vs silence ratio

4. **Sentiment/confidence from transcript:**
   - VADER on English transcript only (no translation step)
   - Confidence indicators: hedging language ("I think", "maybe"), assertive language ("definitely", "I implemented")
   - These are indicators, not judgments — displayed with clear disclaimers

5. **Camera indicators (optional) [S]:**
   - **MediaPipe Face Landmarker:** face presence detection, gaze direction estimate (looking at camera vs away)
   - **MediaPipe Pose Landmarker:** head/shoulder steadiness (fidgeting detection)
   - All processing in-browser using MediaPipe Tasks Vision WASM
   - Only aggregate numbers sent to backend: face_presence_percent, gaze_score (0–100), posture_steadiness_score (0–100)
   - **No video frames, no images, no recordings leave the browser**

6. **Privacy & permissions:**
   - Microphone: ask permission with clear explanation before starting
   - Camera: always optional, separate permission, clear "what we do with it" notice
   - Privacy notice: "Camera analysis happens entirely in your browser. No video is uploaded or stored."
   - Settings: enable/disable camera, enable/disable voice
   - Consent logged in user preferences

7. **Performance panels (added to mock feedback):**
   - Technical performance: rubric scores (from Phase 13)
   - Communication performance: WPM, filler count, clarity score
   - Confidence performance: assertiveness, hedging, sentiment
   - Visual: bar charts, spider chart, traffic-light indicators

8. **Metrics saved to DB:**
   - Only aggregated numbers (MockSession.speechMetrics, MockSession.cameraMetrics)
   - Never: raw audio, raw video, raw transcription files

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/mocks/:sessionId/metrics` | Yes | Save aggregated speech/camera metrics |
| `GET` | `/api/mocks/:sessionId/metrics` | Yes | Get metrics for a session |
| `POST` | `[AI] /speech/transcribe` | Internal | Groq Whisper fallback (short audio clips) |
| `POST` | `[AI] /speech/analyze` | Internal | Speech metrics from transcript |

---

## Acceptance Checklist

- [ ] Voice answers work with Web Speech API
- [ ] AI interviewer reads questions aloud (toggleable)
- [ ] Speech metrics (WPM, fillers, pauses) computed and displayed
- [ ] Camera is always optional — turning it off never blocks the mock
- [ ] No video leaves the browser (verify in Network tab)
- [ ] MediaPipe processes video locally — only numbers sent to backend
- [ ] Privacy notice shown before camera/microphone activation
- [ ] Performance panels show technical, communication, confidence metrics
- [ ] Metrics stored as aggregated numbers only

---

## Demo Steps for Viva

1. Start a mock → answer with voice → show real-time transcription
2. Show speech metrics: WPM, filler count
3. Enable camera → show face detection working locally
4. Open Network tab → prove no video data is transmitted
5. Disable camera → mock continues normally
6. Show performance panels with all three dimensions

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Web Speech API accuracy poor | Medium | Show transcript for correction; Groq Whisper fallback |
| MediaPipe WASM large download | Medium | Lazy-load only when camera enabled; cache in browser |
| Browser compatibility (Safari) | Medium | Feature detection; graceful fallback to text-only |
| False confidence from voice metrics | High | Always label as "indicators, not judgments"; disclaimers |
