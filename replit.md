# Ivoir Rental

Dallas–Fort Worth's rideshare vehicle rental service — a landing page for gig drivers (Uber, Lyft, DoorDash, etc.) with fleet info, pricing, application form, and a vehicle partner/listing section.

## Run & Operate

- `pnpm --filter @workspace/ivoir-rental run dev` — run the frontend (port assigned via env)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, framer-motion, wouter, react-icons
- API: Express 5 (minimal, health check only)
- DB: PostgreSQL + Drizzle ORM (provisioned but no app schema yet)
- Fonts: Syne (headings) + Inter (body) from Google Fonts

## Where things live

- `artifacts/ivoir-rental/src/pages/Home.tsx` — main landing page, composes all sections
- `artifacts/ivoir-rental/src/sections/` — one component per section (Nav, Hero, Ticker, Stats, HowItWorks, Fleet, WhyUs, Platforms, Pricing, Requirements, Reviews, FAQ, Apply, Partner, Footer, WhatsAppButton)
- `artifacts/ivoir-rental/src/index.css` — global styles, dark theme CSS vars, Google Fonts import
- `artifacts/api-server/src/routes/` — Express routes (health check only)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (health check only)

## Architecture decisions

- Presentation-first: no backend needed — all content is static/hardcoded in components.
- Animated canvas highway in Hero uses `useRef` + `requestAnimationFrame` for smooth 60fps perspective road animation.
- Section-per-file structure under `src/sections/` keeps the codebase navigable.
- WhatsApp float button uses a fixed-position green circle that links to wa.me.
- Forms show a success state on submit (no backend persistence needed for MVP).

## Product

Single-page landing site for Ivoir Rental with: hero (animated highway), stats bar, how-it-works, fleet cards, why-us, platform compatibility, pricing tiers, driver requirements, testimonials, FAQ accordion, driver application form, vehicle partner/listing form, and footer.

## User preferences

- Match the design from the Claude-generated HTML provided in `attached_assets/`
- Dark luxury aesthetic: gold (#D4A843) on near-black (#080810), Syne font for headings

## Gotchas

- Google Fonts `@import url(...)` must be the very first line of `index.css` — PostCSS fails silently otherwise.
- `SiAmazon` does not exist in react-icons/si — use `Package` from lucide-react for Amazon Flex.
- CSS custom properties use space-separated HSL values (no `hsl()` wrapper) per Tailwind v4 convention.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `react-vite` skill for frontend build conventions
