# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Team project showcase site built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS.

## Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check   # or: npx tsc --noEmit

# Lint
npm run lint
```

## Architecture

This project uses the **Next.js App Router** (`app/` directory).

- `app/` — routes and layouts. Each folder is a route segment; `page.tsx` renders the page, `layout.tsx` wraps it.
- `app/components/` — shared UI components used across multiple pages.
- `public/` — static assets (images, fonts, etc.) served at the root URL.
- `tailwind.config.ts` — Tailwind theme customizations (colors, fonts, breakpoints).

## Key Conventions

- Use the App Router (`app/`) exclusively — do not mix with the Pages Router.
- Prefer **Server Components** by default; add `"use client"` only when interactivity or browser APIs are needed.
- Co-locate component-specific styles or sub-components inside the same route folder when they are not reused elsewhere.
- Images: use `next/image` for all `<img>` tags to get automatic optimization.
- Navigation: use `next/link` instead of `<a>` tags for internal links.

## TypeScript

- Strict mode is enabled. Avoid `any` — use `unknown` and narrow types explicitly.
- Define shared types in `app/types/` (create this directory as needed).
