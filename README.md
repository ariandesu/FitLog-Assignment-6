# FitLog — Workout Library. Train hard, log honest.

Dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

Live: `vercel --prod` pending (run `vercel login && vercel --prod`)
Repo: https://github.com/ariandesu/FitLog-Assignment-6

## Tech Stack
- Next.js 16.3.6 App Router + Turbopack
- React 19.2.8
- Tailwind CSS 4 + @tailwindcss/postcss
- Context API + localStorage for plan/saved/completed

## Features
1. Workout Library — 3×4 grid (responsive 1/2/3), fetches `https://api.abcz.workers.dev/api/fitlog`, cards show image, category pills, name, equipment, duration/calories/rating, link to detail
2. Hero Banner — `WORKOUT LIBRARY` eyebrow, `TRAIN WITH INTENT. LOG EVERY SET.` + subtitle + `BROWSE WORKOUTS` → `#library`
3. Navbar — logo left, `My Dashboard` middle, active-aware, badges Plan ` #ccff00` / Saved outline → `/my-plan`, live counters
4. Workout Details — 2-col, specs (equipment/difficulty/sets/reps/duration/calories/rating), instructions, `Add to today's plan` / `Save for later` with localStorage + cap 5
5. My Plan — `/my-plan` dashboard, metrics Exercises/Minutes/Calories, tabs Today's/Saved, loading `Loading workouts…`, cards View Details/Mark Done/X, empty `NOTHING HERE YET` + Go to workouts, 404 + reload-safe

## Run
```bash
npm install
npm run dev   # http://localhost:3000
npm run build # verify Vercel build passes (✓ Turbopack)
```

## Deploy (Vercel)
```bash
npm i -g vercel@latest
vercel login
vercel --prod   # or push to main → auto-deploy
```

## Commits (9)
- Built-in 9 meaningful commits covering design system → navbar → library → details → context → my-plan → history → polish → deploy fix.
