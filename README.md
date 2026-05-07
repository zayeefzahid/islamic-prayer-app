# Islamic Prayer App

A calm, mobile-first Islamic prayer times web app built with React, Vite, and Tailwind CSS. The interface is designed for repeated daily use: the next prayer is prominent, the remaining time is clear, and the full daily schedule stays easy to scan.

## Features

- Next-prayer hero with live countdown and current-prayer context
- Daily schedule with current, next, completed, and upcoming states
- Browser geolocation with a New York fallback if permission is unavailable
- Prayer times from the Aladhan Prayer Times API
- Calculation convention and Asr school settings
- 12-hour and 24-hour clock formats
- Light, dark, and system theme preferences
- Loading skeletons, fallback notices, and error recovery states
- Small daily Quran reflection with optional recitation audio

## Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Lucide React icons
- shadcn-style UI primitives available in `src/components/ui`

## Project Structure

```text
islamic-prayer-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── DailyReflection.jsx
│   │   ├── NextPrayerHero.jsx
│   │   ├── PrayerSchedule.jsx
│   │   ├── SettingsPanel.jsx
│   │   ├── StatusStates.jsx
│   │   └── ui/
│   ├── lib/
│   │   ├── prayer-times.js
│   │   └── utils.js
│   ├── services/
│   │   └── prayer-api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

```bash
npx pnpm@10.4.1 install
npx pnpm@10.4.1 dev
```

Open `http://localhost:5173`.

## Scripts

```bash
npx pnpm@10.4.1 lint
npx pnpm@10.4.1 build
npx pnpm@10.4.1 preview
```

## API Configuration

The app uses the public Aladhan endpoint by default:

```env
VITE_PRAYER_API_URL=https://api.aladhan.com/v1
```

Reverse geocoding uses BigDataCloud's browser-friendly reverse geocode endpoint to turn device coordinates into a readable city and country.
