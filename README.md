# EchoGPT

A focused, multi-model AI chat workspace with persistent conversations, a prompt library, and a browser-extension concept. Built as a frontend engineering assessment.

**Live demo:** https://echogpt-redesign.up.railway.app

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Engineering Highlights](#engineering-highlights)
- [Case Studies](#case-studies)
- [Available Scripts](#available-scripts)
- [Security Notes](#security-notes)
- [Future Improvements](#future-improvements)
- [AI Use Declaration](#ai-use-declaration)
- [License](#license)

---

## Overview

EchoGPT is a single-page application that demonstrates four product surfaces:

1. A marketing landing page (`/`)
2. Credential-based authentication (`/login`, `/register`)
3. A chat workspace with persistent conversations, search, pinning, prompt library, and a command palette (`/chat`, `/chat/:id`)
4. A browser-extension concept page (`/extension`)

The product targets users who want to switch between multiple AI models (EchoGPT, GPT, Claude, Gemini) in one workspace without losing context.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.6 (App Router, Turbopack) |
| Language | JavaScript (no TypeScript) |
| UI | React 19.2.8 |
| Styling | Tailwind CSS 4 |
| Auth | NextAuth / Auth.js 4 (credentials provider, JWT sessions) |
| Database | PostgreSQL via `pg` |
| Markdown | react-markdown + rehype-highlight + remark-gfm |
| Animation | framer-motion |
| Icons | lucide-react |
| Theme | next-themes |
| Toasts | sonner |
| Command Palette | cmdk |
| Password Hashing | bcryptjs (cost 12) |

Runtime deps are listed in `package.json`. No additional packages were added during the feature work for this assessment.

---

## Features

### Public surface

- **Landing page** — Hero, metrics strip, product preview, feature splits, workflow section, capability bento, pricing, FAQ, CTA, footer.
- **Login** — Email + password auth with side-rail feature showcase and animated chat preview.
- **Register** — Mirror layout of login with extension-context showcase instead of chat preview.
- **Extension page** — Static concept page describing the browser extension.

### Chat workspace (`/chat`)

- Conversation list with Pinned and Recent sections.
- Live chat search across titles and first-user-message previews (debounced, 150 ms).
- Pin / unpin chats (persisted in `localStorage`, cross-tab sync via the `storage` event).
- Prompt Library — 24 curated prompts across Coding, Writing, Research, Productivity. Click a prompt to insert its text into the composer (no auto-send).
- Command Palette (`Cmd+K` / `Ctrl+K`) — Quick actions, Pinned chats, Recent chats, Theme toggle, Open Settings, Open Profile, Open Prompt Library, Focus Search.
- Message actions on assistant messages — Copy, Like, Dislike (mutually exclusive, persisted per message), Regenerate.
- Message actions on user messages — Copy, Edit (in-place composer edit).
- Sidebar collapse / expand (desktop only) with a visible handle and `Cmd+B` shortcut.
- Keyboard shortcuts: `Cmd+K` palette, `Cmd+B` toggle sidebar, `Cmd+Shift+O` new chat, `/` focus composer.
- Streaming dots indicator in the chat preview only (no actual stream; service simulates a 700 ms response).

### Account pages

- **Profile** — Display name edit, session info, sign out.
- **Settings** — Display name + 3-state appearance control (Light / Dark / System).

### Cross-cutting

- Dark mode via `next-themes` with `system` fallback.
- Sonner toasts (`Copied to clipboard`, `Prompt inserted into chat`, etc.).
- Custom event bus (`echogpt:insert-prompt`, `echogpt:open-prompt-library`, `echogpt:focus-chat-search`, `chatsUpdated`) to keep features decoupled.
- Reusable primitives: `Modal`, `SearchInput`, `Tooltip`, `Reveal`, `Container`, `Button`.
- Custom hooks: `useLocalStorage`, `useDebounce`, `useKeyboardShortcut`.

---

## Project Structure

```
echogpt-redesign/
├── database/
│   └── schema.sql              # PostgreSQL schema (users, chats, messages)
├── public/
│   ├── favicon.svg             # Sparkles logo in violet rounded square
│   └── screenshots/            # README screenshots (see Screenshots section)
├── src/
│   ├── app/
│   │   ├── api/                # Route handlers (read-only inputs)
│   │   │   ├── auth/[...nextauth]/route.js
│   │   │   ├── register/route.js
│   │   │   ├── chats/route.js
│   │   │   ├── chats/[chatId]/route.js
│   │   │   ├── chats/[chatId]/messages/route.js
│   │   │   └── settings/route.js
│   │   ├── chat/
│   │   │   ├── page.js
│   │   │   └── [chatId]/page.js
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── extension/page.js
│   │   ├── layout.js           # Root layout with providers and toaster
│   │   └── page.js             # Landing page composition
│   ├── components/
│   │   ├── common/             # Modal, SearchInput, Tooltip, Reveal,
│   │   │                       # Container, Button, Logo, ThemeToggle,
│   │   │                       # CommandPalette, Toaster
│   │   ├── forms/              # LoginForm, RegisterForm, SettingsForm
│   │   ├── landing/            # Landing section components
│   │   ├── layout/             # Navbar, AppNavbar, Footer, PromptLibraryButton
│   │   └── providers/          # ThemeProvider, AuthProvider
│   ├── data/
│   │   ├── models.js           # EchoGPT, GPT, Claude, Gemini
│   │   └── prompts.js          # 24 curated prompts (4 categories)
│   ├── features/
│   │   ├── chat/               # ChatShell, ChatSidebar, ChatListItem,
│   │   │                       # ChatSearch, PinnedChats, ChatInput,
│   │   │                       # ChatHeader, Message, MessageActions
│   │   ├── profile/ProfileContent.js
│   │   ├── prompts/PromptLibrary.js
│   │   └── settings/SettingsForm.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   └── useKeyboardShortcut.js
│   ├── lib/
│   │   ├── auth.js             # NextAuth config (credentials, JWT)
│   │   └── db.js               # pg Pool with hot-reload cache
│   ├── models/                 # Data access layer
│   │   ├── userModel.js
│   │   ├── chatModel.js
│   │   └── messageModel.js
│   ├── services/
│   │   └── chatService.js      # Simulated AI response (700 ms)
│   └── styles/
│       └── globals.css
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── jsconfig.json
└── README.md
```

---

## Database

PostgreSQL schema lives in `database/schema.sql`.

### users

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | |
| name | TEXT NOT NULL | |
| email | TEXT NOT NULL UNIQUE | |
| password | TEXT NOT NULL | bcrypt hash, cost 12 |
| image | TEXT | (unused) |
| created_at | TIMESTAMPTZ | default `now()` |
| updated_at | TIMESTAMPTZ | default `now()` |

### chats

| Column | Type | Notes |
|---|---|---|
| id | TEXT PRIMARY KEY | UUID minted by the app |
| user_id | INTEGER NOT NULL | FK → users(id) ON DELETE CASCADE |
| title | TEXT NOT NULL | default `'New Chat'` |
| model | TEXT NOT NULL | default `'EchoGPT'` |
| created_at | TIMESTAMPTZ | default `now()` |
| updated_at | TIMESTAMPTZ | default `now()` |

### messages

| Column | Type | Notes |
|---|---|---|
| id | TEXT PRIMARY KEY | UUID minted by the app |
| chat_id | TEXT NOT NULL | FK → chats(id) ON DELETE CASCADE |
| role | TEXT NOT NULL | `'user'` or `'assistant'` |
| content | TEXT NOT NULL | |
| created_at | TIMESTAMPTZ | default `now()` |

Deleting a user cascades through `chats` and then `messages`. Indexes on `chats.user_id` and `messages.chat_id`.

---

## Environment Variables

Create a `.env.local` at the project root with:

```bash
# PostgreSQL connection string
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

# NextAuth
NEXTAUTH_SECRET=replace-with-random-32+chars
NEXTAUTH_URL=http://localhost:3000
```

`NEXTAUTH_SECRET` is used to sign JWT session tokens. Generate one with `openssl rand -base64 32`.

---

## Local Setup

1. **Clone**
   ```bash
   git clone https://github.com/<your-username>/echogpt-redesign.git
   cd echogpt-redesign
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Provision PostgreSQL**
   - Local install (any 13+ version), or
   - Free hosted option: Neon, Supabase, Railway Postgres.

4. **Apply the schema**
   ```bash
   psql "$DATABASE_URL" -f database/schema.sql
   ```

5. **Add env vars**
   - Copy the variables from [Environment Variables](#environment-variables) above into `.env.local`.

6. **Run the dev server**
   ```bash
   npm run dev
   ```

7. Open http://localhost:3000.

---

## Authentication

- Credentials provider from `next-auth@4`.
- Strategy: JWT (no DB session table).
- Passwords hashed with `bcryptjs` cost 12, validated via `bcrypt.compare`.
- Sign-in page: `/login`. Sign-up handled by `POST /api/register`.
- Session callback exposes `id` and `name` on `session.user`.
- Account-related routes (`/chat`, `/profile`, `/settings`) require an active session via `useSession` (`required: true`).

### Register endpoint

`POST /api/register`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Validation: email regex, password ≥ 6 chars, name non-empty. Returns `409` on duplicate email.

---

## Deployment

The live build is hosted on Railway.

**Build command:** `npm run build`
**Start command:** `npm start`
**Env vars:** `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (production URL).

PostgreSQL on Railway is provisioned alongside the app and `database/schema.sql` is applied once via `psql`.

Live URL: https://echogpt-redesign.up.railway.app

---

## Screenshots

All screenshots live in `public/screenshots/` and are served from `/screenshots/<name>` so they ship with the app. Below is each one embedded inline.

### Landing page

**Hero**

<img src="public/screenshots/landing-hero.png" alt="Landing hero" width="100%" />

**Features**

<img src="public/screenshots/landing-features.png" alt="Landing features" width="100%" />

**Bento / capability grid**

<img src="public/screenshots/landing-bento.png" alt="Landing bento" width="100%" />

### Authentication

**Login**

<img src="public/screenshots/login.png" alt="Login" width="100%" />

**Register**

<img src="public/screenshots/register.png" alt="Register" width="100%" />

### Chat workspace

**Empty state with sidebar**

<img src="public/screenshots/chat-empty.png" alt="Chat empty state" width="100%" />

**Active conversation**

<img src="public/screenshots/chat-conversation.png" alt="Chat conversation" width="100%" />

**Command Palette (Cmd+K)**

<img src="public/screenshots/chat-command-palette.png" alt="Command palette" width="100%" />

**Prompt Library**

<img src="public/screenshots/chat-prompt-library.png" alt="Prompt library" width="100%" />

### Extension concept

<img src="public/screenshots/extension.png" alt="Extension concept page" width="100%" />

### Mobile

**Chat (mobile)**

<img src="public/screenshots/mobile-chat.png" alt="Mobile chat" width="320" />

**Sidebar drawer (mobile)**

<img src="public/screenshots/mobile-sidebar.png" alt="Mobile sidebar drawer" width="320" />


---

## Engineering Highlights

- **Custom hooks layer** — `useLocalStorage`, `useDebounce`, `useKeyboardShortcut` are reused across chat search, pinned chats, sidebar collapse, and palette state.
- **Reusable primitives** — `Modal`, `SearchInput`, `Tooltip`, `Reveal`, `Container`, `Button` keep every feature visually consistent.
- **Custom event bus** — Cross-component wiring without a state library (`echogpt:insert-prompt`, `echogpt:open-prompt-library`, `echogpt:focus-chat-search`, `chatsUpdated`).
- **Native-feel keyboard shortcuts** — `Cmd+K` palette, `Cmd+B` sidebar, `Cmd+Shift+O` new chat, `/` focus composer — registered only on the chat route via a single `useKeyboardShortcut` hook.
- **Theme aware** — every chrome element respects the `dark` class on `<html>` managed by `next-themes`.
- **Accessibility** — combobox + listbox + option roles on chat search, focus management on `Modal`, `aria-pressed` on toggle buttons, `aria-label` on icon buttons.
- **Responsive** — landing, auth, and chat pages all collapse gracefully to mobile widths.

---

## Case Studies

### 1. Chat sidebar for power users

`ChatSidebar` was rebuilt to host four distinct sections without overwhelming the 288px column: Pinned (collapsed when empty), Search (live, debounced 150 ms), Recent, and a bottom tool group.

- Pinned chats live in `localStorage` (`echogpt:pinnedChats`) and sync across tabs through the `storage` event.
- A single `ChatListItem` is reused for both Pinned and Recent to keep the visual language consistent.
- The bottom group uses one unified `SidebarNavItem` component (always a `<button>`) — this guarantees identical font-size, padding, and icon alignment across all four entries (Prompt Library, Settings, Profile, Log out).
- Sidebar collapse state lives at `echogpt:sidebarCollapsed`, with an always-visible handle on the left edge so the toggle is reachable even when the sidebar is hidden.

### 2. Replacing `<dialog>.showModal()`

The first Prompt Library implementation used the native `<dialog>` API (`dialog.showModal()`). It worked in isolation but trapped browser top-layer focus after the modal closed — the page stopped responding to scroll, clicks, and keyboard input. The fix was a custom `Modal` built from a plain fixed-position `motion.div` with:

- A body-scroll lock while open.
- An Escape key listener.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Backdrop click closes.
- Cleanup on unmount.

This trades the native focus trap (which we reintroduce manually when needed) for predictable teardown across Next.js App Router transitions.

### 3. Decoupling features with a custom event bus

The prompt library, chat composer, command palette, and chat search need to talk to each other without coupling their component trees. A small set of `window` events does the work:

| Event | Dispatched by | Handled by |
|---|---|---|
| `echogpt:insert-prompt` | `PromptLibrary` | `ChatInput` (sets value, focuses textarea) |
| `echogpt:open-prompt-library` | Command Palette, sidebar | `PromptLibraryButton` |
| `echogpt:focus-chat-search` | Command Palette | `ChatSearch` |
| `chatsUpdated` | create / rename / delete handlers | `ChatSidebar` (re-fetches) |

Each consumer adds a single `useEffect` listener. None of these components know about each other directly.

### 4. 3-state theme control

`Settings` exposes a segmented `Light / Dark / System` control instead of a `<select>`. The store remains `next-themes`. The control writes through to `useTheme().setTheme(...)` and reacts to `theme` updates with `useEffect`. This is the same model the command palette uses for its `Toggle Theme` action, so they stay in sync without props drilling.

---

## Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Run Next.js ESLint |

---

## Security Notes

- Passwords are hashed with `bcryptjs` at cost 12.
- Sessions are signed JWTs (`NEXTAUTH_SECRET`).
- Authenticated routes use NextAuth's `required: true` guard.
- API routes use parameterized queries via the `pg` driver.
- `NEXTAUTH_SECRET` and `DATABASE_URL` must never be committed.
- No external AI keys are present in this repository; `chatService` returns a deterministic simulated response.

---

## Future Improvements

- Real streaming responses with token-by-token SSE.
- Per-user model preferences and rate-limit telemetry.
- Shared chats via signed link.
- Actual browser extension scaffolding (Manifest V3, side panel).
- Per-message persistence server-side (currently only Like/Dislike persists, locally).
- E2E tests for chat, palette, and prompt library.

---

## AI Use Declaration

This project was built with the assistance of generative AI tools (LLM-based coding assistants) for boilerplate generation, refactoring, and documentation. All design decisions, architecture choices, code review, integration, manual testing, and final acceptance were performed by the human author.

---

## License

This project is provided as an internship assessment deliverable. No license is granted for redistribution without explicit permission.
