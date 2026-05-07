# Islamic Prayer App

<p align="center">
  <strong>A calm, mobile-first prayer times app for daily use.</strong>
</p>

<p align="center">
  Track the next prayer, view the full daily schedule, adjust calculation settings, and read a small Quran reflection — all in a clean, responsive interface.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-0A0A0A?style=for-the-badge&logo=react&logoColor=00FF41" alt="React" />
  <img src="https://img.shields.io/badge/Vite-0A0A0A?style=for-the-badge&logo=vite&logoColor=00FF41" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0A0A0A?style=for-the-badge&logo=tailwindcss&logoColor=00FF41" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Aladhan_API-0A0A0A?style=for-the-badge&logoColor=00FF41" alt="Aladhan API" />
</p>

---

## `> overview`

Islamic Prayer App is a peaceful, mobile-first web app built to make daily prayer times easy to check at a glance.

The app highlights the **next prayer**, shows a **live countdown**, displays the full daily prayer schedule, and includes simple settings for location, calculation method, Asr school, time format, and theme preference.

It is designed for repeated daily use: calm visuals, clear timing, fast loading, and no unnecessary clutter.

```bash
open app → check next prayer → view schedule → continue your day
```

---

## `> preview`

<p align="center">
  <img src="./preview.png" alt="Islamic Prayer App preview" width="900" />
</p>

<p align="center">
  <em>Clean, responsive prayer time interface with next-prayer focus.</em>
</p>

---

## `> features`

- **Next prayer hero**  
  Displays the upcoming prayer prominently with a live countdown.

- **Current prayer context**  
  Shows whether a prayer is completed, current, next, or upcoming.

- **Daily prayer schedule**  
  Clean timeline-style schedule for Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.

- **Browser geolocation**  
  Detects the user’s location using the browser Geolocation API.

- **Fallback location**  
  Uses New York as a fallback if location permission is denied or unavailable.

- **Prayer time API**  
  Fetches prayer times from the Aladhan Prayer Times API.

- **Calculation settings**  
  Supports calculation convention and Asr school preferences.

- **Time format options**  
  Switch between 12-hour and 24-hour clock formats.

- **Theme preferences**  
  Includes light, dark, and system theme modes.

- **Daily Quran reflection**  
  Shows a small Quran reflection with optional recitation audio.

- **Resilient UI states**  
  Includes loading skeletons, fallback notices, and error recovery states.

---

## `> why_i_built_this`

Prayer time apps are used every day, so the experience needs to feel simple, readable, and calm.

This project focuses on:

- making the next prayer instantly visible
- reducing visual noise
- supporting mobile-first usage
- handling real-world states like loading, errors, and denied location access
- keeping the design peaceful and respectful

---

## `> tech_stack`

| Layer | Tech |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| UI | shadcn-style primitives |
| Prayer Times | Aladhan Prayer Times API |
| Location | Browser Geolocation API |
| Reverse Geocoding | BigDataCloud Reverse Geocoding |

---

## `> project_structure`

```txt
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

---

## `> getting_started`

### Prerequisites

Make sure you have Node.js installed.

Recommended:

```bash
node -v
```

This project uses `pnpm`.

### Clone the repository

```bash
git clone https://github.com/zayeefzahid/islamic-prayer-app.git
cd islamic-prayer-app
```

### Install dependencies

```bash
npx pnpm@10.4.1 install
```

### Start the development server

```bash
npx pnpm@10.4.1 dev
```

Open the app in your browser:

```txt
http://localhost:5173
```

---

## `> scripts`

```bash
npx pnpm@10.4.1 dev
npx pnpm@10.4.1 lint
npx pnpm@10.4.1 build
npx pnpm@10.4.1 preview
```

| Command | Description |
|---|---|
| `dev` | Start the local development server |
| `lint` | Run lint checks |
| `build` | Create a production build |
| `preview` | Preview the production build locally |

---

## `> api_configuration`

The app uses the public Aladhan Prayer Times API by default.

```env
VITE_PRAYER_API_URL=https://api.aladhan.com/v1
```

Reverse geocoding uses BigDataCloud’s browser-friendly endpoint to convert coordinates into a readable city and country.

---

## `> location_behavior`

The app tries to detect the user’s location through the browser.

```txt
Location allowed     → use device coordinates
Location denied      → use fallback location
Location unavailable → show fallback notice
```

Default fallback:

```txt
New York, United States
```

---

## `> prayer_settings`

The app supports user-adjustable prayer calculation settings, including:

- calculation convention
- Asr school
- 12-hour or 24-hour time format
- light, dark, or system theme

These settings help make the app more flexible for different regions and preferences.

---

## `> build`

Create a production build:

```bash
npx pnpm@10.4.1 build
```

Preview the production build:

```bash
npx pnpm@10.4.1 preview
```

---

## `> deployment`

This app can be deployed easily on static hosting platforms.

Recommended platforms:

| Platform | Notes |
|---|---|
| Vercel | Simple React/Vite deployment |
| Netlify | Great for static frontend apps |
| Cloudflare Pages | Fast global hosting |

Make sure the environment variable is configured in the hosting dashboard:

```env
VITE_PRAYER_API_URL=https://api.aladhan.com/v1
```

---

## `> roadmap`

- [ ] Add saved favorite locations
- [ ] Add manual location search
- [ ] Add monthly prayer calendar
- [ ] Add Qibla direction
- [ ] Add prayer notifications
- [ ] Add offline-friendly caching
- [ ] Add more Quran reflection options
- [ ] Add multiple language support

---

## `> accessibility`

The interface is designed with readability and repeated daily use in mind.

Focus areas:

- clear visual hierarchy
- readable spacing
- mobile-first layout
- strong contrast in light and dark mode
- simple recovery states for errors and loading

---

## `> contributing`

Contributions are welcome.

To contribute:

```bash
git checkout -b feat/your-feature
git commit -m "feat: add your feature"
git push origin feat/your-feature
```

Then open a pull request.

For major changes, please open an issue first to discuss the idea.

---

## `> license`

MIT © 2025 Zayeef Zahid

---

## `> links`

- **Repository:** [github.com/zayeefzahid/islamic-prayer-app](https://github.com/zayeefzahid/islamic-prayer-app)
- **Issues:** [github.com/zayeefzahid/islamic-prayer-app/issues](https://github.com/zayeefzahid/islamic-prayer-app/issues)

---

<p align="center">
  <strong>Built to make checking prayer times simple, calm, and clear.</strong>
</p>
