# Healthcare SaaS UI — Execution Plan

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| State | Zustand |
| Routing | React Router v6 |
| Auth | Firebase Authentication |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Notifications | Service Worker + Notification API |

---

## Folder Structure

```
src/
├── assets/
├── components/          # shared/reusable UI components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── PatientCard.tsx
│   └── ViewToggle.tsx
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   └── PatientDetails.tsx
├── store/               # Zustand stores
│   ├── authStore.ts
│   └── patientStore.ts
├── services/
│   ├── firebase.ts      # Firebase init + auth helpers
│   └── mockData.ts      # Static patient/analytics data
├── hooks/
│   └── useAuth.ts
├── types/
│   └── index.ts
├── sw.ts                # Service Worker
└── App.tsx
```

---

## Implementation Order

### Step 1 — Project Setup
- Create React App with TypeScript template (already done)
- Install dependencies: `zustand react-router-dom firebase tailwindcss recharts`
- Configure Tailwind, Firebase, and TypeScript paths

### Step 2 — Auth (Firebase)
- `services/firebase.ts` — init Firebase, export `auth`
- `store/authStore.ts` — Zustand store: `{ user, login, logout }`
- `pages/Login.tsx` — email/password form, validation, error state
- `hooks/useAuth.ts` — protect routes; redirect unauthenticated users

### Step 3 — Routing & Layout
- `App.tsx` — define routes, wrap protected pages in auth guard
- `components/Layout.tsx` — sidebar/navbar shell reused across all pages

### Step 4 — Mock Data
- `services/mockData.ts` — 10–15 static patient objects + analytics numbers
- `store/patientStore.ts` — Zustand store: `{ patients, view ('grid'|'list'), setView }`

### Step 5 — Pages

**Dashboard** (`/dashboard`)
- Summary cards: total patients, active cases, alerts
- Quick-access links to Analytics and Patient Details

**Analytics** (`/analytics`)
- 2–3 Recharts charts (line, bar, pie) using mock data
- Date range filter (UI only, filters local state)

**Patient Details** (`/patients`)
- Fetch from `patientStore`
- `ViewToggle` component switches grid ↔ list
- Grid: card layout | List: table layout
- Search/filter by name (local state)

### Step 6 — Service Worker + Notifications
- Register `sw.ts` in `index.tsx`
- Request notification permission on first login
- Trigger a local notification on a timer (e.g., "You have 3 new patient alerts") to demonstrate the feature

### Step 7 — Polish
- Responsive layout (mobile-first Tailwind breakpoints)
- Loading and error states on auth actions
- 404 page

---

## Zustand Store Design

```ts
// authStore.ts
{ user: User | null, login(), logout() }

// patientStore.ts
{ patients: Patient[], view: 'grid' | 'list', setView(), search: string, setSearch() }
```

Both stores are small, flat, and co-located with their slice of state. No middleware, no persistence needed.

---

## Data Model

```ts
type Patient = {
  id: string
  name: string
  age: number
  condition: string
  status: 'active' | 'discharged' | 'critical'
  lastVisit: string
  doctor: string
}
```

---

## What is NOT in scope (kept simple on purpose)
- Real backend / API calls
- Complex micro-frontend federation
- Server-side rendering
- Real-time data
- Role-based access control

---

## Deployment
- Push to GitHub
- Connect repo to Vercel (zero-config for CRA)
- Add Firebase env vars in Vercel dashboard
