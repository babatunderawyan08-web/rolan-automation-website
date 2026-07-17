# ROLAN AUTOMATION — Premium Agency Website

A production-ready Next.js website for **ROLAN AUTOMATION** — AI Automation Agency, Workflow Automation, Call Center Solutions, and Business Process Automation.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **Shadcn-style UI** — Button, Card, Accordion, Input
- **React Hook Form** + **Zod** — form validation
- **Embla Carousel** — testimonials slider
- **next-themes** — dark/light mode
- **Lucide Icons**

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Portfolio | `/portfolio` |
| Case Studies | `/case-studies` |
| Industries | `/industries` |
| Pricing | `/pricing` |
| FAQ | `/faq` |
| Blog | `/blog` |
| Blog Post | `/blog/[slug]` |
| Contact | `/contact` |
| Book Consultation | `/book-consultation` |
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| 404 | Auto |

## Run Locally

```powershell
cd "C:\Users\babat\Projects\Rolan Website"
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```powershell
npm run build
npm start
```

## Deploy

Deploy to **Vercel**, **Netlify**, or any Node.js host:

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically

## Customize

- **Email/Phone**: Edit `src/lib/constants.ts`
- **Content**: Edit `src/data/site-data.ts`
- **Colors**: Edit `src/app/globals.css`
- **Calendly**: Add embed in `src/app/contact/page.tsx` and `src/app/book-consultation/page.tsx`
- **Contact Form**: Wire to Formspree, Zapier, or your API in `src/components/features/contact-form.tsx`

## Features

- Sticky navigation with mega menu
- Dark / light mode toggle
- ROI calculator
- Portfolio & case study filters
- Testimonials carousel
- Infinite logo marquee
- Floating WhatsApp, call, and live chat buttons
- Cookie consent banner
- Loading screen
- Custom cursor (desktop)
- SEO metadata + JSON-LD schema on every page
- Fully responsive (mobile, tablet, desktop, ultra-wide)
