# Logical Web Mini App (MVP)

MVP frontend for a timed logic game with profile, leaderboard, referrals and monetization touchpoints.

## Stack decisions

- **Vue 3 + TS + Vite + Pinia + Vue Router**.
- **Tailwind CSS** over UnoCSS for MVP because onboarding is simpler for most frontend teams, predictable utility set, and stable ecosystem with Headless UI.
- **Headless UI (Vue)** for accessibility-first primitives (dialog/menu/switch) while keeping full visual control.
- **Forms**: Zod-driven validation in service/forms layer (ready to connect with any form composable).
- **Realtime**: **Socket.IO client** preferred for reconnection strategy, event-based channels and easier auth flow than raw WebSocket for MVP.
- **Analytics**: **PostHog** preferred (self-hostable, product analytics + experiments + feature flags in one tool).

## Project structure (atomic + feature-first)

```txt
src/
  assets/
  components/
    atoms/
    molecules/
    organisms/
  composables/
  i18n/
  pages/
    LandingPage.vue
    DashboardPage.vue
    GamePage.vue
    ProfilePage.vue
    LeaderboardPage.vue
  plugins/
  router/
  services/
    api.ts
    socket.ts
  stores/
    user.ts
    game.ts
    leaderboard.ts
    referral.ts
    ui.ts
  types/
  utils/
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## MVP scope

### Must (MVP)

- Registration/login UI (email/password + Google OAuth button surface).
- Timed game round (start, timer, submit answer).
- Attempt submission to backend.
- Leaderboard list with realtime updates.
- Profile stats screen.
- Referral code/link visibility.

### Optional / Phase 2

- Tournaments + buy-to-enter.
- Power-ups marketplace.
- Rewarded ads and full ad mediation.
- A/B testing scenarios.

## API contract expected by frontend

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/oauth/google`
- `POST /auth/refresh`
- `GET /me`
- `GET /game/round/start`
- `POST /game/round/submit`
- `POST /game/round/hint`
- `GET /leaderboard?scope=daily|weekly|global|friends&page=1`
- `GET /profile/stats`
- `GET /referral/me`
- `POST /checkout/pro`
- `POST /checkout/tournament-entry`

Socket channels:

- emit `leaderboard:subscribe` `{ scope }`
- on `leaderboard:update` `PlayerScore[]`
- on `social:friend-overtook` for toast feedback

## Timer anti-cheat strategy

- Client shows optimistic timer for UX.
- Backend is source of truth: round start timestamp, max duration, answer lock on timeout.
- `submitAnswer` sends elapsed ms + client time-left only as telemetry.
- Server validates elapsed time and may reject suspicious drift.

## Security/performance notes

- Store JWT in **httpOnly cookie** + refresh flow; avoid localStorage token storage.
- Add strict CSP headers (template in `index.html` for local baseline).
- Route-level lazy loading already enabled in router.
- For future scaling: optional SSR/SSG via Nuxt or Vite SSR, but not required for MVP.

## Monetization UX ideas included in UI roadmap

- “Get extra 30s” popup (rewarded ad opt-in).
- PRO subscription: exclusive rounds + advanced analytics + ad-free.
- Buy-to-enter tournaments via Stripe checkout screen.
- Referral rewards with invite count and token bonuses.

## Roadmap (2–3 iterations)

1. **Iteration 1 (MVP core):** auth flow, game loop, profile, leaderboard, referral view, analytics events.
2. **Iteration 2 (engagement):** daily missions, badges/streak UI, social feed toasts, confetti/sfx feedback.
3. **Iteration 3 (monetization):** checkout flows (PRO/tournaments), rewarded-ad extension, experiments with PostHog flags.
