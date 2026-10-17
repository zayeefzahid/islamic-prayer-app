# Islamic Prayer App

A responsive prayer times app with a live countdown, daily schedule, and Quran reflection. Built with React and Vite, with a monochrome interface, particle-wave artwork, and glass-style panels.

[Live demo](https://islamic-prayer.pages.dev/) · [Repository](https://github.com/zayeefzahid/islamic-prayer-app) · [Report an issue](https://github.com/zayeefzahid/islamic-prayer-app/issues)

## Features

- **Next prayer:** upcoming prayer, live countdown, scheduled time, and progress indicator.
- **Daily schedule:** Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha, with current and upcoming time states.
- **Location:** browser geolocation and readable location names through reverse geocoding.
- **Calculation preferences:** North America, Muslim World League, Karachi, Umm al-Qura, and Egyptian Authority conventions; Standard or Hanafi Asr calculation.
- **Display preferences:** 12-hour or 24-hour time and system, light, or dark theme selection.
- **Saved settings:** preferences persist in browser local storage.
- **Quran reflection:** Quran 2:45 with Arabic text, translation, and optional recitation audio.
- **Responsive UI:** mobile layouts, keyboard focus indicators, and reduced-motion support.

## Getting started

Install Node.js 22 LTS, then run:

```bash
git clone https://github.com/zayeefzahid/islamic-prayer-app.git
cd islamic-prayer-app
npx pnpm@10.4.1 install
npx pnpm@10.4.1 dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The repository specifies **pnpm 10.4.1** and includes a `pnpm-lock.yaml` file.

## Commands

| Command | Purpose |
| --- | --- |
| `npx pnpm@10.4.1 dev` | Start the development server |
| `npx pnpm@10.4.1 build` | Build the app into `dist/` |
| `npx pnpm@10.4.1 preview` | Preview the production build locally |
| `npx pnpm@10.4.1 lint` | Run ESLint |

## Configuration

No API key or environment file is required for the default setup.

To override the prayer API endpoint, create `.env.local` in the project root:

```env
VITE_PRAYER_API_URL=https://api.aladhan.com/v1
```

Restart the development server after changing environment variables. Production environment changes require a new build.

## Location and fallback behavior

The app requests location permission on startup. If geolocation is denied or unavailable, it uses **New York, United States** and displays a notice. You can retry through **Settings → Use current**.

Prayer times are fetched from Aladhan. If the request fails, the app displays **fallback sample times** with a warning. These sample times are demonstration data and should not be treated as verified local prayer times.

Browser geolocation requires HTTPS in production; localhost is supported during development. Prayer timing and countdown date handling currently use the browser's local clock and timezone.

## Deploy to Cloudflare Pages

Connect this repository and use the following build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | React (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root; leave blank |

The default API endpoint is built in, so environment variables are optional. Commit and push your changes before deploying through the GitHub integration.

The production build is a static site and can also be served by a static hosting provider that supports HTTPS.

## Tech stack

| Area | Technology |
| --- | --- |
| Interface | React 19 |
| Development and build | Vite 6 |
| Styling | CSS and Tailwind CSS 4 |
| Icons | Lucide React |
| UI primitives | Radix UI / shadcn-style components |
| Prayer times | Aladhan Prayer Times API |
| Location names | BigDataCloud reverse geocoding |
| Recitation | Islamic Network audio CDN |

## Project structure

```text
islamic-prayer-app/
├── public/                  # Static assets and wave artwork
├── src/
│   ├── components/          # Header, countdown, schedule, settings, reflection
│   │   └── ui/              # Reusable UI primitives
│   ├── hooks/               # Shared React hooks
│   ├── lib/prayer-times.js  # Prayer timeline, defaults, and formatting
│   ├── services/prayer-api.js # API requests, location, and fallback data
│   ├── App.jsx              # App state and feature orchestration
│   ├── App.css              # Prayer interface styling
│   ├── index.css            # Global styles and theme tokens
│   └── main.jsx             # React entry point
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

## Contributing

Open an issue for a bug or proposed feature. For code changes, create a branch, keep changes focused, run lint and a production build, then open a pull request.

## License

[MIT](LICENSE)
