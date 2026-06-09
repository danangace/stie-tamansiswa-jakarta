# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website profile for STIE Taman Siswa Jakarta (a private college). The site is in Indonesian and serves as a public-facing institutional profile.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

There is no test suite. Linting is handled by `@nuxt/eslint` — run via `npx nuxt lint` or as part of the Nuxt toolchain.

## Architecture

This is a **Nuxt 4** project using the `app/` directory layout (not the legacy root-level `pages/`). All application code lives under `app/`.

### Component Structure (Atomic Design)

Components follow a two-tier atomic design under `app/components/`:

- `Atomic/` — small reusable primitives (e.g. `Logo`)
- `Organism/` — full page sections (e.g. `HeroSection`, `Navbar`, `Footer`, `WhatsappFAB`)

Nuxt auto-imports components, so they are referenced in templates without explicit imports (e.g. `<OrganismNavbar />`, `<AtomicLogo />`).

### Pages & Routing

Pages live in `app/pages/(public)/` using a Nuxt route group (the `(public)` folder is not part of the URL). Route structure:

- `/` → `app/pages/index.vue` (homepage with section components)
- `/profil/*` → Profile sub-pages (Visi & Misi, About, Org Structure, etc.)
- `/program-studi/*` → Academic programs (Manajemen, Akuntansi)
- `/kemahasiswaan/*` → Student section
- `/berita/*` → News (currently disabled in nav)

### Layout

`app/layouts/default.vue` wraps every page with `<OrganismNavbar />` and `<OrganismFooter />`.

### Styling

Tailwind CSS v4 is configured via the `@tailwindcss/vite` plugin. CSS entry point is `app/assets/css/tailwind.css`, which imports:

- `color.css` — custom design tokens (`primary`, `secondary`, `text`, `neutral`, `red`, `yellow` color scales defined via `@theme`)
- `scrollbar.css`, `typography.css`, `spacing.css`

Dark mode is toggled via the `.dark` class on `<html>` (using `useColorMode()` from Nuxt). The `color.css` file overrides tokens under `.dark`.

Always use the custom color tokens (e.g. `text-primary-500`, `bg-neutral-100`) rather than Tailwind's default palette.

### UI Library

`@nuxt/ui` v4 is the component library. Use `UHeader`, `UNavigationMenu`, `UIcon`, `UApp`, `UMain`, etc. Icons use the `i-lucide-*` prefix (Lucide icon set).

## Database & Supabase

The full database schema, RLS policies, storage policies, and migration guide are documented in `requirements/supabase-schema.md`.

**Rule: whenever a database change is made** (new table, new column, changed RLS policy, changed storage policy), `requirements/supabase-schema.md` **must be updated in the same task**. This document is the single source of truth for setting up the database from scratch.

Two Supabase composables are used:
- `useSupabase()` — client-only (`supabase.client.ts` plugin), uses anon key. For admin pages and public form submissions (client-side interactions only).
- `useSupabasePublic()` — SSR-safe, creates a new client from runtimeConfig. For `useAsyncData` in public pages.

## Commit Conventions

Follow Conventional Commits: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `revert`, `perf`
